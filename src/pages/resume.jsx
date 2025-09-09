import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const Resume = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center bg-gray-100 px-5 py-20">
                <section className="relative w-full bg-white py-16 px-6">
                    {/* Right-side box */}
                    <div className="absolute top-60 right-5 w-[900px] h-full bg-gray-300 rounded-2xl"></div>

                    {/* Intro text */}
                    <p className="relative z-10 max-w-2xl ml-28 mt-60 text-justify text-lg font-serif leading-relaxed text-black">
                        My name’s Roger Jr. H. Chegyem. I’m a Computer Science professional from Baguio City with
                        experience in web development, data science, and machine learning. Glad you’re here. Feel free
                        to look through my projects and work — always open to learning, building, and collaborating.
                        Cheers!
                    </p>

                    {/* Sidebar box */}
                    <div className="absolute top-[407px] left-[173px] w-[640px] h-[746px] bg-gray-300 rounded-2xl"></div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Resume;
