"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/lib/lenis";

interface IntroProps {
  statusText?: string;
  onFinished?: () => void;
  
  storageKey?: string | null;
}

export function Intro({
  statusText = "Initializing Cybernetic Space",
  onFinished,
  storageKey = "portfolio_intro_played",
}: IntroProps) {
  
  const [visible, setVisible] = useState(storageKey === null);
  const [count, setCount] = useState("000");
  const loaderRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  const { pause, resume } = useLenis();
  const pauseRef = useRef(pause);
  pauseRef.current = pause;
  const resumeRef = useRef(resume);
  resumeRef.current = resume;

  useEffect(() => {
    if (typeof window === "undefined") return;

    let alreadyPlayed = false;
    
    if (storageKey) {
      try {
        alreadyPlayed = sessionStorage.getItem(storageKey) === "true";
      } catch {
        alreadyPlayed = false;
      }
    }

    if (alreadyPlayed) {
      document.body.style.overflow = "";
      resumeRef.current();
      onFinishedRef.current?.();
      window.dispatchEvent(new CustomEvent("intro-finished"));
      return;
    }

    setVisible(true);
    pauseRef.current();
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = isReduced ? 0.3 : storageKey === null ? 0.9 : 1.4;

    const countObj = { val: 0 };
    const tween = gsap.to(countObj, {
      val: 100,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        const cur = Math.floor(countObj.val);
        setCount(cur < 10 ? `00${cur}` : cur < 100 ? `0${cur}` : "100");
      },
      onComplete: () => {
        if (storageKey) {
          try {
            sessionStorage.setItem(storageKey, "true");
          } catch {}
        }

        gsap.to(contentRef.current, { opacity: 0, duration: 0.25 });
        gsap.to(topPanelRef.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut" });
        gsap.to(bottomPanelRef.current, {
          yPercent: 100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            setVisible(false);
            document.body.style.overflow = "";
            resumeRef.current();
            onFinishedRef.current?.();
            if (storageKey) window.dispatchEvent(new CustomEvent("intro-finished"));
          },
        });
      },
    });

      return () => {
      tween.kill();
      document.body.style.overflow = "";
      resumeRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div id="loader" ref={loaderRef} aria-hidden="true">
      <div className="loader-panel loader-top" ref={topPanelRef}></div>
      <div className="loader-panel loader-bottom" ref={bottomPanelRef}></div>
      <div className="loader-content" ref={contentRef}>
        <div className="loader-counter" id="loader-num">
          {count}
        </div>
        <div className="loader-status">{statusText}</div>
      </div>
    </div>
  );
}