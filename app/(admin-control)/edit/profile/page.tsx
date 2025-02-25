"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !userData.user) {
        setError("You must be logged in to edit your profile.");
        router.push("/sign-in");
        return;
      }

      setUserId(userData.user.id);

      const { data: userDetails, error: userError } = await supabase
        .from("users")
        .select("name, image, role")
        .eq("id", userData.user.id)
        .single();

      if (userError) {
        console.error("Error fetching user details:", userError);
        setError("Failed to fetch user details.");
        return;
      }

      if (userDetails.role !== "admin" && userDetails.role !== "team") {
        setError("Only admin and team members can edit their profile.");
        router.push("/profile");
        return;
      }

      setName(userDetails.name);
      setCurrentImage(userDetails.image || null);
      setUserRole(userDetails.role);
    };

    fetchUserData();
  }, [supabase, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID not found. Please refresh and try again.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      let imageName = currentImage;

      if (imageFile) {
        // Generate a unique filename
        const now = new Date();
        const timestamp = now.getTime();
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${userId}-${timestamp}.${fileExt}`;

        console.log("Uploading file:", fileName);

        // Upload the new image to the profile bucket
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: true, // Changed to true to overwrite existing files
            contentType: imageFile.type,
          });

        if (uploadError) {
          console.error("Image upload error:", uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        imageName = fileName;
        console.log("Image uploaded successfully:", imageName);
      }

      // Update the user's profile in the users table
      const { error: updateError } = await supabase
        .from("users")
        .update({
          name,
          image: imageName,
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Database update error:", updateError);
        throw new Error(
          `Failed to update profile data: ${updateError.message}`
        );
      }

      console.log("Profile updated successfully");
      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (err: any) {
      console.error(
        "Error updating profile:",
        err.message || JSON.stringify(err)
      );
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // If we don't have user data yet, show loading
  if (!userId && !error) {
    return <div className="container mx-auto p-4">Loading user data...</div>;
  }

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
          <label className="block mb-2">Current Role:</label>
          <p className="text-gray-700 p-2 border rounded bg-gray-50">
            {userRole}
          </p>
        </div>
        <div>
          <label className="block mb-2">Profile Image:</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
          />
          <div className="mt-4 flex gap-4">
            {currentImage && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${currentImage}`}
                  alt="Current Profile"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
            {imageFile && (
              <div>
                <p className="text-sm text-gray-500 mb-1">New Image:</p>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="New Profile"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
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
