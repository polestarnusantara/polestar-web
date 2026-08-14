"use client";

import { useEffect, useRef, useState } from "react";

interface FloatingStar {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  depth: number; // parallax factor (e.g. 0.02 - 0.08)
  opacity: number;
  symbol: string;
  speed: number;
}

const STARS: FloatingStar[] = [
  { id: 1, x: 15, y: 20, size: 16, depth: 0.04, opacity: 0.7, symbol: "✦", speed: 4 },
  { id: 2, x: 85, y: 25, size: 20, depth: 0.06, opacity: 0.6, symbol: "✧", speed: 5 },
  { id: 3, x: 22, y: 70, size: 12, depth: 0.03, opacity: 0.5, symbol: "✦", speed: 3.5 },
  { id: 4, x: 80, y: 68, size: 14, depth: 0.05, opacity: 0.6, symbol: "✦", speed: 4.5 },
  { id: 5, x: 10, y: 45, size: 8, depth: 0.02, opacity: 0.4, symbol: "•", speed: 6 },
  { id: 6, x: 92, y: 50, size: 10, depth: 0.025, opacity: 0.4, symbol: "•", speed: 5.5 },
  { id: 7, x: 50, y: 15, size: 14, depth: 0.035, opacity: 0.5, symbol: "✧", speed: 4.2 },
];

export default function InteractiveFx() {
  const [mounted, setMounted] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (reduceMotion || !isFinePointer) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curSpotX = mouseX;
    let curSpotY = mouseY;
    let heroMouseX = 0; // relative to hero center (-1 to 1)
    let heroMouseY = 0;
    let curHeroX = 0;
    let curHeroY = 0;

    const heroEl = document.getElementById("hero");
    heroContainerRef.current = heroEl;

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        heroMouseX = (e.clientX - centerX) / (rect.width / 2);
        heroMouseY = (e.clientY - centerY) / (rect.height / 2);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Interactive card spotlight (Vercel/Linear style border & glass glow)
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".glass, .card-float, .spotlight-card"));
    const handleCardMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(".glass, .card-float, .spotlight-card") as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    window.addEventListener("mousemove", handleCardMove, { passive: true });

    // Magnetic buttons
    const magneticBtns = Array.from(document.querySelectorAll<HTMLElement>(".btn-magnetic"));
    const cleanupMagnetic: (() => void)[] = [];

    magneticBtns.forEach((btn) => {
      let isHovered = false;
      const onEnter = () => { isHovered = true; };
      const onLeave = () => {
        isHovered = false;
        btn.style.transform = "translate3d(0,0,0)";
      };
      const onMove = (e: MouseEvent) => {
        if (!isHovered) return;
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate3d(${relX * 0.25}px, ${relY * 0.25}px, 0)`;
      };

      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);
      btn.addEventListener("mousemove", onMove);

      cleanupMagnetic.push(() => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
        btn.removeEventListener("mousemove", onMove);
      });
    });

    // Main RAF animation loop with lerp damping
    let rafId: number;
    const animate = () => {
      // 1. Smooth spotlight follower
      curSpotX += (mouseX - curSpotX) * 0.08;
      curSpotY += (mouseY - curSpotY) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${curSpotX}px, ${curSpotY}px, 0)`;
      }

      // 2. Anti-gravity Parallax in Hero
      curHeroX += (heroMouseX - curHeroX) * 0.06;
      curHeroY += (heroMouseY - curHeroY) * 0.06;

      // 3D Tilt for Hero Logo
      const heroLogo = document.querySelector<HTMLElement>(".hero-logo-interactive");
      if (heroLogo) {
        const tiltX = -curHeroY * 18; // degrees
        const tiltY = curHeroX * 18;
        const panX = curHeroX * 20; // px
        const panY = curHeroY * 15;
        heroLogo.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${panX}px, ${panY}px, 0)`;
      }

      // Parallax floating stars in hero
      const starsEls = Array.from(document.querySelectorAll<HTMLElement>(".antigravity-star"));
      starsEls.forEach((starEl) => {
        const depth = parseFloat(starEl.dataset.depth || "0.04");
        const starPanX = -curHeroX * depth * 350;
        const starPanY = -curHeroY * depth * 250;
        starEl.style.transform = `translate3d(${starPanX}px, ${starPanY}px, 0)`;
      });

      // Subtle parallax on hero badge & headline
      const heroBadge = document.querySelector<HTMLElement>(".hero-badge-parallax");
      if (heroBadge) {
        heroBadge.style.transform = `translate3d(${-curHeroX * 10}px, ${-curHeroY * 8}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", handleCardMove);
      cancelAnimationFrame(rafId);
      cleanupMagnetic.forEach((c) => c());
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Global Interactive Cursor Spotlight (Anti-Gravity Ambient Glow) ── */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30 transition-opacity duration-500 hidden md:block"
        style={{
          width: "750px",
          height: "750px",
          background: "radial-gradient(circle, rgba(74, 171, 184, 0.12) 0%, rgba(42, 107, 130, 0.05) 45%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* ── Floating Anti-Gravity Stars Layer (Positioned inside Hero) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10 hidden sm:block" aria-hidden="true">
        {STARS.map((star) => (
          <div
            key={star.id}
            data-depth={star.depth}
            className="antigravity-star absolute flex items-center justify-center font-display select-none transition-transform duration-75 ease-out"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size}px`,
              color: star.symbol === "•" ? "#7ED4E0" : "#4AABB8",
              opacity: star.opacity,
              animation: `star-float ${star.speed}s ease-in-out infinite alternate`,
              filter: `drop-shadow(0 0 ${star.size * 0.8}px rgba(126, 212, 224, 0.7))`,
              willChange: "transform",
            }}
          >
            {star.symbol}
          </div>
        ))}
      </div>
    </>
  );
}
