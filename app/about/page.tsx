import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// Define interfaces for the data structure
interface User {
  id: string;
  image: string;
}

interface Member {
  id: string;
  domain: string;
  role: string;
  name: string;
  profile_links: string[];
  created_at: string;
  users: User;
  description?: string;
  thought?: string;
}

const domains = [
  "Web Dev",
  "Video Editing",
  "Socials",
  "App Dev",
  "Cloud & AI",
  "Graphics",
  "Marketing",
  "Management",
];

export default async function Members() {
  const supabase = await createClient();

  // Fetch members with type annotation
  const { data: members } = await supabase
    .from("members")
    .select(
      `
      id,
      domain,
      role,
      name,
      profile_links,
      description,
      thought,
      created_at,
      users:user_id (id, image)
    `
    )
    .returns<Member[]>();

  return (
    <div>
      {/* Nav Bar */}
      <nav className="flex items-center justify-between mb-8 w-[76rem] mr-28 ml-28">
        <img
          src="/gdgico.svg"
          alt="GDG Logo"
          className="w-16 h-16"
        />
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-black hover:text-gray-700"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-black hover:text-gray-700"
          >
            Events
          </Link>
          <Link
            href="/blogs"
            className="text-black hover:text-gray-700"
          >
            Blogs
          </Link>
          <Link
            href="/team"
            className="text-black hover:text-gray-700"
          >
            <span className="underline underline-offset-4">Team</span>
          </Link>
          <Link
            href="/alumni"
            className="text-black hover:text-gray-700"
          >
            Alumni
          </Link>
          <Link
            href="/contact"
            className="text-black hover:text-gray-700"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center">{/* {headerAuthComponent} */}</div>
      </nav>

      {/* Team Members Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Team Members
        </h1>

        {domains.map((domain) => (
          <div
            key={domain}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
              {domain}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members
                ?.filter((member) => member.domain === domain)
                .map((member) => (
                  <div
                    key={member.id}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg overflow-hidden p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    {/* Member Details */}
                    <div className="flex items-center mb-4">
                      <div className="relative w-14 h-14">
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${member.users.image}`}
                          alt={`${member.name}'s profile`}
                          className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-800">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>

                    {/* Description */}
                    {member.description && (
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    )}

                    {/* Thought */}
                    {member.thought && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-600 italic text-sm">
                          "{member.thought}"
                        </p>
                      </div>
                    )}

                    {/* Profile Links */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-2 text-gray-700">
                        Profile Links:
                      </p>
                      <ul className="space-y-1">
                        {member.profile_links?.map((link, index) => (
                          <li key={index}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline break-words text-sm"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Debugging: Display raw data */}
        <pre className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
          {JSON.stringify(members, null, 2)}
        </pre>
      </div>
    </div>
  );
}
