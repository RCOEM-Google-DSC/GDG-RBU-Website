"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

import Floating, { FloatingElement } from "@/components/user/parallax-floating";
import { MarqueeDemo } from "./marquee";

const exampleImages = [
  {
    url: "/bkp.png",
    author: "explore",
    link: "",
    title: "explore",
  },
  {
    url: "/gen.png",
    link: "",
    title: "webwiz",
    author: "webzi",
  },
  {
    url: "/orentiation.png",
    link: "",
    author: "gdg",
    title: "gdg",
  },
  {
    url: "/recuritment.png",
    link: "",
    author: "gdg",
    title: "gdg",
  },
  {
    url: "/spidercraft.png",
    link: "",
    author: "gdg",
    title: "gdg",
  },
  {
    url: "/webwiz.png",
    link: "",
    author: "gdg",
    title: "gdg",
  },
  {
    url: "/event1.svg",
    link: "",
    author: "gdg",
    title: "gdg",
  },
  {
    url: "/event3.png",
    link: "",
    author: "gdg",
    title: "gdg",
  },
];

const Preview = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, []);

  return (
    <>
    
    <MarqueeDemo/>
    <div
      className="flex w-full h-screen relative justify-center items-center bg-black overflow-hidden"
      ref={scope}
    >
       
      <motion.div
        className="text-center space-y-4 items-center flex flex-col z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
          Our Events
        </p>
        <a href="/events" className="inline-block">
  <button 
    className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-10 py-3 rounded-full hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95 font-thin focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 shadow-lg"
    onClick={() => window.location.href = "/events"}
  >
    Explore More
  </button>
</a>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="absolute top-[5%] sm:top-[6%] md:top-[7%] lg:top-[8%] left-[5%] sm:left-[8%] md:left-[10%] lg:left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            className="hidden w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="absolute top-[24%] sm:top-[9%] md:top-[10%] lg:top-[10%] left-[20%] sm:left-[28%] md:left-[30%] lg:left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="absolute top-[28%] sm:top-[1.5%] md:top-[2%] lg:top-[2%] left-[45%] sm:left-[48%] md:left-[50%] lg:left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            className="w-28 h-28 sm:w-28 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="absolute top-[35%] sm:top-[2%] md:top-[1%] lg:top-[0%] left-[80%] sm:left-[75%] md:left-[80%] lg:left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>

        {/* Middle and bottom row elements */}
        <FloatingElement depth={1} className="absolute top-[35%] sm:top-[37%] md:top-[38%] lg:top-[40%] left-[8%] sm:left-[2.5%] md:left-[2%] lg:left-[14%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[4].url}
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="absolute top-[60%] sm:top-[65%] md:top-[68%] lg:top-[50%] left-[65%] sm:left-[70%] md:left-[75%] lg:left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[7].url}
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="absolute top-[65%] sm:top-[68%] md:top-[70%] lg:top-[73%] left-[10%] sm:left-[12%] md:left-[14%] lg:left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            className="w-28 sm:w-36 md:w-44 lg:w-56 h-full object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="absolute top-[75%] sm:top-[77%] md:top-[78%] lg:top-[70%] left-[40%] sm:left-[43%] md:left-[47%] lg:left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
          />
        </FloatingElement>
      </Floating>
    </div>
    </>
  );
  
};

export { Preview };