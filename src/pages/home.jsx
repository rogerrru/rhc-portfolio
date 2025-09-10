import React, {useState} from "react";
import rectangle1 from "../assets/home/rectangle-1.svg";
import {Link} from "react-router-dom";
import bg1 from "../assets/home/bg-1.svg";
import bg2 from "../assets/home/bg-2.svg";
import bg3 from "../assets/home/bg-3.svg";
import bg4 from "../assets/home/bg-4.svg";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const projects = [
        {
            img: bg1,
            title: "Scan&Scrub",
            desc: "Encyclopedia website for Operating Room procedures and instruments. ReactJS, Tailwind CSS. Co-developed with a team.",
        },
        {
            img: bg2,
            title: "PSC 2023: [Ice-AI]",
            desc: "Concept for Generative AI Plugin for IDEs. Conceptual Framework for the plugin. Conceptualized with a team.",
        },
        {
            img: bg3,
            title: "WORDY Game Project",
            desc: "A word puzzle software. Java, Python. Co-developed with a team",
        },
        {
            img: bg4,
            title: "Events Management System Website",
            desc: "Website for event management. NodeJS, PugJS, PHP, HTML, CSS, JavaScript, MySQL, WampServer. Co-developed with a team",
        },
    ];

    const openImage = (project) => setSelectedImage(project);
    const closeImage = () => setSelectedImage(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-1 items-center justify-center px-5 py-10 pb-10">
                <section className="max-w-7xl mx-auto px-12 py-16"><h2
                    className="text-center text-3xl md:text-6xl font-lexend_exa font-black mb-10"> HELLO! </h2>
                    <div className="grid md:grid-cols-2 md:gap-12 items-center"> {/* Left image */}
                        <img src={rectangle1}
                             alt="Portrait"
                             className="w-full max-w-sm rounded-lg shadow-md mx-auto mb-4 md:mb-0"/> {/* Right text */}
                        <div><h3 className="text-center md:text-right text-lg md:text-xl font-lexend_exa font-black mb-4"> ASPIRING COMPUTER SCIENCE
                            PROFESSIONAL </h3> <p
                            className="font-lancelot text-xl text-gray-700 mb-6 leading-relaxed text-justify"> Hi there,
                            I&apos;m Roger Chegyem, a Computer Science enthusiast with a solid foundation in academic
                            learning and hands-on experience from projects and commissions. I&apos;m passionate about
                            learning new things, building solutions, and growing both personally and professionally.
                            Take a look around, and feel free to reach out — I&apos;d love to collaborate! </p>
                            <Link
                                to="/resume"
                                className="font-lexend_exa inline-block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition"> RESUME </Link>
                        </div>
                    </div>
                    <hr className="mt-16 border-t border-gray-300"/>
                </section>
                {/* PROJECTS */}
                <section className="max-w-7xl mx-auto px-12 py-16">
                    <h2 className="text-4xl font-lexend_exa font-black mb-8">
                        PROJECTS
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left side */}
                        <div>
                            <p className="font-lancelot text-xl text-gray-700 mb-6 leading-relaxed text-justify">
                                For me, technology is about turning ideas into practical
                                solutions. With each project, I aim to build tools that are
                                functional, intuitive, and impactful — driven by curiosity,
                                collaboration, and continuous learning.
                            </p>
                            <Link
                                to="/portfolio"
                                className="font-lexend_exa inline-block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition"
                            >
                                PORTFOLIO
                            </Link>

                            {/* Large Project */}
                            <div
                                className="relative mt-6 h-125 rounded-lg shadow-md cursor-pointer overflow-hidden"
                                onClick={() => openImage(projects[0])}
                            >
                                <img
                                    src={projects[0].img}
                                    alt="Project preview"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div
                                    className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                    <h3 className="text-2xl font-bold">{projects[0].title}</h3>
                                    <p className="text-sm mt-2">{projects[0].desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right side grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-[300px]">
                            {projects.slice(1).map((project, index) => (
                                <div
                                    key={index}
                                    className={`font-lexend_exa relative rounded-lg shadow-md cursor-pointer overflow-hidden 
        ${index === 0 ? "row-span-2" : "row-span-1"}`}
                                    onClick={() => openImage(project)}
                                >
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-2 text-center">
                                        <h3 className="text-lg font-bold">{project.title}</h3>
                                        <p className="text-xs mt-1">{project.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            </main>

            {/* MODAL */}
            {selectedImage && (
                <div
                    className=" font-lexend_exa fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
                    onClick={closeImage}
                >
                    <button
                        onClick={closeImage}
                        className="cursor-pointer absolute top-6 right-6 bg-white rounded-full px-4 py-2 text-black font-bold shadow-lg hover:bg-gray-200"
                    >
                        ✕
                    </button>
                    <div
                        className="relative max-w-4xl w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.img}
                            alt={selectedImage.title}
                            className="w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                        />
                        <div className="mt-4 text-center text-white">
                            <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                            <p className="mt-2">{selectedImage.desc}</p>
                        </div>
                    </div>
                </div>
            )}

            <Footer/>
        </div>
    );
};
