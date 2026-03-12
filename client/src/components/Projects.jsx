import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Projects = ({ data }) => {
    const projects = data || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsVisible, setCardsVisible] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setCardsVisible(1);
            else if (window.innerWidth < 1024) setCardsVisible(2);
            else setCardsVisible(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextProject = () => {
        if (currentIndex + cardsVisible < projects.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevProject = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <section id="projects" className="py-24 relative z-10 bg-[#07070a]">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-16 relative"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white section-heading tracking-tight">
                        Featured <span className="text-emerald-400">Projects</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl text-center text-lg">
                        A selection of my recent work in Data Science, Machine Learning, and Web Development.
                    </p>
                </motion.div>

                {/* Slider Container */}
                <div className="relative group">
                    {/* Prev Arrow */}
                    <button
                        onClick={prevProject}
                        disabled={currentIndex === 0}
                        className={`absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#11111a]/90 text-white border border-white/10 transition-all shadow-lg shadow-black/50 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-emerald-500 hover:border-emerald-400 hover:text-black opacity-70 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100'}`}
                    >
                        <i className="fas fa-chevron-left text-sm md:text-base"></i>
                    </button>

                    {/* Carousel Wrapper */}
                    <div className="overflow-hidden mx-0 md:mx-4 px-1 py-4">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / cardsVisible)}%)` }}
                        >
                            {projects.map((project, idx) => (
                                <div
                                    key={project.title}
                                    className="flex-shrink-0 px-3 w-full md:w-1/2 lg:w-1/3"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                                        className="group/card relative min-h-[500px] flex flex-col rounded-2xl overflow-hidden bg-[#11111a] border border-white/10 hover-border-accent transition-all duration-500"
                                    >
                                        {/* Decorative Glow */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

                                        {/* Upper Half: Visual (Massive Icon or Image) */}
                                        <div className="h-[220px] w-full relative z-10 overflow-hidden">
                                            {project.image ? (
                                                <img 
                                                    src={project.image} 
                                                    alt={project.title} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#1a1a24] flex items-center justify-center">
                                                    <i className={`fas ${project.icon || 'fa-code'} text-5xl text-emerald-400 opacity-20 group-hover/card:opacity-50 transition-opacity duration-500`}></i>
                                                </div>
                                            )}
                                            {/* Gradient Overlay for image */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#11111a] via-transparent to-transparent opacity-60"></div>
                                        </div>

                                        {/* Lower Half: Title, Details & Tech Stack */}
                                        <div className="flex-1 p-6 flex flex-col relative z-10 bg-[#11111a] group-hover/card:bg-[#161622] transition-colors duration-500">
                                            <div className="mb-4">
                                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2 group-hover/card:text-emerald-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.tech.slice(0, 3).map(t => (
                                                        <span key={t} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold tracking-wider rounded border border-emerald-500/20">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-3 mt-4">
                                                    <a 
                                                        href={project.live || "#"} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-center rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <i className="fas fa-external-link-alt text-xs"></i> Live Demo
                                                    </a>
                                                    <a 
                                                        href={project.github || "#"} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="flex-1 py-2 bg-transparent border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 text-white text-center rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <i className="fab fa-github text-sm"></i> Code
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Arrow */}
                    <button
                        onClick={nextProject}
                        disabled={currentIndex + cardsVisible >= projects.length}
                        className={`absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#11111a]/90 text-white border border-white/10 transition-all shadow-lg shadow-black/50 ${currentIndex + cardsVisible >= projects.length ? 'opacity-30 cursor-not-allowed' : 'hover:bg-emerald-500 hover:border-emerald-400 hover:text-black opacity-70 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100'}`}
                    >
                        <i className="fas fa-chevron-right text-sm md:text-base"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
