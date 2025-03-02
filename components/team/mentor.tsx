import Image from "next/image";

export default function Mentor() {
  return (
    <div className="min-h-screen bg-white">
  {/* Navigation */}
    {/* Team Header Section */}
    <div className="text-center ">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Team</h1>
      <p className="text-gray-600">
        Get to know the minds shaping our GDG community!
      </p>
    </div>

  <div className="flex flex-row justify-items-start">

    <div className="flex flex-col items-center rounded-none mt-16 mx-20">
      <Image
        src="/teampic/lead.svg"
        alt="Team member"
        width={300}
        height={500}
        className="object-cover"
      />
      <h1 className="text-3xl font-bold text-black mt-4">Jayesh Shete</h1>
      <h1 className="text-2xl text-black">Club Lead</h1>
    </div>

    {/* Right side with grid of team members */}
    <div className="flex-1 mt-16">
      {/* First row of team members */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/teampic/mohit.svg"
              alt="Team member"
              width={200}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-md font-medium mt-2">Mohit Sahare</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-2xl overflow-hidden ">
            <Image
              src="/teampic/tp19.svg"
              alt="Team member"
              width={200}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-md font-medium mt-2">Mahesh Bora</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/teampic/tp20.svg"
              alt="Team member"
              width={200}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-md font-medium mt-2">Sanchit Mishra</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-2xl overflow-hidden ">
            <Image
              src="/teampic/tp21.svg"
              alt="Team member"
              width={200}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-md font-medium mt-2">Arnav Kadu</h3>
        </div>
      </div>

      {/* Mentors Section */}
      <div>
        <h2 className="text-xl font-semibold text-center mb-6">Mentors</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden ">
              <Image
                src="/teampic/tp22.svg"
                alt="Team member"
                width={200}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-md font-medium mt-2">Jaya Singh</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden ">
              <Image
                src="/teampic/tp23.svg"
                alt="Team member"
                width={200}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-md font-medium mt-2">Adnan Hussain</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/teampic/tp24.svg"
                alt="Team member"
                width={200}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-md font-medium mt-2">Tanisha Bharvesh</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden ">
              <Image
                src="/teampic/tp25.svg"
                alt="Team member"
                width={200}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-md font-medium mt-2">Rishika Kumar</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
    }