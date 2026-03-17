import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Achievements = ({ achievementsData, certsData }) => {
    const certs = certsData || [];
    const [certIndex, setCertIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = React.useRef(null);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
            // Auto-trigger fullscreen on mount
            const timeoutId = setTimeout(() => {
                if (modalRef.current && !document.fullscreenElement) {
                    modalRef.current.requestFullscreen().catch(err => {
                        console.warn(`Fullscreen auto-trigger blocked: ${err.message}`);
                    });
                }
            }, 50); // Small delay to ensure ref is attached
            return () => clearTimeout(timeoutId);
        } else {
            document.body.style.overflow = '';
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    const toggleFullscreen = (e) => {
        e.stopPropagation();
        if (!modalRef.current) return;

        if (!document.fullscreenElement) {
            modalRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Number of cards to show at once (match Projects: 3 on desktop)
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

    const nextCert = () => {
        if (certIndex + cardsVisible < certs.length) {
            setCertIndex(certIndex + 1);
        }
    };

    const prevCert = () => {
        if (certIndex > 0) {
            setCertIndex(certIndex - 1);
        }
    };

    return (
        <div className="flex flex-col w-full relative z-10">
            {/* ====== CERTIFICATIONS SECTION ====== */}
            <section id="certifications" className="py-24 relative bg-[var(--bg-primary)] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center mb-16 relative"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary section-heading tracking-tight">
                            <span className="text-emerald-400">Certifications</span>
                        </h2>
                        <p className="text-secondary mt-4 max-w-2xl text-center text-lg">
                            My verified skills and professional credentials.
                        </p>
                    </motion.div>

                    {/* Slider Container */}
                    <div className="relative group">
                        {/* Prev Arrow */}
                        <button
                            onClick={prevCert}
                            disabled={certIndex === 0}
                            className={`absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] text-primary border border-white/10 transition-all shadow-lg shadow-black/20 ${certIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-emerald-500 hover:border-emerald-400 hover:text-black opacity-70 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100'}`}
                        >
                            <i className="fas fa-chevron-left text-sm md:text-base"></i>
                        </button>

                        {/* Carousel Wrapper */}
                        <div className="overflow-hidden mx-0 md:mx-4 px-1 py-4">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${certIndex * (100 / cardsVisible)}%)` }}
                            >
                                {certs.map((cert, idx) => (
                                    <div
                                        key={idx}
                                        className="flex-shrink-0 px-3 w-full md:w-1/2 lg:w-1/3"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                                            className="group/card relative h-[450px] rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--card-border)] hover-border-accent transition-all duration-500"
                                        >
                                            {/* Decorative Glow */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

                                            {/* Upper Half: Visual (Image Preview or massive Icon) */}
                                            <div className="h-1/2 w-full flex flex-col items-center justify-center relative z-10 bg-gradient-to-b from-black/20 to-transparent border-b border-[var(--card-border)] group-hover/card:-translate-y-4 transition-transform duration-500 p-0 overflow-hidden">
                                                {cert.image ? (
                                                    <img
                                                        src={cert.image}
                                                        alt={cert.title}
                                                        className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 rounded-2xl bg-[var(--bg-primary)] border border-[var(--card-border)] flex items-center justify-center mb-4 shadow-xl group-hover/card:shadow-emerald-500/20 group-hover/card:border-emerald-500/30 transition-all duration-500">
                                                        <i className="fas fa-certificate text-4xl text-emerald-400"></i>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Lower Half: Details */}
                                            <div className="h-1/2 p-6 flex flex-col justify-between relative z-10 bg-[var(--bg-secondary)] group-hover/card:-translate-y-4 transition-transform duration-500">
                                                <div>
                                                    <h4 className="text-emerald-400 text-xs uppercase font-bold tracking-widest mb-3">
                                                        {cert.provider}
                                                    </h4>
                                                    <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight line-clamp-3">
                                                        {cert.title}
                                                    </h3>
                                                </div>

                                                {/* Simulated Tag Space to match Project balance */}
                                                <div className="mt-4">
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wider rounded border border-emerald-500/20">
                                                            Verified Credential
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Glassmorphism Hover Overlay for Actions */}
                                            <div className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm opacity-0 group-hover/card:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 z-20">
                                                {cert.image && (
                                                    <button 
                                                        onClick={(e) => { e.preventDefault(); setSelectedImage(cert.image); }}
                                                        className="w-12 h-12 flex-shrink-0 rounded-full bg-[var(--bg-secondary)] border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(52,211,153,0.2)] group/btn"
                                                        title="View Certificate"
                                                    >
                                                        <i className="fas fa-eye text-lg group-hover/btn:scale-110 transition-transform"></i>
                                                    </button>
                                                )}

                                                {cert.link && cert.link !== '#' && (
                                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex-shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-black hover:bg-emerald-400 hover:scale-110 transition-all shadow-accent group/btn" title="Verify Certificate">
                                                        <i className="fas fa-external-link-alt text-xl group-hover/btn:rotate-12 transition-transform"></i>
                                                    </a>
                                                )}

                                                {cert.image && (
                                                    <a 
                                                        href={cert.image} 
                                                        download={`Certificate-${cert.title.replace(/\s+/g, '-')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-12 h-12 flex-shrink-0 rounded-full bg-[var(--bg-secondary)] border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(52,211,153,0.2)] group/btn"
                                                        title="Download Certificate"
                                                    >
                                                        <i className="fas fa-download text-lg group-hover/btn:-translate-y-1 transition-transform"></i>
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Arrow */}
                        <button
                            onClick={nextCert}
                            disabled={certIndex + cardsVisible >= certs.length}
                            className={`absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] text-primary border border-white/10 transition-all shadow-lg shadow-black/20 ${certIndex + cardsVisible >= certs.length ? 'opacity-30 cursor-not-allowed' : 'hover:bg-emerald-500 hover:border-emerald-400 hover:text-black opacity-70 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100'}`}
                        >
                            <i className="fas fa-chevron-right text-sm md:text-base"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* ====== ACHIEVEMENTS SECTION ====== */}
            <section id="achievements" className="py-24 relative border-t border-[var(--card-border)] bg-[var(--bg-primary)] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-primary section-heading">
                            <span className="text-emerald-400">Achieve</span>ments
                        </h2>
                        <p className="text-secondary mt-4 max-w-2xl mx-auto">
                            Milestones and recognition I've received along the way.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(achievementsData || []).map((ach, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 flex flex-col group/ach hover-border-accent transition-all duration-300 relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--card-border)]"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover/ach:bg-emerald-500/10 transition-colors"></div>

                                <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-lg text-emerald-400 flex items-center justify-center mb-5 group-hover/ach:scale-110 group-hover/ach:border-emerald-500/40 border border-[var(--card-border)] transition-all duration-300 shadow-xl relative z-10">
                                    <i className={`fas ${ach.icon} text-2xl`}></i>
                                </div>
                                <h3 className="text-primary font-bold text-lg mb-3 relative z-10">{ach.title}</h3>
                                <p className="text-secondary text-sm flex-grow leading-relaxed relative z-10 line-clamp-3">{ach.description}</p>

                                {ach.tech && (
                                    <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[var(--card-border)] relative z-10 items-center justify-between w-full">
                                        <div className="flex flex-wrap gap-2">
                                            {ach.tech.map(t => (
                                                <span
                                                    key={t}
                                                    className="text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        {ach.certificate && (
                                            <button
                                                onClick={() => setSelectedImage(ach.certificate)}
                                                className="text-emerald-400 hover:text-emerald-300 text-sm font-bold flex items-center gap-2 transition-colors group/btn"
                                            >
                                                <span>View Certificate</span>
                                                <i className="fas fa-certificate animate-pulse group-hover/btn:scale-110 transition-transform"></i>
                                            </button>
                                        )}
                                    </div>
                                )}
                                {!ach.tech && ach.certificate && (
                                    <div className="mt-5 pt-5 border-t border-[var(--card-border)] relative z-10 flex justify-end">
                                        <button
                                            onClick={() => setSelectedImage(ach.certificate)}
                                            className="text-emerald-400 hover:text-emerald-300 text-sm font-bold flex items-center gap-2 transition-colors group/btn"
                                        >
                                            <span>View Certificate</span>
                                            <i className="fas fa-certificate animate-pulse group-hover/btn:scale-110 transition-transform"></i>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full h-full flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative pointer-events-auto w-full h-full flex items-center justify-center">
                                {/* Control Buttons */}
                                <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-4 z-[110]">
                                    <button 
                                        onClick={toggleFullscreen}
                                        className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-2xl hover:scale-110 active:scale-95"
                                        title="Toggle Full View"
                                    >
                                        <i className={`fas ${document.fullscreenElement ? 'fa-compress' : 'fa-expand'} text-xl`}></i>
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(null);
                                        }}
                                        className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 border border-white/20 rounded-full flex items-center justify-center text-black transition-all shadow-2xl hover:scale-110 active:scale-95"
                                        title="Close"
                                    >
                                        <i className="fas fa-times text-2xl"></i>
                                    </button>
                                </div>
                                <img 
                                    src={selectedImage} 
                                    alt="Certificate Full View" 
                                    className="max-w-[98vw] max-h-[96vh] object-contain rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.9)]" 
                                    onClick={e => e.stopPropagation()}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Achievements;
