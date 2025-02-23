"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  writer_id: string;
}

export default function EditBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user || !user.user) {
        setError("You must be logged in to view your blogs.");
        return;
      }

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("writer_id", user.user?.id);

      if (error) {
        setError("Failed to fetch blogs.");
        return;
      }

      setBlogs(data || []);
    };

    fetchBlogs();
  }, [supabase]);

  const handleEdit = (blogId: string) => {
    router.push(`/edit/blog/${blogId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Blogs</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-4 rounded-lg"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
            <p className="text-sm text-gray-400">
              Created At: {new Date(blog.created_at).toLocaleDateString()}
            </p>
            <Button
              onClick={() => handleEdit(blog.id)}
              className="mt-2 bg-blue-500 text-white"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
