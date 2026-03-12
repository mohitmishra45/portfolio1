import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const DATA_FILE = path.join(__dirname, '../data/portfolio.json');

// Helper to read data
const readData = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// GET all portfolio data
router.get('/portfolio', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read portfolio data' });
    }
});

// Generic PUT to update a section array (certifications, projects, etc)
router.put('/:section', (req, res) => {
    const { section } = req.params;
    try {
        const data = readData();
        if (data[section] === undefined) {
            return res.status(404).json({ error: `Section ${section} not found` });
        }
        data[section] = req.body;
        writeData(data);
        res.json({ message: `${section} updated successfully`, data: data[section] });
    } catch (err) {
        res.status(500).json({ error: `Failed to update ${section}` });
    }
});

// Generic POST to add an item to a section array
router.post('/:section', (req, res) => {
    const { section } = req.params;
    try {
        const data = readData();
        if (!Array.isArray(data[section])) {
            return res.status(400).json({ error: `Section ${section} is not an array` });
        }
        data[section].push(req.body);
        writeData(data);
        res.json({ message: `Item added to ${section}`, data: data[section] });
    } catch (err) {
        res.status(500).json({ error: `Failed to add item to ${section}` });
    }
});

// Generic DELETE to remove an item from a section array by index
router.delete('/:section/:index', (req, res) => {
    const { section, index } = req.params;
    try {
        const data = readData();
        if (!Array.isArray(data[section])) {
            return res.status(400).json({ error: `Section ${section} is not an array` });
        }
        const idx = parseInt(index, 10);
        if (idx >= 0 && idx < data[section].length) {
            data[section].splice(idx, 1);
            writeData(data);
            res.json({ message: `Item removed from ${section}`, data: data[section] });
        } else {
            res.status(404).json({ error: 'Index out of bounds' });
        }
    } catch (err) {
        res.status(500).json({ error: `Failed to delete item from ${section}` });
    }
});

export default router;
