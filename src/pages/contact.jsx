import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import contact_pic from "../assets/home/rectangle-5.svg"

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-5 py-20 pb-45">
                <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
                    {/* Text Column */}
                    <div className="text-center md:text-right">
                        <h1 className="font-lexend_exa text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            CONTACT ME.
                        </h1>
                        <div className="font-lexend_exa space-y-3 text-xl text-gray-800">
                            <a href="mailto:rhchegyem@gmail.com" className="block hover:underline">
                                rhchegyem@gmail.com
                            </a>
                            <p>(+63) 976 185 3106</p>
                            <a
                                href="https://www.linkedin.com/in/roger-chegyem-4737a6369/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:underline"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/rogerrru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:underline"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="bg-gray-300 rounded-xl overflow-hidden w-full max-h-[500px]">
                        <img
                            src={contact_pic}
                            alt="contact picture"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
