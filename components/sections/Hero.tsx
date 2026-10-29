"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface HeroProps {
  introFinished?: boolean;
}

export function Hero({ introFinished }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const hasAnimatedEntranceRef = useRef(false);

  const name = siteConfig.name.toUpperCase();
  const words = name.split(" ");
  const entranceTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = containerRef.current;
    const q = gsap.utils.selector(root); 

    const playEntranceAnimation = () => {
      if (hasAnimatedEntranceRef.current) return;
      hasAnimatedEntranceRef.current = true;

      if (isReduced) {
        gsap.set(q(".hero-char, .hero-badge, .hero-role-title, .hero-pitch, .cred-pill, .scroll-cue"), {
          opacity: 1,
          yPercent: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      const tl = gsap.timeline();
      entranceTl.current = tl;

      tl.fromTo(
        q(".hero-char"),
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: "power3.out" }
      );

      tl.fromTo(
        q(".hero-badge"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.7"
      );

      tl.fromTo(
        q(".hero-role-title"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.55"
      );

      tl.fromTo(
        q(".hero-pitch"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      tl.fromTo(
        q(".hero-credentials-pills .cred-pill"),
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.4)" },
        "-=0.5"
      );

      tl.fromTo(
        q(".scroll-cue"),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    };

    if (introFinished) playEntranceAnimation();

    const handleIntroEvent = () => playEntranceAnimation();
    window.addEventListener("intro-finished", handleIntroEvent);

    const fallbackTimer = setTimeout(playEntranceAnimation, 2400);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("intro-finished", handleIntroEvent);
    };
  }, [introFinished]);

  useEffect(() => {
    return () => {
      entranceTl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    if (isReduced) return;

    const mm = gsap.matchMedia(containerRef.current); 
    const secondary = ".hero-badge, .hero-role-title, .hero-pitch, .hero-credentials-pills, .scroll-cue";

    mm.add("(min-width: 1025px)", () => {
      const heroPinTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      heroPinTL.fromTo(
        heroNameRef.current,
        { scale: 1, opacity: 1 },
        { scale: 6.0, opacity: 0, ease: "power2.inOut", immediateRender: false },
        0
      );

      heroPinTL.fromTo(
        secondary,
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -40, scale: 0.85, ease: "power1.out", immediateRender: false },
        0
      );
    });

    mm.add("(min-width: 601px) and (max-width: 1024px)", () => {
      gsap.fromTo(
        heroNameRef.current,
        { scale: 1, opacity: 1, y: 0 },
        {
          scale: 1.6,
          opacity: 0.15,
          y: -35,
          ease: "power1.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        }
      );
    });

    mm.add("(max-width: 600px)", () => {
      gsap.fromTo(
        heroNameRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0.25,
          y: -20,
          ease: "power1.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="zone-hero" ref={containerRef} aria-label="Introduction Hero">
      <div className="hero-pinned-wrapper">
        <div className="hero-badge">
          <span className="pulse-dot" aria-hidden="true"></span>
          <span className="mono-label">{siteConfig.availability}</span>
        </div>

        <div className="hero-title-container">
          <h1
            id="hero-name"
            ref={heroNameRef}
            aria-label={siteConfig.name.toUpperCase()}
            data-name={siteConfig.name.toUpperCase()}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap" aria-hidden="true">
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex} className="hero-char-mask">
                    <span className="hero-char">{char}</span>
                  </span>
                ))}
                {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-role-title">{siteConfig.role}</div>

        <p className="hero-pitch">{siteConfig.pitch}</p>

        <div className="hero-credentials-pills">
          {siteConfig.credentials.map((pill) => (
            <span key={pill.text} className={`cred-pill ${pill.highlight ? "highlight" : ""}`}>
              {pill.text}
            </span>
          ))}
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to begin</span>
          <div className="scroll-cue-line"></div>
        </div>
      </div>
    </section>
  );
}