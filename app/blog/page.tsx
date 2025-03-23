import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/mdx";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof posts>
  );

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 pt-24">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Our Blog</h1>
        <p className="text-muted-foreground text-lg">
          Insights, stories, and updates from our team.
        </p>
      </div>

      {years.map((year) => (
        <div key={year} className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">{year}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsByYear[year].map((post) => (
              <div
                key={post.slug}
                className="transition-transform duration-200 hover:scale-105"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-2xl border border-border border-opacity-30"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 bg-background">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <div className="flex items-center space-x-2">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
