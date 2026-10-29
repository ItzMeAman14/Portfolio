"use client";

import React, { useEffect, useRef } from "react";
import { journeyEntries } from "@/data/journey";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const timelinePath = root.querySelector("#timeline-path");
      if (timelinePath) {
        gsap.fromTo(
          timelinePath,
          { strokeDasharray: 1000, strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 65%",
              end: "bottom 85%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      root.querySelectorAll<HTMLElement>(".timeline-node").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 70%",
          onEnter: () => node.classList.add("active"),
          onLeaveBack: () => node.classList.remove("active"),
        });
      });

      root.querySelectorAll<HTMLElement>(".js-timeline-entry").forEach((entry) => {
        const card = entry.querySelector<HTMLElement>(".timeline-card");
        if (!card) return;
        const isLeft = entry.getAttribute("data-side") === "left";

        gsap.fromTo(
          card,
          { x: isLeft ? -70 : 70, rotation: isLeft ? -3 : 3, opacity: 0 },
          {
            x: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, root);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert(); 
    };
  }, []);

  return (
    <section id="zone-journey" ref={sectionRef} aria-label="Career Journey, Distinctions and Education">
      <div className="section-container">
        <div className="journey-header" data-anim="fade-up">
          <div className="section-heading-tag" style={{ justifyContent: "center" }}>
            <span className="mono-label">JOURNEY</span>
          </div>
          <h2>Professional Experience &amp; Distinctions</h2>
        </div>

        <div className="timeline-wrapper">
          <svg
            className="timeline-svg"
            viewBox="0 0 4 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C5CFF" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#C8FF3D" />
              </linearGradient>
            </defs>
            <line x1="2" y1="0" x2="2" y2="1000" className="timeline-bg-line" />
            <line
              x1="2"
              y1="0"
              x2="2"
              y2="1000"
              className="timeline-draw-line"
              id="timeline-path"
            />
          </svg>

          <div className="timeline-entries">
            {journeyEntries.map((entry, idx) => (
              <div
                key={idx}
                className={`timeline-row ${entry.side} js-timeline-entry`}
                data-side={entry.side}
              >
                <div className="timeline-node" aria-hidden="true"></div>
                <div className="timeline-card">
                  <div className="timeline-card-date">{entry.date}</div>
                  <h3 className="timeline-card-role">{entry.role}</h3>
                  <div className="timeline-card-company">{entry.company}</div>
                  <ul className="timeline-bullets">
                    {entry.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}