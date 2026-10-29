"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Moment } from "@/data/moments";
import { useLenis } from "@/lib/lenis";

interface LightboxProps {
  isOpen: boolean;
  moment: Moment | null;
  photoIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectPhoto: (index: number) => void;
}

/* CHANGE: Full-screen Lightbox with thumbnail strip, focus trapping, Lenis scroll locking, keyboard & touch swipe navigation, and YouTube link */
export function Lightbox({
  isOpen,
  moment,
  photoIndex,
  onClose,
  onNext,
  onPrev,
  onSelectPhoto,
}: LightboxProps) {
  const { pause, resume } = useLenis();
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);

  const images = moment?.images || [];
  const total = images.length;
  const currentImage = images[photoIndex] || images[0];

  // Preload next and prev image indices
  const nextIdx = (photoIndex + 1) % total;
  const prevIdx = (photoIndex - 1 + total) % total;

  // Handle Lenis pause and body scroll locking
  useEffect(() => {
    if (isOpen) {
      pause();
      document.body.style.overflow = "hidden";
      // Focus the close button when opened
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      resume();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, pause, resume]);

  // Focus trap inside the modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
        return;
      }

      // Trap Tab key navigation within dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto scroll active thumbnail into view
  useEffect(() => {
    if (thumbsContainerRef.current) {
      const activeThumb = thumbsContainerRef.current.querySelector<HTMLElement>(
        `[data-thumb-index="${photoIndex}"]`
      );
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [photoIndex]);

  if (!isOpen || !moment || total === 0) return null;

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) onNext();
      else onPrev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const metaParts: string[] = [];
  if (moment.place && moment.place.trim().length > 0) {
    metaParts.push(`📍 ${moment.place}`);
  }
  if (moment.date && moment.date.trim().length > 0) {
    metaParts.push(moment.date);
  }
  metaParts.push(moment.category);

  return (
    <div
      ref={dialogRef}
      id="moment-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer - ${moment.title}`}
      className="open"
      onClick={(e) => {
        // Clicking backdrop closes modal
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="lightbox-content">
        {/* Close Button (top-right, 44px tap target) */}
        <button
          ref={closeBtnRef}
          type="button"
          className="lightbox-close-btn"
          id="lightbox-close"
          aria-label="Close photo viewer"
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Previous Button (wrap around) */}
        {total > 1 && (
          <button
            type="button"
            className="lightbox-nav-btn lightbox-prev-btn"
            id="lightbox-prev"
            aria-label="Previous photo"
            onClick={onPrev}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        {/* Main Large Image Container */}
        <div className="lightbox-img-wrap">
          <div className="lightbox-photo-counter">
            {photoIndex + 1} / {total}
          </div>

          <div className="lightbox-img-inner">
            <Image
              key={currentImage.src}
              id="lightbox-img"
              src={currentImage.src}
              alt={currentImage.alt || `${moment.title} - photo ${photoIndex + 1}`}
              width={1200}
              height={900}
              priority
              className="lightbox-img"
            />
          </div>

          {/* Hidden preloads for adjacent photos */}
          {total > 1 && images[nextIdx] && (
            <div style={{ display: "none" }} aria-hidden="true">
              <Image
                src={images[nextIdx].src}
                alt="preload next"
                width={1200}
                height={900}
                priority
              />
            </div>
          )}
          {total > 2 && images[prevIdx] && (
            <div style={{ display: "none" }} aria-hidden="true">
              <Image
                src={images[prevIdx].src}
                alt="preload prev"
                width={1200}
                height={900}
                priority
              />
            </div>
          )}
        </div>

        {/* Details & Caption */}
        <div className="lightbox-details">
          <h3 id="lightbox-title" className="lightbox-title">
            {moment.title}
          </h3>
          {moment.subtitle && (
            <div id="lightbox-subtitle" className="lightbox-subtitle">
              Speaker &bull; {moment.subtitle}
            </div>
          )}
          {moment.caption && (
            <p id="lightbox-caption" className="lightbox-caption">
              {moment.caption}
            </p>
          )}

          {metaParts.length > 0 && (
            <div id="lightbox-meta" className="lightbox-meta">
              {metaParts.map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && " • "}
                  <span>{part}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          {moment.video && (
            <a
              id="lightbox-video-btn"
              href={moment.video}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-video-cta"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{ marginRight: "6px" }}
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Watch Session on YouTube</span>
            </a>
          )}
        </div>

        {/* Thumbnail Strip (Scrollable) */}
        {total > 1 && (
          <div
            ref={thumbsContainerRef}
            className="lightbox-thumb-strip"
            role="tablist"
            aria-label="Photo thumbnails"
          >
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                data-thumb-index={i}
                role="tab"
                aria-selected={i === photoIndex}
                aria-label={`View photo ${i + 1} of ${total}`}
                className={`lightbox-thumb ${i === photoIndex ? "active" : ""}`}
                onClick={() => onSelectPhoto(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `Thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Next Button (wrap around) */}
        {total > 1 && (
          <button
            type="button"
            className="lightbox-nav-btn lightbox-next-btn"
            id="lightbox-next"
            aria-label="Next photo"
            onClick={onNext}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
