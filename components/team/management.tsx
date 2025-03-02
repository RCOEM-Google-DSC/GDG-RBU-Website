import Image from "next/image";

export default function Management() {
  return (
    <div className="min-h-screen bg-white">
  
  

  <div className="flex flex-row justify-between mt-32">
 
    <div className="flex flex-col items-center rounded-none mx-16">
      <Image
        src="/teampic/management.svg"
        alt="Team member"
        width={400}
        height={450}
        className="object-cover"
      />
      <h1 className="text-3xl font-bold text-black mt-4">Varad Bodke</h1>
      <h1 className="text-2xl text-black">Management Lead</h1>
    </div>

    {/* Right side with team members in horizontal layout */}
    <div className="flex flex-col justify-center ">
    <div className="text-right pr-8 mb-24 ">
    <h1 className="text-8xl text-black ">Management Team</h1>
    <p className="text-3xl text-gray-700">
      Bringing ideas to life with creativity<br />and precision!
    </p>
  </div>
      <div className="grid grid-cols-3 gap-8 mx-10">
        {/* Team member 1 */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden" >
            <Image
              src="/teampic/mg1.svg"
              alt="Team member"
              width={200}
              height={250}
              className=" object-cover"
            />
          </div>
          <h3 className="text-xl font-medium mt-2">Netal Rathi </h3>
        </div>
        
        {/* Team member 2 */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden" >
            <Image
              src="/teampic/ma2.svg"
              alt="Team member"
              width={200}
              height={250}
              className=" object-cover"
            />
          </div>
          <h3 className="text-xl font-medium mt-2">Aditya Ralhan</h3>
        </div>
        
        {/* Team member 3 */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden" >
            <Image
              src="/teampic/ma3.svg"
              alt="Team member"
              width={200}
              height={250}
              className=" object-cover"
            />
          </div>
          <h3 className="text-xl font-medium mt-2">Devyani Kheche</h3>
        </div>
      </div>
    </div>
  </div>
  
  
</div>
  );
}