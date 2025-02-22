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
  const [uploading, setUploading] = useState(false); // Track upload state

  const supabase = createClient();

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Generate a unique file name
      const fileName = `${Date.now()}_${file.name}`;

      // Upload the image to the "blogs" bucket
      const { data, error } = await supabase.storage
        .from("blogs")
        .upload(fileName, file, {
          cacheControl: "3600", // Cache the image for 1 hour
          upsert: false, // Do not overwrite existing files
          contentType: file.type, // Set the content type based on the file type
        });

      if (error) {
        throw error;
      }

      // Set the image URL in the state
      setImageUrl(fileName);
      setError("");
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("You must be logged in to create a blog.");
      return;
    }

    try {
      const { data, error: insertError } = await supabase
        .from("blogs")
        .insert([
          { writer_id: user.user.id, title, content, image_url: imageUrl },
        ]);

      if (insertError) {
        throw insertError;
      }

      setError("");
      setTitle("");
      setContent("");
      setImageUrl("");
      alert("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Failed to create blog. Please try again.");
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
          <label className="block mb-2">Upload Image:</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && <p className="text-gray-500">Uploading image...</p>}
          {imageUrl && (
            <div className="mt-2">
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${imageUrl}`}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white"
          disabled={uploading || !imageUrl}
        >
          {uploading ? "Uploading..." : "Create Blog"}
        </Button>
      </form>
    </div>
  );
}
