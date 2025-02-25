"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

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
  mdxSource?: any;
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
        // Serialize only the first 20 words of the blog content
        const blogsWithMdx = await Promise.all(
          blogsData.map(async (blog) => {
            const truncatedContent =
              blog.content.split(" ").slice(0, 20).join(" ") + "...";
            const mdxSource = await serialize(truncatedContent);
            return { ...blog, mdxSource };
          })
        );
        setBlogs(blogsWithMdx);
      }
    };

    fetchUserDetails();
  }, [supabase]);

  const handleEditProfile = () => {
    router.push("/edit/profile");
  };

  const handleEditBlog = (blogId: string) => {
    router.push(`/edit/blog/${blogId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Profile
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userDetails && (
        <div className="space-y-8">
          {/* User Details Card */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-6">
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${userDetails.image}`}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <p className="text-2xl font-semibold text-gray-800">
                  {userDetails.name}
                </p>
                <p className="text-gray-600">{userDetails.email}</p>
                <p className="text-gray-600">Role: {userDetails.role}</p>
                <div className="mt-2 flex space-x-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">
                      {registrations.length}
                    </span>{" "}
                    Events Registered
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">{blogs.length}</span> Blogs
                    Written
                  </p>
                </div>
              </div>
            </div>
            {(userDetails.role === "admin" || userDetails.role === "team") && (
              <Button
                onClick={handleEditProfile}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* Registered Events Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Registered Events
            </h2>
            {registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
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

          {/* Blogs Written Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Blogs Written
            </h2>
            {blogs.length > 0 ? (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-800">{blog.title}</p>
                      <Button
                        onClick={() => handleEditBlog(blog.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="text-gray-600 prose prose-sm max-w-none">
                      <MDXRemote {...blog.mdxSource} />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
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
