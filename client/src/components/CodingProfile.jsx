import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const API_BASE = '/api';

const AnimatedCounter = ({ target }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView || !target) return;
        const startTime = performance.now();
        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / 2000, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
        };
        requestAnimationFrame(animate);
    }, [isInView, target]);

    return <span ref={ref}>{count}</span>;
};

const AnimatedGauge = ({ value, max, color }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const circumference = 2 * Math.PI * 65;
    const targetOffset = circumference - (value / max) * circumference;

    return (
        <svg ref={ref} className="gauge-svg" width="140" height="140" viewBox="0 0 140 140">
            <circle className="gauge-bg" cx="70" cy="70" r="65" />
            <circle
                className="gauge-fill"
                cx="70" cy="70" r="65"
                stroke={color}
                style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: isInView ? targetOffset : circumference,
                    transition: 'stroke-dashoffset 2s cubic-bezier(.4,0,.2,1)',
                }}
            />
        </svg>
    );
};

const LiveBadge = () => (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-green-400 text-xs font-medium">Live</span>
    </div>
);

const DownloadCSVButton = ({ platform, label }) => (
    <a
        href={`${API_BASE}/live/${platform}/csv`}
        download
        className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
    >
        <i className="fas fa-download"></i>
        {label || 'Download Solved (CSV)'}
    </a>
);

const CodingProfile = ({ data, liveStats }) => {
    const lcLive = liveStats?.leetcode && !liveStats.leetcode.error;
    const hrLive = liveStats?.hackerrank && !liveStats.hackerrank.error;
    const gfgLive = liveStats?.gfg && !liveStats.gfg.error;
    const anyLive = lcLive || hrLive || gfgLive;

    // Build HackerRank star display from live badges
    const hrBadges = liveStats?.hackerrank?.badges || [];
    const hrSkillDisplay = hrBadges
        .filter(b => b.solved > 0)
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 4);

    return (
        <section id="coding" className="py-24 relative z-10 bg-[var(--bg-primary)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-primary section-heading">Coding <span className="text-emerald-400">Profile</span></h2>
                    <p className="text-secondary mt-6 max-w-xl mx-auto">My competitive programming journey across platforms — visualized.</p>
                    {anyLive && (
                        <div className="mt-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-green-400 text-xs font-medium">Live Data from APIs</span>
                            </div>
                        </div>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                    {/* ===== LeetCode ===== */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="glass-card p-8 text-center">
                        <h3 className="text-lg font-bold mb-6 flex items-center justify-center gap-2" style={{ color: '#FFA116' }}>
                            <i className="fas fa-bolt"></i>LeetCode
                            {lcLive && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
                        </h3>
                        <div className="gauge-container mx-auto mb-4">
                            <AnimatedGauge value={data?.leetcode?.solved || 0} max={500} color="#FFA116" />
                            <div className="gauge-text">
                                <span className="gauge-number"><AnimatedCounter target={data?.leetcode?.solved || 0} /></span>
                                <span className="gauge-label">Solved</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-4 text-sm">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span><span className="text-secondary">Easy <span className="text-primary font-bold">{data?.leetcode?.easy || 0}</span></span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span><span className="text-secondary">Med <span className="text-primary font-bold">{data?.leetcode?.med || 0}</span></span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span><span className="text-secondary">Hard <span className="text-primary font-bold">{data?.leetcode?.hard || 0}</span></span></div>
                        </div>
                        <DownloadCSVButton platform="leetcode" label="Download Questions (CSV)" />
                    </motion.div>

                    {/* ===== HackerRank ===== */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="glass-card p-8 text-center">
                        <h3 className="text-lg font-bold mb-6 flex items-center justify-center gap-2" style={{ color: '#00EA64' }}>
                            <i className="fab fa-hackerrank"></i>HackerRank
                            {hrLive && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
                        </h3>
                        <div className="gauge-container mx-auto mb-4">
                            <AnimatedGauge value={data?.hackerrank?.solved || 0} max={200} color="#00EA64" />
                            <div className="gauge-text">
                                <span className="gauge-number"><AnimatedCounter target={data?.hackerrank?.solved || 0} /></span>
                                <span className="gauge-label">Solved</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {hrLive && hrSkillDisplay.length > 0 ? (
                                hrSkillDisplay.map(b => (
                                    <span key={b.name} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,234,100,0.1)', color: '#00EA64' }}>
                                        {'⭐'.repeat(b.stars)} {b.name} ({b.solved})
                                    </span>
                                ))
                            ) : (
                                <>
                                    <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,234,100,0.1)', color: '#00EA64' }}>⭐⭐⭐⭐⭐ SQL</span>
                                    <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,234,100,0.1)', color: '#00EA64' }}>⭐⭐⭐⭐ C++</span>
                                    <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,234,100,0.1)', color: '#00EA64' }}>⭐⭐⭐ Python</span>
                                </>
                            )}
                        </div>
                        <DownloadCSVButton platform="hackerrank" label="Download Domains (CSV)" />
                    </motion.div>

                    {/* ===== GeeksforGeeks ===== */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card p-8 text-center">
                        <h3 className="text-lg font-bold mb-6 flex items-center justify-center gap-2" style={{ color: '#2F8D46' }}>
                            <i className="fas fa-leaf"></i>GeeksforGeeks
                            {gfgLive && !liveStats.gfg.note && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
                        </h3>
                        <div className="gauge-container mx-auto mb-4">
                            <AnimatedGauge value={data?.gfg?.solved || 0} max={100} color="#2F8D46" />
                            <div className="gauge-text">
                                <span className="gauge-number"><AnimatedCounter target={data?.gfg?.solved || 0} /></span>
                                <span className="gauge-label">Solved</span>
                            </div>
                        </div>
                        <p className="text-secondary text-sm mt-4">Fundamentals & DSA</p>
                        <DownloadCSVButton platform="gfg" label="View Profile (CSV)" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CodingProfile;
