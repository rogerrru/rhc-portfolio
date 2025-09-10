import React from "react";
import { useParams, Link } from "react-router-dom";
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


const ProjectDetails = () => {
    const { id } = useParams();
    const project = projectsData.find((p) => p.id === id);
    const imageMap = {
        "/rhc-portfolio/assets/home/bg-1.svg": bg1,
        "/rhc-portfolio/assets/home/bg-2.svg": bg2,
        "/rhc-portfolio/assets/home/bg-3.svg": bg3,
        "/rhc-portfolio/assets/home/bg-4.svg": bg4,
        "/rhc-portfolio/assets/home/bg-5.svg": bg5,
        "/rhc-portfolio/assets/home/bg-6.svg": bg6,
        "/rhc-portfolio/assets/home/bg-7.svg": bg7,
    };


    if (!project) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Project not found</h2>
                        <Link to="/portfolio" className="text-blue-500 underline mt-4 block">
                            ← Back to Portfolio
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-white py-10">
                <div className="font-lexend_exa max-w-4xl mx-auto px-6">
                    {/* Back Button */}
                    <Link
                        to="/portfolio"
                        className="text-gray-600 hover:underline mb-6 inline-block"
                    >
                        ← Back to Portfolio
                    </Link>

                    {/* Title & About */}
                    <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                    <img
                        src={imageMap[project.img] || project.img}
                        alt={project.title}
                        className="w-full h-72 object-cover rounded-lg shadow mb-6"
                    />
                    <p className="text-lg text-gray-700 mb-8">{project.about}</p>

                    {/* What We Did */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">What We Did</h2>
                        <p className="text-gray-600">{project.whatWeDid}</p>
                    </section>

                    {/* Takeaways */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Takeaways</h2>
                        <ul className="list-disc ml-6 text-gray-600 space-y-2">
                            {project.takeaways.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Quick Info */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Quick Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                            <p>
                                <span className="font-semibold">Team:</span>{" "}
                                {project.quickInfo.team}
                            </p>
                            <p>
                                <span className="font-semibold">Duration:</span>{" "}
                                {project.quickInfo.duration}
                            </p>
                            <p>
                                <span className="font-semibold">Category:</span>{" "}
                                {project.quickInfo.category}
                            </p>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Skills | Focus</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 border border-gray-400 rounded-full text-sm"
                                >
                  {skill}
                </span>
                            ))}
                        </div>
                    </section>

                    {/* Highlights */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Highlights</h2>
                        <ul className="list-disc ml-6 text-gray-600 space-y-2">
                            {project.highlights.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default ProjectDetails;
