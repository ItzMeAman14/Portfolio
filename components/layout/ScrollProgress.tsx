"use client";

import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "@/lib/lenis";

const miniMapZones = [
  { target: "#zone-hero", label: "HERO" },
  { target: "#zone-summary", label: "SUMMARY" },
  { target: "#zone-skills", label: "SKILLS" },
  { target: "#zone-projects", label: "PROJECTS" },
  { target: "#zone-moments", label: "MOMENTS" },
  { target: "#zone-journey", label: "JOURNEY" },
  { target: "#zone-latest-blog", label: "BLOG" },
  { target: "#zone-contact", label: "CONTACT" },
];

export function ScrollProgress() {
  const [progressHeight, setProgressHeight] = useState("0%");
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const progressTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgressHeight(`${self.progress * 100}%`);
      },
    });

    const zoneTriggers = miniMapZones.map((zone, idx) => {
      const el = document.querySelector(zone.target);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: zone.target,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveIndex(idx),
        onEnterBack: () => setActiveIndex(idx),
      });
    });

    return () => {
      progressTrigger.kill();
      zoneTriggers.forEach((t) => t?.kill());
    };
  }, []);

  const handleZoneClick = (target: string) => {
    scrollTo(target);
  };

  return (
    <>
      <div id="progress-rail" aria-hidden="true">
        <div id="progress-bar" style={{ height: progressHeight }}></div>
      </div>

      <aside aria-label="Page Sections Mini-Map">
        <ul id="mini-map">
          {miniMapZones.map((zone, idx) => (
            <li
              key={zone.target}
              className={`mini-map-item ${activeIndex === idx ? "active" : ""}`}
              data-target={zone.target}
              onClick={() => handleZoneClick(zone.target)}
            >
              <span className="mini-map-label">{zone.label}</span>
              <span className="mini-map-dot"></span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
