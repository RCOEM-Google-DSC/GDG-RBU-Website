import Image from "next/image";

export default function Social() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Mobile heading */}
      <div className="block md:hidden text-center px-4 mt-8 mb-6">
        <h1 className="text-5xl font-thin">Socials Team</h1>
        <p className="text-xl font-thin mt-2">
          Bringing ideas to life with creativity
          <br />
          and precision!
        </p>
      </div>

      {/* Main container */}
      <div className="flex flex-col md:flex-row justify-between items-center md:mt-32 px-4 md:px-0">
        {/* Team Lead */}
        <div className="flex flex-col items-center mx-auto md:mx-16 mb-10 md:mb-0">
          <Image
            src="/teampic/social.svg"
            alt="Tanay Pande"
            width={600}
            height={700}
            className="object-cover w-72 md:w-[500px]"
          />
          <div className="text-center mt-4">
            <h1 className="text-3xl font-thin">Tanay Pande</h1>
            <h2 className="text-xl font-thin mt-1">Socials Lead</h2>
          </div>
        </div>

        {/* Right side content */}
        <div className="flex flex-col justify-center">
          {/* Desktop heading */}
          <div className="hidden md:block text-right pr-8 mb-24">
            <h1 className="text-8xl font-thin">Socials Team</h1>
            <p className="text-3xl font-thin">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mx-2 md:mx-10">
            {[
              { name: "Tanmay Gupta", img: "s1.svg" },
              { name: "Aniruddha Lahoti", img: "s4.svg" },
              { name: "Siddhi Totala", img: "s2.svg" },
              { name: "Tisha Parmar", img: "s3.svg" },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="overflow-hidden">
                  <Image
                    src={`/teampic/${member.img}`}
                    alt={member.name}
                    width={200}
                    height={150}
                    className="object-cover w-32 md:w-auto"
                  />
                </div>
                <h3 className="text-base md:text-xl font-thin mt-2 text-center">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
