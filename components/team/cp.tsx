import Image from "next/image"

export default function CPTeam() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Title and tagline section */}
        <div className="text-center md:text-left md:pl-8 mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-8xl text-black font-bold">CP Team</h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mt-4">
            Bringing ideas to life with creativity
            <br className="hidden md:block" />
            and precision!
          </p>
        </div>

        {/* Team lead section - now below the title */}
        <div className="flex flex-col items-center mb-16">
          <Image
            src="/teampic/cp.svg"
            alt="Aditya Singh"
            width={400}
            height={450}
            className="object-cover w-48 md:w-64 lg:w-80"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-black mt-4">Aditya Singh</h1>
          <h2 className="text-xl md:text-2xl text-black">CP Lead</h2>
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mx-auto w-full">
          {/* Team member 1 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden">
              <Image
                src="/teampic/c1.svg"
                alt="Hariom Nabira"
                width={200}
                height={180}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Hariom Nabira</h3>
          </div>

          {/* Team member 2 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden">
              <Image
                src="/teampic/c4.svg"
                alt="Adwait Channawar"
                width={200}
                height={150}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Adwait Channawar</h3>
          </div>

          {/* Team member 3 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden">
              <Image
                src="/teampic/c2.svg"
                alt="Purva Khandelwal"
                width={200}
                height={150}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Purva Khandelwal</h3>
          </div>

          {/* Team member 4 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden">
              <Image
                src="/teampic/c3.svg"
                alt="Aniket Barapatre"
                width={200}
                height={150}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Aniket Barapatre</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

