import Image from "next/image";
// import { MDXRemote } from "next-mdx-remote/rsc";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  role: string;
  name: string;
  image: string;
}

interface Blogs {
  id: string;
  writer_id: string;
  image_url: string;
  content: string;
  title: string;
  created_at: string;
  users: User;
}

async function getBlogs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select(
      `
      id,
      writer_id,
      image_url,
      content,
      title,
      created_at,
      users:writer_id (id, role, name, image)
    `
    )
    .returns<Blogs[]>();

  return data;
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div>
      {/* Nav Bar */}
      <nav className="flex items-center justify-between mb-8 w-[76rem] mr-28 ml-28">
        <img
          src="/gdgico.svg"
          alt="GDG Logo"
          className="w-16 h-16"
        />
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-black hover:text-gray-700"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-black hover:text-gray-700"
          >
            Events
          </Link>
          <Link
            href="/blogs"
            className="text-black hover:text-gray-700"
          >
            <span className="underline underline-offset-4">Blogs</span>
          </Link>
          <Link
            href="/team"
            className="text-black hover:text-gray-700"
          >
            Team
          </Link>
          <Link
            href="/domains"
            className="text-black hover:text-gray-700"
          >
           Domains
          </Link>
          <Link
            href="/contact"
            className="text-black hover:text-gray-700"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </div>
      </nav>

      {/* Blogs Content */}
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Blogs
          </h1>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog) => (
              <Dialog key={blog.id}>
                {/* Blog Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  {/* Blog Image */}
                  <div className="relative h-56 w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${blog.image_url}`}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Author Info */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-10 w-10">
                        <Image
                          src={`${
                            blog.users?.role === "user"
                              ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/emo/${blog.users?.image}`
                              : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${blog.users?.image}`
                          }`}
                          alt={blog.users?.name || "User"}
                          fill
                          className="rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {blog.users?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {blog.title}
                    </h2>

                    {/* Blog Content Preview */}
                    <div className="prose prose-sm text-gray-600">
                      {/* <MDXRemote source={blog.content.slice(0, 100) + "..."} /> */}
                      {blog.content.slice(0, 100) + "..."}
                    </div>

                    {/* Read More Button */}
                    <DialogTrigger asChild>
                      <Button className="mt-4">Read More</Button>
                    </DialogTrigger>
                  </div>
                </div>

                {/* Dialog for Full Blog Content */}
                <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {blog.title}
                    </DialogTitle>
                  </DialogHeader>

                  {/* Blog Image */}
                  <div className="relative h-64 w-full mb-6">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${blog.image_url}`}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative h-10 w-10">
                      <Image
                        src={`${
                          blog.users?.role === "user"
                            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/emo/${blog.users?.image}`
                            : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${blog.users?.image}`
                        }`}
                        alt={blog.users?.name || "User"}
                        fill
                        className="rounded-full object-cover border-2 border-white"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {blog.users?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Full Blog Content */}
                  <div className="prose prose-lg text-gray-700">
                    {/* <MDXRemote source={blog.content} /> */}
                    {blog.content}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
