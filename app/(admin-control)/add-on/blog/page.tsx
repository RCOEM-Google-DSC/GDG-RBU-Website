"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InsertBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("You must be logged in to create a blog.");
      return;
    }

    const { data, error: insertError } = await supabase
      .from("blogs")
      .insert([
        { writer_id: user.user.id, title, content, image_url: imageUrl },
      ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      setError("");
      setTitle("");
      setContent("");
      setImageUrl("");
      alert("Blog created successfully!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-2">Title:</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Image URL:</label>
          <Input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white"
        >
          Create Blog
        </Button>
      </form>
    </div>
  );
}
