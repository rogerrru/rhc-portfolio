import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import line2 from '../../assets/home/line-2.svg';

const navLinks = [
  { to: '/portfolio', label: 'PORTFOLIO' },
  { to: '/resume', label: 'RESUME', underline: true },
  { to: '/contact', label: 'CONTACT' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const handleScroll = () => { if (isOpen) setIsOpen(false); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <header className="w-full flex justify-between items-center px-8 md:px-24 pt-10 md:pt-20 pb-5 relative z-50">
      <Link to="/" className="hover:opacity-70 transition-opacity">
        <h1 className="text-xl font-krona-one font-bold">RHC Jr.</h1>
      </Link>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col justify-between w-6 h-6 focus:outline-none relative z-50"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-0.5 w-full bg-black transform transition-all duration-300 ${
              i === 0 && isOpen ? 'rotate-45 translate-y-2.5' :
              i === 1 && isOpen ? 'opacity-0' :
              i === 2 && isOpen ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        ))}
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-10 text-xl font-lexend_exa">
        {navLinks.map(({ to, label, underline }) => (
          <Link key={to} to={to} className="relative hover:text-gray-500 transition-colors">
            {label}
            {underline && (
              <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
            )}
          </Link>
        ))}
      </nav>

      {/* Mobile fullscreen nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white flex flex-col justify-center items-center space-y-10 text-2xl font-lexend_exa md:hidden z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(({ to, label, underline }) => (
              <Link key={to} to={to} className="relative hover:text-gray-500">
                {label}
                {underline && (
                  <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
