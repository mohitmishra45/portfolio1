import React from "react";
import { motion } from "framer-motion";

const Skills = ({ softSkills }) => {
    const softSkillsFromData = softSkills || [];

    const technicalSkills = [
        { name: "Java", icon: "fa-brands fa-java", color: "#ED8B00" },
        { name: "Python", icon: "fa-brands fa-python", color: "#3776AB" },
        { name: "Pandas", icon: "fa-solid fa-table", color: "#9b59b6" },
        { name: "NumPy", icon: "fa-solid fa-calculator", color: "#4DABCF" },
        { name: "Matplotlib", icon: "fa-solid fa-chart-column", color: "#ff7f0e" },
        { name: "Seaborn", icon: "fa-solid fa-chart-pie", color: "#4C72B0" },

        { name: "Machine Learning", icon: "fa-solid fa-brain", color: "#FF6F00" },
        { name: "C++", icon: "fa-solid fa-code", color: "#00599C" },
        { name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E" },
        { name: "Data Structures", icon: "fa-solid fa-diagram-project", color: "#FF5722" },
        { name: "Algorithms", icon: "fa-solid fa-gears", color: "#00BCD4" },

        { name: "OS", icon: "fa-solid fa-desktop", color: "#607D8B" },
        { name: "DBMS", icon: "fa-solid fa-server", color: "#4CAF50" },
        { name: "MongoDB", icon: "fa-solid fa-database", color: "#47A248" },

        { name: "Git", icon: "fa-brands fa-git-alt", color: "#F05032" },
        { name: "GitHub", icon: "fa-brands fa-github", color: "#ffffff" },

        { name: "Streamlit", icon: "fa-solid fa-chart-simple", color: "#FF4B4B" }
    ];

    // Combine Technical and Soft Skills
    const skillsData = [
        ...technicalSkills,
        ...softSkillsFromData.map(s => ({ ...s, icon: `fas ${s.icon}` }))
    ];

    // Balanced triangle layout for 20 skills [6, 5, 4, 3, 2] = 20
    const rowConfig = [6, 5, 4, 3, 2];
    let skillIndex = 0;
    const rows = rowConfig.map(count => {
        const rowSkills = skillsData.slice(skillIndex, skillIndex + count);
        skillIndex += count;
        return rowSkills;
    });

    return (
        <section id="skills" className="py-24 bg-[var(--bg-primary)] transition-colors duration-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full overflow-hidden">
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
                        A specialized toolkit focused on Data Science, Machine Learning, and Professional Strengths.
                    </p>
                </motion.div>

                {/* Combined Skills Triangle Layout */}
                <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full mx-auto pb-6">
                    {rows.map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-center gap-3 sm:gap-4 md:gap-5 w-full flex-wrap sm:flex-nowrap">
                            {row.map((skill, sIdx) => {
                                const delay = (rIdx * row.length + sIdx) * 0.05;
                                return (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay, duration: 0.4 }}
                                        className="relative group w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 flex flex-col items-center justify-center p-2 isolate overflow-hidden cursor-default shrink-0"
                                    >
                                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 relative z-10">
                                            <i
                                                className={`${skill.icon} text-2xl sm:text-3xl md:text-4xl drop-shadow-md`}
                                                style={{ color: skill.color }}
                                            ></i>
                                        </div>
                                        <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-gray-300 group-hover:text-emerald-400 text-center px-1 max-w-full truncate relative z-10 transition-colors">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;