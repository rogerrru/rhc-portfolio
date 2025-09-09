import React from "react";

const Header = () => {
    return (
        <header className="w-full h-20 bg-white shadow flex items-center justify-between px-8">
            {/* Logo / Name */}
            <a href="/portfolio" className="text-2xl font-['Lexend_Exa'] hover:text-gray-600">
                <h1 className="text-2xl font-bold font-['Krona_One']">RHC Jr.</h1>
            </a>


            {/* Navigation */}
            <nav className="flex space-x-8">
                <a href="/portfolio" className="text-sm font-['Lexend_Exa'] hover:text-gray-600">PORTFOLIO</a>
                <a href="/resume" className="text-sm font-['Lexend_Exa'] hover:text-gray-600">RESUME</a>
                <a href="/contact" className="text-sm font-['Lexend_Exa'] hover:text-gray-600">CONTACT</a>
            </nav>
        </header>
    );
};

export default Header;
