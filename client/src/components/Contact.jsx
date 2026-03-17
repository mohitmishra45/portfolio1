import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: null
    });

    const [overlayState, setOverlayState] = useState({
        visible: false,
        status: 'idle', // 'connecting', 'success', 'error'
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trigger fullscreen overlay
        setOverlayState({ visible: true, status: 'connecting', message: 'Establishing Secure Connection...' });
        setStatus({ submitting: true, success: false, error: null });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            // Success state in overlay
            setOverlayState({ visible: true, status: 'success', message: 'Transmission Successful!' });
            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });

            // Hide overlay after 2.5 seconds
            setTimeout(() => {
                setOverlayState(prev => ({ ...prev, visible: false }));
            }, 2500);

            // Reset inline success message after 5 seconds
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);

        } catch (err) {
            console.error('Contact form error:', err);

            // Error state in overlay
            setOverlayState({ visible: true, status: 'error', message: err.message || 'Connection Failed' });
            setStatus({ submitting: false, success: false, error: err.message });

            // Hide overlay after 3 seconds
            setTimeout(() => {
                setOverlayState(prev => ({ ...prev, visible: false }));
            }, 3000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="contact" className="py-24 relative z-10 bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300">
            {/* Full Screen Suspense Overlay */}
            <AnimatePresence>
                {overlayState.visible && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]/80"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-emerald-500/30 p-12 rounded-3xl shadow-[0_0_100px_rgba(52,211,153,0.2)] flex flex-col items-center justify-center gap-6 max-w-sm text-center relative overflow-hidden"
                        >
                            {/* Decorative Top Glow */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${overlayState.status === 'error' ? 'from-red-500 via-orange-500 to-red-500' : 'from-emerald-500 via-teal-400 to-blue-500'}`}></div>

                            {overlayState.status === 'connecting' && (
                                <>
                                    <div className="relative flex items-center justify-center">
                                        <div className="w-24 h-24 border-4 border-emerald-500/20 rounded-full"></div>
                                        <div className="w-24 h-24 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin absolute top-0 left-0" style={{ animationDuration: '1s' }}></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <i className="fas fa-satellite-dish text-3xl text-emerald-400 animate-pulse"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary mb-2">Establishing Link...</h3>
                                        <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest animate-pulse opacity-80">{overlayState.message}</p>
                                    </div>
                                </>
                            )}

                            {overlayState.status === 'success' && (
                                <>
                                    <motion.div
                                        initial={{ scale: 0, rotate: -90 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", damping: 15 }}
                                        className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)] relative"
                                    >
                                        <motion.div
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <i className="fas fa-check text-4xl text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"></i>
                                        </motion.div>
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary mb-2">Message Sent Successfully</h3>
                                        <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest opacity-80">Link Terminated</p>
                                    </div>
                                </>
                            )}

                            {overlayState.status === 'error' && (
                                <>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 15 }}
                                        className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.4)] relative"
                                    >
                                        <i className="fas fa-exclamation-triangle text-4xl text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"></i>
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary mb-2">Link Failed</h3>
                                        <p className="text-red-400 font-mono text-xs uppercase tracking-widest opacity-80">{overlayState.message}</p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full animate-blob pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full animate-blob delay-4 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary section-heading tracking-tight mb-4">
                        Let's <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Connect</span>
                    </h2>
                    <h3 className="text-xl text-secondary font-medium mb-4">I'm currently open for new opportunities</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-transparent mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                >
                    {/* Left Column: Direct Contact & CVs */}
                    <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-8">
                        {/* CV Downloader Card */}
                        <div className="p-8 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] backdrop-blur-xl border border-[var(--card-border)] rounded-3xl shadow-xl hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all duration-500 relative overflow-hidden group">

                            {/* Inner ambient glow */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] mix-blend-screen pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-150"></div>

                            <h4 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3 relative z-10">
                                <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                                    <i className="fas fa-file-pdf text-xl"></i>
                                </span>
                                Resumes
                            </h4>

                            <p className="text-secondary mb-8 leading-relaxed relative z-10">
                                Download my professional CVs to review my technical skillset, projects, and educational background in detail.
                            </p>

                            <div className="flex flex-col gap-4 relative z-10">
                                {/* Button 1: Tech CV */}
                                <motion.a
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    href="/assets/CV.pdf"
                                    download="Mohit_Kumar_Mishra_CV_Technical.pdf"
                                    className="w-full py-4 px-6 bg-[var(--bg-primary)] hover:bg-emerald-500/10 border border-[var(--card-border)] hover:border-emerald-500/50 rounded-2xl flex items-center justify-between group/btn transition-all duration-300 shadow-lg relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                    <div className="flex items-center gap-4 text-primary font-bold">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] flex items-center justify-center text-emerald-400 group-hover/btn:text-emerald-300 transition-colors shadow-inner">
                                            <i className="fas fa-code text-sm"></i>
                                        </div>
                                        Specialized CV
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 group-hover/btn:bg-emerald-500 flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(52,211,153,0.2)] group-hover/btn:shadow-[0_0_15px_rgba(52,211,153,0.6)]">
                                        <i className="fas fa-download text-emerald-400 group-hover/btn:text-white group-hover/btn:animate-bounce text-sm"></i>
                                    </div>
                                </motion.a>

                                {/* Button 2: ATS/Creative CV */}
                                <motion.a
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    href="/assets/CV2.pdf"
                                    download="Mohit_Kumar_Mishra_CV_Alternate.pdf"
                                    className="w-full py-4 px-6 bg-[var(--bg-primary)] hover:bg-blue-500/10 border border-[var(--card-border)] hover:border-blue-500/50 rounded-2xl flex items-center justify-between group/btn transition-all duration-300 shadow-lg relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                    <div className="flex items-center gap-4 text-primary font-bold">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] flex items-center justify-center text-blue-400 group-hover/btn:text-blue-300 transition-colors shadow-inner">
                                            <i className="fas fa-file-lines text-sm"></i>
                                        </div>
                                        General CV
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 group-hover/btn:bg-blue-500 flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(59,130,246,0.2)] group-hover/btn:shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                                        <i className="fas fa-download text-blue-400 group-hover/btn:text-white group-hover/btn:animate-bounce text-sm"></i>
                                    </div>
                                </motion.a>
                            </div>
                        </div>

                        {/* Social Links Card */}
                        <div className="p-8 bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--card-border)] rounded-3xl shadow-xl hover:border-emerald-500/30 transition-all duration-500">
                            <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                    <i className="fas fa-hashtag text-sm"></i>
                                </span>
                                Digital Presence
                            </h4>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { icon: 'github', color: 'text-white', link: 'https://github.com/mohitmishra45', bgHover: 'hover:border-white/50' },
                                    { icon: 'linkedin-in', color: 'text-[#0A66C2]', link: 'https://linkedin.com/in/mohitmishra45', bgHover: 'hover:border-[#0A66C2]/50' },
                                    { icon: 'envelope', color: 'text-emerald-400', link: 'mailto:mohitmishra9707@gmail.com', bgHover: 'hover:border-emerald-400/50', type: 'fas' }
                                ].map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-14 h-14 rounded-2xl bg-[var(--bg-primary)] border border-[var(--card-border)] flex items-center justify-center transition-all duration-300 shadow-md ${social.bgHover}`}
                                    >
                                        <i className={`${social.type || 'fab'} fa-${social.icon} text-xl ${social.color} drop-shadow-md`}></i>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-7">
                        <div className="p-8 sm:p-10 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] backdrop-blur-xl border border-[var(--card-border)] rounded-3xl h-full shadow-2xl hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all duration-500 group relative">

                            {/* Decorative Top Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-t-3xl opacity-50"></div>

                            <form className="flex flex-col gap-6 h-full" onSubmit={handleSubmit}>
                                <div className="space-y-4 mb-2">
                                    <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                                        Send a direct message
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]"></span>
                                    </h3>
                                    <p className="text-secondary text-sm">I typically reply within a few hours.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-secondary text-sm font-semibold ml-1">Full Name</label>
                                        <motion.div whileFocus={{ scale: 1.01 }} className="relative group/input">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500/50 group-focus-within/input:text-emerald-400 transition-colors">
                                                <i className="fas fa-user-astronaut"></i>
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="e.g. John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-2xl pl-11 pr-5 py-4 text-primary focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-secondary/40 shadow-inner"
                                            />
                                        </motion.div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-secondary text-sm font-semibold ml-1">Email Address</label>
                                        <motion.div whileFocus={{ scale: 1.01 }} className="relative group/input">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-500/50 group-focus-within/input:text-blue-400 transition-colors">
                                                <i className="fas fa-at"></i>
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-2xl pl-11 pr-5 py-4 text-primary focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-secondary/40 shadow-inner"
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="space-y-2 flex-grow">
                                    <label htmlFor="message" className="block text-secondary text-sm font-semibold ml-1">Your Message</label>
                                    <motion.div whileFocus={{ scale: 1.005 }} className="relative h-full flex flex-col">
                                        <textarea
                                            id="message"
                                            placeholder="What would you like to discuss?"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-full bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-2xl px-5 py-4 text-primary focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-secondary/40 shadow-inner resize-none min-h-[160px]"
                                        ></textarea>
                                    </motion.div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {status.success && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                            className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center flex items-center justify-center gap-3 overflow-hidden font-medium"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                                                <i className="fas fa-check text-emerald-400"></i>
                                            </div>
                                            <span>Message transmitted successfully!</span>
                                        </motion.div>
                                    )}
                                    {status.error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                            className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center flex items-center justify-center gap-3 overflow-hidden font-medium"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-red-400/20 flex items-center justify-center">
                                                <i className="fas fa-exclamation text-red-400"></i>
                                            </div>
                                            <span>{status.error}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status.submitting}
                                    className="w-full mt-2 py-5 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] disabled:opacity-70 disabled:cursor-not-allowed transition-all overflow-hidden relative group/submit"
                                >
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/submit:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>

                                    <span className="relative z-10 flex items-center justify-center gap-3 text-shadow-sm">
                                        {status.submitting ? (
                                            <>
                                                <i className="fas fa-circle-notch animate-spin text-xl"></i>
                                                Initializing...
                                            </>
                                        ) : (
                                            <>
                                                Initialize Contact
                                                <i className="fas fa-rocket group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform text-xl"></i>
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
