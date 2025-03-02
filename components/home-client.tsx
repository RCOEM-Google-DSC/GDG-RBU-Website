"use client";


import Image from "next/image";
import Link from "next/link";
import {
  FC,
  useEffect,
  useRef,
  useState,
  ReactNode,
  CSSProperties,
} from "react";

interface HomeClientComponentProps {
  headerAuthComponent: ReactNode;
}

const HomeClientComponent: FC<HomeClientComponentProps> = ({
  headerAuthComponent,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Calculate animation values based on scroll position
  const maxScroll = 500; // Adjust this value to control when animation completes
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Client-side only code
  useEffect(() => {
    // Prevent scrolling until animation completes
    const preventScroll = (e: Event) => {
      if (!animationComplete) {
        window.scrollTo(0, 0);
      }
    };

    const handleScroll = () => {
      // Only update scrollY if animation is complete or we're in the initial animation phase
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      // Set animation as complete when reaching the threshold
      if (currentScroll >= maxScroll && !animationComplete) {
        setAnimationComplete(true);
      }
    };

    // Handle manual scroll inputs during locked period
    const handleWheel = (e: WheelEvent) => {
      if (!animationComplete) {
        // Accumulate scroll progress artificially
        setScrollY((prev) => {
          const newScroll = Math.max(
            0,
            Math.min(prev + e.deltaY * 0.5, maxScroll)
          );

          // Check if animation should complete
          if (newScroll >= maxScroll) {
            setAnimationComplete(true);
          }

          return newScroll;
        });

        // Prevent actual scrolling
        e.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener("scroll", preventScroll, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Set initial scroll position to top
    window.scrollTo(0, 0);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("scroll", preventScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [animationComplete, maxScroll]);

  // Card positioning calculations
  const getCardStyle = (index: number, totalCards: number) => {
    // Initial state: only the last card (Bappa Ka Prashad) is visible
    // Final state: all cards are in fan layout

    // Base positions for the fan layout (final positions)
    const positions = [
      { left: "-120px", top: "40px", rotate: "-6deg" }, // GenAI
      { left: "80px", top: "18px", rotate: "-3deg" }, // Orientation
      { left: "250px", top: "12px", rotate: "-2deg" }, // Spidercry
      { left: "420px", top: "18px", rotate: "0deg" }, // RecruitMe
      { left: "580px", top: "28px", rotate: "6deg" }, // Team Up
      { left: "720px", top: "44px", rotate: "12deg" }, // Bappa Ka Prashad
    ];

    // Initial positions (all cards stacked at the position of the last card)
    const initialLeft = "calc(50% - 140px)";
    // Center position
    const initialTop = "54px";
    const initialRotate = "2deg"; // No rotation

    // Interpolate between initial and final positions based on scroll progress
    const left =
      scrollProgress < 0.1 && index !== totalCards - 1
        ? initialLeft
        : `calc(${initialLeft} + (${positions[index].left} - ${initialLeft}) * ${(scrollProgress - 0.1) * 1.25})`;

    const top =
      scrollProgress < 0.1 && index !== totalCards - 1
        ? initialTop
        : `calc(${initialTop} + (${positions[index].top} - ${initialTop}) * ${(scrollProgress - 0.1) * 1.25})`;

    const rotate =
      scrollProgress < 0.1 && index !== totalCards - 1
        ? initialRotate
        : `${parseFloat(positions[index].rotate) * scrollProgress}`;

    // Opacity based on scroll (only the last card is visible initially)
    const opacity =
      index === totalCards - 1
        ? 1
        : scrollProgress < 0.1
          ? 0
          : Math.min((scrollProgress - 0.1) * 5, 1);

    const zIndex = index + 1;

    return {
      left,
      top,
      transformOrigin: "center", // Added this line
      transform: `rotate(${rotate}) scale(1)`, // Modified this line
      opacity,
      zIndex,
      boxSizing: "border-box" as CSSProperties["boxSizing"], // Added this line
      transition: "opacity 0.3s ease-out",
    };
  };

  // Tag animation styles
  const getTagStyle = (isExplore: boolean) => {
    const initialOpacity = 0;
    const finalOpacity = 1;

    const initialLeft = isExplore ? "300px" : "300px";
    const finalLeft = isExplore ? "300px" : "720px";

    const initialTop = "-20px";
    const finalTop = isExplore ? "-20px" : "-28px";

    const initialRotate = "0deg";
    const finalRotate = isExplore ? "-12deg" : "-6deg";

    // Only show tags after cards start spreading
    const tagOpacity =
      scrollProgress < 0.3
        ? initialOpacity
        : initialOpacity +
          (finalOpacity - initialOpacity) * ((scrollProgress - 0.3) * 2);

    const tagLeft =
      scrollProgress < 0.3
        ? initialLeft
        : `calc(${initialLeft} + (${finalLeft} - ${initialLeft}) * ${(scrollProgress - 0.3) * 2})`;

    const tagTop =
      scrollProgress < 0.3
        ? initialTop
        : `calc(${initialTop} + (${finalTop} - ${initialTop}) * ${(scrollProgress - 0.3) * 2})`;

    const tagRotate =
      scrollProgress < 0.3
        ? initialRotate
        : `${parseFloat(finalRotate) * ((scrollProgress - 0.3) * 2)}`;

    return {
      opacity: tagOpacity,
      left: tagLeft,
      top: tagTop,
      transform: `rotate(${tagRotate})`,
      transition: "opacity 0.3s ease-out",
    };
  };

  // Image paths in order of appearance
  const cardImages = [
    "/genai.svg", // GenAI Study Jams
    "/orentiation.svg", // Orientation
    "/spiderevent.svg", // Spidercry
    "/rec.svg", // RecruitMe
    "/webwiz.svg", // Team Up
    "/bkp.svg", // Bappa Ka Prashad
  ];

  const cardAlts = [
    "GenAI Study Jams",
    "Orientation",
    "Spidercry",
    "RecruitMe",
    "Team Up",
    "Bappa Ka Prashad",
  ];

  // Function to handle "Explore" button click
  const handleExplore = () => {
    // Mark animation as complete and allow scrolling
    setAnimationComplete(true);

    // Programmatically scroll to content section
    if (pageRef.current) {
      const offset = window.innerHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={pageRef}
      className={`${!animationComplete ? "h-screen overflow-hidden" : ""}`}
    >
      <main className="container">
        {/* Navigation bar */}
        <nav className="flex items-center justify-between mb-8 w-[76rem] mr-28 ml-28 ">
          <img
            src="/gdgico.svg"
            alt="GDG Logo"
            className="w-16 h-16 "
          />

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-black hover:text-gray-700"
            >
              <span className="underline underline-offset-4">Home</span>
            </Link>
            <Link
              href="/events"
              className="text-black hover:text-gray-700"
            >
              Events
            </Link>
            <Link
              href="/blogs"
              className="text-black hover:text-gray-700"
            >
              Blogs
            </Link>
            <Link
              href="/team"
              className="text-black hover:text-gray-700"
            >
              Team
            </Link>
            <Link
              href="/alumni"
              className="text-black hover:text-gray-700"
            >
              Alumni
            </Link>
            <Link
              href="/contact"
              className="text-black hover:text-gray-700"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center  ">{headerAuthComponent}
            
          </div>
        </nav>

        {/* Domain name heading */}
        <h1 className="text-7xl font-bold text-center mb-16">rbu.gdgoc.one</h1>

        {/* Cards display with animation */}
        <div className="relative h-80 mb-20">
          {/* Tags - with animation */}
          <div
            className="absolute -top-4 left-72 -rotate-6 z-50 bg-green-500 text-white px-3 py-1 rounded-full"
            style={getTagStyle(true)}
          >
            @explore
          </div>
          <div
            className="absolute -top-4 left-72 -rotate-6z-50 bg-blue-500 text-white px-3 py-1 rounded-full"
            style={getTagStyle(false)}
          >
            @webwiz
          </div>

          {/* Card stack with position animation */}
          <div className="relative  ml-60 h-full">
            {/* Each card positioned with animation */}
            {cardImages.map((src, index) => (
              <div
                key={src}
                className="absolute origin-bottom-right"
                style={getCardStyle(index, cardImages.length)} // Corrected spacing
              >
                <Image
                  src={src}
                  alt={cardAlts[index]}
                  width={280} // Updated from 280
                  height={380} // Updated from 380
                  className="rounded-2xl"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
            ))}
          </div>

          {/* Description text with fade-in effect */}
          <div
            className="text-center max-w-3xl mx-auto mb-12"
            style={{
              opacity: Math.min(scrollProgress * 2, 1),
              transform: `translateY(${20 - scrollProgress * 20}px)`,
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <p className="text-xl">
              Google Developer Groups are community groups for college and
              university students interested in Google developer technologies.
            </p>
          </div>

          {/* Join Us button with fade-in effect */}
          <div
            className="text-center mb-16"
            style={{
              opacity: Math.min((scrollProgress - 0.3) * 2, 1),
              transform: `translateY(${30 - scrollProgress * 30}px)`,
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <button
              className="bg-gray-800 text-white px-10 py-3 rounded-full hover:bg-gray-700 transition-colors"
              onClick={handleExplore}
            >
              Join Us
            </button>
          </div>
        </div>

        {/* Indicator to show animation is complete */}
        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={{
            opacity: animationComplete
              ? 0
              : Math.min((scrollProgress - 0.8) * 5, 1),
            transition: "opacity 0.3s ease-out",
          }}
        ></div>
      </main>

      {/* Content that appears after animation */}
    </div>
  );
};

export default HomeClientComponent;
