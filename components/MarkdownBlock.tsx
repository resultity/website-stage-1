// components/MarkdownBlock.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Components } from "react-markdown";

type MarkdownBlockProps = {
  children: string;
  className?: string;
  linkTargetBlank?: boolean;
};

export default function MarkdownBlock({
  children,
  className,

}: MarkdownBlockProps) {
  const components: Components = {
    // Headings: use Bulma sizing via classes; anchors are added by rehype plugins
    h1: ({ node, ...props }) => <h1 className="title is-2" {...props} />,
    h2: ({ node, ...props }) => <h2 className="title is-3 mt-5" {...props} />,
    h3: ({ node, ...props }) => <h3 className="title is-4 mt-4" {...props} />,
    h4: ({ node, ...props }) => <h4 className="title is-5 mt-3" {...props} />,
    h5: ({ node, ...props }) => <h5 className="title is-6 mt-2" {...props} />,
    h6: ({ node, ...props }) => <h6 className="title is-6 has-text-white mt-2" {...props} />,

    // Paragraphs and lists get comfortable spacing
    p: ({ node, ...props }) => <p className="mb-4 has-text-white" {...props} />,
    ul: ({ node, ...props }) => <ul className="mb-4" {...props} />,
    ol: ({ node, ...props }) => <ol className="mb-4" {...props} />,
    li: ({ node, ...props }) => <li className="mb-2 has-text-white" {...props} />,

    // Tables wrapped to allow horizontal scroll on small screens
    table: ({ node, ...props }) => (
      <div className="table-container mb-5">
        <table className="table is-striped is-hoverable is-fullwidth" {...props} />
      </div>
    ),



    // Images constrained to container width
    img: ({ node, alt, src, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src || ""}
        alt={alt || ""}
        className="image"
        style={{ maxWidth: "100%", height: "auto" }}
        {...props}
      />
    ),

 
  };

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: "has-text-white",
              },
            },
          ],
        ]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
