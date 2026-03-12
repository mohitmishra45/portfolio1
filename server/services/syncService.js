import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const LEETCODE_USERNAME = 'mohitmishra45';
const HACKERRANK_USERNAME = 'mohitmishra9707';
const GFG_USERNAME = 'mohitmishra45';

// ===== HELPERS =====
function readCSV(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
    if (lines.length <= 1) return []; // only header
    return lines.slice(1).map(line => {
        const match = line.match(/^(\d+),(".*?"|[^,]*),(.*)$/);
        if (!match) return null;
        return {
            no: parseInt(match[1]),
            title: match[2].replace(/^"|"$/g, ''),
            link: match[3],
        };
    }).filter(Boolean);
}

function writeCSV(filePath, rows, headers = ['No', 'Question', 'Link']) {
    const lines = [headers.join(',')];
    rows.forEach(r => {
        lines.push(`${r.no},"${r.title}",${r.link}`);
    });
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
}

// ===== LEETCODE SYNC =====
export async function syncLeetCode() {
    const csvPath = path.join(DATA_DIR, 'leetcode_solved.csv');
    try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/acSubmission?limit=300`);
        if (!res.ok) return { synced: false, error: 'API failed' };
        const data = await res.json();
        const submissions = data.submission || [];

        // Deduplicate by titleSlug
        const seen = new Set();
        const unique = [];
        for (const sub of submissions) {
            if (!seen.has(sub.titleSlug)) {
                seen.add(sub.titleSlug);
                unique.push(sub);
            }
        }

        // Read existing CSV to find what's new
        const existing = readCSV(csvPath);
        const existingLinks = new Set(existing.map(r => r.link));

        const allRows = [];
        let newCount = 0;
        unique.forEach((sub, idx) => {
            const link = `https://leetcode.com/problems/${sub.titleSlug}/`;
            const row = { no: idx + 1, title: sub.title, link };
            allRows.push(row);
            if (!existingLinks.has(link)) newCount++;
        });

        writeCSV(csvPath, allRows);
        return { synced: true, total: allRows.length, newQuestions: newCount, path: csvPath };
    } catch (err) {
        return { synced: false, error: err.message };
    }
}

// ===== HACKERRANK SYNC =====
export async function syncHackerRank() {
    const csvPath = path.join(DATA_DIR, 'hackerrank_solved.csv');
    try {
        const res = await fetch(`https://www.hackerrank.com/rest/hackers/${HACKERRANK_USERNAME}/badges`);
        if (!res.ok) return { synced: false, error: 'API failed' };
        const data = await res.json();

        const existing = readCSV(csvPath);
        const existingTitles = new Set(existing.map(r => r.title));

        const rows = [];
        let newCount = 0;
        (data.models || []).forEach((badge, idx) => {
            const row = {
                no: idx + 1,
                title: `${badge.badge_name} (${badge.stars}★ - ${badge.solved}/${badge.total_challenges} solved)`,
                link: `https://www.hackerrank.com${badge.url}`,
            };
            rows.push(row);
            if (!existingTitles.has(row.title)) newCount++;
        });

        writeCSV(csvPath, rows, ['No', 'Domain', 'Link']);
        return { synced: true, total: rows.length, newQuestions: newCount, path: csvPath };
    } catch (err) {
        return { synced: false, error: err.message };
    }
}

// ===== GFG SYNC =====
export async function syncGFG() {
    const csvPath = path.join(DATA_DIR, 'gfg_solved.csv');
    const rows = [{ no: 1, title: 'GeeksforGeeks Profile', link: `https://www.geeksforgeeks.org/user/${GFG_USERNAME}/` }];
    writeCSV(csvPath, rows);
    return { synced: true, total: 1, newQuestions: 0, path: csvPath };
}

// ===== SYNC ALL =====
export async function syncAll() {
    const [lc, hr, gfg] = await Promise.allSettled([syncLeetCode(), syncHackerRank(), syncGFG()]);
    return {
        leetcode: lc.status === 'fulfilled' ? lc.value : { synced: false, error: lc.reason?.message },
        hackerrank: hr.status === 'fulfilled' ? hr.value : { synced: false, error: hr.reason?.message },
        gfg: gfg.status === 'fulfilled' ? gfg.value : { synced: false, error: gfg.reason?.message },
    };
}

// Export CSV file paths for download
export function getCSVPath(platform) {
    return path.join(DATA_DIR, `${platform}_solved.csv`);
}
