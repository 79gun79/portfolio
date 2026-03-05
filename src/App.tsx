import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { About } from './components/About';
import { Home } from './components/Home';
import { Navigation } from './components/Naviagation';
import { Posts } from './components/Posts';
import { Start } from './components/Start';
import Skills from './components/Skills';
import Experience from './components/Experience';

const INTRO_DURATION_MS = 3000;

export default function App() {
  const [showStart, setShowStart] = useState(true);

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
