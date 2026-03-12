import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncLeetCode, syncHackerRank, syncGFG, syncAll, getCSVPath } from '../services/syncService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const LEETCODE_USERNAME = 'mohitmishra45';
const HACKERRANK_USERNAME = 'mohitmishra9707';
const GFG_USERNAME = 'mohitmishra45';

// ===== SYNC ENDPOINT — triggers sync for all platforms =====
router.get('/sync', async (req, res) => {
    const result = await syncAll();
    res.json({ message: 'Sync complete', ...result });
});

// ===== LEETCODE =====
router.get('/leetcode', async (req, res) => {
    try {
        // Trigger sync in background (don't block response)
        syncLeetCode().catch(() => { });

        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`);
        if (!response.ok) throw new Error('LeetCode API failed');
        const data = await response.json();
        res.json({
            solved: data.solvedProblem,
            easy: data.easySolved,
            med: data.mediumSolved,
            hard: data.hardSolved,
            totalSubmissions: data.acSubmissionNum?.find(d => d.difficulty === 'All')?.submissions || 0,
        });
    } catch (err) {
        console.error('LeetCode fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch LeetCode stats' });
    }
});

// LeetCode CSV — serve the synced file
router.get('/leetcode/csv', async (req, res) => {
    // Sync first to ensure CSV is up-to-date
    await syncLeetCode();
    const csvPath = getCSVPath('leetcode');
    if (fs.existsSync(csvPath)) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=leetcode_solved.csv');
        res.sendFile(csvPath);
    } else {
        res.status(404).json({ error: 'CSV not yet generated. Try again shortly.' });
    }
});

// ===== HACKERRANK =====
router.get('/hackerrank', async (req, res) => {
    try {
        // Trigger sync in background
        syncHackerRank().catch(() => { });

        const response = await fetch(`https://www.hackerrank.com/rest/hackers/${HACKERRANK_USERNAME}/badges`);
        if (!response.ok) throw new Error('HackerRank API failed');
        const data = await response.json();
        const badges = (data.models || []).map(b => ({
            name: b.badge_name,
            stars: b.stars,
            solved: b.solved,
            totalChallenges: b.total_challenges,
        }));
        const totalSolved = badges.reduce((sum, b) => sum + (b.solved || 0), 0);
        res.json({
            solved: totalSolved,
            badges,
            skills: badges.filter(b => b.stars >= 3).map(b => ({
                name: b.name,
                stars: b.stars,
            })),
        });
    } catch (err) {
        console.error('HackerRank fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch HackerRank stats' });
    }
});

// HackerRank CSV
router.get('/hackerrank/csv', async (req, res) => {
    await syncHackerRank();
    const csvPath = getCSVPath('hackerrank');
    if (fs.existsSync(csvPath)) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=hackerrank_solved.csv');
        res.sendFile(csvPath);
    } else {
        res.status(404).json({ error: 'CSV not yet generated.' });
    }
});

// ===== GEEKSFORGEEKS =====
router.get('/gfg', async (req, res) => {
    try {
        syncGFG().catch(() => { });
        const response = await fetch(`https://geeks-for-geeks-api.vercel.app/${GFG_USERNAME}`);
        if (response.ok) {
            const data = await response.json();
            if (!data.error) {
                return res.json({
                    solved: data.totalProblemsSolved || data.total_problems_solved || 14,
                });
            }
        }
        // Fallback
        const portfolioData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/portfolio.json'), 'utf-8'));
        res.json({ solved: portfolioData.coding?.gfg?.solved || 14, note: 'Cached data' });
    } catch (err) {
        try {
            const portfolioData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/portfolio.json'), 'utf-8'));
            res.json({ solved: portfolioData.coding?.gfg?.solved || 14, note: 'Cached data' });
        } catch {
            res.status(500).json({ error: 'Failed to fetch GFG stats' });
        }
    }
});

// GFG CSV
router.get('/gfg/csv', async (req, res) => {
    await syncGFG();
    const csvPath = getCSVPath('gfg');
    if (fs.existsSync(csvPath)) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=gfg_solved.csv');
        res.sendFile(csvPath);
    } else {
        res.status(404).json({ error: 'CSV not yet generated.' });
    }
});

// ===== AGGREGATE ALL =====
router.get('/all', async (req, res) => {
    const results = { leetcode: null, hackerrank: null, gfg: null, totalSolved: 0 };

    try {
        const lcRes = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`);
        if (lcRes.ok) {
            const lcData = await lcRes.json();
            results.leetcode = { solved: lcData.solvedProblem, easy: lcData.easySolved, med: lcData.mediumSolved, hard: lcData.hardSolved };
            results.totalSolved += lcData.solvedProblem;
        }
    } catch { }

    try {
        const hrRes = await fetch(`https://www.hackerrank.com/rest/hackers/${HACKERRANK_USERNAME}/badges`);
        if (hrRes.ok) {
            const hrData = await hrRes.json();
            const badges = (hrData.models || []).map(b => ({ name: b.badge_name, stars: b.stars, solved: b.solved }));
            const hrSolved = badges.reduce((sum, b) => sum + (b.solved || 0), 0);
            results.hackerrank = { solved: hrSolved, badges };
            results.totalSolved += hrSolved;
        }
    } catch { }

    try {
        const gfgRes = await fetch(`https://geeks-for-geeks-api.vercel.app/${GFG_USERNAME}`);
        if (gfgRes.ok) {
            const gfgData = await gfgRes.json();
            if (!gfgData.error) {
                results.gfg = { solved: gfgData.totalProblemsSolved || 14 };
                results.totalSolved += results.gfg.solved;
            }
        }
    } catch { }

    if (!results.gfg) {
        try {
            const pd = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/portfolio.json'), 'utf-8'));
            results.gfg = { solved: pd.coding?.gfg?.solved || 14 };
            results.totalSolved += results.gfg.solved;
        } catch { }
    }

    res.json(results);
});

export default router;
