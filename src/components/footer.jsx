import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Links Section */}
                <div>
                    <h2 className="text-lg font-bold mb-4">LINKS</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn</a></li>
                        <li><a href="https://github.com" target="_blank" className="hover:underline">GitHub</a></li>
                    </ul>
                </div>

                {/* Navigation Section */}
                <div>
                    <h2 className="text-lg font-bold mb-4">NAVIGATION</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/portfolio" className="hover:underline">Portfolio</a></li>
                        <li><a href="/resume" className="hover:underline">Resume</a></li>
                        <li><a href="/contact" className="hover:underline">Contacts</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h2 className="text-lg font-bold mb-4">ROGER JR. H. CHEGYEM</h2>
                    <p className="text-sm">Philippine-Based</p>
                    <p className="text-sm">rhchegyem@gmail.com</p>
                    <p className="text-sm">(+63) 976 185 3106</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
