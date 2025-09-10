import React, {useState} from "react";
import {Link} from "react-router-dom";
import projectsData from "../data/projects.json";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import bg1 from "../assets/home/bg-1.svg";
import bg2 from "../assets/home/bg-2.svg";
import bg3 from "../assets/home/bg-3.svg";
import bg4 from "../assets/home/bg-4.svg";
import bg5 from "../assets/home/bg-5.svg";
import bg6 from "../assets/home/bg-6.svg";
import bg7 from "../assets/home/bg-7.svg";
import BackToTop from "../components/backToTop.jsx";

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Fixed category order
    const categoryOrder = ["SOFTWARE", "WEBSITE", "PUBLICATIONS"];

    // Group projects by category
    let groupedProjects = projectsData.reduce((acc, project) => {
        const category = project.quickInfo.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(project);
        return acc;
    }, {});

    const imageMap = {
        "bg-1.svg": bg1,
        "bg-2.svg": bg2,
        "bg-3.svg": bg3,
        "bg-4.svg": bg4,
        "bg-5.svg": bg5,
        "bg-6.svg": bg6,
        "bg-7.svg": bg7,
    };

    // Replace JSON img field with imported image
    const projectsWithImages = projectsData.map((project) => ({
        ...project,
        img: imageMap[project.img.split("/").pop()],
    }));

    groupedProjects = projectsWithImages.reduce((acc, project) => {
        const category = project.quickInfo.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(project);
        return acc;
    }, {});


    return (
        <div className="flex flex-col min-h-screen">
        <Header/>
            <main className="flex-1 bg-white py-10">
                <h2 className="font-lexend_exa text-2xl md:text-3xl font-extrabold text-[#383838] text-center max-w-4xl mx-auto px-5 md:px-40 my-10">
                    HERE ARE SOME PROJECTS THAT I’VE WORKED ON. TAKE A LOOK AROUND.
                </h2>

                {categoryOrder.map(
                    (category) =>
                        groupedProjects[category] && (
                            <section
                                key={category}
                                className="font-lexend_exa mb-20 text-[#383838]"
                            >
                                {/* Marquee title */}
                                <div className="overflow-hidden whitespace-nowrap py-4 relative">
                                    <div className="flex animate-marquee">
                                      <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                                        {category} {category} {category} {category} {category} {category}
                                      </span>
                                                                <span className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
                                        {category} {category} {category} {category} {category} {category}
                                      </span>
                                    </div>
                                </div>

                                {/* Category-specific layouts */}
                                {category === "SOFTWARE" && (
                                    <div className="max-w-6xl mx-auto h-full mt-12 px-5">
                                        {groupedProjects[category].map((project) => (
                                            <div
                                                key={project.id}
                                                className="relative mt-6 h-64 rounded-lg shadow-md cursor-pointer overflow-hidden"
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                                    <h3 className="text-2xl font-bold line-clamp-3">
                                                        {project.title}
                                                    </h3>
                                                    <p className="md:text-xl mt-2 line-clamp-3">
                                                        {project.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {category === "WEBSITE" && (
                                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px] mt-12 px-5">
                                        {groupedProjects[category].map((project, idx) => (
                                            <div
                                                key={project.id}
                                                className={`relative mt-6 h-full rounded-lg shadow-md cursor-pointer overflow-hidden ${
                                                    idx === 0 ? "md:col-span-2" : ""
                                                }`}
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                                    <h3 className="text-2xl font-bold line-clamp-3">
                                                        {project.title}
                                                    </h3>
                                                    <p className="md:text-xl mt-2 line-clamp-3">
                                                        {project.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {category === "PUBLICATIONS" && (
                                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px] mt-12 px-5">
                                        {groupedProjects[category].map((project, idx) => (
                                            <div
                                                key={project.id}
                                                className={`relative mt-6 h-full rounded-lg shadow-md cursor-pointer overflow-hidden ${
                                                    idx === 0 ? "md:row-span-2" : ""
                                                }`}
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                                                    <h3 className="text-2xl font-bold line-clamp-3">
                                                        {project.title}
                                                    </h3>
                                                    <p className="md:text-xl mt-2 line-clamp-3">
                                                        {project.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )
                )}
            </main>

            {/* MODAL */}
        {selectedProject && (
            <div
                className=" font-lexend_exa fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
                onClick={() => setSelectedProject(null)}
            >
                <button
                    onClick={() => setSelectedProject(null)}
                    className="cursor-pointer absolute top-6 right-6 bg-white rounded-full px-4 py-2 text-black font-bold shadow-lg hover:bg-gray-200"
                >
                    ✕
                </button>
                <div
                    className="relative max-w-4xl w-full p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={selectedProject.img}
                        alt={selectedProject.title}
                        className="w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                    />
                    <div className="mt-4 text-center text-white">
                        <h3 className="text-2xl font-bold line-clamp-3">{selectedProject.title}</h3>
                        <p className="mt-2">{selectedProject.desc}</p>
                        <Link
                            to={`/portfolio/${selectedProject.id}`}
                            className="inline-block mt-4 px-6 py-2 bg-[#425570] text-white rounded-full shadow hover:bg-[#3D4D67] transition"
                        >
                            View Details →
                        </Link>
                    </div>
                </div>
            </div>
        )}
        <Footer/>
            <BackToTop />
    </div>
    );
};

export default Portfolio;
