import { EnvelopeClosedIcon, InstagramLogoIcon, TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IoLocationOutline } from "react-icons/io5";

export function Footer() {
	return (
		<div className="footer mt-4 bg-slate-900">
			<footer
				id="footer"
				className="relative flex w-full items-center justify-between py-10 max-md:flex-col md:h-80 overflow-hidden"
			>
				<div className="flex md:w-1/3 md:pl-16 flex-col items-center justify-center max-md:w-fit">
					<img src="gdgico.svg" alt="logo" className="h-10" />
					<p className="pt-4 text-2xl text-slate-100 text-center max-md:text-xl">
						Google Developer Groups
					</p>
                    <p>
                    <span className="text-md text-blue-600 max-md:text-lg">On Campus  </span>
                    <span className="text-md text-slate-100 max-md:text-lg"> • Ramdeobaba University</span>
                    </p>
				</div>
                <div className="hidden md:block w-px h-48 bg-white rounded-lg dark:bg-gray-200"></div>
                <div className="block md:hidden w-4/5 h-px bg-white rounded-lg dark:bg-gray-200 mt-6 mb-6"></div>
				<div className="flex md:w-1/2 flex-col items-start justify-center gap-4 max-md:w-full max-md:px-4 max-md:py-8">
					<div className="flex items-center">
						<IoLocationOutline className="md:mx-12 mx-4 scale-150 text-slate-100" />
						<div className="text-md max-md:text-sm w-2/3 text-slate-100">
							Shri Ramdeobaba College of Engineering and Management, Ramdeo Tekdi, Gittikhadan, Katol
							Road, Nagpur - 440013
						</div>
					</div>
					<div className="items-center flex">
						<EnvelopeClosedIcon className="md:ml-12 ml-4 mr-6 scale-150 text-slate-100" />
						<a
							href="mailto:dsc.rknec@gmail.com"
							className="underline-offset-2 underline text-md max-md:text-sm mx-6 text-left text-slate-100"
						>
							dsc.rknec@gmail.com
						</a>
					</div>
					<div className="flex items-center gap-8 py-8">
						<div className="text-md md:ml-8 ml-4 text-slate-100">Follow Us: </div>
						<div className="flex gap-8">
							<a href="https://www.instagram.com/gdg_rbu/" target="_blank" rel="noopener noreferrer">
								<InstagramLogoIcon className="scale-150 cursor-pointer text-slate-100 transition-all hover:scale-[1.8]" />
							</a>
							<a href="https://mobile.twitter.com/gdsc_rcoem" target="_blank" rel="noopener noreferrer">
								<TwitterLogoIcon className="scale-150 cursor-pointer text-slate-100 transition-all hover:scale-[1.8]" />
							</a>
							<a href="https://in.linkedin.com/company/gdsc-rcoem" target="_blank" rel="noopener noreferrer">
								<LinkedInLogoIcon className="scale-150 cursor-pointer text-slate-100 transition-all hover:scale-[1.8]" />
							</a>
						</div>
					</div>
				</div>
				<img src="/images/shapes.svg" alt="shapes" className="absolute -bottom-24 max-md:-bottom-10 max-md:h-36 object-cover" />
			</footer>
		</div>
	);
}