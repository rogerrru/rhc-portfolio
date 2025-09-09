import React from "react";

import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const Home = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <Header />
            <main className="w-full bg-white">
                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-gray-800 text-center">
                        HELLO!
                    </h1>
                    <div className="mt-12 max-w-3xl text-center">
                        <h2 className="text-2xl md:text-3xl font-black text-gray-800">
                            ASPIRING COMPUTER SCIENCE PROFESSIONAL
                        </h2>
                        <p className="mt-6 text-lg md:text-xl font-serif leading-relaxed text-gray-700 text-justify">
                            Hi there, I’m Roger Chegyem, a Computer Science enthusiast with a
                            solid foundation in academic learning and hands-on experience from
                            projects and commissions. I’m passionate about learning new things,
                            building solutions, and growing both personally and professionally.
                            Take a look around, and feel free to reach out — I’d love to
                            collaborate!
                        </p>

                        {/* Resume Button */}
                        <button className="mt-8 px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition">
                            RESUME
                        </button>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="relative py-20 px-6 md:px-16 bg-white">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-12">
                        PROJECTS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Intro text card */}
                        <div className="bg-gray-200 rounded-2xl p-8">
                            <p className="text-lg font-serif text-gray-900 text-justify">
                                For me, technology is about turning ideas into practical
                                solutions. With each project, I aim to build tools that are
                                functional, intuitive, and impactful — driven by curiosity,
                                collaboration, and continuous learning.
                            </p>

                            <button className="mt-6 px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition">
                                PORTFOLIO
                            </button>
                        </div>

                        {/* Placeholder project cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-gray-200 rounded-2xl h-64"></div>
                            <div className="bg-gray-200 rounded-2xl h-64"></div>
                            <div className="bg-gray-200 rounded-2xl h-64"></div>
                            <div className="bg-gray-200 rounded-2xl h-64"></div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
