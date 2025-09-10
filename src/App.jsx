import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/home';
import Portfolio from './pages/portfolio';
import Resume from './pages/resume';
import Contact from './pages/contact';

function App() {
    return (
        <Router basename="/rhc-portfolio">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
