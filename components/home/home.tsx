"use client";


import { HeroGeometric } from "@/components/user/shape-landing-hero";


export default function Home() {
  return (
    <div className="flex flex-col bg-black">
     
        <HeroGeometric
          badge="Upcoming event on 5th April 2025"
          title1="Innovate, Code"
          title2="with GDG RBU"
        />
        


     
    </div>
  );
}
