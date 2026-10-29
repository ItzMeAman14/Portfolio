"use client";

import { useState, useCallback, useRef } from "react";
import { Moment } from "@/data/moments";

/* CHANGE: Dedicated useLightbox hook managing modal state, photo indices, wrap-around navigation, and focus restoration */
export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback(
    (moment: Moment, photoIndex = 0, triggerEl: HTMLElement | null = null) => {
      setActiveMoment(moment);
      setActivePhotoIndex(photoIndex);
      triggerElementRef.current = triggerEl || (document.activeElement as HTMLElement | null);
      setIsOpen(true);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    // Restore focus to trigger element for accessibility
    setTimeout(() => {
      triggerElementRef.current?.focus();
    }, 50);
  }, []);

  const nextPhoto = useCallback(() => {
    if (!activeMoment || !activeMoment.images.length) return;
    setActivePhotoIndex((prev) => (prev + 1) % activeMoment.images.length);
  }, [activeMoment]);

  const prevPhoto = useCallback(() => {
    if (!activeMoment || !activeMoment.images.length) return;
    setActivePhotoIndex((prev) => (prev - 1 + activeMoment.images.length) % activeMoment.images.length);
  }, [activeMoment]);

  const goToPhoto = useCallback(
    (index: number) => {
      if (!activeMoment) return;
      if (index >= 0 && index < activeMoment.images.length) {
        setActivePhotoIndex(index);
      }
    },
    [activeMoment]
  );

  return {
    isOpen,
    activeMoment,
    activePhotoIndex,
    openLightbox,
    closeLightbox,
    nextPhoto,
    prevPhoto,
    goToPhoto,
  };
}
