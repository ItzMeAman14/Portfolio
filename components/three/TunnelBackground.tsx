"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

export default function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      canvas.classList.add("css-fallback");
      return;
    }

    function hasWebGL() {
      try {
        const testCanvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    }

    if (!hasWebGL()) {
      canvas.classList.add("css-fallback");
      return;
    }

    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let particleGeometry: THREE.BufferGeometry;
    let particleMaterial: THREE.PointsMaterial;
    let particlePoints: THREE.Points;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07080f, 0.0016);

      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2400);
      camera.position.set(0, 0, 0);

      const isMobileDevice = window.innerWidth <= 600;
      const isTabletDevice = window.innerWidth > 600 && window.innerWidth <= 1024;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const particleCount = isMobileDevice ? 1200 : isTabletDevice ? 1800 : 2500;
      particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const currentColors = new Float32Array(particleCount * 3);

      const colorViolet = new THREE.Color(0x7c5cff);
      const colorCyan = new THREE.Color(0x22d3ee);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 18 + Math.random() * 85;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 3500;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const t = Math.random();
        const c = colorViolet.clone().lerp(colorCyan, t);
        currentColors[i * 3] = c.r;
        currentColors[i * 3 + 1] = c.g;
        currentColors[i * 3 + 2] = c.b;
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(currentColors, 3));

      particleMaterial = new THREE.PointsMaterial({
        size: isMobileDevice ? 2.2 : 2.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      particlePoints = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particlePoints);

      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      if (!isMobileDevice && !isTabletDevice) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      let currentZ = 0;
      let targetZ = 0;

      const tints = {
        hero: new THREE.Color(0x7c5cff),
        skills: new THREE.Color(0x22d3ee),
        projects: new THREE.Color(0x7c5cff),
        moments: new THREE.Color(0x22d3ee),
        journey: new THREE.Color(0x7c5cff),
        contact: new THREE.Color(0xc8ff3d),
      };
      const activeTint = tints.hero.clone();
      const targetTint = tints.hero.clone();

      scrollTriggerInstance = ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          targetZ = self.progress * 1800;
        },
      });

      const handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize, { passive: true });

      const animate = () => {
        if (isTabVisible) {
          currentZ += (targetZ - currentZ) * 0.08;
          currentMouseX += (targetMouseX - currentMouseX) * 0.05;
          currentMouseY += (targetMouseY - currentMouseY) * 0.05;

          camera.position.z = -currentZ;
          camera.position.x = currentMouseX * 12;
          camera.position.y = -currentMouseY * 12;

          activeTint.lerp(targetTint, 0.04);
          particleMaterial.color = activeTint;

          particlePoints.rotation.z += 0.0006;
          renderer.render(scene, camera);
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);

        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
        }

        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      };
    } catch {
      canvas.classList.add("css-fallback");
    }
  }, []);

  return <canvas id="tunnel-canvas" ref={canvasRef} aria-hidden="true" />;
}
