import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <a href="#" className="text-2xl font-black text-white tracking-tight">
                    M<span className="text-emerald-400">M</span><span className="text-cyan-400">.</span>
                </a>
                <div className="hidden md:flex gap-8">
                    <a href="#about" className="nav-link">About</a>
                    <a href="#skills" className="nav-link">Skills</a>
                    <a href="#coding" className="nav-link">Coding</a>
                    <a href="#experience" className="nav-link">Experience</a>
                    <a href="#projects" className="nav-link">Projects</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>
                <button
                    className="md:hidden text-gray-300 text-xl"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#07070a]/95 backdrop-blur-xl border-t border-white/10 absolute w-full left-0 top-full">
                    <div className="px-4 py-3 space-y-2">
                        {['About', 'Experience', 'Skills', 'Coding', 'Projects', 'Contact'].map(item => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="block py-2 text-gray-300 hover:text-emerald-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
