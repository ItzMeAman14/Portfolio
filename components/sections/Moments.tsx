"use client";

import React, { useState, useMemo, useEffect } from "react";
import { moments } from "@/data/moments";
import { MomentCard } from "../ui/MomentCard";
import { Lightbox } from "../ui/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import { ScrollTrigger } from "@/lib/gsap";

/* CHANGE: how many moments show at first, and how many each "Show more" click adds */
const PAGE_SIZE = 3;

export function Moments() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  /* CHANGE: number of moments currently shown */
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const {
    isOpen,
    activeMoment,
    activePhotoIndex,
    openLightbox,
    closeLightbox,
    nextPhoto,
    prevPhoto,
    goToPhoto,
  } = useLightbox();

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(moments.map((m) => m.category).filter(Boolean)))];
  }, []);

  const filteredMoments = useMemo(() => {
    if (activeCategory === "All") return moments;
    return moments.filter((m) => m.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  /* CHANGE: only render the visible slice, so photos beyond it are not loaded */
  const shownMoments = useMemo(
    () => filteredMoments.slice(0, visibleCount),
    [filteredMoments, visibleCount]
  );
  const hasMore = visibleCount < filteredMoments.length;

  /* CHANGE: switching a filter starts again from the first page */
  const handleFilterChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  /* CHANGE: re-measure the sections below when the grid height changes (filter or "Show more") */
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(t);
  }, [activeCategory, visibleCount]);

  return (
    <section id="zone-moments" aria-label="Moments &amp; Events Gallery">
      <div className="section-container">
        <div className="moments-header-wrap" data-anim="fade-up">
          <div className="section-heading-tag">
            <span className="mono-label">MOMENTS</span>
          </div>
          <h2>Moments</h2>
          <p>Events, talks, hackathons and the people along the way.</p>
        </div>

        <div
          className="moments-filters"
          id="moments-filters"
          role="tablist"
          aria-label="Filter photos by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`moment-filter-btn ${activeCategory === cat ? "active" : ""}`}
              data-filter={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div id="moments-grid" className="moments-grid">
          {shownMoments.map((moment) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              onOpenLightbox={(photoIndex, triggerEl) =>
                openLightbox(moment, photoIndex, triggerEl)
              }
            />
          ))}
        </div>

        {/* CHANGE: "Show more" button, hidden when everything is already visible */}
        {hasMore && (
          <div className="moments-more-wrap">
            <button
              type="button"
              className="btn-outlined moments-more-btn"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              <span>Show more moments</span>
              <span className="moments-more-count">
                {shownMoments.length} / {filteredMoments.length}
              </span>
            </button>
          </div>
        )}

        {/* CHANGE: tells screen readers how many are showing */}
        <p className="sr-only" aria-live="polite">
          Showing {shownMoments.length} of {filteredMoments.length} moments
        </p>
      </div>

      <Lightbox
        isOpen={isOpen}
        moment={activeMoment}
        photoIndex={activePhotoIndex}
        onClose={closeLightbox}
        onNext={nextPhoto}
        onPrev={prevPhoto}
        onSelectPhoto={goToPhoto}
      />
    </section>
  );
}

export { Moments as MomentsSection };