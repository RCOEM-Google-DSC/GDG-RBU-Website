"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface Event {
  id: string;
  name: string;
  event_time: string;
  location: string;
}

interface Registration {
  id: string;
  event_id: string;
  events: Event;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  mdxSource?: any;
}

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [emoImages, setEmoImages] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
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
      setName(data.name || "");
      // Fetch registrations
      const { data: registrationsData } = await supabase
        .from("registrations")
        .select(
          `
          id,
          event_id,
          events:event_id (id, name, event_time, location)
        `
        )
        .eq("user_id", user.user.id)
        .returns<Registration[]>();

      if (registrationsData) {
        setRegistrations(registrationsData);
      }

      // Fetch blogs
      const { data: blogsData } = await supabase
        .from("blogs")
        .select("*")
        .eq("writer_id", user.user.id)
        .returns<Blog[]>();

      if (blogsData) {
        // Serialize only the first 20 words of the blog content
        const blogsWithMdx = await Promise.all(
          blogsData.map(async (blog) => {
            const truncatedContent =
              blog.content.split(" ").slice(0, 20).join(" ") + "...";
            const mdxSource = await serialize(truncatedContent);
            return { ...blog, mdxSource };
          })
        );
        setBlogs(blogsWithMdx);
      }

      // Fetch images from the "emo" bucket
      const { data: images } = await supabase.storage.from("emo").list();
      if (images) {
        const imageUrls = images.map(
          (image) =>
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/emo/${image.name}`
        );
        setEmoImages(imageUrls);
      }
    };

    fetchUserDetails();
  }, [supabase]);

  const handleEditProfileUser = async () => {
    if (!userDetails) return;

    // Extract the filename from the selected image URL
    const filename = selectedImage.split("/").pop();

    const { error } = await supabase
      .from("users")
      .update({ name, image: filename })
      .eq("id", userDetails.id);

    if (error) {
      setError("Failed to update profile.");
    } else {
      setUserDetails({ ...userDetails, name, image: filename });
      setIsDialogOpen(false); // Close the dialog after successful update
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleAdminProfileUpdate = async () => {
    if (!userDetails) return;

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
      setIsAdminDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditBlog = (blogId: string) => {
    router.push(`/edit/blog/${blogId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Profile
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userDetails && (
        <div className="space-y-8">
          {/* User Details Card */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-6">
              <img
                src={`${
                  userDetails.role === "user"
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/emo/${userDetails.image}`
                    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${userDetails.image}`
                }`}
                alt="Profile "
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <p className="text-2xl font-semibold text-gray-800">
                  {userDetails.name}
                </p>
                <p className="text-gray-600">{userDetails.email}</p>
                <p className="text-gray-600">Role: {userDetails.role}</p>
                <div className="mt-2 flex space-x-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">
                      {registrations.length}
                    </span>{" "}
                    Events Registered
                  </p>
                  {(userDetails.role === "admin" ||
                    userDetails.role === "team") && (
                    <p className="text-gray-600">
                      <span className="font-semibold">{blogs.length}</span>{" "}
                      Blogs Written
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Admin Profile Edit Model */}
            {(userDetails.role === "admin" || userDetails.role === "team") && (
              <Dialog
                open={isAdminDialogOpen}
                onOpenChange={setIsAdminDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    Update Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                    <div>
                      <label className="block mb-2">Upload Image:</label>
                      <p className="text-sm text-gray-500 p-1">
                        jpg, jpeg, png, gif.
                      </p>
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
                      onClick={handleAdminProfileUpdate}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={uploading}
                    >
                      {uploading ? "Updating Profile..." : "Update"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            {/* User Profile Edit Model */}
            {userDetails.role === "user" && (
              <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    Update Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      {emoImages.map((image) => (
                        <img
                          key={image}
                          src={image}
                          alt="Profile Option"
                          className={`w-24 h-24 rounded-full object-cover cursor-pointer border-4 ${
                            selectedImage === image
                              ? "border-blue-500"
                              : "border-white"
                          }`}
                          onClick={() => setSelectedImage(image)}
                        />
                      ))}
                    </div>
                    <Button
                      onClick={handleEditProfileUser}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Update
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Registered Events Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Registered Events
            </h2>
            {registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="font-medium text-gray-800">
                      Event: {registration.events.name}
                    </p>
                    <p className="text-gray-600">
                      Time:{" "}
                      {new Date(
                        registration.events.event_time
                      ).toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      Location: {registration.events.location}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events registered yet.</p>
            )}
          </div>
          {/* Blogs Written Section */}
          {(userDetails.role === "admin" || userDetails.role === "team") && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Blogs Written
              </h2>
              {blogs.length > 0 ? (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-gray-800">
                          {blog.title}
                        </p>
                        <Button
                          onClick={() => handleEditBlog(blog.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="text-gray-600 prose prose-sm max-w-none">
                        <MDXRemote {...blog.mdxSource} />
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        Created At:{" "}
                        {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No blogs written yet.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
