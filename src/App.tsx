import { useCallback, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { About } from './components/About';
import { Home } from './components/Home';
import { Navigation } from './components/Naviagation';
import { Posts } from './components/Posts';
import { Start } from './components/Start';
import Skills from './components/Skills';
import Experience from './components/Experience';

const INTRO_DURATION_MS = 2000;

export default function App() {
  const [showStart, setShowStart] = useState(true);

  const forceTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useLayoutEffect(() => {
    // Prevent the browser from restoring a previous scroll position on reload.
    // Some browsers restore scroll after paint; force top over a few ticks.
    if ('scrollRestoration' in window.history)
      window.history.scrollRestoration = 'manual';

    forceTop();
    const raf1 = window.requestAnimationFrame(forceTop);
    const raf2 = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(forceTop),
    );
    const t1 = window.setTimeout(forceTop, 50);
    const t2 = window.setTimeout(forceTop, 250);

    const onPageShow = () => forceTop();
    const onLoad = () => forceTop();
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('load', onLoad);

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('load', onLoad);
    };
  }, [forceTop]);

  const handleFinishStart = useCallback(() => {
    setShowStart(false);
    forceTop();
    // Some browsers apply scroll restoration late; re-force over a few ticks.
    window.requestAnimationFrame(forceTop);
    window.setTimeout(forceTop, 0);
    window.setTimeout(forceTop, 120);
  }, [forceTop]);

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
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Navigation />
              <Home />
              <About />
              <Skills />
              <Experience />
              <Posts />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
