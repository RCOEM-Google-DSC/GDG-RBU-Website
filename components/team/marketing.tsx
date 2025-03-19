import Image from "next/image";

export default function Marketing() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Flex row layout on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 mt-8 lg:mt-32">
          {/* Title and team members section */}
          <div className="flex flex-col justify-center w-full lg:w-auto order-last">
            {/* Title section */}
            <div className="text-center lg:text-right lg:pr-8 mb-12 lg:mb-24">
              <h1 className="text-5xl md:text-6xl lg:text-8xl text-black font-bold">Marketing Team</h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mt-4">
                Bringing ideas to life with creativity
                <br className="hidden md:block" />
                and precision!
              </p>
            </div>

            {/* Marketing Lead */}
            <div className="flex flex-col items-center mb-16">
              <Image
                src="/teampic/market.svg"
                alt="Dixita Hawelikar"
                width={400}
                height={450}
                className="object-cover w-48 md:w-64 lg:w-80"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-black mt-4">Dixita Hawelikar</h1>
              <h2 className="text-xl md:text-2xl text-black">Marketing Lead</h2>
            </div>

            {/* Team members grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mx-auto lg:mx-10">
              {/* Team member 1 */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 md:w-40 lg:w-48 h-46 md:h-48 overflow-hidden">
                  <Image
                    src="/teampic/ma1.svg"
                    alt="Pratyush Bhatt"
                    width={200}
                    height={250}
                    className="object-cover w-32 md:w-40 lg:w-48"
                  />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Pratyush Bhatt</h3>
              </div>

              {/* Team member 2 */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 md:w-40 lg:w-48 h-46 md:h-48 overflow-hidden">
                  <Image
                    src="/teampic/mg2.svg"
                    alt="Jiya Pandita"
                    width={200}
                    height={250}
                    className="object-cover w-32 md:w-40 lg:w-48"
                  />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Jiya Pandita</h3>
              </div>

              {/* Team member 3 - centered on mobile */}
              <div className="flex flex-col items-center col-span-2 lg:col-span-1 mt-8 lg:mt-0">
                 <div className="flex flex-col items-center">
                                  <div className="overflow-hidden">
                                    <Image
                                      src="/teampic/mg3.svg"
                                      alt="Rahul Dixit"
                                      width={200}
                                      height={250}
                                      className="object-cover w-32 md:w-40 lg:w-48"
                                    />
                                  </div>
                                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Rahul Dixit</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
