"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  name: string;
  description: string;
  event_time: string;
  location: string;
  post_image: string;
}

export default function EditEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "team" | "user" | null>(
    null
  );
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchEventsAndUser = async () => {
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setError("You must be logged in to view events.");
        return;
      }

      console.log("Auth User:", user); // Debugging: Log the auth user

      // Fetch user role
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.user.id)
        .single();

      if (userError) {
        setError("Failed to fetch user role.");
        return;
      }

      console.log("User Role:", userData.role); // Debugging: Log the role
      setUserRole(userData.role);

      // Fetch events
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        setError("Failed to fetch events.");
        return;
      }

      setEvents(data || []);
    };

    fetchEventsAndUser();
  }, [supabase]);

  const handleEdit = (eventId: string) => {
    router.push(`/edit/event/${eventId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border p-4 rounded-lg"
          >
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p className="text-gray-600">
              {event.description.slice(0, 100)}...
            </p>
            <p className="text-sm text-gray-400">
              Time: {new Date(event.event_time).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">Location: {event.location}</p>
            {(userRole === "admin" || userRole === "team") && (
              <Button
                onClick={() => handleEdit(event.id)}
                className="mt-2 bg-blue-500 text-white"
              >
                Edit
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
