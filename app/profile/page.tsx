"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
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
            </div>
          </div>
          <Button
            onClick={handleEdit}
            className="bg-blue-500 text-white"
          >
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
}
