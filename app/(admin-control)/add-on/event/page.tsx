"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InsertEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("You must be logged in to create an event.");
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
        .from("events")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: imageFile.type,
        });

      if (uploadError) throw uploadError;

      const { data: insertData, error: insertError } = await supabase
        .from("events")
        .insert([
          {
            name,
            description,
            event_time: eventTime,
            location,
            post_image: fileName,
          },
        ]);

      if (insertError) throw insertError;

      setError("");
      setName("");
      setDescription("");
      setEventTime("");
      setLocation("");
      setImageFile(null);
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Event</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-2">Event Name:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Event Time:</label>
          <Input
            type="datetime-local"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Location:</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Post Image:</label>
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
          {uploading ? "Creating Event..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
