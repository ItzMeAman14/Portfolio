"use client";

import React, { useState, useRef, useCallback, useEffect } from "react"; /* CHANGE: useEffect */
import Image from "next/image";
import { Moment } from "@/data/moments";

interface MomentCarouselProps {
  moment: Moment;
  onOpenLightbox: (photoIndex: number) => void;
}

export function MomentCarousel({ moment, onOpenLightbox }: MomentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  /* CHANGE: slides after the first are mounted only once someone interacts with the card */
  const [activated, setActivated] = useState(false);
  /* CHANGE: slides that were shown stay mounted, so going back never reloads them */
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));

  const images = moment.images || [];
  const total = images.length;

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = useCallback(() => setActivated(true), []);

  /* CHANGE: remember every slide that has been on screen */
  useEffect(() => {
    setVisited((prev) => (prev.has(currentIndex) ? prev : new Set(prev).add(currentIndex)));
  }, [currentIndex]);

  /* CHANGE: clear the timer on unmount */
  useEffect(() => {
    return () => {
      if (dragResetTimer.current) clearTimeout(dragResetTimer.current);
    };
  }, []);

  /* CHANGE: decides whether a slide's image should be mounted (and so downloaded) */
  const shouldRender = (idx: number) => {
    if (idx === currentIndex || visited.has(idx)) return true;
    if (!activated || total < 2) return false;
    const next = (currentIndex + 1) % total;
    const prev = (currentIndex - 1 + total) % total;
    return idx === next || idx === prev;
  };

  const goToNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      setActivated(true);
      setCurrentIndex((prev) => (prev + 1) % total);
    },
    [total]
  );

  const goToPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      setActivated(true);
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    },
    [total]
  );

  const handleDotClick = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActivated(true);
    setCurrentIndex(index);
  }, []);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Only swipe if predominantly horizontal and past the threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) goToNext();
      else goToPrev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Desktop mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // left click only
    mouseStartXRef.current = e.clientX;
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartXRef.current !== null) {
      const diff = Math.abs(e.clientX - mouseStartXRef.current);
      if (diff > 8) isDraggingRef.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartXRef.current !== null && isDraggingRef.current) {
      const diffX = mouseStartXRef.current - e.clientX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) goToNext();
        else goToPrev();
      }
    }
    mouseStartXRef.current = null;
    if (dragResetTimer.current) clearTimeout(dragResetTimer.current);
    dragResetTimer.current = setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  /* CHANGE: a drag that ends outside the card no longer leaves the drag state stuck */
  const handleMouseLeave = () => {
    mouseStartXRef.current = null;
    isDraggingRef.current = false;
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // If a drag was in progress, don't open the lightbox
    if (isDraggingRef.current) {
      e.stopPropagation();
      return;
    }
    onOpenLightbox(currentIndex);
  };

  if (total === 0) return null;

  return (
    <div
      className="moment-img-wrapper group"
      onPointerEnter={activate} /* CHANGE: hover and touch start loading the neighbouring slides */
      onFocus={activate} /* CHANGE: keyboard users too */
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleImageClick}
    >
      {/* Photo carousel track */}
      <div
        className="moment-carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {images.map((img, idx) => (
          /* CHANGE: off-screen slides are hidden from screen readers */
          <div key={idx} className="moment-carousel-slide" aria-hidden={idx !== currentIndex}>
            {shouldRender(idx) && (
              <Image
                src={img.src}
                alt={img.alt || `${moment.title} photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="moment-img"
                loading="lazy" /* CHANGE: every photo is lazy, and "priority" is removed */
                quality={70} /* CHANGE: smaller files, still sharp at card size */
                draggable={false} /* CHANGE: stops native image dragging from fighting the swipe */
              />
            )}
          </div>
        ))}
      </div>

      {/* Video badge overlay (if session recorded) */}
      {moment.video && (
        <span className="moment-play-badge" aria-label="Session recording available">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </span>
      )}

      {/* Multi-photo controls (only rendered when more than 1 image) */}
      {total > 1 && (
        <>
          <div
            className="carousel-counter-badge"
            aria-label={`Photo ${currentIndex + 1} of ${total}`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <span>
              {currentIndex + 1} / {total}
            </span>
          </div>

          <button
            type="button"
            className="carousel-nav-btn carousel-prev-btn"
            aria-label="Previous photo in card"
            onClick={goToPrev}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="carousel-nav-btn carousel-next-btn"
            aria-label="Next photo in card"
            onClick={goToNext}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="carousel-dots-row" role="tablist" aria-label="Photo pagination">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot ${i === currentIndex ? "active" : ""}`}
                aria-label={`Go to photo ${i + 1} of ${total}`}
                role="tab"
                aria-selected={i === currentIndex}
                onClick={(e) => handleDotClick(e, i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}