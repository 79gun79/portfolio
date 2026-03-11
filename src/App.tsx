import { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { About } from './components/About';
import { Home } from './components/Home';
import { Projects } from './components/Projects';
import { Posts } from './components/Posts';
import { Start } from './components/Start';
import Skills from './components/Skills';
import { Navigation } from './components/Navigation';
import { PostDetail } from './page/PostDetail';
import { Footer } from './components/Footer';

const INTRO_DURATION_MS = 2000;

function MainPage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Posts />
      <Footer />
    </div>
  );
}

export default function App() {
  const [showStart, setShowStart] = useState(true);

  useLayoutEffect(() => {
    // Allow browser to restore scroll position
    if ('scrollRestoration' in window.history)
      window.history.scrollRestoration = 'auto';
  }, []);

  const handleFinishStart = useCallback(() => {
    setShowStart(false);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {showStart && (
          <Start
            key="start"
            onFinish={handleFinishStart}
            durationMs={INTRO_DURATION_MS}
          />
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
