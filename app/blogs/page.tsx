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
  created_at: string;
  users: User;
}
export default async function Blogs() {
  const supabase = await createClient();

  // Fetch blogs along with the writer's details
  const { data: blogs } = await supabase
    .from("blogs")
    .select(
      `
      id,
      writer_id,
      image_url,
      content,
      created_at,
      users:writer_id (id, name, image)
    `
    )
    .returns<Blogs[]>();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <pre>{JSON.stringify(blogs, null, 2)}</pre>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-background rounded-lg shadow-md overflow-hidden border border-border"
          >
            {/* Blog Image */}
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${blog.image_url}`}
              alt={blog.content.slice(0, 50)}
              className="w-full h-48 object-cover"
            />
            {/* Blog Details */}
            <div className="p-4">
              {/* Writer Details */}
              <div className="flex items-center mb-4">
                {/*  NOW THE USER PROFILE PART IS NOT SETUP -- IMAGE */}
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${blog.users?.image}`}
                  // alt={blog.users?.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {blog.users?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* Blog Content */}
              {/* <div className="p-4 text-foreground">
                <MDXRemote source={blog.content} />
              </div> */}
              <div className="p-4 text-foreground">
                <MDXRemote source={blog.content.slice(0, 100)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
