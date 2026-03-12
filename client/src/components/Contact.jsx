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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);

        } catch (err) {
            console.error('Contact form error:', err);
            setStatus({ submitting: false, success: false, error: err.message });
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
            {/* Animated Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full animate-blob pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full animate-blob delay-4 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary section-heading tracking-tight mb-4">
                        Contact <span className="text-emerald-400">Me</span>
                    </h2>
                    <h3 className="text-xl text-secondary font-medium mb-4">Get in touch</h3>
                    <p className="text-secondary text-lg max-w-2xl mx-auto opacity-80">
                        Feel free to reach out if you want to collaborate, discuss a project, or just connect.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row gap-8"
                >
                    {/* Left Side: Contact Form */}
                    <motion.div variants={itemVariants} className="w-full lg:w-3/5">
                        <div className="glass-card p-8 bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--card-border)] rounded-3xl h-full shadow-2xl hover:border-emerald-500/30 transition-all duration-500 group">
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-secondary text-sm font-medium ml-1">Name</label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            type="text"
                                            id="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-xl px-5 py-4 text-primary focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-secondary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-secondary text-sm font-medium ml-1">Email</label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            type="email"
                                            id="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-xl px-5 py-4 text-primary focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-secondary/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 flex-grow">
                                    <label htmlFor="message" className="block text-secondary text-sm font-medium ml-1">Message</label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.005 }}
                                        id="message"
                                        placeholder="Tell me about your project..."
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-xl px-5 py-4 text-primary focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-secondary/50"
                                    ></motion.textarea>
                                </div>

                                <AnimatePresence mode="wait">
                                    {status.success && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                            className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center flex items-center justify-center gap-2 overflow-hidden"
                                        >
                                            <i className="fas fa-check-circle"></i>
                                            <span>Message sent successfully!</span>
                                        </motion.div>
                                    )}
                                    {status.error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                            className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center flex items-center justify-center gap-2 overflow-hidden"
                                        >
                                            <i className="fas fa-exclamation-triangle"></i>
                                            <span>{status.error}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status.submitting}
                                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed group py-4 h-auto"
                                >
                                    <span className="relative z-10 flex items-center gap-3 text-lg">
                                        {status.submitting ? (
                                            <>
                                                <i className="fas fa-circle-notch animate-spin"></i>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Info */}
                    <motion.div variants={itemVariants} className="w-full lg:w-2/5 flex flex-col gap-6">
                        <div className="glass-card p-8 bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--card-border)] rounded-3xl flex-grow shadow-2xl hover:border-blue-500/30 transition-all duration-500">
                            <h4 className="text-xl font-bold text-primary mb-8 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <i className="fas fa-headset text-sm"></i>
                                </span>
                                Connection Details
                            </h4>

                            <div className="space-y-6">
                                <motion.div whileHover={{ x: 5 }} className="group">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Email</p>
                                    <a href="mailto:mohitmishra9707@gmail.com" className="flex items-center gap-4 bg-[var(--bg-primary)] border border-[var(--card-border)] p-4 rounded-2xl group-hover:border-emerald-500/30 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <span className="text-secondary font-medium group-hover:text-primary transition-colors">mohitmishra9707@gmail.com</span>
                                    </a>
                                </motion.div>

                                <motion.div whileHover={{ x: 5 }} className="group">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Based In</p>
                                    <div className="flex items-center gap-4 bg-[var(--bg-primary)] border border-[var(--card-border)] p-4 rounded-2xl group-hover:border-blue-500/30 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <span className="text-secondary font-medium group-hover:text-primary transition-colors">Punjab, India</span>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-[var(--card-border)]">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 ml-1">Digital Footprint</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: 'github', color: 'text-white', link: 'https://github.com/mohitmishra45' },
                                        { icon: 'linkedin-in', color: 'text-[#0A66C2]', link: 'https://linkedin.com/in/mohitmishra45' },
                                        { icon: 'code', color: 'text-[#FFA116]', link: '#' },
                                        { icon: 'hackerrank', color: 'text-[#00EA64]', link: '#' }
                                    ].map((social, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={social.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--card-border)] flex items-center justify-center transition-all hover:bg-[var(--bg-secondary)] hover:border-emerald-500/30 social-icon-${social.icon}`}
                                        >
                                            <i className={`fab fa-${social.icon} ${social.color} brightness-90 group-hover:brightness-110`}></i>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="/assets/CV.pdf"
                            download="Mohit_Kumar_Mishra_CV.pdf"
                            className="w-full py-5 bg-[var(--bg-primary)] border border-[var(--card-border)] hover:border-emerald-500/30 text-primary rounded-3xl flex items-center justify-center gap-3 font-bold transition-all shadow-xl group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="relative z-10 flex items-center gap-3">
                                <i className="fas fa-download text-emerald-400 group-hover:animate-bounce"></i>
                                Download Full Portfolio (PDF)
                            </span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
