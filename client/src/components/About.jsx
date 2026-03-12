import React from 'react';
import { motion } from 'framer-motion';

const About = ({ data: aboutData }) => {
    return (
        <section id="about" className="py-24 relative z-10 border-t border-white/5 bg-white/[0.01]">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white section-heading">
                        About <span className="text-emerald-400">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-accent mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Driven by Data, Focused on <span className="text-emerald-400">Impact</span>
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed mix-blend-lighten">
                            {aboutData?.description || "I find passion in extracting meaningful insights from complex datasets. My journey in Data Science and Machine Learning is fueled by a relentless curiosity and a desire to build intelligent systems."}
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed mix-blend-lighten">
                            Currently, I am pursuing my {aboutData?.education || "degree in Computer Science"}. I specialize in Python, Exploratory Data Analysis, and building predictive models that solve real-world problems.
                        </p>

                        <div className="pt-6">
                            <a href="#contact" className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-2 group transition-colors">
                                Let's build something together
                                <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Code Window / Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-20"></div>

                        <div className="relative bg-[#0d0d14] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                            {/* Mac OS Style Header */}
                            <div className="flex items-center px-4 py-3 bg-[#1a1a24] border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-gray-500 text-xs font-mono ml-4">~/developer/profile.json</div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm md:text-base whitespace-pre-wrap">
                                <span className="text-pink-500">const</span> <span className="text-blue-400">profile</span> <span className="text-white">=</span> <span className="text-yellow-300">{`{`}</span>
                                <br />
                                <span className="text-gray-400">  name:</span> <span className="text-green-400">'Mohit Kumar Mishra'</span>,
                                <br />
                                <span className="text-gray-400">  focus:</span> <span className="text-green-400">'Data Science & ML'</span>,
                                <br />
                                <span className="text-gray-400">  status:</span> <span className="text-green-400">'Student at LPU'</span>,
                                <br />
                                <span className="text-gray-400">  stats:</span> <span className="text-yellow-300">{`{`}</span>
                                <br />
                                <span className="text-gray-400">    problemsSolved:</span> <span className="text-purple-400">{aboutData?.stats?.problemsSolved || '244+'}</span>,
                                <br />
                                <span className="text-gray-400">    leetcodeStreak:</span> <span className="text-purple-400">{aboutData?.stats?.dayStreak || '29'}</span>,
                                <br />
                                <span className="text-gray-400">    coffeeConsumed:</span> <span className="text-purple-400">Infinity</span>
                                <br />
                                <span className="text-yellow-300">  {`}`}</span>
                                <br />
                                <span className="text-yellow-300">{`}`}</span><span className="text-white">;</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
