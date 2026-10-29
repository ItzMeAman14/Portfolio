"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/data/site";
import { CopyEmailButton } from "../ui/CopyEmailButton";
import { useToast } from "../ui/Toast";
import { Magnetic } from "../ui/MagneticButton";
import { Footer } from "../layout/Footer";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const RESUME_URL = "/Aman_Rehman_Resume.pdf";
const RESUME_FILE_NAME = "Aman_Rehman_Resume.pdf";

export function Contact() {
  const { showToast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll<HTMLElement>(".contact-line-inner");
      const card = root.querySelector<HTMLElement>(".contact-card-glass");

      if (lines.length) {
        gsap.fromTo(
          lines,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
          }
        );
      }

      if (card) {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
          }
        );
      }
    }, root);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section id="zone-contact" ref={sectionRef} aria-label="Contact and Resume Download">
      <div className="contact-horizon-glow" aria-hidden="true"></div>

      <div className="section-container">
        <div
          className="section-heading-tag"
          style={{ justifyContent: "center" }}
          data-anim="fade-up"
        >
          <span className="mono-label">CONTACT</span>
        </div>

        <div className="contact-inner">
          <div className="contact-location-tag" data-anim="fade-up">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{siteConfig.location} &bull; Open to Forward Deployed &amp; Global Opportunities</span>
          </div>

          <h2 className="contact-giant-text">
            <span className="contact-line-wrap">
              <span className="contact-line-inner">LET&apos;S BUILD</span>
            </span>
            <span className="contact-line-wrap">
              <span className="contact-line-inner gradient-text">TOGETHER</span>
            </span>
          </h2>

          <div className="contact-card-glass">
            <div className="contact-availability-tag">
              <span className="avail-pulse-dot" aria-hidden="true"></span>
              <span className="avail-text">Available for work</span>
            </div>

            <div className="contact-card-sublabel">
              <span className="mono-label">GET IN TOUCH</span>
            </div>

            <div className="contact-email-wrapper">
              <Magnetic>
                <a
                  href={`mailto:${siteConfig.email}?subject=Hello%20Aman%2C%20let%27s%20connect`}
                  className="contact-email-link js-magnetic"
                  id="contact-email-display"
                  aria-label={`Email Aman Rehman at ${siteConfig.email}`}
                >
                  <span className="email-text">{siteConfig.email}</span>
                </a>
              </Magnetic>
            </div>

            <p className="contact-note">{siteConfig.note}</p>

            <div className="contact-card-actions">
              <CopyEmailButton />

              <Magnetic>
                <a
                  href={`mailto:${siteConfig.email}?subject=Hello%20Aman%2C%20let%27s%20connect`}
                  className="btn-send-mail js-magnetic"
                  aria-label="Send mail to Aman Rehman"
                >
                  <span>Send mail</span>
                  <svg
                    width="14"
                    height="14"
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
                </a>
              </Magnetic>
            </div>

            <div className="contact-social-row">
              <Magnetic>
                <a
                  href="https://linkedin.com/in/aman-rehman-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-round-btn js-magnetic"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://github.com/ItzMeAman14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-round-btn js-magnetic"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://www.salesforce.com/trailblazer/amanrehman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-round-btn js-magnetic"
                  aria-label="Salesforce Trailhead Profile"
                  title="Trailhead Profile"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.38 8.86A5.4 5.4 0 0 0 14.2 5.5a5.52 5.52 0 0 0-4.7 2.64A4.6 4.6 0 0 0 5 12.5a4.57 4.57 0 0 0 4.67 4.5h9.71A4.62 4.62 0 0 0 24 12.38a4.54 4.54 0 0 0-4.62-3.52zM12 15l-3-4h2V8h2v3h2l-3 4z" />
                  </svg>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href={RESUME_URL}
                  download={RESUME_FILE_NAME}
                  className="social-round-btn js-magnetic"
                  id="resume-download-btn"
                  aria-label="Download Resume (PDF)"
                  title="Download Resume"
                  onClick={() => showToast("Downloaded Aman Rehman Resume!", 2800)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}