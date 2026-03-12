import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ data }) => {
    return (
        <section id="experience" className="py-24 relative z-10 bg-[var(--bg-primary)] border-y border-[var(--card-border)] transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary section-heading tracking-tight">
                        My <span className="text-emerald-400">Journey</span>
                    </h2>
                    <p className="text-secondary mt-4 max-w-2xl mx-auto text-lg">
                        A timeline of my professional experience and education.
                    </p>
                </motion.div>

                {/* Vertical Timeline Container */}
                <div className="relative">
                    {/* Center Line (Hidden on mobile, visible on md+) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-transparent -translate-x-1/2"></div>

                    {/* Mobile Line (Left aligned) */}
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-transparent"></div>

                    {(data || []).map((exp, idx) => {
                        const isEven = idx % 2 === 0;

                        return (
                            <div key={idx} className="relative mb-12 flex flex-col md:flex-row items-center w-full group">

                                {/* Timeline Node (Circle indicator) */}
                                <div className="absolute left-4 md:left-1/2 -ml-[5px] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10 group-hover:scale-150 transition-transform duration-300"></div>

                                {/* Content Card Container (Left for even, Right for odd) */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, type: "spring" }}
                                    className={`w-full md:w-1/2 pl-12 md:pl-0 pr-0 ${isEven ? 'md:pr-12 md:text-right flex md:justify-end' : 'md:pl-12 md:ml-auto flex md:justify-start'}`}
                                >
                                    <div className={`glass-card p-6 w-full max-w-md hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 relative ${isEven ? 'md:items-end' : 'md:items-start'} flex flex-col`}>

                                        {/* Date Badge */}
                                        <div className="inline-block px-3 py-1 mb-3 bg-[var(--bg-secondary)] border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold tracking-wider">
                                            {exp.date}
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
                                            {exp.title}
                                        </h3>

                                        <h4 className="text-emerald-600 dark:text-emerald-400 font-medium mb-3 text-sm md:text-base">
                                            {exp.company}
                                        </h4>

                                        <p className={`text-secondary text-sm leading-relaxed mb-4 whitespace-pre-line ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                            {exp.description}
                                        </p>

                                        {exp.tech && exp.tech.length > 0 && (
                                            <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                                {exp.tech.map(t => (
                                                    <span key={t} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 rounded font-medium">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
