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
        </span>
    );
};

const Hero = ({ data }) => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative z-10 pt-28 pb-12 overflow-hidden">
            {/* Background ambient glow - Enhanced size and intensity */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] -z-10 pointer-events-none mix-blend-screen"></div>
            <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen delay-1000"></div>

            <div className="max-w-7xl mx-auto px-6 w-full relative h-full flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left Content: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left space-y-4 md:space-y-6"
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-2 backdrop-blur-sm"
                        >
                            <h3 className="text-emerald-400 font-mono text-sm md:text-base font-bold tracking-widest uppercase flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                System Online
                            </h3>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-primary tracking-tight leading-[1.1] mb-2 drop-shadow-sm">
                            {data?.name || "Mohit Kumar Mishra"}
                        </h1>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-secondary transition-all duration-300 min-h-[1.2em]">
                            I'm an <TypingEffect text="Aspiring Data Science Engineer" className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
                        </h2>

                        <p className="text-secondary opacity-90 max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl leading-relaxed mt-6 font-medium">
                            I build exceptional and accessible data-driven solutions. Passionate about transforming raw data into elegant, predictive, and scalable intelligent systems.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-10">
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all w-full sm:w-auto flex items-center justify-center gap-3 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    View Projects
                                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </span>
                            </motion.a>

                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:border-emerald-500/50 text-emerald-400 font-bold text-lg hover:bg-emerald-500/10 transition-all w-full sm:w-auto flex items-center justify-center gap-3 shadow-lg backdrop-blur-md"
                            >
                                <i className="fas fa-terminal"></i>
                                Contact Me
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Content: Profile Picture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px]">
                            {/* Enhanced Decorative Rings */}
                            <div className="absolute inset-[-20px] rounded-full border border-emerald-500/20 animate-[spin_15s_linear_infinite] pointer-events-none"></div>
                            <div className="absolute inset-[-40px] rounded-full border border-dashed border-blue-500/20 animate-[spin_25s_linear_infinite_reverse] pointer-events-none"></div>
                            
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse mix-blend-screen pointer-events-none"></div>

                            {/* Main Image Container */}
                            <div className="relative w-full h-full rounded-full p-3 bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--card-border)] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] group">
                                <img 
                                    src={data?.profileImage || "/assets/images/profile.jpeg"} 
                                    alt={data?.name} 
                                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
                                    loading="eager"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400?text=Profile";
                                    }}
                                />
                                {/* Overlay gradient to blend bottom of image */}
                                <div className="absolute inset-0 rounded-full shadow-[inset_0_-50px_50px_rgba(0,0,0,0.5)] pointer-events-none opacity-50 dark:opacity-80"></div>
                            </div>

                            {/* Floating Badges/Icons - Enhanced */}
                            <motion.div 
                                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[10%] -right-8 w-16 h-16 bg-[var(--bg-secondary)] backdrop-blur-md border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)] z-20"
                            >
                                <i className="fas fa-brain text-3xl"></i>
                            </motion.div>
                            <motion.div 
                                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-[10%] -left-8 w-16 h-16 bg-[var(--bg-secondary)] backdrop-blur-md border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] z-20"
                            >
                                <i className="fas fa-database text-3xl"></i>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Socials & Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-16 flex flex-col items-center gap-6 w-full"
                >
                    <div className="flex gap-8 text-secondary">
                        <a href="https://github.com/mohitmishra45" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-all transform hover:-translate-y-2 hover:scale-110 duration-300">
                            <i className="fab fa-github text-3xl"></i>
                        </a>
                        <a href="https://linkedin.com/in/mohitmishra45" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-all transform hover:-translate-y-2 hover:scale-110 duration-300">
                            <i className="fab fa-linkedin-in text-3xl"></i>
                        </a>
                        <a 
                            href="mailto:mohitmishra9707@gmail.com" 
                            className="hover:text-emerald-400 transition-all transform hover:-translate-y-2 hover:scale-110 duration-300"
                        >
                            <i className="fas fa-envelope text-3xl"></i>
                        </a>
                    </div>

                    <div className="flex flex-col items-center text-gray-500 animate-bounce mt-4 cursor-pointer" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                        <span className="text-xs font-mono tracking-widest mb-2 uppercase opacity-70">Discover More</span>
                        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
                            <div className="w-1 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
