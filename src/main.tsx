// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './style/index.css';
import App from './App.tsx';

// Make refresh always start at the top (Home), even if the browser tries to restore scroll.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

createRoot(document.getElementById('root')!).render(<App />);
