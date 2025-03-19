import Image from "next/image";

export default function Web() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Mobile heading */}
      <div className="block md:hidden text-center px-4 mt-8 mb-6">
        <h1 className="text-5xl text-white">Web Team</h1>
        <p className="text-xl text-white mt-2">
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
            src="/teampic/web.svg"
            alt="Team member"
            width={700} 
            height={800} 
            className="object-cover w-72 md:w-[500px]" 
          />
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold text-white">Aakhyan Jeyush</h1>
            <h2 className="text-xl text-white mt-1">Web Lead</h2>
          </div>
        </div>

        {/* Right side content */}
        <div className="flex flex-col justify-center">
          {/* Desktop heading */}
          <div className="hidden md:block text-right pr-8 mb-24">
            <h1 className="text-8xl text-white">Web Team</h1>
            <p className="text-3xl text-white">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mx-2 md:mx-10">
            {[
              { name: "Mayur Kawale", img: "w1.svg" },
              { name: "Ashutosh Pandey", img: "w2.svg" },
              { name: "Abhay Mishra", img: "w3.svg" },
              { name: "Jay Gupta", img: "w4.svg" },
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
                <h3 className="text-base md:text-xl font-medium mt-2 text-center text-white">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
