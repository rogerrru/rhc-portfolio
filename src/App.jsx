import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/home';
import Portfolio from './pages/portfolio';
import Resume from './pages/resume';
import Contact from './pages/contact';
import ProjectDetails from "./pages/projectDetails.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<ProjectDetails />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
