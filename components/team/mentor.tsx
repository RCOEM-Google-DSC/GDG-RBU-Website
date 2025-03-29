import Image from "next/image";

export default function Mentor() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-16">
      {/* Team Header Section */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-2 lg:mb-4">Our Team</h1>
        <p className="font-thin text-sm sm:text-base lg:text-lg">Get to know the minds shaping our GDG community!</p>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-12 xl:gap-16 max-w-screen-2xl mx-auto">
        {/* Club Lead - Larger on mobile, side-by-side on desktop */}
        <div className="flex flex-col items-center mx-auto lg:mx-0 lg:w-1/4 xl:w-1/5">
          <div className="w-48 sm:w-56 md:w-64 lg:w-full max-w-xs">
            <Image
              src="/teampic/jayesh.webp"
              alt="Jayesh Shete - Club Lead"
              width={400}
              height={600}
              className="object-cover w-full rounded-lg shadow-md"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-thin mt-4">Jayesh Shete</h1>
          <h1 className="text-xl sm:text-2xl font-thin text-gray-600 dark:text-gray-300">Club Lead</h1>
        </div>

        {/* Mentors Section - Responsive grid */}
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-thin text-center mb-6 lg:mb-8">Mentors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-4 md:gap-6 lg:gap-8">
            {[
              { name: "Mohit Sahare", img: "mohit 17.34.17.webp" },
              { name: "Krushna Dande", img: "krushna.webp" },
              { name: "Mahesh Bora", img: "Mask group-4.webp" },
              { name: "Sanchit Mishra", img: "sanchit.webp" },
              { name: "Arnav Kadu", img: "arnav.webp" },
              { name: "Jaya Singh", img: "jaya.webp" },
              { name: "Adnan Hussain", img: "adnan.webp" },
              { name: "Tanisha Bharvesh", img: "tanisha.webp" },
              { name: "Rishika Kumar", img: "rishika.webp" },
            ].map((mentor, index) => (
              <div key={index} className="flex flex-col items-center transform transition-transform hover:scale-105">
                <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md ">
                  <Image
                    src={`/teampic/${mentor.img}`}
                    alt={mentor.name}
                    width={200}
                    height={150}
                    className="object-cover w-32 md:w-40 lg:w-48"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-thin mt-2 text-center">{mentor.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}