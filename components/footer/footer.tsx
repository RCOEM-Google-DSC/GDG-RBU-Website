

import { EnvelopeClosedIcon, InstagramLogoIcon, TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IoLocationOutline } from "react-icons/io5";

export function Footer() {
	return (
        <>
		<div className="footer mt-4 bg-black border-t ">
			<footer
				id="footer"
				className="relative flex w-[100vw] items-center justify-between py-10 max-md:flex-col md:h-80 overflow-hidden"
			>
				<div className="flex w-[30vw] md:translate-x-16 flex-col items-center justify-center max-md:w-fit">
					<img src="/gdgico.svg" alt="logo" className="h-10" />
					<p className="pt-4 text-2xl text-slate-100 text-center max-md:text-xl">
						Google Developer Groups
					</p>
                    <span className="text-xl text-blue-500 max-md:text-lg">on Campus</span>
					
				</div>
                <div className="hidden md:block w-[2px] h-48 bg-white rounded-lg dark:bg-gray-200"></div>
           <div className="block md:hidden w-4/5 h-[2px] bg-white rounded-lg dark:bg-gray-200 mb-6"></div>
				<div className="flex w-[50vw] flex-col items-start justify-center gap-4 max-md:w-[95vw] max-md:py-8">
					<div className="flex items-center">
						<IoLocationOutline className="mx-12 scale-[2] text-slate-100" />
						<div className="text-md max-md:text-sm w-2/3 text-slate-100">
							Ramdeobaba University , Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur - 440013
						</div>
					</div>
					<div className="items-center flex">
						<EnvelopeClosedIcon className="ml-12 mr-6 scale-[1.8] text-slate-100" />
						<a
							href="mailto:dsc.rknec@gmail.com"
							className="underline-offset-2 underline text-md max-md:text-sm mx-6 text-left text-slate-100"
						>
							dsc.rknec@gmail.com
						</a>
					</div>
					<div className="flex items-center gap-12 py-8">
						<div className="text-md ml-8 text-slate-100 max-md:ml-12">Follow Us: </div>
						<div className="flex gap-8">
							<a href="https://www.instagram.com/gdg_rbu/" target="_blank">
								<InstagramLogoIcon className="scale-150 cursor-pointer text-slate-100 transition-all hover:scale-[1.8]" />
							</a>
							<a href="https://x.com/gdsc_rcoem?lang=en">
								<TwitterLogoIcon className="scale-150 cursor-pointer text-slate-100 transition-all hover:scale-[1.8]" />
							</a>
							<a href="https://www.linkedin.com/company/gdg-rbu/posts/?feedView=all">
								<LinkedInLogoIcon className="scale-150 cursor-pointer text-slate-100 transition-all hover:scale-[1.8]" />
							</a>
						</div>
					</div>
				</div>
				
			</footer>
		</div>
        <div className="flex flex-row overflow-hidden">
        <img src='/footer/bottom.png' alt='GDG Objects' className='w-1/4 h-1/2 relative bg-gray-100 dark:bg-black'/>
        <img src='/footer/bottom1.png' alt='GDG Objects' className='w-1/4 relative bg-gray-100 dark:bg-black'/>
        <img src='/footer/bottom2.png' alt='GDG Objects' className='w-1/4 relative bg-gray-100 dark:bg-black'/>
        <img src='/footer/bottom.png' alt='GDG Objects' className='w-1/4 relative bg-gray-100 dark:bg-black'/>
      </div>
        </>
	);
}



// import React from "react";

// const Footer = () => {
//   return (
//     <>
//       <div className="bg-gray-100 w-full pt-10 pb-8 flex flex-col items-center justify-center dark:bg-black dark:text-white">
//         <div className="w-full mx-auto px-4">
//           {/* Desktop view: row layout, Mobile view: column layout */}
//           <div className="flex flex-col md:flex-row justify-evenly overflow-hidden items-center">
//             {/* Logo Section */}
//             <div className="flex flex-col w-full md:w-2/5 items-center mb-8 md:mb-0">
//               <div className="-mr-4">
//                 <img src="/footer/footerlogo.png" alt="Google Developer Groups Logo" width={400} height={200} className="max-w-full h-auto" />
//               </div>
//             </div>
            
//             {/* Divider - visible on desktop only */}
//             <div className="hidden md:block w-[2px] h-48 bg-white rounded-lg dark:bg-gray-200"></div>
//             <div className="block md:hidden w-4/5 h-[2px] bg-white rounded-lg dark:bg-gray-200 mb-6"></div>
            
//             {/* Contact Information Section */}
//             <div className="max-w-xl mt-3 md:mt-10 flex flex-col items-center md:items-start">
//               {/* Address */}
//               <div className="flex items-center mt-4">
//                 <img src="/footer/map.png" alt="Location Icon" width={28} height={12} className="mr-2" />
//                 <p className="text-sm md:text-md text-center md:text-left text-gray-600 dark:text-gray-200">
//                   Ramdeobaba University, Ramdeo Tekdi,<br className="block md:hidden" /> 
//                   Gittikhadan, Katol Road, Nagpur - 440013
//                 </p>
//               </div>
              
//               {/* Email */}
//               <div className="flex items-center mt-4 md:mt-2">
//                 <img src="/footer/mail.png" alt="Mail Icon" width={32} height={20} className="mr-2" />
//                 <a
//                   href="mailto:dsc.rknec@gmail.com"
//                   className="text-sm md:text-md text-gray-600 font-semibold hover:underline dark:text-gray-200"
//                 >
//                   dsc.rknec@gmail.com
//                 </a>
//               </div>
              
//               {/* Social Media Section */}
//               <div className="flex flex-col items-center md:items-end md:justify-end gap-4 mt-6 md:mt-5 w-full">
//                 <div>
//                   <p className="text-md font-semibold text-gray-600 dark:text-gray-200">
//                     Follow Us:
//                   </p>
//                 </div>
//                 <div className="flex gap-4 flex-row">
//                   {/* Instagram */}
//                   <div className="bg-white rounded-full p-2">
//                     <a href="https://www.instagram.com/gdg_rbu/" className="" target="_blank" aria-label="Instagram">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 2476 2476"
//                         id="instagram"
//                         fill="black"
//                       >
//                         <path d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5"></path>
//                       </svg>
//                     </a>
//                   </div>
//                   {/* Twitter/X */}
//                   <div className="bg-white rounded-full p-2">
//                     <a
//                       href="https://x.com/gdsc_rcoem?lang=en"
//                       className=""
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label="Twitter"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         id="twitter"
//                         fill="black"
//                       >
//                         <path d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"></path>
//                       </svg>
//                     </a>
//                   </div>
//                   {/* LinkedIn */}
//                   <div className="bg-white rounded-full p-2">
//                     <a
//                       href="https://www.linkedin.com/company/gdg-rbu/posts/?feedView=all"
//                       className=""
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label="Linkedin"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 5 1036 990"
//                         id="linkedin"
//                         fill="black"
//                       >
//                         <path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z"></path>
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Bottom decorative images - adjust for mobile */}
//       <div className="flex flex-row overflow-hidden">
//         <img src='/footer/bottom.png' alt='GDG Objects' className='w-1/4 relative bg-gray-100 dark:bg-black'/>
//         <img src='/footer/bottom1.png' alt='GDG Objects' className='w-1/4 relative bg-gray-100 dark:bg-black'/>
//         <img src='/footer/bottom2.png' alt='GDG Objects' className='w-1/4 relative bg-gray-100 dark:bg-black'/>
        
//         <img src='/footer/bottom.png' alt='GDG Objects' className='w-1/4 relative bg-gray-100 dark:bg-black'/>
//       </div>
//     </>
//   );
// };

// export default Footer;