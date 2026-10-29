"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useLenis } from "@/lib/lenis";
import { gsap } from "@/lib/gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isBlogPage?: boolean;
}

export function MobileMenu({ isOpen, onClose, isBlogPage = false }: MobileMenuProps) {
  const { pause, resume, scrollTo } = useLenis();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      pause();
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".mobile-drawer-link, .mobile-drawer-cta-wrap",
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.04, duration: 0.35, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      resume();
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      resume();
    };
  }, [isOpen, pause, resume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("#mobile-menu-toggle")
      ) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onClose]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    document.body.style.overflow = "";
    document.body.style.position = "";
    resume();

    if (href.startsWith("/#") || href.startsWith("#")) {
      const selector = href.startsWith("/#") ? href.substring(1) : href;
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        scrollTo(target as HTMLElement, { offset: -80 });
      }
    } else if (href === "/" && !isBlogPage) {
      const target = document.querySelector("#zone-hero");
      if (target) {
        e.preventDefault();
        scrollTo(target as HTMLElement, { offset: -80 });
      }
    }
  };

  return (
    <div
      ref={drawerRef}
      id="mobile-drawer"
      role="dialog"
      aria-label="Mobile Navigation Menu"
      aria-hidden={!isOpen}
      className={isOpen ? "open" : ""}
    >
      {/* Home / Portfolio Link */}
      <Link
        href="/"
        className={`mobile-drawer-link ${!isBlogPage ? "active" : ""}`}
        aria-current={!isBlogPage ? "page" : undefined}
        onClick={(e) => handleLinkClick(e, "/")}
      >
        <span>Home</span>
        <span>&rarr;</span>
      </Link>

      {/* Section Items & Blog */}
      {siteConfig.navItems.map((item) => {
        const isBlogLink = item.href === "/blog";
        const isActive = isBlogLink && isBlogPage;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`mobile-drawer-link ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
            onClick={(e) => handleLinkClick(e, item.href)}
          >
            <span>{item.fullTitle || item.label}</span>
            <span>&rarr;</span>
          </Link>
        );
      })}

    </div>
  );
}
