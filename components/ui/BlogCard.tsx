"use client";

import React from "react";
import { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const platformClass = post.platform.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <article>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="blog-card js-magnetic"
        aria-label={`Read ${post.title} on ${post.platform}`}
      >
        <div>
          <div className="blog-card-top">
            <span className={`blog-platform-badge ${platformClass}`}>
              {post.platform}
            </span>
            <span className="blog-date-wrap">
              <time dateTime={post.date}>{post.date}</time> &bull; {post.readTime}
            </span>
          </div>
          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-desc">{post.description}</p>
        </div>
        <div className="blog-card-footer">
          <div className="blog-tags">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
          <span className="blog-read-cta">Read Article &rarr;</span>
        </div>
      </a>
    </article>
  );
}
