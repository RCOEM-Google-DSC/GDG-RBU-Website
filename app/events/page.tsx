import React from 'react';

export default function Events() {
  const events = [
    
    {
      id: 2,
      name: "EXPLORE 2.0",
      date: "7 March 2025",
      image: "event/event1.svg",
      description: "Stressed about exams? Need a break from all the studying? It's time to refresh your mind and explore the exciting world of tech with GDG RBU!",
      location: "GD Seminar Hall",
      time: "10:00 AM - 5:00 PM"
    },
    {
      id: 3,
      name: "SpiderCraft",
      date: "16 Jan 2025",
      image: "event/event2.svg",
      description: "SPIDER CRAFT 2025: WHERE TECH MET FUN! Still buzzing from the energy of Spider Craft 2025!"
    },
    {
      id: 4,
      name: "Tech Winter Break",
      date: "24 Dec 2024",
      image: "event/event3.svg",
      description: "This winter gonna be techy. Want to learn new tech like Web Development, App Development? Join us at Tech Winter Break."
    },
    {
      id: 5,
      name: "Bappa Ka Prashad 4.0",
      date: "15 Sept 2024",
      image: "/bkp1.png",
      description: "With Ganesh Chaturthi in full swing, we are thrilled to announce Bappa Ka Prashad 4.0 on 15th September! 🙏✨ Join us as we blend tradition with competitive coding, sharing the 'Prashad' of knowledge and skill. Get ready to test your abilities and be part of this exciting coding journey.",
      location: "Codeforces",
      time: "10:00 AM - 5:00 PM"
    },
    {
      id: 6,
      name: "A Step Towards CP 2.0",
      date: "22 Aug 2024",
      image: "/stcp.png",
      description: "Introducing... “A Step Towards CP 2.0” - your gateway to the world of programming! 💻🚀 .Competitive Programming: Your key to landing a job at the worlds leading tech companies. By honing your problem-solving prowess and coding expertise, you will make yourself an irresistible hire.",
      location: "DT Seminar Hall",
      time: "10:00 AM - 5:00 PM"
    },
    {
      id: 7,
      name: "Web Wizards 2.0",
      date: "27 March 2024",
      image: "event/event4.png",
      description: "Web Wizards 2.0 is a one-day event to explore the exciting world of tech with GDG RBU!",
      location: "DT Seminar Hall",
      time: "10:00 AM - 5:00 PM"
    },
    
  ];

  const upcomingEvents=[
    {
      id: 1,
      name: "Web Wizard 3.0",
      date: "5 April 2025",
      image: "event/web-wizards.png",
      description: "Web Wizards 3.0 is a one-day event plus week long bootcamp to explore the exciting world of tech with GDG RBU",
      location: "Venu : To Be Disclosed Soon",
      time: "Time : 2:00 AM - 5 PM"
    }
  ]
  const upcomingEvent = upcomingEvents[0];

  return (
    <div className="container mx-auto px-4 pt-24 max-w-7xl mb-10">
      <h1 className="text-4xl md:text-5xl  text-center mb-8 md:mb-12 text-gray-800 dark:text-gray-100 font-semibold">Our Events</h1>
      
      <div className="w-full mb-12 bg-black border border-white  rounded-lg overflow-hidden shadow-lg">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/5 h-64 lg:h-auto relative ">
            <img 
              src={upcomingEvent.image} 
              alt={upcomingEvent.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-blue-400 text-white px-4 py-2 rounded-br-lg font-thin">
              UPCOMING EVENT
            </div>
          </div>
          
          <div className="lg:w-3/5 p-6 lg:p-10 text-white">
            <div className="mb-2 font-thin">{upcomingEvent.date}</div>
            <h2 className="text-2xl lg:text-3xl font-thin mb-4">{upcomingEvent.name}</h2>
            <p className="mb-6 text-white/80 font-thin">{upcomingEvent.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 font-thin">
              {upcomingEvent.location && (
                <div className="flex items-center text-white font-thin">
                  <span>{upcomingEvent.location}</span>
                </div>
              )}
              {upcomingEvent.time && (
                <div className="flex items-center text-white font-thin">
                  <span>{upcomingEvent.time}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://lu.ma/g4xh2udx?fbclid=PAZXh0bgNhZW0CMTEAAaaClU7dkl28slxaMIDiYVh09yyGplBQoFhcu52xi45jkUbxPKBV3qUfElg_aem_NKLlJJswjh-wcSEZZG13xg"><button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md transition-colors duration-200 font-thin">
                Register Now
              </button></a>
              <a href="https://gdg-rbu.netlify.app/blog/web-wizards-3">
              <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-2 rounded-md font-thin transition-colors duration-200">
                Learn More -{">"}
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>

     <div className='rounded-3xl bg-white py-6 px-6'>
      <h1 className="text-4xl md:text-5xl  text-center mb-8 md:mb-12 text-gray-800 dark:text-black font-semibold">Past Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 border-white lg:border-white  dark:border-white font-thin ">
        
        {events.map((event) => (
          <div key={event.id} className="flex flex-col border rounded-3xl border-gray-200 dark:border-white shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-6 h-full bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-thin">
            <div className="text-center mb-3 md:mb-4 text-black dark:text-white font-thin">{event.date}</div>
            
            <div className="mb-4 md:mb-6 w-full h-48 md:h-64 relative overflow-hidden rounded font-thin">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 font-thin"
              />
            </div>
            
            <h2 className="text-xl md:text-2xl font-thin mb-3 md:mb-4">{event.name}</h2>
            
            <p className="text-gray-600 dark:text-white text-sm md:text-base flex-grow font-thin">
              {event.description}
            </p>
            
            <div className="mt-4 pt-4 border-t border-black dark:border-white font-thin">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm  transition-colors duration-200 font-thin">
                Learn more →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center lg:hidden font-thin">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200 font-thin">
          Show More Events
        </button>
      </div>
    </div>
    </div>
  );
}


// import React from 'react';
// import { createClient } from '@/utils/supabase/server';
// import Image from 'next/image';

// export default async function Events() {
//   // Create Supabase client
//   const supabase = await createClient();

//   // Fetch events data from Supabase
//   const { data: events, error } = await supabase
//     .from("events")
//     .select(`
//       id,
//       name,
//       post_image,
//       description,
//       event_time,
//       location
//     `)
//     .order('event_time', { ascending: false });

//   // Handle potential errors
//   if (error) {
//     console.error("Error fetching events:", error);
//   }

//   // Format date function
//   const formatEventDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       day: 'numeric', 
//       month: 'short', 
//       year: 'numeric' 
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-800">Our Events</h1>
      
//       {/* Show loading state or error message if needed */}
//       {!events && !error && <p className="text-center">Loading events...</p>}
//       {error && <p className="text-center text-red-500">Failed to load events. Please try again later.</p>}
      
//       {/* Events grid */}
//       {events && events.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0 border-0 lg:border lg:border-gray-200">
//           {events.map((event) => (
//             <div key={event.id} className="flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-6 h-full">
//               <div className="text-center mb-3 md:mb-4 text-gray-600 font-medium">
//                 {formatEventDate(event.event_time)}
//               </div>
              
//               <div className="mb-4 md:mb-6 w-full h-48 md:h-64 relative overflow-hidden rounded">
//                 {event.post_image ? (
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events/${event.post_image}`}
//                     alt={event.name}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     className="object-cover transition-transform duration-500 hover:scale-105"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                     <span className="text-gray-400">No image</span>
//                   </div>
//                 )}
//               </div>
              
//               <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{event.name}</h2>
              
//               <p className="text-gray-600 text-sm md:text-base flex-grow">
//                 {event.description?.substring(0, 150)}
//                 {event.description?.length > 150 ? '...' : ''}
//               </p>
              
//               {event.location && (
//                 <p className="text-gray-500 text-sm mt-2">
//                   <span className="font-medium">Location:</span> {event.location}
//                 </p>
//               )}
              
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
//                   Learn more →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 py-12">No events found.</p>
//       )}
      
//       {/* Mobile view "Show More" button - only show if there are more than 3 events */}
//       {events && events.length > 3 && (
//         <div className="mt-8 text-center lg:hidden">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200">
//             Show More Events
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fsurprise&psig=AOvVaw1zEnR_Zog6m7SguHpEwMrl&ust=1742777563469000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMDGzcD-nowDFQAAAAAdAAAAABAE
