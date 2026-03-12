import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="max-w-[95%] mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-1 text-2xl font-black text-primary tracking-tighter">
                    M<span className="text-emerald-400">/</span><span className="text-cyan-400">&gt;</span>
                </a>
                
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden md:flex gap-8">
                        <a href="#about" className="nav-link">About</a>
                        <a href="#skills" className="nav-link">Skills</a>
                        <a href="#coding" className="nav-link">Coding</a>
                        <a href="#experience" className="nav-link">Experience</a>
                        <a href="#projects" className="nav-link">Projects</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <i className="fas fa-sun text-lg"></i>
                        ) : (
                            <i className="fas fa-moon text-lg"></i>
                        )}
                    </button>

                    <button
                        className="md:hidden text-gray-300 text-xl"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mobile-nav-bg border-t border-[var(--card-border)] absolute w-full left-0 top-full overflow-hidden shadow-2xl"
                    >
                        <div className="px-6 py-8 space-y-4">
                            {['About', 'Experience', 'Skills', 'Coding', 'Projects', 'Contact'].map((item, idx) => (
                                <motion.a
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    href={`#${item.toLowerCase()}`}
                                    className="block text-lg font-semibold text-primary hover:text-emerald-400 transition-colors py-2 border-b border-[var(--card-border)] last:border-0"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-sm font-mono text-emerald-500/40 mr-4">0{idx + 1}.</span>
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to Top */}
            <div 
                className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
                onClick={scrollToTop}
            >
                <i className="fas fa-arrow-up"></i>
            </div>
        </nav>
    );
};

export default Navbar;
