"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { BlogCard } from "../ui/BlogCard";
import { Magnetic } from "../ui/MagneticButton";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function LatestBlogs() {
  const latestPosts = blogs.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll<HTMLElement>(".latest-blog-grid .blog-card");
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, root);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section id="zone-latest-blog" ref={sectionRef} aria-label="Latest Publications &amp; Articles">
      <div className="section-container">
        <div className="latest-blog-header-wrap" data-anim="fade-up">
          <div>
            <div className="section-heading-tag">
              <span className="mono-label">PUBLICATIONS &amp; WRITING</span>
            </div>
            <h2>Latest from My Blog</h2>
          </div>
          <Magnetic>
            <Link href="/blog" className="btn-outlined js-magnetic">
              <span>View All Posts</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </Magnetic>
        </div>

        <div id="latest-blog-grid" className="latest-blog-grid">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}