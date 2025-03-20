"use client";

import { useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  frontmatter?: Record<string, any>;
}
const CodeBlock = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      const codeElement = document.querySelector('.code-block-content');
      const textToCopy = codeElement?.textContent || '';
      
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative group">
      <pre className="bg-[#1e1e1e] rounded-lg p-4 overflow-x-auto my-4 text-gray-200 relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/70 hover:bg-gray-600/70 transition-colors duration-200"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>
        <code className="block code-block-content">{children}</code>
      </pre>
    </div>
  );
};


const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold my-4 text-foreground" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-4 text-foreground" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold mt-5 mb-3 text-foreground" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-lg font-bold mt-4 mb-2 text-foreground" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 leading-relaxed text-foreground" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 my-4 text-foreground" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 my-4 text-foreground" {...props} />
  ),
  li: (props: any) => <li className="mb-1 text-foreground" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-muted pl-4 py-1 my-4 italic text-muted-foreground"
      {...props}
    />
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary hover:text-primary/80 hover:underline"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target=""
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 hover:underline"
      >
        {children}
      </a>
    );
  },
  pre: (props: any) => <CodeBlock>{props.children}</CodeBlock>,
  img: (props: any) => (
    <Image
      {...props}
      alt={props.alt || ""}
      width={800}
      height={400}
      className="rounded-lg mx-auto my-6"
    />
  ),
  wrapper: (props: any) => <div className="my-6">{props.children}</div>,
  hr: () => <hr className="my-6 border-border" />,
  table: (props: any) => (
    <table className="w-full border-collapse my-6 text-foreground" {...props} />
  ),
  th: (props: any) => (
    <th
      className="border border-border px-4 py-2 text-left bg-muted"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border border-border px-4 py-2 text-foreground" {...props} />
  ),
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
    <div className="markdown prose prose-invert dark:prose-invert max-w-none">
      <MDXRemote
        {...mdxSource}
        components={components}
        frontmatter={frontmatter}
      />
    </div>
  );
}
