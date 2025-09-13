import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="dark:bg-black bg-[#383838] text-white px-12 py-12">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Personal */}
                <div>
                    <h3 className="font-lexend_exa font-black text-lg mb-2">
                        ROGER JR. H. CHEGYEM
                    </h3>
                    <div className="font-lexend_exa font-light">
                        <p>PHILIPPINE-BASED</p>
                        <a
                            href="mailto:rhchegyem@gmail.com"
                            className="block underline mt-2 hover:opacity-80"
                        >
                            rhchegyem@gmail.com
                        </a>
                        <p>(+63) 976 185 3106</p>
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-lexend_exa font-black text-lg mb-2">
                        NAVIGATION
                    </h3>
                    <ul className="font-lexend_exa font-light space-y-1">
                        <li><Link to="/" className="hover:opacity-80">HOME</Link></li>
                        <li><Link to="/portfolio" className="hover:opacity-80">PORTFOLIO</Link></li>
                        <li><Link to="/resume" className="hover:opacity-80">RESUME</Link></li>
                        <li><Link to="/contact" className="hover:opacity-80">CONTACT</Link></li>
                    </ul>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-lexend_exa font-black text-lg mb-2">LINKS</h3>
                    <ul className="font-lexend_exa font-light space-y-1">
                        <li><a href="https://www.linkedin.com/in/roger-chegyem-4737a6369/" className="hover:opacity-80">LINKEDIN</a></li>
                        <li><a href="https://github.com/rogerrru" className="hover:opacity-80">GITHUB</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
