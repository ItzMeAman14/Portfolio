"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

export function NavigationHandler() {
  const pathname = usePathname();
  const { resume, scrollTo } = useLenis();
  const isFirstMount = useRef(true);

  useEffect(() => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.classList.remove("lightbox-open", "menu-open");

    window.dispatchEvent(new CustomEvent("route-changed"));

    resume();

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          scrollTo(target as HTMLElement, { offset: -80 });
          return;
        }
      }

      if (!isFirstMount.current && !window.location.hash) {
        scrollTo(0, { immediate: true });
      }
      isFirstMount.current = false;
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, resume, scrollTo]);

  return null;
}
