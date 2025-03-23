"use client";


import { HeroGeometric } from "@/components/user/shape-landing-hero";


export default function Home() {
  return (
    <div className="flex flex-col bg-black">
     
        <HeroGeometric
          badge="Upcoming event on 29th March"
          title1="Innovate, Code"
          title2="with GDG RBU"
        />
        


     
    </div>
  );
}
