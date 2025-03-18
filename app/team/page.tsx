import Image from "next/image";
import Link from "next/link";
import { Code } from "lucide-react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { Marquee } from "@/components/magicui/marquee";
import Design from "@/components/team/design";
import Web from "@/components/team/web";
import Mentor from "@/components/team/mentor";
import Mac from "@/components/team/mac";
import Cp from "@/components/team/cp";
import Management from "@/components/team/management";
import Marketing from "@/components/team/marketing";
import Social from "@/components/team/socials";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">

      <main className="container mx-auto px-4 py-20">
        {/* Top team members grid */}
        <Marquee
          pauseOnHover
          className="[--duration:20s]"
        >
          <div className="grid grid-cols-9 gap-4 mb-8 p-4">
            {/* First div moved up */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp1.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Second div moved down */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp2.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Other team member divs */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp3.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp4.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp5.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp6.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp7.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp8.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp9.svg"
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
          <div className="grid grid-cols-7 gap-4 mt-16">
            {/* First div moved up */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp10.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Second div moved down */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp11.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Other team member divs */}
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp12.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp13.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp14.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/teampic/tp15.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-[30px] overflow-hidden h-40 -mt-4">
              <Image
                src="/teampic/tp16.svg"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="col-span-1 rounded-[30px] overflow-hidden h-40 mt-4">
              <Image
                src="/lead.png"
                alt="Team member"
                width={250}
                height={300}
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
        </Marquee>
      </main>
<Mentor/>
<Web/>
<Mac />
<Design/>
<Cp/>
<Management/>
<Marketing/>
<Social/>

    </div>



  );
}
