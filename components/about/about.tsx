"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


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
  return (
    <>

    <div className="bg-black text-white min-h-screen flex flex-col lg:flex-row items-center py-8 lg:py-16">
      <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Image div - order-2 on mobile, normal order on desktop */}
        <div className="w-full lg:w-1/2 order-2 lg:order-none mb-8 lg:mb-0 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <Image 
              src="/teampic.png" 
              width={550} 
              height={400} 
              alt="Team picture"
              className="rounded-2xl border"
            />
          </div>
        </div>
        
        {/* Content div - order-1 on mobile, normal order on desktop */}
        <div className="w-full lg:w-1/2 order-1 lg:order-none mb-8 lg:mb-0">
          {isLive && (
            <div className="mb-4 lg:mb-8">
              <span className="inline-block bg-black border border-white/30 text-white px-4 py-1 rounded-full text-sm">
                We're live!
              </span>
            </div>
          )}
          
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
              {headline}
            </h1>
            
            <p className="text-base md:text-lg text-gray-400 mb-8 lg:mb-10 leading-relaxed">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="inline-block bg-white text-black px-6 py-3 rounded text-center hover:bg-gray-200 transition duration-200">
                <span className="flex items-center justify-center">
                  {callLabel}
                  <span className="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;