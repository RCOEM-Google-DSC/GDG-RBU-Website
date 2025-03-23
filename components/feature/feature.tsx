'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

const TwoColumnLayout: React.FC = () => {
  return (
    <>
      {/* Text Section */}
      <div className="flex flex-col-reverse md:flex-row justify-center mx-5 md:mx-10 px-4 py-10 gap-10 items-center">
        <div className="md:w-1/2 flex flex-col text-center md:text-left">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight flex justify-center">
            Our Events
          </h1>
          <p className="text-base md:text-lg text-gray-400 flex text-center ">
            At GDG on Campus RBU, we organize workshops, hackathons, and tech talks to help students learn and grow in tech. Our events foster collaboration, innovation, and hands-on experience with cutting-edge technologies. 🚀
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center px-4">
        <Image
          src="/event.png"
          alt="Events"
          width={1200}
          height={400}
          className="w-[90%] sm:w-full max-w-7xl h-auto"
        />
      </div>

      {/* Button Section */}
      <div className="flex items-center justify-center mt-2 mb-10">
        <a href="/events" className="inline-block">
          <button 
            className="bg-gradient-to-r from-red-600 via-blue-600 to-yellow-500 text-white px-10 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Explore More
          </button>
        </a>
      </div>
    </>
  );
};

export default TwoColumnLayout;
