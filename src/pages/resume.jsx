import React, {useState} from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import resume from "../assets/resume/resume.svg";
import certIcon1 from "../assets/icons/ched.svg";
import certIcon2 from "../assets/icons/trendmicro.svg";
import certIcon3 from "../assets/icons/dilg.svg";
import certIcon4 from "../assets/icons/csc.svg";

const certifications = [
    {
        name: "Natural Language Processing Capacity Training Program",
        platform: "CHED-LAKAS",
        icon: certIcon1,
    },
    {
        name: "Cyber Defense Society Conference",
        platform: "TrendMicro",
        icon: certIcon2,
    },
    {
        name: "Secure Learning : Introduction to Career in CyberSecurity",
        platform: "TrendMicro",
        icon: certIcon2,
    },
    {
        name: "Data Privacy Awareness Webinar",
        platform: "Department of the Interior and Local Governance",
        icon: certIcon3,
    },
    {
        name: "Certificate of Eligibility",
        platform: "Civil Service Commission",
        icon: certIcon4,
    },
];

const Resume = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const openImage = (project) => setSelectedImage(project);
    const closeImage = () => setSelectedImage(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-5 py-10 pb-10">
                <section
                    className="justify-center w-full max-w-7xl bg-white md:py-16 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left side */}

                    <div
                        className="flex flex-col h-full rounded-2xl w-full lg:h-[800px] overflow-hidden justify-center items-center">
                        {/* Intro */}
                        <div>
                            <h1 className="font-lexend_exa text-6xl md:text-6xl font-black text-[#383838] mb-4">
                                HEY THERE!
                            </h1>
                            <p className="text-justify text-lg font-serif leading-relaxed text-black mb-10">
                                My name’s Roger Jr. H. Chegyem. I’m a Computer Science
                                professional from Baguio City with experience in web development,
                                data science, and machine learning. Glad you’re here. Feel free
                                to look through my projects and work — always open to learning,
                                building, and collaborating. Cheers!
                            </p>
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-col flex-1 h-full">
                            <h2 className="font-lexend_exa text-3xl font-black text-[#383838] mb-6">
                                CERTIFICATIONS
                            </h2>

                            {/* Scrollable container */}
                            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px]">
                                {certifications.map((cert, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between bg-gray-200 rounded-xl px-5 py-4 shadow-sm flex-shrink-0"
                                    >
                                        {/* Stacked text */}
                                        <div className="flex flex-col">
                                          <span className="font-lexend_exa font-medium text-gray-800">
                                            {cert.name}
                                          </span>
                                            <span className="font-lexend_exa text-sm text-gray-600">
                                            {cert.platform}
                                          </span>
                                        </div>

                                        {/* Icon box */}
                                        <img
                                            src={cert.icon}
                                            alt={`${cert.name} icon`}
                                            className="w-10 h-10 rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right side big box */}
                    <div className="rounded-2xl w-full lg:h-[800px] cursor-pointer flex justify-center items-center"
                         onClick={() => openImage(resume)}
                    >
                        <img
                            src={resume}
                            alt="Portrait"
                            className="max-h-[800px] w-auto object-contain"
                        />
                    </div>
                </section>
            </main>

            {/* MODAL */}
            {selectedImage && (
                <div
                    className="font-lexend_exa fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
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
                            src={resume}
                            alt="resume"
                            className="w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}

            <Footer/>
        </div>
    );
};

export default Resume;
