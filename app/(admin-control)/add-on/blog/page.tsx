"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function InsertBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("You must be logged in to create a blog.");
      return;
    }

    if (!imageFile) {
      setError("Please select an image to upload.");
      return;
    }

    setUploading(true);

    try {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const fileName = `${hours}${minutes}${seconds}-${day}-${month}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("blog")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: imageFile.type,
        });

      if (uploadError) throw uploadError;

      const { data: insertData, error: insertError } = await supabase
        .from("blog")
        .insert([
          {
            writer_id: user.user.id,
            title,
            content,
            image_url: fileName,
          },
        ]);

      if (insertError) throw insertError;

      setError("");
      setTitle("");
      setContent("");
      setImageFile(null);
      alert("Blog created successfully!");
      router.push("/blog");
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Failed to create blog. Please try again.");
    } finally {
      setUploading(false);
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
            onChange={handleImageChange}
            disabled={uploading}
          />
          {imageFile && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Selected"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white"
          disabled={uploading || !imageFile}
        >
          {uploading ? "Creating Blog..." : "Create Blog"}
        </Button>
      </form>
    </div>
  );
}
