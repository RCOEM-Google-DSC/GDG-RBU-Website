import Image from "next/image";

export default function Web() {
  return (
    <div className="min-h-screen bg-white">
  
  

  <div className="flex flex-row justify-between mt-32">
 
    <div className="flex flex-col items-center  mx-16">
      <Image
        src="/teampic/web.svg"
        alt="Team member"
        width={540}
        height={600}
        className="object-cover"
      />
      <h1 className="text-3xl font-bold text-black mt-4">Aakhyan Jeyush</h1>
      <h1 className="text-2xl text-black">Web Lead</h1>
    </div>

    {/* Right side with team members in horizontal layout */}
    <div className="flex flex-col justify-center ">
    <div className="text-right pr-8 mb-24 ">
    <h1 className="text-8xl text-black ">Web Team</h1>
    <p className="text-3xl text-gray-700">
      Bringing ideas to life with creativity<br />and precision!
    </p>
  </div>
      <div className="grid grid-cols-4 gap-7 mx-10">
        {/* Team member 1 */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden" >
            <Image
              src="/teampic/w1.svg"
              alt="Team member"
              width={200}
              height={150}
              className=" object-cover"
            />
          </div>
          <h3 className="text-xl font-medium mt-2">Mayur Kawale</h3>
        </div>
        
        {/* Team member 2 */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden" >
            <Image
              src="/teampic/w2.svg"
              alt="Team member"
              width={200}
              height={150}
              className=" object-cover"
            />
          </div>
          <h3 className="text-xl font-medium mt-2">Ashutosh Pandey</h3>
        </div>
        
        {/* Team member 3 */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden" >
            <Image
              src="/teampic/w3.svg"
              alt="Team member"
              width={180}
              height={190}
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-medium mt-2">Abhay Mishra</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="overflow-hidden" >
            <Image
              src="/teampic/w4.svg"
              alt="Team member"
              width={200}
              height={150}
              className=" object-cover"
            />
          </div>
          <h3 className="text-xl font-medium mt-2">Jay Gupta</h3>
        </div>
      </div>
    </div>
  </div>
  
  
</div>
  );
}