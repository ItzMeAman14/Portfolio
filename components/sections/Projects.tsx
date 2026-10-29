"use client";

import React, { useEffect, useState, useRef } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PROJECT_CARDS_SPEED_CONFIG = {
  holdDistance: "30vh", // 25-35vh hold spacer so cards don't feel like they crawl
  scrub: 0.5,           // Snappy 0.5 scrub without laggy catch-up delay
  scaleDown: 0.94,      // Gentle scale down to 0.94 on covered card
  dimBrightness: 0.8,   // Dim with filter: brightness(0.8) - solid, readable, never transparent
  rotate: -1.0,         // Subtle -1.0deg rotation
};

export function Projects() {
  const [activeCounter, setActiveCounter] = useState("01 / 04");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let desktopProjectCardTriggers: ScrollTrigger[] = [];

    const updateCounter = (index: number) => {
      setActiveCounter(`0${index} / 04`);
    };

    const cleanupProjectCardsMobile = () => {
      desktopProjectCardTriggers.forEach((st) => {
        try {
          st.kill();
        } catch {}
      });
      desktopProjectCardTriggers = [];

      ScrollTrigger.getAll().forEach((st) => {
        const triggerEl = st.trigger as HTMLElement | null;
        if (
          triggerEl &&
          (triggerEl.classList?.contains("project-card") ||
            triggerEl.closest?.(".project-card"))
        ) {
          try {
            st.kill();
          } catch {}
        }
      });

      const cards = document.querySelectorAll<HTMLElement>(".project-card");
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "all" });
        card.style.position = "";
        card.style.top = "";
        card.style.height = "";
        card.style.minHeight = "";
        card.style.marginBottom = "";
        card.style.zIndex = "";
        card.style.pointerEvents = "";
        card.style.transform = "";
        card.style.opacity = "";

        const inner = card.querySelector<HTMLElement>(".project-card__inner");
        if (inner) {
          gsap.set(inner, { clearProps: "all" });
          inner.style.pointerEvents = "auto";
          inner.style.filter = "";
        }

        const visual = card.querySelector<HTMLElement>(".mockup-visual");
        if (visual) gsap.set(visual, { clearProps: "all" });

        const graphic = card.querySelector<HTMLElement>(".mockup-svg-graphic");
        if (graphic) gsap.set(graphic, { clearProps: "all" });

        const infoEls = card.querySelectorAll<HTMLElement>(
          ".project-index, .project-title, .project-desc, .project-psr, .project-tags, .project-actions"
        );
        infoEls.forEach((el) => gsap.set(el, { clearProps: "all" }));
      });
    };

    const setupDesktopProjectCardStacking = () => {
      cleanupProjectCardsMobile();

      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const totalCards = cards.length;
      if (totalCards === 0) return;

      const { holdDistance, scrub, scaleDown, dimBrightness, rotate } =
        PROJECT_CARDS_SPEED_CONFIG;

      cards.forEach((card, i) => {
        card.style.marginBottom = holdDistance;

        card.style.zIndex = ((i + 1) * 10).toString();

        const inner = card.querySelector<HTMLElement>(".project-card__inner");
        if (inner) {
          gsap.set(inner, {
            scale: 1,
            rotation: 0,
            filter: "brightness(1)",
            pointerEvents: "auto",
            clearProps: "transform",
          });
        }

        const infoElements = [
          card.querySelector(".project-index"),
          card.querySelector(".project-title"),
          card.querySelector(".project-desc"),
          card.querySelector(".project-psr"),
          card.querySelector(".project-tags"),
          card.querySelector(".project-actions"),
        ].filter(Boolean);

        const infoAnim = gsap.from(infoElements, {
          y: 35,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: i === 0 ? "top 85%" : "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        if (infoAnim.scrollTrigger) desktopProjectCardTriggers.push(infoAnim.scrollTrigger);

        const visual = card.querySelector<HTMLElement>(".mockup-visual");
        if (visual) {
          const visualAnim = gsap.fromTo(
            visual,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: i === 0 ? "top 85%" : "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
          if (visualAnim.scrollTrigger) desktopProjectCardTriggers.push(visualAnim.scrollTrigger);
        }

        const graphic = card.querySelector<HTMLElement>(".mockup-svg-graphic");
        if (graphic) {
          const graphicAnim = gsap.fromTo(
            graphic,
            { y: 20 },
            {
              y: -20,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
          if (graphicAnim.scrollTrigger) desktopProjectCardTriggers.push(graphicAnim.scrollTrigger);
        }

        const counterST = ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          end: i === totalCards - 1 ? "bottom top" : "bottom 50%",
          onEnter: () => updateCounter(i + 1),
          onEnterBack: () => updateCounter(i + 1),
        });
        desktopProjectCardTriggers.push(counterST);
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const currentInner = currentCard.querySelector<HTMLElement>(".project-card__inner");
        if (!currentInner) continue;

        const stackAnim = gsap.to(currentInner, {
          scale: scaleDown,
          filter: `brightness(${dimBrightness})`,
          rotation: rotate,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: scrub,
            onUpdate: (self) => {
              if (self.progress > 0.88) {
                currentInner.style.pointerEvents = "none";
              } else {
                currentInner.style.pointerEvents = "auto";
              }
            },
          },
        });
        if (stackAnim.scrollTrigger) desktopProjectCardTriggers.push(stackAnim.scrollTrigger);
      }
    };

    const setupMobileProjectCardsList = () => {
      cleanupProjectCardsMobile();

      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card) => {
        const anim = gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
        if (anim.scrollTrigger) desktopProjectCardTriggers.push(anim.scrollTrigger);
      });

      ScrollTrigger.refresh();
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      setupDesktopProjectCardStacking();
      return () => {
        cleanupProjectCardsMobile();
      };
    });

    mm.add("(max-width: 1024px)", () => {
      setupMobileProjectCardsList();
      return () => {
        cleanupProjectCardsMobile();
      };
    });

    if (typeof document !== "undefined") {
      if (document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
      window.addEventListener("load", () => ScrollTrigger.refresh());
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mm.revert();
      cleanupProjectCardsMobile();
    };
  }, []);

  return (
    <section id="zone-projects" ref={containerRef} aria-label="Featured Projects">
      <div className="section-container">
        <div className="projects-header-wrap">
          <div data-anim="fade-up">
            <div className="section-heading-tag">
              <span className="mono-label">PROJECTS</span>
            </div>
            <h2>Production Systems &amp; Case Studies</h2>
          </div>
          <div
            className="projects-counter-badge"
            id="card-active-counter"
            aria-live="polite"
          >
            {activeCounter}
          </div>
        </div>

        <div className="projects-stack">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              zIndex={(idx + 1) * 10}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
