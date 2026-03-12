import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-[var(--card-border)] bg-[var(--bg-primary)] py-8 text-center relative z-10 transition-colors duration-300">
            <p className="text-secondary text-sm">
                &copy; 2024 Mohit Kumar Mishra. Built with <span className="text-emerald-500">❤️</span> using React, Tailwind CSS & Framer Motion.
            </p>
        </footer>
    );
};

export default Footer;
