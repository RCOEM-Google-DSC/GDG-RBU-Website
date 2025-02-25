"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UserDetails {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user || !user.user) {
        setError("You must be logged in to update your profile.");
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
      setName(data.name);
    };

    fetchUserDetails();
  }, [supabase]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("You must be logged in to update your profile.");
      return;
    }

    if (userDetails?.role !== "admin" && userDetails?.role !== "team") {
      setError("You do not have permission to update this profile.");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = userDetails?.image;

      if (imageFile) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const fileName = `${hours}${minutes}${seconds}-${day}-${month}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageFile.type,
          });

        if (uploadError) throw uploadError;
        imageUrl = fileName;
      }

      const { data: updateData, error: updateError } = await supabase
        .from("users")
        .update({
          name,
          image: imageUrl,
        })
        .eq("id", userDetails?.id);

      if (updateError) throw updateError;

      setError("");
      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-2">Name:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
          disabled={uploading}
        >
          {uploading ? "Updating Profile..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
