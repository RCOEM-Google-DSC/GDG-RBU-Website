"use client"; // Mark this component as a Client Component
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MDXRemote } from "next-mdx-remote"; // Import MDXRemote
import { serialize } from "next-mdx-remote/serialize"; // Import serialize function

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
  mdxSource?: any; // Add mdxSource for serialized content
}

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user || !user.user) {
        setError("You must be logged in to view your profile.");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.user.id)
        .single<UserDetails>();

      if (error) {
        setError("Failed to fetch user details.");
        return;
      }

      setUserDetails(data);

      // Fetch registrations
      const { data: registrationsData } = await supabase
        .from("registrations")
        .select(
          `
          id,
          event_id,
          events:event_id (id, name, event_time, location)
        `
        )
        .eq("user_id", user.user.id)
        .returns<Registration[]>();

      if (registrationsData) {
        setRegistrations(registrationsData);
      }

      // Fetch blogs
      const { data: blogsData } = await supabase
        .from("blogs")
        .select("*")
        .eq("writer_id", user.user.id)
        .returns<Blog[]>();

      if (blogsData) {
        // Serialize blog content
        const blogsWithMdx = await Promise.all(
          blogsData.map(async (blog) => {
            const mdxSource = await serialize(blog.content);
            return { ...blog, mdxSource };
          })
        );
        setBlogs(blogsWithMdx);
      }
    };

    fetchUserDetails();
  }, [supabase]);

  const handleEdit = () => {
    router.push("/edit/profile");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userDetails && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${userDetails.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <p className="text-lg font-medium text-gray-800">
                Name: {userDetails.name}
              </p>
              <p className="text-gray-600">Email: {userDetails.email}</p>
              <p className="text-gray-600">Role: {userDetails.role}</p>
              <p className="text-gray-600">
                Events Registered: {registrations.length}
              </p>
              <p className="text-gray-600">Blogs Written: {blogs.length}</p>
            </div>
          </div>
          {(userDetails.role === "admin" || userDetails.role === "team") && (
            <Button
              onClick={handleEdit}
              className="bg-blue-500 text-white"
            >
              Edit Profile
            </Button>
          )}

          {/* Display Registered Events */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Registered Events</h2>
            {registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-medium text-gray-800">
                      Event: {registration.events.name}
                    </p>
                    <p className="text-gray-600">
                      Time:{" "}
                      {new Date(
                        registration.events.event_time
                      ).toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      Location: {registration.events.location}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events registered yet.</p>
            )}
          </div>

          {/* Display Blogs Written */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Blogs Written</h2>
            {blogs.length > 0 ? (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-medium text-gray-800">
                      Title: {blog.title}
                    </p>
                    <div className="text-gray-600">
                      <MDXRemote {...blog.mdxSource} />
                    </div>
                    <p className="text-gray-600">
                      Created At:{" "}
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No blogs written yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
