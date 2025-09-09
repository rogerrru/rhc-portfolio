import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Portfolio from './pages/portfolio';
import Resume from './pages/resume';
import Contact from './pages/contact';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div className="text-red-500 text-2xl">Home Test</div>} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
