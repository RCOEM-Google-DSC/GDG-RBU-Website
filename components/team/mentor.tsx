import Image from "next/image"

export default function Mentor() {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Team Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Our Team</h1>
        <p className="text-gray-600">Get to know the minds shaping our GDG community!</p>
      </div>

      {/* Main content - flex column on mobile, row on larger screens */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Club Lead - centered on mobile, left-aligned on desktop */}
        <div className="flex flex-col items-center mx-auto lg:mx-4 xl:mx-12">
          <div className="w-48 sm:w-64 md:w-72 lg:w-80">
            <Image src="/teampic/lead.svg" alt="Team member" width={300} height={500} className="object-cover w-full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black mt-4">Jayesh Shete</h1>
          <h1 className="text-xl sm:text-2xl text-black">Club Lead</h1>
        </div>

        {/* Right side with grid of team members */}
        <h2 className="text-xl font-semibold text-center mb-6">Mentors</h2>
        <div className="flex-1 w-full">
          {/* First row of team members */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden w-full">
                <Image
                  src="/teampic/mohit.svg"
                  alt="Team member"
                  width={200}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Mohit Sahare</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden w-full">
                <Image
                  src="/teampic/tp19.svg"
                  alt="Team member"
                  width={200}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Mahesh Bora</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden w-full">
                <Image
                  src="/teampic/tp20.svg"
                  alt="Team member"
                  width={200}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Sanchit Mishra</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden w-full">
                <Image
                  src="/teampic/tp21.svg"
                  alt="Team member"
                  width={200}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Arnav Kadu</h3>
            </div>
          </div>

          {/* Mentors Section */}
          <div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden w-full">
                  <Image
                    src="/teampic/tp22.svg"
                    alt="Team member"
                    width={200}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Jaya Singh</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden w-full">
                  <Image
                    src="/teampic/tp23.svg"
                    alt="Team member"
                    width={200}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Adnan Hussain</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden w-full">
                  <Image
                    src="/teampic/tp24.svg"
                    alt="Team member"
                    width={200}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Tanisha Bharvesh</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden w-full">
                  <Image
                    src="/teampic/tp25.svg"
                    alt="Team member"
                    width={200}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm sm:text-md font-medium mt-2 text-center">Rishika Kumar</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

