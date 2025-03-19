import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { MarkdownRenderer } from "@/components/markdown/mdx-renderer";
import { getBlogPosts, getPost } from "@/lib/mdx";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost(props: {
  params: { slug: string };
}): Promise<ReactElement> {
  const { params } = await props;
  const { slug } = params;
  const post = await getPost("blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <article data-pagefind-body>
        <header className="mb-8">
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h2 className="mb-2 text-3xl font-bold">{post.title}</h2>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>
        <MarkdownRenderer
          content={post.content}
          frontmatter={{
            title: post.title,
            description: post.description,
            date: post.date,
            author: post.author,
            image: post.image,
          }}
        />
      </article>
    </div>
  );
}
