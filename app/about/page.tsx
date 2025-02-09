import { createClient } from "@/utils/supabase/server";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Team Members</h1>

      {domains.map((domain) => (
        <div
          key={domain}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">{domain}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members
              ?.filter((member: any) => member.domain === domain)
              .map((member: any) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Member Details */}
                  <div className="flex items-center mb-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${member.users.image}`}
                      alt={`${member.name}'s profile`}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {member.name}
                      </p>
                    </div>
                  </div>

                  {/* Domain and Role */}
                  <p className="text-gray-600 mb-2">
                    <strong>Domain:</strong> {member.domain}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Role:</strong> {member.role}
                  </p>

                  {/* Description */}
                  {member.description && (
                    <p className="text-gray-600 mb-2">{member.description}</p>
                  )}

                  {/* Thought */}
                  {member.thought && (
                    <p className="text-gray-600 mb-2 italic">
                      "{member.thought}"
                    </p>
                  )}

                  {/* Profile Links */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2 text-gray-700">
                      Profile Links:
                    </p>
                    <ul className="space-y-1">
                      {member.profile_links?.map(
                        (link: string, index: number) => (
                          <li key={index}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline break-words"
                            >
                              {link}
                            </a>
                          </li>
                        )
                      )}
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
  );
}
