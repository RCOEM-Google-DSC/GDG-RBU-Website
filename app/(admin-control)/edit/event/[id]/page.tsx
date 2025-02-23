"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EditEvent({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [event, setEvent] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  // Unwrap params using React.use()
  const { id } = React.use(params);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id) // Use the unwrapped `id`
        .single();

      if (error) {
        setError("Failed to fetch event.");
        return;
      }

      setEvent(data);
      setName(data.name);
      setDescription(data.description);
      setEventTime(data.event_time);
      setLocation(data.location);
    };

    fetchEvent();
  }, [id, supabase]); // Use the unwrapped `id` in the dependency array

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the authenticated user
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("You must be logged in to edit an event.");
      return;
    }

    // Fetch the user's role from the `users` table
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.user.id)
      .single();

    if (roleError) {
      setError("Failed to verify user role.");
      return;
    }

    console.log("User Role:", userData.role); // Debugging: Log the role

    // Check if the user is an admin or team member
    if (userData.role !== "admin" && userData.role !== "team") {
      setError("You do not have permission to edit this event.");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = event.post_image;

      if (imageFile) {
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
        imageUrl = fileName;
      }

      const { data: updateData, error: updateError } = await supabase
        .from("events")
        .update({
          name,
          description,
          event_time: eventTime,
          location,
          post_image: imageUrl,
        })
        .eq("id", id); // Use the unwrapped `id`

      if (updateError) throw updateError;

      setError("");
      alert("Event updated successfully!");
      router.push("/events");
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
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
          disabled={uploading}
        >
          {uploading ? "Updating Event..." : "Update Event"}
        </Button>
      </form>
    </div>
  );
}
