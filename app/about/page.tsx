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
}

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
      created_at,
      users:user_id (id, image)
    `
    )
    .returns<Member[]>();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members?.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4"
          >
            {/* Member Details */}
            <div className="flex items-center mb-4">
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${member.users.image}`}
                alt={`${member.name}'s profile`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{member.name}</p>
              </div>
            </div>
            {/* Domain and Role */}
            <p className="text-gray-600 mb-2">
              <strong>Domain:</strong> {member.domain}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Role:</strong> {member.role}
            </p>
            {/* Profile Links */}
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Profile Links:</p>
              <ul className="space-y-1">
                {member.profile_links?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
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
      <pre>{JSON.stringify(members, null, 2)}</pre>
    </div>
  );
}
