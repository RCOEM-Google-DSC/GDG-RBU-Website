import Image from "next/image";
import Link from "next/link";
import { Code } from "lucide-react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { Marquee } from "@/components/magicui/marquee";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between mb-4 w-[76rem] mr-28 ml-28">
          <img
            src="/gdgico.svg"
            alt="GDG Logo"
            className="w-16 h-16"
          />
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-black hover:text-gray-700"
            >
              Home
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
              <span className="underline underline-offset-4">Team</span>
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
          <div className="flex items-center">
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Top team members grid */}
        <Marquee
          pauseOnHover
          className="[--duration:20s]"
        >
          <div className="grid grid-cols-8 gap-4 mb-8 p-4">
            {/* First div moved up */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Second div moved down */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Other team member divs */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Marquee>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold mb-4">Meet the team</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get to know the minds shaping our GDG community!
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium">
            Our Team
          </button>
        </div>

        {/* Bottom team members grid */}
        <Marquee
          reverse={true}
          pauseOnHover
          className="[--duration:20s]"
        >
          <div className="grid grid-cols-8 gap-4 mt-16">
            {/* First div moved up */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Second div moved down */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Other team member divs */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Marquee>
      </main>
    </div>
  );
}
