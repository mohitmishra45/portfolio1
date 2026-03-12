import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';
import liveStatsRoutes from './routes/liveStats.js';
import contactRoutes from './routes/contact.js';
import { syncAll } from './services/syncService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Contact Form Route
app.use('/api/contact', contactRoutes);

// API Routes
app.use('/api', apiRoutes);

// Live Stats Routes (real-time coding platform data)
app.use('/api/live', liveStatsRoutes);

export default app;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        // Initial sync on startup — saves all solved questions to CSV
        syncAll().then(result => {
            console.log('📊 Initial CSV sync complete:');
            if (result.leetcode?.synced) console.log(`   ⚡ LeetCode: ${result.leetcode.total} questions saved`);
            if (result.hackerrank?.synced) console.log(`   🟢 HackerRank: ${result.hackerrank.total} domains saved`);
            if (result.gfg?.synced) console.log(`   🌿 GFG: synced`);
        }).catch(err => console.error('Sync error:', err.message));
    });
}
