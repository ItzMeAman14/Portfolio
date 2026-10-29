"use client";

import React, { useRef } from "react";
import { Moment } from "@/data/moments";
import { MomentCarousel } from "./MomentCarousel";

interface MomentCardProps {
  moment: Moment;
  onOpenLightbox: (photoIndex: number, triggerEl?: HTMLElement | null) => void;
}

export function MomentCard({ moment, onOpenLightbox }: MomentCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const metaParts: string[] = [];
  if (moment.place && moment.place.trim().length > 0) {
    metaParts.push(`📍 ${moment.place}`);
  }
  if (moment.date && moment.date.trim().length > 0) {
    metaParts.push(moment.date);
  }

  const handleOpen = (photoIndex = 0) => {
    onOpenLightbox(photoIndex, cardRef.current);
  };

  /* CHANGE: Space opens the lightbox too, not only Enter */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.key === "Enter" || e.key === " ") && e.target === cardRef.current) {
      e.preventDefault();
      handleOpen(0);
    }
  };

  return (
    <article
      ref={cardRef}
      className="moment-card"
      data-category={moment.category}
      tabIndex={0}
      /* CHANGE: group instead of region (avoids dozens of page landmarks) and a label that says what it does */
      role="group"
      aria-label={`${moment.title}. Press Enter to view photos`}
      onKeyDown={handleKeyDown}
    >
      {/* Photo carousel with touch swipe, hover glass arrows, dots, and counter badge */}
      <MomentCarousel moment={moment} onOpenLightbox={handleOpen} />

      {/* Card caption overlay (slides up on hover) */}
      <div
        className="moment-caption"
        onClick={(e) => {
          // Clicking the caption opens the lightbox, unless the click was on a link or button
          const target = e.target as HTMLElement;
          if (!target.closest("button") && !target.closest("a")) {
            handleOpen(0);
          }
        }}
      >
        <div className="moment-badges-row">
          <span className="moment-category-pill">{moment.category}</span>
          {moment.subtitle && (
            <span className="moment-speaker-badge">Speaker &bull; {moment.subtitle}</span>
          )}
        </div>

        <h4 className="moment-title">{moment.title}</h4>
        <p className="moment-caption-text">{moment.caption}</p>

        {metaParts.length > 0 && (
          <div className="moment-meta">
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
            href={moment.video}
            target="_blank"
            rel="noopener noreferrer"
            className="moment-watch-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Watch recording of ${moment.title} on YouTube`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              style={{ display: "inline", verticalAlign: "middle", marginRight: "3px" }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch session &rarr;
          </a>
        )}
      </div>
    </article>
  );
}