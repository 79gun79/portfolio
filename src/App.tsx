import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { Navigation } from './components/Naviagation';
import { Posts } from './components/Posts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Navigation />
              <Home />
              <About />
              <Posts />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
