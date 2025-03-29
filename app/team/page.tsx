import Image from "next/image";
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
    <div className="min-h-screen md:min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <main className="container mx-auto px-2 sm:px-4 pt-24 sm:pt-24 overflow-hidden">
        {/* Top team members grid */}
        <Marquee pauseOnHover className="[--duration:20s] overflow-hidden">
          <div className="grid grid-cols-9 gap-2 sm:gap-4 mb-4 sm:mb-8 p-2 sm:p-4">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className={`col-span-1 rounded-[20px] sm:rounded-[30px] overflow-hidden h-20 sm:h-40 ${
                  index % 2 === 0 ? "-mt-2 sm:-mt-4" : "mt-2 sm:mt-4"
                }`}
              >
                <Image
                  src={`/teampic/tp${index + 1}.png`}
                  alt="Team member"
                  width={250}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>

        {/* Heading */}
        <div className="text-center mb-4 px-2">
          <h1 className="text-3xl sm:text-5xl font-semibold mb-2 sm:mb-4">Meet the team</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-8 font-thin">
            Get to know the minds shaping our GDG community!
          </p>
          <button className="bg-black dark:bg-white text-white dark:text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base">
            Our Team
          </button>
        </div>

        {/* Bottom team members grid */}
        <Marquee reverse={true} pauseOnHover className="[--duration:20s] overflow-hidden">
          <div className="grid grid-cols-9 gap-2 sm:gap-4 mt-8 sm:mt-16">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className={`col-span-1 rounded-[20px] sm:rounded-[30px] overflow-hidden h-20 sm:h-40 ${
                  index % 2 === 0 ? "-mt-2 sm:-mt-4" : "mt-2 sm:mt-4"
                }`}
              >
                <Image
                  src={`/teampic/tp${index + 10}.png`}
                  alt="Team member"
                  width={250}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </main>
      <Mentor />
      <Web />
      <Mac />
      <Design />
      <Cp />
      <Management />
      <Marketing />
      <Social />
    </div>
  );
}
