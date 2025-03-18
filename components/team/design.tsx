import Image from "next/image"

export default function Design() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile and Desktop layouts with different structures */}
      <div className="flex flex-col md:flex-row md:justify-between mt-8 md:mt-32">
        {/* Title section - full width on mobile, right side on desktop */}
        <div className="w-full text-center md:hidden mb-8">
          <h1 className="text-5xl text-black font-bold">Design Team</h1>
          <p className="text-xl text-gray-700 mt-2">Bringing ideas to life with creativity and precision!</p>
        </div>

        {/* Lead section - top on mobile, left on desktop */}
        <div className="flex flex-col items-center mx-auto md:mx-16 order-1 md:order-1 mb-8 md:mb-0">
          <Image
            src="/teampic/design.svg"
            alt="Team Lead"
            width={400}
            height={450}
            className="object-cover w-64 h-76 md:w-80 md:h-96 lg:w-96 lg:h-[450px]"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-black mt-4">Khushi Sonkusare</h1>
          <h1 className="text-xl md:text-2xl text-black">Design Lead</h1>
        </div>

        {/* Team members section - below lead on mobile, right on desktop */}
        <div className="flex flex-col justify-center order-2 md:order-2 w-full md:w-auto">
          {/* Desktop title - hidden on mobile */}
          <div className="hidden md:block text-right pr-8 mb-24">
            <h1 className="text-6xl lg:text-8xl text-black">Design Team</h1>
            <p className="text-2xl lg:text-3xl text-gray-700">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members - custom layout on mobile */}
          <div className="w-full px-4 md:px-0">
            {/* First row - 2 members on mobile and all 3 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mx-auto md:mx-10">
              {/* Team member 1 */}
              <div className="flex flex-col items-center">
                <div>
                  <Image
                    src="/teampic/d1.svg"
                    alt="Team member"
                    width={200}
                    height={250}
                    className="w-36 h-50 md:w-full md:h-full object-cover"
                  />
                </div>
                <h3 className="text-base md:text-xl font-medium mt-2">Mayuri Barapatre</h3>
              </div>

              {/* Team member 2 */}
              <div className="flex flex-col items-center">
                <div className="overflow-hidden">
                  <Image
                    src="/teampic/d2.svg"
                    alt="Team member"
                    width={200}
                    height={250}
                    className="w-36 h-46 md:w-full md:h-full object-cover"
                  />
                </div>
                <h3 className="text-base md:text-xl font-medium mt-2">Jiya Vij</h3>
              </div>

              {/* Team member 3 - hidden on first row for mobile */}
              <div className="hidden md:flex flex-col items-center">
                <div className="overflow-hidden h-64">
                  <Image
                    src="/teampic/d3.svg"
                    alt="Team member"
                    width={200}
                    height={259}
                    className="w-full h-46 object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mt-2">Amishi Ranjan</h3>
              </div>
            </div>

            {/* Second row - only 3rd member centered on mobile, hidden on desktop */}
            <div className="flex justify-center mt-6 md:hidden">
              <div className="flex flex-col items-center">
                <div className="overflow-hidden">
                  <Image
                    src="/teampic/d3.svg"
                    alt="Team member"
                    width={200}
                    height={250}
                    className="w-36 h-46 object-cover"
                  />
                </div>
                <h3 className="text-base font-medium mt-2">Amishi Ranjan</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

