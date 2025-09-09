import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const Contact = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center bg-gray-100 px-5 py-20">
                <div className="bg-white shadow-md rounded-lg p-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">CONTACT ME.</h1>
                    <div className="space-y-4 text-lg">
                        <a
                            href="mailto:rhchegyem@gmail.com"
                            className="block text-blue-600 hover:underline"
                        >
                            rhchegyem@gmail.com
                        </a>
                        <p>(+63) 976 185 3106</p>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:underline"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
