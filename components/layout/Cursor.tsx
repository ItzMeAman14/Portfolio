"use client";

import React, { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(render);

    const handleProjectEnter = () => ring.classList.add("is-project-hover");
    const handleProjectLeave = () => ring.classList.remove("is-project-hover");
    const handleTextEnter = () => ring.classList.add("is-text-hover");
    const handleTextLeave = () => ring.classList.remove("is-text-hover");

    const projectCards = document.querySelectorAll(".project-card, .moment-card, .blog-card");
    projectCards.forEach((c) => {
      c.addEventListener("mouseenter", handleProjectEnter);
      c.addEventListener("mouseleave", handleProjectLeave);
    });

    const textEls = document.querySelectorAll("h1, h2, h3, p, .summary-statement");
    textEls.forEach((t) => {
      t.addEventListener("mouseenter", handleTextEnter);
      t.addEventListener("mouseleave", handleTextLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      projectCards.forEach((c) => {
        c.removeEventListener("mouseenter", handleProjectEnter);
        c.removeEventListener("mouseleave", handleProjectLeave);
      });
      textEls.forEach((t) => {
        t.removeEventListener("mouseenter", handleTextEnter);
        t.removeEventListener("mouseleave", handleTextLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} id="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" ref={ringRef} id="cursor-ring" aria-hidden="true"></div>
    </>
  );
}
