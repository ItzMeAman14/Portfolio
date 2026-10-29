"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const formatStat = (target: number, cur: number) => {
  if (target === 400) return `${cur}+`;
  if (target === 20) return `${cur}K+`;
  return String(cur);
};

export function Summary() {
  const sectionRef = useRef<HTMLElement>(null);

  const words = siteConfig.statement.trim().split(/\s+/);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordEls = root.querySelectorAll<HTMLElement>(".word");
    const counterEls = root.querySelectorAll<HTMLElement>(".stat-counter");

    const setCounterText = (el: HTMLElement, text: string) => {
      if (el.firstChild) el.firstChild.nodeValue = text;
      else el.textContent = text;
    };

    if (isReduced) {
      gsap.set(wordEls, { opacity: 1, color: "#F2F4FF" });
      counterEls.forEach((c) => {
        const target = parseFloat(c.getAttribute("data-target") || "0");
        setCounterText(c, formatStat(target, target));
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { opacity: 0.2, color: "#8B92B5" },
        {
          opacity: 1,
          color: "#F2F4FF",
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      counterEls.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        const state = { val: 0 };

        ScrollTrigger.create({
          trigger: root,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(state, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => setCounterText(counter, formatStat(target, Math.floor(state.val))),
              onComplete: () => setCounterText(counter, formatStat(target, target)),
            });
          },
        });
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
    <section id="zone-summary" ref={sectionRef} aria-label="Professional Summary">
      <div className="section-container">
        <div className="section-heading-tag" data-anim="fade-up">
          <span className="mono-label">SUMMARY</span>
        </div>

        <div className="summary-grid">
          <div>
            <p className="summary-statement" id="summary-scrub-text" aria-label={siteConfig.statement}>
              {words.map((w, i) => (
                <React.Fragment key={i}>
                  <span className="word" aria-hidden="true">{w}</span>
                  {i < words.length - 1 ? " " : null}
                </React.Fragment>
              ))}
            </p>
          </div>

          <aside className="summary-aside" data-anim="fade-up">
            <div className="portrait-wrap">
              <div className="portrait-ring" aria-hidden="true">
                <div className="portrait-inner">AR</div>
              </div>
              <div className="portrait-meta">
                <h4>{siteConfig.name}</h4>
                <p>{siteConfig.location} &bull; Astrea IT</p>
              </div>
            </div>

            <div className="stats-row">
              {siteConfig.stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <h3 className="stat-counter" data-target={stat.value}>
                    0
                  </h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}