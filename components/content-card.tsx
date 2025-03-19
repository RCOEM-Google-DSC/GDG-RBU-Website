"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ContentCardProps {
  title: string;
  description: string;
  author?: string;
  date: string;
  href: string;
  children?: ReactNode;
}

export function ContentCard({
  title,
  description,
  author,
  date,
  href,
  children,
}: ContentCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <Link href={href} className="no-underline">
        <h3 className="mb-2 text-xl font-medium text-foreground">{title}</h3>
      </Link>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          {author && (
            <>
              <span>{author}</span>
              <span className="mx-2">•</span>
            </>
          )}
          <time dateTime={date}>{date}</time>
        </div>
        {children}
      </div>
    </div>
  );
}
