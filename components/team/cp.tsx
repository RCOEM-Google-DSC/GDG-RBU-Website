import Image from "next/image";

export default function CPTeam() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Mobile heading */}
      <div className="block md:hidden text-center px-4 mt-8 mb-6">
        <h1 className="text-5xl font-thin">CP Team</h1>
        <p className="text-xl mt-2 font-thin">
          Bringing ideas to life with creativity
          <br />
          and precision!
        </p>
      </div>

      {/* Main container */}
      <div className="flex flex-col md:flex-row justify-between items-center md:mt-32 px-4 md:px-0">
        {/* Team Lead - Enlarged Image */}
        <div className="flex flex-col items-center mx-auto md:mx-16 mb-10 md:mb-0">
          <Image
            src="/teampic/cp.svg"
            alt="Aditya Singh"
            width={300}
            height={350}
            className="object-cover w-48 md:w-70"
          />
          <div className="text-center mt-4">
            <h1 className="text-3xl font-thin">Aditya Singh</h1>
            <h2 className="text-xl mt-1 font-thin">CP Lead</h2>
          </div>
        </div>

        {/* Right side content */}
        <div className="flex flex-col justify-center">
          {/* Desktop heading */}
          <div className="hidden md:block text-right pr-8 mb-24">
            <h1 className="text-8xl font-thin">CP Team</h1>
            <p className="text-3xl font-thin">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members grid aligned to the end */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mx-2 md:mx-10 items-end">
            {[
              { name: "Hariom Nabira", img: "c1.svg" },
              { name: "Adwait Channawar", img: "c4.svg" },
              { name: "Purva Khandelwal", img: "c2.svg" },
              { name: "Aniket Barapatre", img: "c3.svg" },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-end">
                <div className="overflow-hidden">
                  <Image
                    src={`/teampic/${member.img}`}
                    alt={member.name}
                    width={200}
                    height={150}
                    className="object-cover w-32 md:w-auto"
                  />
                </div>
                <h3 className="text-base md:text-xl font-thin mt-2 text-right">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
