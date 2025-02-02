// import { createClient } from "@/utils/supabase/server";

// export default async function Blogs() {
//   const supabase = await createClient();
//   const { data: blogs } = await supabase.from("blogs").select();

//   return <pre>{JSON.stringify(blogs, null, 2)}</pre>;
// }
import { createClient } from "@/utils/supabase/server";
import ReactMarkdown from "react-markdown";

export default async function Blogs() {
  const supabase = await createClient();

  // Fetch blogs along with the writer's details
  const { data: blogs } = await supabase.from("blogs").select(`
      id,
      writer_id,
      image_url,
      content,
      created_at,
      users:writer_id (id, name, image)
    `);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <pre>{JSON.stringify(blogs, null, 2)}</pre>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Blog Image */}
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${blog.image_url}`}
              alt={blog.content.slice(0, 50)} // Use the first 50 chars of content as alt text
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
                  <p className="font-semibold">{blog.users?.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* Blog Content */}
              {/* <p className="text-gray-600">{blog.content.slice(0, 100)}...</p> */}
              {/* Blog Content */}
              <div className="p-4">
                <ReactMarkdown>{blog.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
