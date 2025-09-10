import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import resume from "../assets/resume/resume.png";

const Resume = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-5 py-10 pb-10">
                <section className="w-full max-w-7xl bg-white py-16 px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left side */}
                    <div className="space-y-8">
                        {/* Intro text */}
                        <p className="text-justify text-lg font-serif leading-relaxed text-black">
                            My name’s Roger Jr. H. Chegyem. I’m a Computer Science professional from Baguio City
                            with experience in web development, data science, and machine learning. Glad you’re here.
                            Feel free to look through my projects and work — always open to learning, building,
                            and collaborating. Cheers!
                        </p>

                        {/* Small gray box */}
                        <div className="bg-gray-300 rounded-2xl w-full h-80"></div>
                    </div>

                    {/* Right side big box */}
                    <div className="rounded-2xl w-full lg:h-[800px]">
                        <img
                            src={resume}
                            alt="Portrait"
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Resume;
