import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleScroll = () => {
        setIsVisible(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        setIsClicked(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => setIsClicked(false), 300);
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 dark:bg-white bg-[#000000] text-white p-6 rounded-full shadow-lg z-50 transition-all duration-300 
      ${isVisible ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-75"} 
      ${isClicked ? "scale-90" : "hover:scale-110"} cursor-pointer`}
            aria-label="Back to Top"
            style={{ position: "fixed" }}
        >
            <ArrowUp className="text-white dark:text-black w-6 h-6" />
        </button>
    );
};

export default BackToTop;
