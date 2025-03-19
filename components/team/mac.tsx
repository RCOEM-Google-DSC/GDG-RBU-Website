import Image from "next/image";

export default function Mac() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Mobile heading - visible only on mobile */}
      <div className="block md:hidden text-center px-4 mt-8 mb-6">
        <h1 className="text-5xl">MAC Team</h1>
        <p className="text-xl mt-2">
          Bringing ideas to life with creativity
          <br />
          and precision!
        </p>
      </div>

      {/* Main container - different layouts for mobile and desktop */}
      <div className="flex flex-col md:flex-row justify-between md:mt-32 px-4 md:px-0">
        {/* Team Lead - full width on mobile, right side on desktop */}
        <div className="flex flex-col items-center mx-auto md:mx-16 mb-10 md:mb-0 md:order-2">
          <Image
            src="/teampic/mac.svg"
            alt="Team Lead"
            width={460} // Increased size
            height={510}
            className="object-cover w-72 md:w-auto"
          />
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold">Aarsh Gangulwar</h1>
            <h2 className="text-2xl">MAC Lead</h2>
          </div>
        </div>

        {/* Left side content - full width on mobile */}
        <div className="flex flex-col justify-center md:order-1">
          {/* Desktop heading - hidden on mobile, visible on desktop */}
          <div className="hidden md:block text-left pl-8 mb-24">
            <h1 className="text-8xl">MAC Team</h1>
            <p className="text-3xl">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mx-2 md:mx-10">
            {[
              { name: "Annalhq Shaikh", img: "m1.svg" },
              { name: "Bhuvnesh Verma", img: "m2.svg" },
              { name: "Harsh Pashine", img: "m3.svg" },
              { name: "Shantanu Anantwar", img: "m4.svg" },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={`/teampic/${member.img}`}
                  alt={member.name}
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
                <h3 className="text-base md:text-xl font-medium mt-2 text-center">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}