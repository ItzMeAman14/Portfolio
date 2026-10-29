"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { blogs, BlogPost } from "@/data/blogs";
import { BlogCard } from "@/components/ui/BlogCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/layout/Intro";

const filterOptions = [
  { label: "All Articles", value: "All" },
  { label: "Astrea IT", value: "Astrea IT" },
  { label: "Agentforce", value: "Agentforce" },
  { label: "Data Cloud", value: "Data Cloud" },
  { label: "Marketing Cloud", value: "Marketing Cloud" },
  { label: "AI & Automation", value: "Automation" },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const sortedArticles = useMemo(() => {
    return [...blogs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filter = activeFilter.toLowerCase();

    return sortedArticles.filter((post) => {
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchFilter =
        filter === "all" ||
        post.platform.toLowerCase() === filter ||
        post.tags.some((t) => t.toLowerCase().includes(filter)) ||
        (filter === "marketing cloud" &&
          post.tags.some((t) => /marketing|sfmc/i.test(t))) ||
        (filter === "automation" &&
          post.tags.some((t) => /automation|cases|slack|ai/i.test(t)));

      return matchQuery && matchFilter;
    });
  }, [searchQuery, activeFilter, sortedArticles]);

  // Featured post logic
  const featuredPost: BlogPost | null = useMemo(() => {
    return (
      filtered.find((p) => p.featured) ||
      (searchQuery === "" && activeFilter === "All"
        ? sortedArticles.find((p) => p.featured) || null
        : null)
    );
  }, [filtered, searchQuery, activeFilter, sortedArticles]);

  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filtered.filter((p) => p.id !== featuredPost.id);
    }
    return filtered;
  }, [filtered, featuredPost]);

  const isEmpty = filtered.length === 0;

  return (
    <>
      <Intro statusText="Loading Blog" storageKey={null} />
      <Navbar isBlogPage />

      <main>
        <div className="section-container">
          <header className="blog-page-hero">
            <Link
              href="/"
              className="blog-back-btn"
              aria-label="Back to Portfolio"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Portfolio</span>
            </Link>

            <div className="section-heading-tag">
              <span className="mono-label">PUBLICATIONS &amp; ARTICLES</span>
            </div>
            <h1>Writing</h1>
            <p>
              Technical articles, architectural deep dives and lessons from
              building production systems at Astrea IT.
            </p>
          </header>

          <section
            className="blog-controls-wrap"
            aria-label="Search and filter articles"
          >
            <div className="blog-search-box">
              <svg
                className="blog-search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="search"
                id="blog-search"
                className="blog-search-input"
                placeholder="Search by title, topic, or keyword (e.g. Data Cloud, Agentforce)..."
                aria-label="Search articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div
              className="blog-filter-pills"
              role="tablist"
              aria-label="Filter by topic or category"
            >
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`blog-filter-chip ${
                    activeFilter === opt.value ? "active" : ""
                  }`}
                  data-filter={opt.value}
                  role="tab"
                  aria-selected={activeFilter === opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {featuredPost && (
            <section
              id="featured-blog-container"
              className="featured-blog-section"
              aria-label="Featured Article"
            >
              <article>
                <a
                  href={featuredPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-blog-card"
                  aria-label={`Read featured article: ${featuredPost.title}`}
                >
                  <div>
                    <span className="featured-badge">
                      ★ Featured Article &bull; {featuredPost.platform}
                    </span>
                    <h2 className="featured-title">{featuredPost.title}</h2>
                    <p className="featured-desc">{featuredPost.description}</p>
                    <div
                      className="blog-card-footer"
                      style={{ borderTop: "none", paddingTop: 0 }}
                    >
                      <div className="blog-tags">
                        {featuredPost.tags.map((tag) => (
                          <span key={tag} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="blog-read-cta">
                        Read on {featuredPost.platform} &rarr;
                      </span>
                    </div>
                  </div>
                  <div className="featured-visual-box">
                    <svg
                      className="featured-svg-code"
                      viewBox="0 0 320 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="320" height="200" rx="10" fill="#0E1220" />
                      <rect
                        x="25"
                        y="30"
                        width="120"
                        height="12"
                        rx="4"
                        fill="#7C5CFF"
                        opacity="0.8"
                      />
                      <rect
                        x="25"
                        y="55"
                        width="220"
                        height="10"
                        rx="3"
                        fill="#171B2E"
                      />
                      <rect
                        x="25"
                        y="75"
                        width="180"
                        height="10"
                        rx="3"
                        fill="#171B2E"
                      />
                      <circle
                        cx="260"
                        cy="140"
                        r="35"
                        stroke="rgba(34, 211, 238, 0.4)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="260"
                        cy="140"
                        r="18"
                        fill="#C8FF3D"
                        opacity="0.8"
                      />
                      <rect
                        x="25"
                        y="130"
                        width="140"
                        height="25"
                        rx="6"
                        fill="#22D3EE"
                        opacity="0.2"
                      />
                      <text
                        x="35"
                        y="146"
                        fill="#22D3EE"
                        fontFamily="monospace"
                        fontSize="10"
                      >
                        Data Cloud 360
                      </text>
                    </svg>
                  </div>
                </a>
              </article>
            </section>
          )}

          <section aria-label="All Blog Articles">
            {gridPosts.length > 0 && (
              <div id="blog-posts-grid" className="blog-posts-grid">
                {gridPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            <div
              id="blog-empty-state"
              className={`blog-empty-state ${isEmpty ? "show" : ""}`}
              role="status"
            >
              <h3>No articles found</h3>
              <p>
                Try searching for a different keyword or resetting your platform
                filter.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
