import { cn } from "@/lib/utils";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createClient } from "@/utils/supabase/server";

interface User {
  id: string;
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
      users:writer_id (id, name, image)
    `
    )
    .returns<Blogs[]>();

  return data;
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="max-w-xs w-full group/card"
          >
            <div
              className={cn(
                "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4",
                "bg-cover"
              )}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${blog.image_url})`,
              }}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                <Image
                  height={40}
                  width={40}
                  alt={blog.users?.name || "User"}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${blog.users?.image}`}
                  className="h-10 w-10 rounded-full border-2 object-cover "
                />
                <div className="flex flex-col">
                  <p className="font-normal text-base text-gray-50 relative z-10">
                    {blog.users?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text content">
                <div className="text-gray-50 relative z-10 my-4">
                  {/* 
                   THIS IS USED TO RENDER THE MDX CONTENT -- WILL BE USED TO DISPLAY THE BLOG CONTENT
                  <MDXRemote source={blog.content.slice(0, 100)} />
                   */}

                  <p>{blog.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
