import Image from "next/image"

export default function Mac() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile heading - visible only on mobile */}
      <div className="block md:hidden text-center px-4 mt-8 mb-6">
        <h1 className="text-5xl text-black">MAC Team</h1>
        <p className="text-xl text-gray-700 mt-2">
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
            alt="Team member"
            width={400}
            height={450}
            className="object-cover w-64 md:w-auto"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-black mt-4">Aarsh Gangulwar</h1>
          <h1 className="text-xl md:text-2xl text-black">MAC Lead</h1>
        </div>

        {/* Left side content - full width on mobile */}
        <div className="flex flex-col justify-center md:order-1">
          {/* Desktop heading - hidden on mobile, visible on desktop */}
          <div className="hidden md:block text-left pl-8 mb-24">
            <h1 className="text-8xl text-black">MAC Team</h1>
            <p className="text-3xl text-gray-700">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mx-2 md:mx-10">
            {/* Team member 1 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/m1.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Annalhq Shaikh</h3>
            </div>

            {/* Team member 2 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/m2.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Bhuvnesh Verma</h3>
            </div>

            {/* Team member 3 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/m3.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Harsh Pashine</h3>
            </div>

            {/* Team member 4 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/m4.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className="object-cover w-32 md:w-auto"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Shantanu Anantwar</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

