import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}
interface Event {
  id: string;
  name: string;
  event_time: string;
  location: string;
}
interface Registration {
  id: string;
  event_id: string;
  events: Event;
}
interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default async function Profile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch user details with type
  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single<UserDetails>();

  // Fetch events with type
  const { data: registrations } = await supabase
    .from("registrations")
    .select(
      `
      id,
      event_id,
      events:event_id (id, name, event_time, location)
    `
    )
    .eq("user_id", user.id)
    .returns<Registration[]>();

  // Fetch blogs written by the user
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("writer_id", user.id)
    .returns<Blog[]>();

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Profile
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* User Details Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            User Details
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${userDetails?.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <p className="text-lg font-medium text-gray-800">
                Name: {userDetails?.name}
              </p>
              <p className="text-gray-600">Email: {userDetails?.email}</p>
              <p className="text-gray-600">Role: {userDetails?.role}</p>
            </div>
          </div>
        </div>

        {/* Registered Events Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 underline">
            Registered Events
          </h2>
          <ul className="space-y-4">
            {registrations?.map((registration) => (
              <li
                key={registration.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <p className="font-medium text-gray-800">
                  Event: {registration.events.name}
                </p>
                <p className="text-gray-600">
                  Time:{" "}
                  {new Date(registration.events.event_time).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Location: {registration.events.location}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Blogs Written Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 underline">
            Blogs Written
          </h2>
          <ul className="space-y-4">
            {blogs?.map((blog) => (
              <li
                key={blog.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <p className="font-medium text-gray-800">Title: {blog.title}</p>
                <p className="text-gray-600">
                  Content: {blog.content.slice(0, 100)}...
                </p>
                <p className="text-gray-600">
                  Created At: {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Debugging Data Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            This is how we are getting data:
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-600">
                User Details:
              </h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(userDetails, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">
                Registrations:
              </h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(registrations, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Blogs:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(blogs, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
