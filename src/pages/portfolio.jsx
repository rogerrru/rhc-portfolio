import React, {useState} from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import bg1 from "../assets/home/bg-1.svg";
import bg2 from "../assets/home/bg-2.svg";
import bg3 from "../assets/home/bg-3.svg";
import bg4 from "../assets/home/bg-4.svg";
import bg5 from "../assets/home/bg-5.svg";
import bg6 from "../assets/home/bg-6.svg";
import bg7 from "../assets/home/bg-7.svg";

const Portfolio = () => {
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
        {
            img: bg5,
            title: "Esports Service Website",
            desc: "Website for latest articles, rankings and information in competitive gaming. HTML, CSS, Javascript, Web Service APIs. Co-developed with a team.",
        },
        {
            img: bg6,
            title: "Dengue Prevention and Control: A Systematic Review of Contributing Factors, Gaps in Practices, and Strategies for Effective Management and Intervention.",
            desc: "Review of Related Literature on current dengue practices and intervention strategies with the use of technology. Co-written with a team.",
        },
        {
            img: bg7,
            title: "Developing a Machine Learning-Based Forecasting Model and Visualization Tool for Dengue Risk in Baguio City",
            desc: "Developed a machine learning–based forecasting model to predict dengue risk in Baguio City, integrating time-series epidemiological and environmental data. Designed an interactive visualization tool to present risk levels, trends, and insights for public health monitoring and decision-making.",
        },
    ];

    const openImage = (project) => setSelectedImage(project);
    const closeImage = () => setSelectedImage(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-1 bg-white py-10 pb-10">
                {/* Intro Text */}
                <h2 className="font-lexend_exa text-2xl md:text-3xl font-extrabold text-[#383838] text-center max-w-4xl mx-auto px-5 md:px-40 my-10">
                    HERE ARE SOME PROJECTS THAT I’VE WORKED ON. TAKE A LOOK AROUND.
                </h2>


                {/* SOFTWARE Section */}
                <section className="font-lexend_exa mb-20 text-[#383838]">
                    {/* Scrolling text */}
                    <div className="overflow-hidden whitespace-nowrap py-4 relative">
                        <div className="flex animate-marquee">
                          <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                            SOFTWARE SOFTWARE SOFTWARE SOFTWARE SOFTWARE SOFTWARE
                          </span>
                            <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                                SOFTWARE SOFTWARE SOFTWARE SOFTWARE SOFTWARE SOFTWARE
                            </span>
                        </div>
                    </div>

                    {/* Project grid */}
                    <div className="max-w-6xl mx-auto h-full mt-12 px-5">
                        {/* Big top item */}
                        <div
                             className="relative mt-6 h-64 rounded-lg shadow-md cursor-pointer overflow-hidden"
                             onClick={() => openImage(projects[2])}
                        >
                            <img
                                src={projects[2].img}
                                alt="Project preview"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="text-2xl font-bold line-clamp-3">{projects[2].title}</h3>
                                <p className="text-auto md:text-xl mt-2 line-clamp-3">{projects[2].desc}</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* WEBSITE Section */}
                <section className="font-lexend_exa mb-20 text-[#383838]">
                    <div className="overflow-hidden whitespace-nowrap py-4 relative">
                        <div className="flex animate-marquee">
                          <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                            WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE
                          </span>
                                                <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                            WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE
                          </span>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px] mt-12 px-5">
                        {/* Wide item */}
                        <div
                            className="relative mt-6 h-full md:col-span-2 rounded-lg shadow-md cursor-pointer overflow-hidden"
                            onClick={() => openImage(projects[0])}
                        >
                            <img
                                src={projects[0].img}
                                alt="Project preview"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="text-2xl font-bold line-clamp-3">{projects[0].title}</h3>
                                <p className="text-auto md:text-xl mt-2 line-clamp-3">{projects[0].desc}</p>
                            </div>
                        </div>
                        {/* Two stacked items */}
                        <div
                            className="relative mt-6 h-full rounded-lg shadow-md cursor-pointer overflow-hidden"
                            onClick={() => openImage(projects[4])}
                        >
                            <img
                                src={projects[4].img}
                                alt="Project preview"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="text-2xl font-bold line-clamp-3">{projects[4].title}</h3>
                                <p className="text-auto md:text-xl mt-2 line-clamp-3">{projects[4].desc}</p>
                            </div>
                        </div>
                        <div
                            className="relative mt-6 h-full rounded-lg shadow-md cursor-pointer overflow-hidden"
                            onClick={() => openImage(projects[3])}
                        >
                            <img
                                src={projects[3].img}
                                alt="Project preview"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="text-2xl font-bold line-clamp-3">{projects[3].title}</h3>
                                <p className="text-auto md:text-xl mt-2 line-clamp-3">{projects[3].desc}</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* PUBLICATIONS Section */}
                <section className="font-lexend_exa mb-20 text-[#383838]">
                    <div className="overflow-hidden whitespace-nowrap py-4 relative">
                        <div className="flex animate-marquee">
                          <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                            PUBLICATIONS PUBLICATIONS PUBLICATIONS PUBLICATIONS
                          </span>
                                                <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                            PUBLICATIONS PUBLICATIONS PUBLICATIONS PUBLICATIONS
                          </span>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px] mt-12 px-5">
                        {/* Tall item on left */}
                        <div
                            className="relative mt-6 h-full rounded-lg shadow-md md:row-span-2 cursor-pointer overflow-hidden"
                            onClick={() => openImage(projects[5])}
                        >
                            <img
                                src={projects[5].img}
                                alt="Project preview"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="text-2xl font-bold line-clamp-3">{projects[5].title}</h3>
                                <p className="text-auto md:text-xl mt-2 line-clamp-3">{projects[5].desc}</p>
                            </div>
                        </div>
                        {/* Two stacked items on right */}
                        <div
                            className="relative mt-6 h-full rounded-lg shadow-md cursor-pointer overflow-hidden"
                            onClick={() => openImage(projects[6])}
                        >
                            <img
                                src={projects[6].img}
                                alt="Project preview"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="text-2xl font-bold line-clamp-3">{projects[6].title}</h3>
                                <p className="text-auto md:text-xl mt-2 line-clamp-3">
                                    {projects[6].desc}
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative mt-6 h-full rounded-lg shadow-md cursor-pointer overflow-hidden"
                            onClick={() => openImage(projects[1])}
                        >
                            <img
                                src={projects[1].img}
                                alt="Project preview"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="text-2xl font-bold line-clamp-3">{projects[1].title}</h3>
                                <p className="text-auto md:text-xl mt-2 line-clamp-3">{projects[1].desc}</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* MODAL */}
            {selectedImage && (
                <div
                    className="cursor-pointer font-lexend_exa fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
                    onClick={closeImage}
                >
                    <button
                        onClick={closeImage}
                        className="absolute top-6 right-6 bg-white rounded-full px-4 py-2 text-black font-bold shadow-lg hover:bg-gray-200"
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
                            <h3 className="text-2xl font-bold line-clamp-3">{selectedImage.title}</h3>
                            <p className="mt-2">{selectedImage.desc}</p>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default Portfolio;
