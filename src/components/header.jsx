import React, { useState, useEffect } from "react";
import line2 from "../assets/home/line-2.svg";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY && isOpen) {
                // scrolling down
                setIsOpen(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);


    return (
        <header className="w-full flex justify-between items-center px-12 md:px-25 pt-10 md:pt-20 pb-5 relative z-50">
            {/* Logo */}
            <a href="/" className="hover:text-gray-600">
                <h1 className="text-xl font-krona-one font-bold">RHC Jr.</h1>
            </a>

            {/* Hamburger button */}
            <button
                className="md:hidden flex flex-col justify-between w-6 h-6 focus:outline-none relative z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span
                    className={`h-0.5 w-full bg-black transform transition-all duration-300 ease-in-out ${
                        isOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                ></span>
                <span
                    className={`h-0.5 w-full bg-black transition-all duration-300 ease-in-out ${
                        isOpen ? "opacity-0" : "opacity-100"
                    }`}
                ></span>
                <span
                    className={`h-0.5 w-full bg-black transform transition-all duration-300 ease-in-out ${
                        isOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                ></span>
            </button>

            {/* Desktop navbar */}
            <nav className="hidden md:flex space-x-10 text-xl font-lexend_exa">
                <a href="/portfolio" className="hover:text-gray-600">
                    PORTFOLIO
                </a>
                <a href="/resume" className="relative hover:text-gray-600">
                    RESUME
                    <img
                        src={line2}
                        alt=""
                        className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2"
                    />
                </a>
                <a href="/contact" className="hover:text-gray-600">
                    CONTACT
                </a>
            </nav>

            {/* Mobile fullscreen navbar */}
            <div
                className={`fixed inset-0 bg-white flex flex-col justify-center items-center space-y-10 text-2xl font-lexend_exa transition-all duration-500 ease-in-out ${
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-10 pointer-events-none"
                } md:hidden z-40`}
            >
                <a href="/portfolio" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>
                    PORTFOLIO
                </a>
                <a href="/resume" className="relative hover:text-gray-600" onClick={() => setIsOpen(false)}>
                    RESUME
                    <img
                        src={line2}
                        alt=""
                        className="absolute -bottom-1 left-1/2 w-14 transform -translate-x-1/2"
                    />
                </a>
                <a href="/contact" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>
                    CONTACT
                </a>
            </div>
        </header>
    );
};

export default Header;
