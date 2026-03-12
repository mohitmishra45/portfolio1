import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Skills = () => {

    const skillsData = [
        {
            category: "Data Science",
            icon: "fa-chart-line",
            items: [
                { name: "Pandas", icon: "fa-solid fa-table", level: "90%" },
                { name: "NumPy", icon: "fa-solid fa-calculator", level: "85%" },
                { name: "Matplotlib", icon: "fa-solid fa-chart-column", level: "85%" },
                { name: "Seaborn", icon: "fa-solid fa-chart-pie", level: "80%" },
                { name: "Machine Learning", icon: "fa-solid fa-brain", level: "78%" }
            ]
        },
        {
            category: "Programming",
            icon: "fa-code",
            items: [
                { name: "Java", icon: "fa-brands fa-java", level: "90%" },
                { name: "Python", icon: "fa-brands fa-python", level: "88%" },
                { name: "C++", icon: "fa-solid fa-code", level: "80%" },
                { name: "JavaScript", icon: "fa-brands fa-js", level: "82%" }
            ]
        },
        {
            category: "Core CS",
            icon: "fa-microchip",
            items: [
                { name: "Data Structures", icon: "fa-solid fa-diagram-project", level: "80%" },
                { name: "Algorithms", icon: "fa-solid fa-gears", level: "78%" },
                { name: "Operating Systems", icon: "fa-solid fa-desktop", level: "75%" },
                { name: "DBMS", icon: "fa-solid fa-server", level: "78%" }
            ]
        },
        {
            category: "Database & Tools",
            icon: "fa-database",
            items: [
                { name: "MongoDB", icon: "fa-solid fa-database", level: "85%" },
                { name: "Git", icon: "fa-brands fa-git-alt", level: "88%" },
                { name: "GitHub", icon: "fa-brands fa-github", level: "90%" },
                { name: "Streamlit", icon: "fa-solid fa-chart-simple", level: "82%" }
            ]
        }
    ];

    const [activeTab, setActiveTab] = useState(0);
    const groups = skillsData;

    return (
        <section id="skills" className="py-24 bg-[var(--bg-primary)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >

                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Technical <span className="text-emerald-400">Excellence</span>
                    </h2>

                    <p className="text-secondary max-w-2xl mx-auto text-lg">
                        A specialized toolkit focused on Data Science, Machine Learning, and Modern Web Architectures.
                    </p>

                </motion.div>


                {/* Tabs */}

                <div className="flex flex-wrap justify-center gap-3 mb-14 p-2 bg-[var(--bg-secondary)] border border-white/5 rounded-2xl max-w-3xl mx-auto shadow-sm">

                    {groups.map((group, idx) => (

                        <button
                            key={group.category}
                            onClick={() => setActiveTab(idx)}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === idx
                                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >

                            <i className={`fas ${group.icon}`}></i>

                            {group.category}

                        </button>

                    ))}

                </div>


                {/* Skills Grid */}

                <div className="relative min-h-[400px]">

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >

                            {groups[activeTab].items.map((skill, idx) => (

                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:border-emerald-500/30 transition-all group relative overflow-hidden shadow-sm"
                                >


                                    <div className="flex items-center gap-5 mb-5">

                                        <div className="w-14 h-14 rounded-xl bg-[var(--bg-primary)] border border-white/10 flex items-center justify-center text-3xl text-emerald-400 group-hover:scale-110 transition-transform">

                                            <i className={skill.icon}></i>

                                        </div>


                                        <div>

                                            <h4 className="text-xl font-bold text-primary group-hover:text-emerald-400 transition-colors">

                                                {skill.name}

                                            </h4>

                                            <span className="text-xs font-bold text-emerald-500/60 uppercase">

                                                {parseInt(skill.level) > 85
                                                    ? "Expert"
                                                    : parseInt(skill.level) > 75
                                                        ? "Intermediate"
                                                        : "Proficient"}

                                            </span>

                                        </div>

                                    </div>


                                    {/* Progress bar */}

                                    <div>

                                        <div className="flex justify-between text-xs text-gray-400 mb-1">

                                            <span>Proficiency</span>

                                            <span>{skill.level}</span>

                                        </div>


                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">

                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: skill.level }}
                                                transition={{ duration: 1 }}
                                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                                            />

                                        </div>

                                    </div>

                                </motion.div>

                            ))}

                        </motion.div>

                    </AnimatePresence>

                </div>

            </div>

        </section>

    );
};

export default Skills;