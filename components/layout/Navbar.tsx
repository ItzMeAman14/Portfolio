"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Magnetic } from "../ui/MagneticButton";
import { MobileMenu } from "./MobileMenu";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "@/lib/lenis";

interface NavbarProps {
  isBlogPage?: boolean;
}

export function Navbar({ isBlogPage = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollTo } = useLenis();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false);
    window.addEventListener("route-changed", handleRouteChange);
    return () => window.removeEventListener("route-changed", handleRouteChange);
  }, []);

  useEffect(() => {
    let lastScroll = 0;
    const st = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const currentScroll = self.scroll();

        if (currentScroll > 60) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        if (currentScroll > 240 && currentScroll > lastScroll + 4) {
          setIsHidden(true);
        } else if (currentScroll < lastScroll - 4) {
          setIsHidden(false);
        }
        lastScroll = currentScroll;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      const selector = href.startsWith("/#") ? href.substring(1) : href;
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        scrollTo(target as HTMLElement, { offset: -80 });
      }
    }
  };

  return (
    <header>
      <nav
        id="main-nav"
        aria-label="Main Navigation"
        className={`${isScrolled ? "scrolled" : ""} ${isHidden ? "nav-hidden" : ""}`}
      >
        <Magnetic>
          <Link
            href="/"
            className="nav-brand js-magnetic"
            aria-label="Aman Rehman Portfolio Home"
            onClick={(e) => {
              if (!isBlogPage) {
                const target = document.querySelector("#zone-hero");
                if (target) {
                  e.preventDefault();
                  scrollTo(target as HTMLElement, { offset: -80 });
                }
              }
            }}
          >
            <span className="brand-dot" aria-hidden="true"></span>
            <span className="nav-brand-text nav-brand-full">{siteConfig.name.toUpperCase()}</span>
            <span className="nav-brand-text nav-brand-short">{siteConfig.shortName}</span>
          </Link>
        </Magnetic>

        <ul className="nav-links">
          {siteConfig.navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`nav-link ${isBlogPage && item.href === "/blog" ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right-actions">
            <Magnetic>
              <Link
                href="/#zone-contact"
                className="nav-cta js-magnetic"
                onClick={(e) => handleNavClick(e, "/#zone-contact")}
              >
                <span>Get in Touch</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </Magnetic>
          <button
            className="mobile-menu-btn"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isBlogPage={isBlogPage}
      />
    </header>
  );
}
