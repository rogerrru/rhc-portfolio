import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import line2 from "../assets/home/line-2.svg";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        () =>
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    const location = useLocation();

    // Sync dark mode with <html> and localStorage
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY && isOpen) {
                setIsOpen(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white dark:bg-[#121212] w-full flex justify-between items-center px-12 md:px-25 pt-10 md:pt-20 pb-5 relative z-50">
            {/* Logo */}
            <Link
                to="/"
                className="hover:text-gray-600 z-50"
                onClick={() => isOpen && setIsOpen(false)}
            >
                <h1 className="text-black dark:text-white text-xl font-krona-one font-bold">RHC Jr.</h1>
            </Link>

            {/* Dark mode toggle */}
            {/*<button*/}
            {/*    onClick={() => setDarkMode(!darkMode)}*/}
            {/*    className="ml-4 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm"*/}
            {/*>*/}
            {/*    {darkMode ? "☀️" : "🌙"}*/}
            {/*</button>*/}

            {/* Hamburger button */}
            <button
                className="md:hidden flex flex-col justify-between w-6 h-6 focus:outline-none relative z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span
                    className={`h-0.5 w-full bg-black dark:bg-white transform transition-all duration-300 ease-in-out ${
                        isOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                />
                <span
                    className={`h-0.5 w-full bg-black dark:bg-white transition-all duration-300 ease-in-out ${
                        isOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                    className={`h-0.5 w-full bg-black dark:bg-white transform transition-all duration-300 ease-in-out ${
                        isOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                />
            </button>

            {/* Desktop navbar */}
            <nav className="hidden md:flex space-x-10 text-xl font-lexend_exa text-[#000000] dark:text-[#FFFFFF]">
                <Link to="/portfolio" className="relative hover:text-gray-600 dark:hover:text-gray-300">
                    PORTFOLIO
                    {isActive("/portfolio") && (
                        <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
                    )}
                </Link>
                <Link to="/resume" className="relative hover:text-gray-600 dark:hover:text-gray-300">
                    RESUME
                    {isActive("/resume") && (
                        <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
                    )}
                </Link>
                <Link to="/contact" className="relative hover:text-gray-600 dark:hover:text-gray-300">
                    CONTACT
                    {isActive("/contact") && (
                        <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
                    )}
                </Link>
            </nav>

            {/* Mobile fullscreen navbar */}
            <div
                className={`fixed inset-0 text-[#000000] dark:text-[#FFFFFF] bg-white dark:bg-[#121212] flex flex-col justify-center items-center space-y-10 text-2xl font-lexend_exa transition-all duration-500 ease-in-out ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
                } md:hidden z-40`}
            >
                <Link to="/portfolio" className="relative hover:text-gray-600 dark:hover:text-gray-300" onClick={() => setIsOpen(false)}>
                    PORTFOLIO
                    {isActive("/portfolio") && (
                        <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
                    )}
                </Link>
                <Link to="/resume" className="relative hover:text-gray-600 dark:hover:text-gray-300" onClick={() => setIsOpen(false)}>
                    RESUME
                    {isActive("/resume") && (
                        <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
                    )}
                </Link>
                <Link to="/contact" className="relative hover:text-gray-600 dark:hover:text-gray-300" onClick={() => setIsOpen(false)}>
                    CONTACT
                    {isActive("/contact") && (
                        <img src={line2} alt="" className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2" />
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;
