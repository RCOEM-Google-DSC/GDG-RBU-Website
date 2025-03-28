"use client";

import { FC, ReactNode } from "react";
import { HeroGeometric } from "@/components/user/shape-landing-hero";
import About from "./about/about";
import TwoColumnLayout from "./feature/feature";
import FAQSection from "./faq/faq";

interface HomeClientComponentProps {
  headerAuthComponent?: ReactNode;
}

const HomeClientComponent: FC<HomeClientComponentProps> = ({
  headerAuthComponent,
}) => {
  return (
    <div className="flex flex-col bg-black">
      <section className="w-full relative">
        <HeroGeometric
          badge="Upcoming event on 5th April"
          title1="Innovate, Code"
          title2="with GDG RBU"
        />
        <About />
        <TwoColumnLayout />
        <FAQSection />
      </section>
    </div>
  );
};

export default HomeClientComponent;
