import Image from "next/image";

export default function Marketing() {
  return (
    <div className="min-h-screen bg-white">

      <div className="flex flex-row justify-between mt-32">

        {/* Left side with "Design Team" text aligned to left */}
        <div className="flex flex-col justify-center">
          <div className="text-left pl-8 mb-24">
            <h1 className="text-8xl text-black">Marketing Team</h1>
            <p className="text-3xl text-gray-700">
              Bringing ideas to life with creativity<br />and precision!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 mx-10">
            {/* Team member 1 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/ma1.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className=" object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mt-2">Pratyush Bhatt</h3>
            </div>

            {/* Team member 2 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/mg2.svg"
                  alt="Team member"
                  width={210}
                  height={160}
                  className=" object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mt-2">Jiya Pandita</h3>
            </div>

            {/* Team member 3 */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <Image
                  src="/teampic/mg3.svg"
                  alt="Team member"
                  width={200}
                  height={150}
                  className=" object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mt-2">Rahul Dixit</h3>
            </div>
            
          </div>
        </div>

        {/* Right side with lead image */}
        <div className="flex flex-col items-center rounded-none mx-16">
          <Image
            src="/teampic/market.svg"
            alt="Team member"
            width={400}
            height={450}
            className="object-cover"
          />
          <h1 className="text-3xl font-bold text-black mt-4">Dixita Hawelikar</h1>
          <h1 className="text-2xl text-black">Marketing Lead</h1>
        </div>

      </div>
    </div>
  );
}
