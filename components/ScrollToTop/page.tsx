import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[99]">
      {isVisible && (
        <div
        onClick={scrollToTop}
        aria-label="scroll to top"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-[#1E90FF] text-white shadow-md transition duration-300 ease-in-out hover:bg-[#4169E1] hover:shadow-lg border-2 border-[#000000]"
        style={{
          boxShadow: "3px 3px 0 #000000",
        }}
      >
        {/* Tetris block with arrow */}
        <div className="relative w-8 h-8 grid grid-cols-2 grid-rows-2">
          <div className="bg-[#4169E1]"></div>
          <div className="bg-[#4169E1]"></div>
          <div className="bg-[#4169E1]"></div>
          <div className="bg-[#4169E1]"></div>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="mt-[2px] h-3 w-3 rotate-45 border-l-2 border-t-2 border-white"></span>
          </span>
        </div>
      </div>
      
      )}
    </div>
  );
}