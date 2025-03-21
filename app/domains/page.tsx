"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

const ExpandableCardStack = () => {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Socials",
      image: "/socialcard.png",
    },
    {
      id: 2,
      title: "Management",
      image: "/managmentcard.png",
    },
    {
      id: 3,
      title: "Web",
      image: "/wedcard.png",
    },
    {
      id: 4,
      title: "Design",
      image: "/designcards.jpeg",
    },
    {
      id: 5,
      title: "MAC",
      image: "/MACcard.png",
    },
    {
      id: 6,
      title: "CP",
      image: "/cpcard.png",
    },
  ];

  useEffect(() => {
    // Function to check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check on mount
    checkMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (cardContainerRef.current instanceof HTMLDivElement) {
        const rect = cardContainerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        // Lower the scroll threshold to make animation trigger more easily
        if (isVisible && window.scrollY > 50) {
          setScrolled(true);
          setExpanded(true);
        } else if (window.scrollY < 20) {
          setScrolled(false);
          setExpanded(false);
        }
      }
    };

    // Initial check to set correct state on page load
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardStyle = (index: number): React.CSSProperties => {
    const image = cards[index]?.image || "";
    const baseStyle: React.CSSProperties = {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: isMobile ? "140px" : "180px",
      height: isMobile ? "200px" : "250px",
      position: "absolute" as "absolute", // Explicitly cast `position`
      transition: "all 0.7s ease-in-out",
    };

    if (!expanded) {
      // Initial stacked position - moved higher
      const horizontalOffset = isMobile ? index * 10 : index * 15;
      return {
        ...baseStyle,
        top: isMobile ? "60%" : "60%",
        left: "50%",
        transform: `translateX(calc(-50% + ${horizontalOffset}px)) translateY(-60%) rotate(${index * 2 - 5}deg)`,
        zIndex: cards.length - index,
      };
    } else {
      // ADJUSTED EXPANDED CARD POSITION FOR RESPONSIVE DESIGN
      
      // For mobile layout - vertical stacking with less horizontal spread
      if (isMobile) {
        // Calculate positions for a more vertical layout on mobile
        const rowCount = Math.ceil(cards.length / 2); // Two cards per row
        const row = Math.floor(index / 2);
        const col = index % 2;
        
        // Horizontal positioning (2 cards per row)
        const horizontalSpread = 45; // Percentage spread between columns
        const baseStartX = 25; // First column starts at 25% from left
        const baseX = baseStartX + col * horizontalSpread;
        
        // Vertical positioning (rows) - moved up slightly
        const verticalStartY = 15; // First row starts higher (was 20%)
        const verticalSpread = 24; // Space between rows
        const baseY = verticalStartY + row * verticalSpread;
        
        return {
          ...baseStyle,
          top: `${baseY}%`,
          left: `${baseX}%`,
          transform: "translate(-50%, -50%) rotate(0deg)",
          zIndex: cards.length - index,
        };
      } else {
        // Desktop layout - more horizontal spread
        const baseStartX = 11; // Controls the starting point from the left
        const horizontalSpread = 15; // Horizontal spacing between cards
        const baseX = baseStartX + index * horizontalSpread;
        
        const verticalStartY = 35; // Controls how far from the top cards start
        const verticalSpread = 15; // Vertical spacing
        const baseY = verticalStartY + index * verticalSpread;
        
        return {
          ...baseStyle,
          top: `${baseY}%`,
          left: `${baseX}%`,
          transform: "translate(-50%, -50%) rotate(0deg)",
          zIndex: cards.length - index,
        };
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="min-h-[100vh] pt-2 px-4 bg-white dark:bg-black dark:text-white transition-all duration-500">
        <h1
          className={`text-4xl md:text-5xl font-thin text-center -mt-3  transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          Our Domains
        </h1>

        <div className="max-w-6xl mx-auto relative">
          {/* Our Domains text - REPOSITIONED for desktop and mobile */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              scrolled ? "opacity-100" : "opacity-0"
            } ${
              isMobile 
                ? "absolute bottom-0 left-0 w-full text-center" 
                : "absolute top-32 right-4 md:-right-4 text-right"
            }`}
          >
            <h2 className="text-3xl md:text-4xl mb-2 font-thin">Our Domains</h2>
            <p className="text-base md:text-lg max-w-full md:max-w-xs font-thin">
              Be part of the innovation—grow, build, and inspire with GDG!
            </p>
          </div>

          {/* Card container with adjusted height */}
          <div
            ref={cardContainerRef}
            className="relative flex justify-center items-center h-[400px] md:h-[550px] mx-auto -mt-6 md:-mt-10"
            style={{ minHeight: isMobile ? "60vh" : "50vh" }}
          >
            <div className="relative w-full h-full">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="absolute rounded-2xl shadow-xl"
                  style={getCardStyle(index)}
                ></div>
              ))}
            </div>
            
            {/* Bottom text - now only shown on desktop */}
            {!isMobile && (
              <div
                className={`absolute -bottom-10 left-4 md:-left-4 max-w-full md:max-w-md transition-all duration-500 ease-in-out ${
                  scrolled ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-base md:text-lg font-thin">
                  Be part of the innovation—grow, build, and inspire with GDG! Be
                  part of the innovation—grow, build, and inspire with GDG!
                </p>
              </div>
            )}
          </div>

          {/* Description text with responsive font sizes */}
          <div
            className={`max-w-3xl mx-auto mb-10 lg:-mt-12 sm:-mt-2 text-center space-y-2 transition-all duration-500 ease-in-out ${
              scrolled || expanded
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-thin">
              Whether you're into{" "}
              <span className="text-red-500 font-thin"> management</span>,{" "}
              <span className="text-green-500 font-thin">tech</span>, or{" "}
              <span className="text-blue-500 font-thin">design</span>, GDG has
              something for you!
            </h2>
            <p className="text-xl md:text-3xl text-gray-500 dark:text-gray-400 font-thin">
              Be part of the innovation—grow, build, and inspire with GDG!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableCardStack;