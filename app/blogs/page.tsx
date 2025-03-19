import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
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
    <div className="min-h-screen bg-background dark:bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-thin text-center mb-8 md:mb-12 text-foreground">
          Our Blogs
        </h1>

        {/* Categories - Mobile Responsive */}
        <div className="bg-primary rounded-full p-3 md:p-4 mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
          <div className="text-primary-foreground font-thin text-sm md:text-base w-full md:w-auto">CATEGORIES</div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <Button size="sm" variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-black rounded-full hover:bg-primary-foreground/20 font-thin text-xs md:text-sm px-2 md:px-3 h-8">ALL</Button>
            <Button size="sm" variant="outline" className="bg-primary-foreground/10 text-primary-foreground  border-black rounded-full hover:bg-primary-foreground/20 font-thin text-xs md:text-sm px-2 md:px-3 h-8">AI/ML</Button>
            <Button size="sm" variant="outline" className="bg-primary-foreground/10 text-primary-foreground  border-black rounded-full hover:bg-primary-foreground/20 font-thin text-xs md:text-sm px-2 md:px-3 h-8">WEB DEV</Button>
            <Button size="sm" variant="outline" className="bg-primary-foreground/10 text-primary-foreground  border-black rounded-full hover:bg-primary-foreground/20 font-thin text-xs md:text-sm px-2 md:px-3 h-8">SOFT SKILLS</Button>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {blogs?.map((blog, index) => (
            <Dialog key={blog.id}>
              <div className="border border-border p-4 md:p-6 hover:shadow-lg transition-shadow bg-card">
                {/* Blog Image */}
                <div className="relative mb-3 md:mb-4">
                  <div className="relative h-48 md:h-64 w-full bg-muted flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-thin text-muted-foreground">BLOG</span>
                    <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 16L22 22M12 4H4V20H20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Blog Title */}
                <h2 className="text-lg md:text-xl font-thin text-card-foreground mb-4 md:mb-6 line-clamp-2">
                  {blog.title || 
                    (index === 0 ? "The Problem of today's software..." : 
                    index === 1 ? "The hidden messages behind...." : 
                    "Behind the scenes of the ....")}
                </h2>

                {/* Blog Meta */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs md:text-sm text-muted-foreground font-thin gap-2 sm:gap-0">
                  <div className="flex space-x-2">
                    <span>Date</span>
                    <span>{new Date(blog.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).replace(/\//g, '.')}</span>
                  </div>
                  <div className="flex space-x-2">
                    <span>Written By</span>
                    <span>{blog.users?.name || "XYZ"}</span>
                  </div>
                </div>

                {/* Invisible Dialog Trigger */}
                <DialogTrigger className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>

              {/* Dialog for Full Blog Content */}
              <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto bg-background p-4 md:p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl md:text-2xl font-thin text-foreground">
                    {blog.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Blog Image */}
                <div className="relative h-48 md:h-64 w-full mb-4 md:mb-6">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${blog.image_url}`}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="relative h-8 w-8 md:h-10 md:w-10">
                    <Image
                      src={`${
                        blog.users?.role === "user"
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/emo/${blog.users?.image}`
                          : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${blog.users?.image}`
                      }`}
                      alt={blog.users?.name || "User"}
                      fill
                      className="rounded-full object-cover border-2 border-background"
                    />
                  </div>
                  <div className="font-thin">
                    <p className="font-thin text-foreground text-sm md:text-base">
                      {blog.users?.name}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Full Blog Content */}
                <div className="prose-sm md:prose-base lg:prose-lg dark:prose-invert text-foreground font-thin">
                  {blog.content}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}