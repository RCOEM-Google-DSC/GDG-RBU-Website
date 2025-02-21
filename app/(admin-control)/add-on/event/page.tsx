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
  const [postImage, setPostImage] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("You must be logged in to create an event.");
      return;
    }

    const { data, error: insertError } = await supabase.from("events").insert([
      {
        name,
        description,
        event_time: eventTime,
        location,
        post_image: postImage,
      },
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      setError("");
      setName("");
      setDescription("");
      setEventTime("");
      setLocation("");
      setPostImage("");
      alert("Event created successfully!");
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
          <label className="block mb-2">Post Image URL:</label>
          <Input
            type="text"
            value={postImage}
            onChange={(e) => setPostImage(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white"
        >
          Create Event
        </Button>
      </form>
    </div>
  );
}
