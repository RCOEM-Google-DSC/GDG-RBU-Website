// import Image from "next/image";

// export default function Management() {
//   return (
//     <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-10 sm:py-16">
//       {/* Mobile heading */}
//       <div className="block md:hidden text-center px-4 mt-8 mb-6">
//         <h1 className="text-5xl text-white">Management Team</h1>
//         <p className="text-xl text-white mt-2">
//           Bringing ideas to life with creativity
//           <br />
//           and precision!
//         </p>
//       </div>

//       {/* Main container */}
//       <div className="flex flex-col md:flex-row justify-between items-center md:mt-32 px-4 md:px-0">
//         {/* Team Lead - Larger Image */}
//         <div className="flex flex-col items-center mx-auto md:mx-16 mb-10 md:mb-0">
//           <Image
//             src="/teampic/management.svg"
//             alt="Varad Bodke"
//             width={600} // Enlarged width
//             height={700} // Enlarged height
//             className="object-cover w-72 md:w-[500px]"
//           />
//           <div className="text-center mt-4">
//             <h1 className="text-3xl font-bold text-white">Varad Bodke</h1>
//             <h2 className="text-xl text-white mt-1">Management Lead</h2>
//           </div>
//         </div>

//         {/* Right side content */}
//         <div className="flex flex-col justify-center">
//           {/* Desktop heading */}
//           <div className="hidden md:block text-right pr-8 mb-24">
//             <h1 className="text-8xl text-white">Management Team</h1>
//             <p className="text-3xl text-white">
//               Bringing ideas to life with creativity
//               <br />
//               and precision!
//             </p>
//           </div>

//           {/* Team members grid aligned to the end */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 mx-2 md:mx-10 items-end">
//             {[
//               { name: "Netal Rathi", img: "mg1.svg" },
//               { name: "Aditya Ralhan", img: "ma2.svg" },
//               { name: "Devyani Kheche", img: "ma3.svg" },
//             ].map((member, index) => (
//               <div key={index} className="flex flex-col items-end">
//                 <div className="overflow-hidden">
//                   <Image
//                     src={`/teampic/${member.img}`}
//                     alt={member.name}
//                     width={200}
//                     height={250}
//                     className="object-cover w-20 md:w-auto"
//                   />
//                 </div>
//                 <h3 className="text-base md:text-xl font-medium mt-2 text-right text-white">{member.name}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";

export default function Mac() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile heading - visible only on mobile */}
      <div className="block md:hidden text-center px-4 mt-8 mb-6">
        <h1 className="text-5xl">Management Team</h1>
        <p className="text-xl mt-2">
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
            src="/teampic/management.svg"
            alt="Team Lead"
            width={460} // Increased size
            height={600}
            className="object-cover w-72 md:w-[500px] mx-4"
          />
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold">Varad Bodke</h1>
            <h2 className="text-2xl">Management Lead</h2>
          </div>
        </div>

        {/* Left side content - full width on mobile */}
        <div className="flex flex-col justify-center md:order-1">
          {/* Desktop heading - hidden on mobile, visible on desktop */}
          <div className="hidden md:block text-left pl-8 mb-24">
            <h1 className="text-8xl">Management Team</h1>
            <p className="text-3xl">
              Bringing ideas to life with creativity
              <br />
              and precision!
            </p>
          </div>

          {/* Team members grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mx-2 md:mx-10">
            {/* Team member 1 */}
            <div className="flex flex-col items-center">
              <Image
                src="/teampic/mg1.svg"
                alt="Team member"
                width={200}
                height={150}
                className="object-cover w-32 md:w-auto"
              />
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Netal rathi</h3>
            </div>

            {/* Team member 2 */}
            <div className="flex flex-col items-center">
              <Image
                src="/teampic/ma2.svg"
                alt="Team member"
                width={200}
                height={150}
                className="object-cover w-32 md:w-auto"
              />
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Aditya Ralhan</h3>
            </div>

            {/* Team member 3 */}
            <div className="flex flex-col items-center">
              <Image
                src="/teampic/ma3.svg"
                alt="Team member"
                width={200}
                height={150}
                className="object-cover w-32 md:w-auto"
              />
              <h3 className="text-base md:text-xl font-medium mt-2 text-center">Devyani Kheche</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
