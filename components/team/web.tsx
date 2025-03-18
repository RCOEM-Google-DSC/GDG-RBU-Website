import Image from "next/image"

export default function Web() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile heading - visible only on mobile */}
      <div className="block md:hidden text-center px-4 mt-8 mb-6">
        <h1 className="text-5xl text-black">Web Team</h1>
        <p className="text-xl text-gray-700 mt-2">
          Bringing ideas to life with creativity
          <br />
          and precision!
        </p>
      </div>

      {/* Main container - different layouts for mobile and desktop */}
      <div className="flex flex-col md:flex-row justify-between md:mt-32 px-4 md:px-0">
        {/* Team Lead - full width on mobile, left side on desktop */}
        <div className="flex flex-col items-center mx-auto md:mx-16 mb-10 md:mb-0">
          <Image
            src="/teampic/web.svg"
            alt="Team member"
            width={540}
            height={600}
            className="object-cover w-64 md:w-auto"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-black mt-4">Aakhyan Jeyush</h1>
          <h1 className="text-xl md:text-2xl text-black">Web Lead</h1>
        </div>

        {/* Right side content - full width on mobile */}
        <div className="flex flex-col justify-center">
          {/* Desktop heading - hidden on mobile, visible on desktop */}
          <div className="hidden md:block text-right pr-8 mb-24">
            <h1 className="text-8xl text-black">Web Team</h1>
            <p className="text-3xl text-gray-700">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mx-2 md:mx-10">
            {/* Team member 1 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/w1.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Mayur Kawale</h3>
            </div>

            {/* Team member 2 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/w2.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Ashutosh Pandey</h3>
            </div>

            {/* Team member 3 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/w3.svg"
                  alt="Team member"
                  width={180}
                  height={190}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Abhay Mishra</h3>
            </div>

            {/* Team member 4 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/w4.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Jay Gupta</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

