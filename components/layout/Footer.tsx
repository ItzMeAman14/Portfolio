"use client";

import React from "react";
import { useLenis } from "@/lib/lenis";
import { Magnetic } from "../ui/MagneticButton";

export function Footer() {
  const { scrollTo } = useLenis();

  const handleBackToTop = () => {
    scrollTo(0, { duration: 1.8 });
  };

  return (
    <footer>
      <div className="section-container">
        <div className="footer-inner">
          <p className="footer-copy">
            &copy; 2026 Aman Rehman &bull; Salesforce Developer &amp; Forward Deployed Engineer
          </p>
          <Magnetic>
            <button
              type="button"
              className="back-to-top-btn js-magnetic"
              id="back-to-top-btn"
              onClick={handleBackToTop}
            >
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
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
              <span>Back to Top</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
