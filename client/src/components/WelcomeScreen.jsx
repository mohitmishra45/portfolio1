import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WelcomeScreen = ({ onComplete }) => {
    const [greeting, setGreeting] = useState('');
    const [timePhrase, setTimePhrase] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setGreeting('Good Morning');
            setTimePhrase('Rise and shine');
            setIcon('fa-sun text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]');
        } else if (hour >= 12 && hour < 17) {
            setGreeting('Good Afternoon');
            setTimePhrase('Hope you are having a great day');
            setIcon('fa-cloud-sun text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]');
        } else if (hour >= 17 && hour < 21) {
            setGreeting('Good Evening');
            setTimePhrase('Winding down the day');
            setIcon('fa-moon text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.6)]');
        } else {
            setGreeting('Good Night');
            setTimePhrase('Late night coding, huh?');
            setIcon('fa-star text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]');
        }

        // Auto complete after animation Sequence (total ~2.8s)
        const timer = setTimeout(() => {
            onComplete();
        }, 3200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0f] overflow-hidden"
        >
            {/* Background glowing orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" 
                />
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" 
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center px-4"
            >
                <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, delay: 0.4 }}
                    className="w-24 h-24 mb-6 rounded-[2rem] bg-[var(--bg-secondary)] border border-white/5 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.15)] backdrop-blur-md"
                >
                    <i className={`fas ${icon} text-4xl`}></i>
                </motion.div>

                <div className="overflow-hidden py-2">
                    <motion.h1 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
                    >
                        {greeting}
                    </motion.h1>
                </div>

                <div className="overflow-hidden">
                    <motion.div 
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                        className="flex items-center justify-center gap-4"
                    >
                        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-emerald-500/50"></span>
                        <p className="text-xl md:text-2xl text-emerald-400/90 font-medium tracking-wide">
                            {timePhrase}
                        </p>
                        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-emerald-500/50"></span>
                    </motion.div>
                </div>
                
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mt-12 max-w-[200px] w-[50vw] mx-auto"
                />
            </motion.div>
        </motion.div>
    );
};

export default WelcomeScreen;
