"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Circle } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface BusinessHeroProps {
  headline?: string;
  subheadline?: string;
  callLabel?: string;
  signupLabel?: string;
  isLive?: boolean;
}

const About: React.FC<BusinessHeroProps> = ({
  headline = "Meet The Team",
  subheadline = "We are the Google Developer Group (GDG) on Campus at RBU, a passionate community of developers, tech enthusiasts, and innovators. Our goal is to foster learning, collaboration, and hands-on experience in various Google technologies and beyond. Through workshops, hackathons, and networking events, we empower students to grow their skills, connect with industry experts, and build impactful projects. Join us to be part of an exciting journey in tech! 🚀",
  callLabel = "Join To Explore",
  isLive = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b bg-black text-black min-h-screen flex flex-col items-center py-12 lg:py-20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container px-5 md:px-8 flex flex-col lg:flex-row items-center justify-between border rounded-3xl py-12 lg:py-16 backdrop-blur-sm shadow-2xl max-w-7xl mx-auto"
      >
        {/* Content div */}
        <motion.div className="w-full lg:w-1/2 mb-10 lg:mb-0 px-4 lg:px-8">
          {isLive && (
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-black border border-white/80 text-white px-4 py-1.5 rounded-full text-md font-medium shadow-lg">
                <Circle className="h-2.5 w-2.5 fill-rose-500 animate-pulse" />
                We're live!
              </span>
            </motion.div>
          )}

          <div className="max-w-xl">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 lg:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-100/80 dark:to-slate-400/80"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-400 mb-8 lg:mb-10 leading-relaxed"
            >
              {subheadline}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/sign-up"
                className="group bg-gradient-to-r from-red-600 via-blue-600 to-yellow-500 text-white px-10 py-3.5 rounded-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-3 focus:ring-white/30"
              >
                <span className="flex items-center justify-center">
                  {callLabel}
                  <span className="ml-2 transform transition-transform group-hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Image div */}
        <motion.div
          variants={imageVariants}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-lg overflow-hidden rounded-3xl shadow-2xl">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/teampic.png"
                width={600}
                height={450}
                alt="Team picture"
                className="rounded-3xl hover:brightness-105 transition-all duration-300"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
