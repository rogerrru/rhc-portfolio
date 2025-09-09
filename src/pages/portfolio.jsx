import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const Portfolio = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-white text-center py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    HERE ARE SOME PROJECTS THAT I’VE WORKED ON. TAKE A LOOK AROUND.
                </h2>

                {/* Example Grid for Projects */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-200 rounded-2xl h-64"></div>
                    <div className="bg-gray-200 rounded-2xl h-64"></div>
                    <div className="bg-gray-200 rounded-2xl h-64"></div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Portfolio;
