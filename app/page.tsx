import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Image from "next/image";
import Link from "next/link";
import { FC } from 'react';
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";

// Define the component as a TypeScript functional component
const Home: FC = async () => {
  if (!hasEnvVars) {
    return (
      <div className="flex flex-col gap-16 items-center">
        <h1 className="text-3xl text-center">Environment variables missing</h1>
        <p className="text-center">
          Please make sure to add the required environment variables to your
          project.
        </p>
      </div>
    );
  }

  return (
    <main className="container ">
      {/* Navigation bar */}
      <nav className="flex items-center justify-between mb-8  w-[76rem] ">
        <img src="/gdgico.svg" alt="GDG Logo" className="w-16 h-16 mr-28" />
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-black hover:text-gray-700">Home</Link>
          <Link href="/events" className="text-black hover:text-gray-700">Events</Link>
          <Link href="/team" className="text-black hover:text-gray-700">Team</Link>
          <Link href="/alumni" className="text-black hover:text-gray-700">Alumni</Link>
          <Link href="/contact" className="text-black hover:text-gray-700">Contact</Link>
          </div>
          <div className="w-12 h-6 rounded-full flex justify-between ">
            <ThemeSwitcher />
          
          
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
      </nav>

      {/* Main content */}
      
      {/* Domain name heading */}
      <h1 className="text-7xl font-bold text-center mb-16">rbu.gdgoc.one</h1>

      {/* Cards display - improved positioning */}
      <div className="relative h-80 mb-20">
        {/* Tags - adjusted positioning */}
        <div className="absolute -top-4 left-72 -rotate-6 z-50 bg-green-500 text-white px-3 py-1 rounded-full">
          @explore
        </div>
        <div className="absolute -top-6 right-80 rotate-3 z-50 bg-blue-500 text-white px-3 py-1 rounded-full">
          @webwiz
        </div>

        {/* Card stack with improved position and rotation */}
        <div className="relative w-[50rem] ml-60 h-full">
          {/* Each card positioned to match the fan effect in the image */}
          <div className="absolute -left-40 top-12 transform rotate-1 origin-bottom-right z-50">
            <Image 
              src="/genai.svg"
              alt="GenAI Study Jams" 
              width={280} 
              height={380} 
              className="rounded-2xl"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <div className="absolute left-4 top-6 transform rotate-1 origin-bottom-right z-50">
            <Image 
              src="/orentiation.svg" 
              alt="Orientation" 
              width={280} 
              height={380} 
              className="rounded-2xl"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <div className="absolute left-48 top-2 transform rotate-2.5 origin-bottom-right z-50">
            <Image 
              src="/spiderevent.svg" 
              alt="Spidercry" 
              width={280} 
              height={380} 
              className="rounded-2xl"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <div className="absolute left-96 top-4 transform rotate-[2deg] origin-bottom-right z-50">
            <Image 
              src="/rec.svg" 
              alt="RecruitMe" 
              width={280} 
              height={380} 
              className="rounded-2xl"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <div className="absolute -right-16 top-9 transform rotate-3 origin-bottom-right z-50">
            <Image 
              src="/webwiz.svg" 
              alt="Team Up" 
              width={280} 
              height={380} 
              className="rounded-2xl"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <div className="absolute -right-60 top-16 transform rotate-3 origin-bottom-right z-50">
            <Image 
              src="/bkp.svg" 
              alt="Bappa Ka Prashad" 
              width={280} 
              height={380} 
              className="rounded-2xl"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        </div>

        {/* Description text */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xl">
            Google Developer Groups are community groups for college and
            university students interested in Google developer technologies.
          </p>
        </div>

        {/* Join Us button */}
        <div className="text-center mb-16">
          <button className="bg-gray-800 text-white px-10 py-3 rounded-full hover:bg-gray-700 transition-colors">
            Join Us
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;