"use client";

import React from "react";
import dynamic from "next/dynamic";
import { LenisProvider } from "@/lib/lenis";
import { ToastProvider } from "@/components/ui/Toast";
import { Cursor } from "@/components/layout/Cursor";
import { NavigationHandler } from "@/components/layout/NavigationHandler";

const TunnelBackground = dynamic(
  () => import("@/components/three/TunnelBackground"),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <NavigationHandler />
      <ToastProvider>
        <div className="film-grain" aria-hidden="true" />
        <TunnelBackground />
        <Cursor />
        {children}
      </ToastProvider>
    </LenisProvider>
  );
}
