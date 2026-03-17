import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load below-the-fold components
const About = lazy(() => import('./components/About'));
const CodingProfile = lazy(() => import('./components/CodingProfile'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const API_BASE = '/api';

// Loading Component for Suspense
const SectionLoader = () => (
  <div className="py-20 flex justify-center">
    <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [liveStats, setLiveStats] = useState({ leetcode: null, hackerrank: null, gfg: null });
  const [loading, setLoading] = useState(true);
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Apply theme to body
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch static data first as it's critical
        const portfolioRes = await fetch(`${API_BASE}/portfolio`);
        const portfolioData = await portfolioRes.json();
        setData(portfolioData);
        setLoading(false);

        // Fetch live stats in parallel with robust handling
        const statsPromises = [
          fetch(`${API_BASE}/live/leetcode`).then(res => res.json()),
          fetch(`${API_BASE}/live/hackerrank`).then(res => res.json()),
          fetch(`${API_BASE}/live/gfg`).then(res => res.json())
        ];

        const results = await Promise.allSettled(statsPromises);
        
        const newStats = { ...liveStats };
        if (results[0].status === 'fulfilled' && !results[0].value.error) newStats.leetcode = results[0].value;
        if (results[1].status === 'fulfilled' && !results[1].value.error) newStats.hackerrank = results[1].value;
        if (results[2].status === 'fulfilled' && !results[2].value.error) newStats.gfg = results[2].value;
        
        setLiveStats(newStats);
      } catch (err) {
        console.error("Optimization: Data fetching error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Merge live stats into coding data
  const codingData = data?.coding ? { ...data.coding } : {};
  if (liveStats.leetcode) {
    codingData.leetcode = {
      solved: liveStats.leetcode.solved,
      easy: liveStats.leetcode.easy,
      med: liveStats.leetcode.med,
      hard: liveStats.leetcode.hard,
    };
  }
  if (liveStats.hackerrank) {
    codingData.hackerrank = {
      ...codingData.hackerrank,
      solved: liveStats.hackerrank.solved,
      badges: liveStats.hackerrank.badges,
      skills: liveStats.hackerrank.skills || codingData.hackerrank?.skills,
    };
  }
  if (liveStats.gfg) {
    codingData.gfg = {
      ...codingData.gfg,
      solved: liveStats.gfg.solved,
    };
  }

  const totalSolved = (codingData.leetcode?.solved || 0) +
    (codingData.hackerrank?.solved || 0) +
    (codingData.gfg?.solved || 0);

  const aboutData = data?.about ? {
    ...data.about,
    stats: {
      ...data.about.stats,
      problemsSolved: String(totalSolved || data?.about?.stats?.problemsSolved || '244'),
    }
  } : data?.about;

  return (
    <>
      {/* 
        The Welcome Screen is wrapped in AnimatePresence so it can animate out. 
        It naturally covers the screen due to fixed positioning and high z-index.
      */}
      <AnimatePresence mode="wait">
        {!welcomeComplete && <WelcomeScreen onComplete={() => setWelcomeComplete(true)} key="welcome" />}
      </AnimatePresence>

      {/* Main Content: Behind the welcome screen initially, but only shown if loading is complete to avoid flashes */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg font-mono">Initializing Portfolio...</p>
          </div>
        </div>
      ) : (
        <div className={!welcomeComplete ? "h-screen overflow-hidden" : ""}>
          <ParticleBackground />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="relative z-10">
            <Hero data={data?.hero} />
            <Suspense fallback={<SectionLoader />}>
              <About data={aboutData} />
              <Experience data={data?.experience} />
              <Skills data={data?.skills} />
              <CodingProfile data={codingData} liveStats={liveStats} />
              <Projects data={data?.projects} />
              <Achievements achievementsData={data?.achievements} certsData={data?.certifications} />
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;
