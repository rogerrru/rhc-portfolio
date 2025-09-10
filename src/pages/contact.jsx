import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import contact_pic from "../assets/home/rectangle-5.svg"

const Contact = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-5 py-10 pb-20">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left side */}
                    <div className="text-center md:text-right">
                        <h1 className="font-lexend_exa text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            CONTACT ME.
                        </h1>
                        <div className="font-lexend_exa space-y-3 text-xl text-gray-800">
                            <a
                                href="mailto:rhchegyem@gmail.com"
                                className="block hover:underline"
                            >
                                rhchegyem@gmail.com
                            </a>
                            <p>(+63) 976 185 3106</p>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:underline"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:underline"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Right side (placeholder box) */}
                    <div className="bg-gray-300 rounded-xl h-full h-64 md:h-80">
                        <img
                            src={contact_pic}
                            alt="contact picture"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
