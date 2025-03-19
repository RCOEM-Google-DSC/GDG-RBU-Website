/* Author: Annalhq Shaikh 
Date: 20-03-2025 */

"use client";

import { MDXRemote } from "next-mdx-remote";

interface MarkdownRendererProps {
  content: string;
  frontmatter?: Record<string, any>;
}

const components = {
     a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
          return (
               <a href={href} target="" rel="noopener noreferrer">
                    {children}
               </a>
          );
     },
};

export function MarkdownRenderer({
  content,
  frontmatter,
}: MarkdownRendererProps) {
  if (!content) {
    return <div>No content provided</div>;
  }

  const mdxSource = JSON.parse(content);

  return (
    <div className="markdown">
      <MDXRemote
        {...mdxSource}
        components={components}
        frontmatter={frontmatter}
      />
    </div>
  );
}
