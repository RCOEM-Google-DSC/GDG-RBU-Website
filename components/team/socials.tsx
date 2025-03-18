import Image from "next/image";

export default function Social() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center lg:text-right lg:pr-8 mb-12 lg:mb-24">
          <h1 className="text-5xl md:text-6xl lg:text-8xl text-black font-bold">Socials Team</h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mt-4">
            Bringing ideas to life with creativity
            <br className="hidden md:block" />
            and precision!
          </p>
        </div>

        {/* Socials Lead */}
        <div className="flex flex-col items-center mb-16">
          <Image
            src="/teampic/social.svg"
            alt="Tanay Pande"
            width={400}
            height={450}
            className="object-cover w-48 md:w-64 lg:w-80"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-black mt-4">Tanay Pande</h1>
          <h2 className="text-xl md:text-2xl text-black">Socials Lead</h2>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto lg:mx-10">
          {/* Team member 1 */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 md:w-40 lg:w-48 h-46 md:h-48 overflow-hidden">
              <Image
                src="/teampic/s1.svg"
                alt="Tanmay Gupta"
                width={200}
                height={250}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Tanmay Gupta</h3>
          </div>

          {/* Team member 2 */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 md:w-40 lg:w-48 h-46 md:h-48 overflow-hidden">
              <Image
                src="/teampic/s4.svg"
                alt="Aniruddha Lahoti"
                width={200}
                height={250}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Aniruddha Lahoti</h3>
          </div>

          {/* Team member 3 */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 md:w-40 lg:w-48 h-46 md:h-48 overflow-hidden">
              <Image
                src="/teampic/s2.svg"
                alt="Siddhi Totala"
                width={200}
                height={250}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Siddhi Totala</h3>
          </div>

          {/* Team member 4 */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 md:w-40 lg:w-48 h-46 md:h-48 overflow-hidden">
              <Image
                src="/teampic/s3.svg"
                alt="Tisha Parmar"
                width={200}
                height={250}
                className="object-cover w-32 md:w-40 lg:w-48"
              />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium mt-2 text-center">Tisha Parmar</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
