import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingEffect = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <span className={`relative ${className}`}>
            {displayText}
            <span className="w-0.5 h-full bg-emerald-400 absolute -right-1 top-0 animate-pulse"></span>
        </span>
    );
};

const Hero = ({ data }) => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative z-10 pt-24 pb-12">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 w-full relative h-full flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    {/* Left Content: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left space-y-4 md:space-y-5"
                    >
                        <h3 className="text-emerald-400 font-mono text-lg md:text-xl font-medium tracking-wide mb-2">
                            Hello, World! I am
                        </h3>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary tracking-tight leading-[1.1] mb-4">
                            {data?.name || "Mohit Kumar Mishra"}
                        </h1>

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-700 dark:text-gray-300 transition-all duration-300 min-h-[1.2em]">
                            I'm an <TypingEffect text="Aspiring Data Science Engineer" className="text-gradient" />
                        </h2>

                        <p className="text-secondary opacity-80 max-w-2xl mx-auto lg:mx-0 text-lg leading-relaxed mt-6">
                            I build exceptional and accessible data-driven solutions. Passionate about transforming raw data into elegant, predictive, and scalable intelligent systems.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-10">
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 rounded-full bg-emerald-500 text-black font-bold text-lg shadow-accent hover:bg-emerald-400 transition-colors w-full sm:w-auto"
                            >
                                View My Work
                            </motion.a>

                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 rounded-full bg-transparent border-2 border-emerald-500 text-emerald-400 font-bold text-lg hover:bg-emerald-500/10 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                            >
                                Contact Me
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Content: Profile Picture */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            {/* Decorative Rings */}
                            <div className="absolute inset-[-15px] border-2 border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-[-15px] border-2 border-transparent border-t-emerald-500/40 rounded-full animate-[spin_6s_linear_infinite]"></div>
                            
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>

                            {/* Main Image Container */}
                            <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-500/30 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                <img 
                                    src={data?.hero?.profileImage || "/assets/images/profile.jpg"} 
                                    alt={data?.name} 
                                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 hover:scale-100"
                                    loading="eager"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400?text=Profile";
                                    }}
                                />
                            </div>

                            {/* Floating Badges/Icons */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--bg-primary)] border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg"
                            >
                                <i className="fas fa-brain text-xl"></i>
                            </motion.div>
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute -bottom-4 -left-4 w-12 h-12 bg-[var(--bg-primary)] border border-cyan-500/40 rounded-xl flex items-center justify-center text-cyan-400 shadow-lg"
                            >
                                <i className="fas fa-code text-xl"></i>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Socials & Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-12 lg:mt-16 flex flex-col items-center gap-6"
                >
                    <div className="flex gap-6 text-gray-400">
                        <a href="https://github.com/mohitmishra45" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors transform hover:-translate-y-1 duration-300">
                            <i className="fab fa-github text-2xl"></i>
                        </a>
                        <a href="https://linkedin.com/in/mohitmishra45" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors transform hover:-translate-y-1 duration-300">
                            <i className="fab fa-linkedin-in text-2xl"></i>
                        </a>
                        <a href="mailto:mohit@example.com" className="hover:text-emerald-400 transition-colors transform hover:-translate-y-1 duration-300">
                            <i className="fas fa-envelope text-2xl"></i>
                        </a>
                    </div>

                    <div className="flex flex-col items-center text-gray-500 mt-4 animate-bounce">
                        <span className="text-sm font-mono tracking-widest mb-2 uppercase">Scroll Down</span>
                        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
                            <div className="w-1 h-2 bg-gray-500 rounded-full animate-ping"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
