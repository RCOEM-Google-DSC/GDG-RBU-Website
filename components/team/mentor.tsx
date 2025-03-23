import Image from "next/image";

export default function Mentor() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Team Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Our Team</h1>
        <p className="font-thin">Get to know the minds shaping our GDG community!</p>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Club Lead */}
        <div className="flex flex-col items-center mx-auto lg:mx-4 xl:mx-12">
          <div className="w-48 sm:w-64 md:w-72 lg:w-80">
            <Image
              src="/teampic/lead.svg"
              alt="Team member"
              width={200}
              height={350}
              className="object-cover w-full"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-thin mt-4">Jayesh Shete</h1>
          <h1 className="text-xl sm:text-2xl font-thin">Club Lead</h1>
        </div>

        {/* Mentors Section */}
        <div className="flex-1 w-full">
          <h2 className="text-xl font-thin text-center mb-6">Mentors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Mohit Sahare", img: "mohit.svg" },
              { name: "Mahesh Bora", img: "tp19.svg" },
              { name: "Sanchit Mishra", img: "tp20.svg" },
              { name: "Arnav Kadu", img: "tp21.svg" },
              { name: "Jaya Singh", img: "tp22.svg" },
              { name: "Adnan Hussain", img: "tp23.svg" },
              { name: "Tanisha Bharvesh", img: "tp24.svg" },
              { name: "Rishika Kumar", img: "tp25.svg" },
            ].map((mentor, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src={`/teampic/${mentor.img}`}
                    alt={mentor.name}
                    width={100}
                    height={150}
                    className="w-32 md:w-auto h-full object-cover"
                  />
                </div>
                <h3 className="text-sm sm:text-md font-thin mt-2 text-center">{mentor.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
