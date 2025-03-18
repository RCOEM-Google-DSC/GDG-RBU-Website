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
  const cardContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Check screen size on mount and when window resizes
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

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

    // On mobile, we might want to show cards expanded initially
    if (window.innerWidth < 768) {
      // Auto-expand after a short delay on mobile
      const timer = setTimeout(() => {
        setExpanded(true);
        setScrolled(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Initial check to set correct state on page load
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const getCardStyle = (index) => {
    const image = cards[index]?.image || "";
    const baseStyle = {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: isMobile ? "85%" : isTablet ? "160px" : "180px",
      height: isMobile ? "180px" : isTablet ? "230px" : "250px",
      transition: "all 0.7s ease-in-out",
    };

    // For mobile: position is not absolute, cards are in normal flow
    if (isMobile) {
      return {
        ...baseStyle,
        position: expanded ? "static" : "absolute",
        marginBottom: expanded ? "16px" : "0",
        borderRadius: "16px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        transform: !expanded ? `translateX(calc(-50% + ${index * 10}px)) translateY(-60%) rotate(${index * 2 - 5}deg)` : "none",
        top: !expanded ? "60%" : "auto",
        left: !expanded ? "50%" : "auto",
        zIndex: !expanded ? cards.length - index : "auto",
      };
    }

    // Tablet and Desktop: keep absolute positioning
    baseStyle.position = "absolute";
    
    if (!expanded) {
      // Initial stacked position - moved higher
      const horizontalOffset = index * (isTablet ? 10 : 15);
      return {
        ...baseStyle,
        top: "60%",
        left: "50%",
        transform: `translateX(calc(-50% + ${horizontalOffset}px)) translateY(-60%) rotate(${index * 2 - 5}deg)`,
        zIndex: cards.length - index,
      };
    } else {
      // Responsive positioning for expanded state
      let baseStartX, horizontalSpread, verticalStartY, verticalSpread;

      if (isTablet) {
        // Tablet layout - 2x3 grid
        baseStartX = index % 2 === 0 ? 30 : 70;
        horizontalSpread = 0;
        verticalStartY = 20 + Math.floor(index / 2) * 25;
        verticalSpread = 0;
      } else {
        // Desktop layout - horizontal spread with vertical stagger
        baseStartX = 11;
        horizontalSpread = 15;
        verticalStartY = 35;
        verticalSpread = 15;
      }

      // Calculate the positions
      const baseX = baseStartX + (index * horizontalSpread);
      const baseY = verticalStartY + (index * verticalSpread);

      return {
        ...baseStyle,
        top: `${baseY}%`,
        left: `${baseX}%`,
        transform: "translate(-50%, -50%) rotate(0deg)",
        zIndex: cards.length - index,
      };
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-[120vh] pt-16 px-4 bg-white dark:bg-gray-900 dark:text-white transition-all duration-500">
        <h1
          className={`text-4xl md:text-5xl font-bold text-center mt-3 mb-2 transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          Our Domains
        </h1>

        <div className="max-w-6xl mx-auto relative">
          {/* Our Domains text positioned differently based on screen size */}
          <div
            className={`absolute transition-all duration-500 ease-in-out ${
              scrolled ? "opacity-100" : "opacity-0"
            } ${
              isMobile
                ? "top-2 left-0 text-center w-full"
                : isTablet
                ? "top-24 right-4 text-right"
                : "top-32 -right-8 md:-right-16 lg:-right-48 text-right"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Domains</h2>
            <p className={`text-base md:text-lg ${isMobile ? "mx-auto max-w-xs" : "max-w-xs ml-auto"}`}>
              Be part of the innovation—grow, build, and inspire with GDG!
            </p>
          </div>

          <div
            ref={cardContainerRef}
            className={`mx-auto -mt-6 md:-mt-10 ${isMobile && expanded ? "flex flex-col items-center" : "relative flex justify-center items-center"}`}
            style={{ 
              height: isMobile && expanded ? "auto" : isMobile ? "70vh" : isTablet ? "60vh" : "550px",
              minHeight: isMobile && expanded ? "auto" : isMobile ? "400px" : "50vh",
              paddingBottom: isMobile && expanded ? "40px" : "0"
            }}
          >
            {isMobile && expanded ? (
              // For mobile expanded: simple column layout
              cards.map((card, index) => (
                <div
                  key={card.id}
                  className="rounded-2xl shadow-xl mb-6 w-11/12"
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "180px",
                  }}
                >
                  <div className="h-full flex flex-col justify-end">
                    <div className="w-full bg-black bg-opacity-50 text-white p-3 text-center rounded-b-2xl">
                      <h3 className="font-medium text-xl">{card.title}</h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // For desktop or non-expanded state: original layout
              <div className="relative w-full h-full">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`${!isMobile ? "absolute" : ""} rounded-2xl shadow-xl`}
                    style={getCardStyle(index)}
                  >
                    {isTablet && expanded && (
                      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2 text-center rounded-b-2xl">
                        {card.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Bottom left text - responsive positioning */}
            <div
              className={`absolute transition-all duration-500 ease-in-out ${
                scrolled ? "opacity-100" : "opacity-0"
              } ${
                isMobile
                  ? "bottom-4 left-0 text-center w-full px-4"
                  : isTablet
                  ? "bottom-8 left-4 max-w-sm"
                  : "-bottom-32 -left-8 md:-left-16 lg:-left-48 max-w-md"
              }`}
            >
              <p className="text-base md:text-lg">
                Be part of the innovation—grow, build, and inspire with GDG! Be
                part of the innovation—grow, build, and inspire with GDG!
              </p>
            </div>
          </div>

          {/* Description text - responsive */}
          <div
            className={`mx-auto mb-10 -mt-2 text-center space-y-2 transition-all duration-500 ease-in-out ${
              scrolled || expanded
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            } ${isMobile ? "max-w-xs" : isTablet ? "max-w-xl" : "max-w-3xl"}`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">
              Whether you're into{" "}
              <span className="text-red-500">management</span>,{" "}
              <span className="text-green-500">tech</span>, or{" "}
              <span className="text-blue-500">design</span>, GDG has something
              for you!
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-500 dark:text-gray-400">
              Be part of the innovation—grow, build, and inspire with GDG!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableCardStack;
