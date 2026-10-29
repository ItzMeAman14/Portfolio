"use client";

import React, { useEffect, useRef } from "react";
import { marqueeTracks, skillCategories } from "@/data/skills";
import { ScrollTrigger, gsap } from "@/lib/gsap";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackLeftRef = useRef<HTMLDivElement>(null);
  const trackRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    let offset = 0;

    const applyMarquee = () => {
      const left = trackLeftRef.current;
      const right = trackRightRef.current;
      if (left) {
        const w = left.scrollWidth / 2;
        if (w > 0) left.style.transform = `translate3d(${-(offset % w)}px, 0, 0)`;
      }
      if (right) {
        const w = right.scrollWidth / 2;
        if (w > 0) right.style.transform = `translate3d(${-w + (offset % w)}px, 0, 0)`;
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          offset += 1.2 + Math.abs(self.getVelocity() * 0.05) * 0.08;
          applyMarquee();
        },
      });

      root.querySelectorAll<HTMLElement>(".js-skill-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true, 
            },
          }
        );
      });
    }, root);

    applyMarquee();
    document.fonts?.ready.then(() => {
      applyMarquee();
      ScrollTrigger.refresh();
    });
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert(); 
    };
  }, []);

  const marqueeLeftStr = marqueeTracks.trackLeft.join(" • ") + " • ";
  const marqueeRightStr = marqueeTracks.trackRight.join(" • ") + " • ";

  return (
    <section id="zone-skills" ref={sectionRef} aria-label="Technical Skills &amp; Architecture">
      <div className="section-container">
        <div className="skills-header" data-anim="fade-up">
          <div className="section-heading-tag">
            <span className="mono-label">SKILLS</span>
          </div>
          <h2>Technical Architecture &amp; Capabilities</h2>
        </div>
      </div>

      <div className="skills-marquee-container" aria-hidden="true">
        <div className="marquee-track marquee-track-left" ref={trackLeftRef}>
          <span className="marquee-text">{marqueeLeftStr}</span>
          <span className="marquee-text">{marqueeLeftStr}</span>
        </div>
        <div className="marquee-track marquee-track-right" ref={trackRightRef}>
          <span className="marquee-text">{marqueeRightStr}</span>
          <span className="marquee-text">{marqueeRightStr}</span>
        </div>
      </div>

      <div className="section-container">
        <div className="skills-cards-grid">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-category-card js-skill-card">
              <div className="skill-card-head">
                <h3>{cat.title}</h3>
                <span>{cat.tag}</span>
              </div>
              <div className="chips-flex">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}