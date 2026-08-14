"use client";

import { useEffect, useRef } from "react";

interface AntigravityDot {
  arm: number;
  dotIndex: number;
  t: number;            // 0 to 1 distance along the spiral arm
  baseR: number;
  baseAngle: number;
  baseZ: number;
  width: number;
  length: number;
  color: string;
  glowColor: string;
  baseAlpha: number;
  dispX: number;
  dispY: number;
  vx: number;
  vy: number;
}

// Spectrum palette matching Antigravity & Polestar Theme
const COLOR_STOPS = [
  { fill: "#7ED4E0", glow: "rgba(126, 212, 224, 0.6)" }, // Polestar Neon Cyan
  { fill: "#38BDF8", glow: "rgba(56, 189, 248, 0.6)" },  // Sky Blue
  { fill: "#4AABB8", glow: "rgba(74, 171, 184, 0.6)" },  // Polestar Brand Teal
  { fill: "#E8EDF5", glow: "rgba(232, 237, 245, 0.7)" }, // Starlight White
  { fill: "#5EEAD4", glow: "rgba(94, 234, 212, 0.6)" },  // Aquamarine
  { fill: "#818CF8", glow: "rgba(129, 140, 248, 0.5)" }, // Electric Periwinkle
  { fill: "#2A7A8A", glow: "rgba(42, 122, 138, 0.4)" },  // Deep Ocean Teal
];

export default function InteractiveFx() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const hero = document.getElementById("hero") || canvas.parentElement;
      width = hero ? hero.clientWidth : window.innerWidth;
      height = hero ? hero.clientHeight : 700;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(width * dpr, 100);
      canvas.height = Math.max(height * dpr, 100);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Generate Google Antigravity Multi-Arm Logarithmic Spiral Constellation ──
    const NUM_ARMS = 32;         // 32 sleek curved arms
    const DOTS_PER_ARM = 16;     // 16 particles per arm = 512 total particles
    const particles: AntigravityDot[] = [];

    for (let arm = 0; arm < NUM_ARMS; arm++) {
      const armAngleOffset = (arm / NUM_ARMS) * Math.PI * 2;
      const colorObj = COLOR_STOPS[arm % COLOR_STOPS.length];

      for (let d = 0; d < DOTS_PER_ARM; d++) {
        const t = (d + 1) / (DOTS_PER_ARM + 1); // 0.05 to 0.95
        
        // Large, clean inner halo so headline & logo remain perfectly readable and spacious
        const innerRadius = 240;
        const outerRadius = Math.max(width * 0.48, 580);
        const baseR = innerRadius + Math.pow(t, 1.2) * (outerRadius - innerRadius);

        // Smooth logarithmic spiral curve
        const curveOffset = Math.pow(t, 0.85) * 1.6;
        const baseAngle = armAngleOffset + curveOffset;

        // Subtle 3D spherical dome depth
        const baseZ = Math.sin(t * Math.PI) * 90 * (arm % 2 === 0 ? 1 : -0.5);

        // Refined tick/dash sizing matching Antigravity
        const sizeWidth = 1.2 + t * 1.1; // 1.2px to 2.3px thickness
        const length = 3.5 + t * 4;      // 3.5px to 7.5px length

        particles.push({
          arm,
          dotIndex: d,
          t,
          baseR,
          baseAngle,
          baseZ,
          width: sizeWidth,
          length,
          color: colorObj.fill,
          glowColor: colorObj.glow,
          baseAlpha: 0.3 + t * 0.45,
          dispX: 0,
          dispY: 0,
          vx: 0,
          vy: 0,
        });
      }
    }

    // ── Mouse & Physics Tracking ──
    let mouseX = width / 2;
    let mouseY = height / 2;
    let heroMouseX = 0;
    let heroMouseY = 0;
    let curHeroX = 0;
    let curHeroY = 0;
    let curSpotX = window.innerWidth / 2;
    let curSpotY = window.innerHeight / 2;
    let mouseInHero = false;

    const onMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          mouseInHero = true;
          mouseX = e.clientX - rect.left;
          mouseY = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          heroMouseX = (mouseX - centerX) / (rect.width / 2);
          heroMouseY = (mouseY - centerY) / (rect.height / 2);
        } else {
          mouseInHero = false;
          heroMouseX = 0;
          heroMouseY = 0;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Interactive card spotlight (Linear / Vercel style)
    const handleCardMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(".glass, .card-float, .spotlight-card") as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
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
        btn.style.transform = `translate3d(${relX * 0.2}px, ${relY * 0.2}px, 0)`;
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

    // ── Animation Loop ──
    let rafId: number;
    let time = 0;

    const render = () => {
      time += 0.008; // Steady, calm ambient revolution

      // Ultra-subtle smoothing for cursor
      curHeroX += (heroMouseX - curHeroX) * 0.04;
      curHeroY += (heroMouseY - curHeroY) * 0.04;

      // Soft ambient spotlight follower
      if (spotlightRef.current) {
        curSpotX += ((mouseInHero ? mouseX : width / 2) - curSpotX) * 0.08;
        curSpotY += ((mouseInHero ? mouseY : height / 2) - curSpotY) * 0.08;
        spotlightRef.current.style.transform = `translate3d(${curSpotX}px, ${curSpotY}px, 0)`;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Stable center around Logo and Headline (no violent camera shifts)
      const centerX = width / 2;
      const centerY = height * 0.38;
      const fov = 600;

      // Very subtle tilt (only 0.08 max tilt) so the field stays stable and elegant
      const rotY = (reduceMotion ? 0 : time * 0.04) + curHeroX * 0.08;
      const rotX = -curHeroY * 0.06 + 0.08;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projectedList: {
        screenX: number;
        screenY: number;
        width: number;
        length: number;
        color: string;
        glowColor: string;
        alpha: number;
        angleRad: number;
        z: number;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base coordinates on orbital spiral
        const rawX = Math.cos(p.baseAngle) * p.baseR;
        const rawY = Math.sin(p.baseAngle) * p.baseR * 0.75;
        const rawZ = p.baseZ;

        // 3D Rotation
        const x1 = rawX * cosY - rawZ * sinY;
        const z1 = rawX * sinY + rawZ * cosY;

        const y2 = rawY * cosX - z1 * sinX;
        const z2 = rawY * sinX + z1 * cosX;

        // Perspective
        const scale = fov / (fov + z2);
        let screenX = centerX + x1 * scale + p.dispX;
        let screenY = centerY + y2 * scale + p.dispY;

        // Interactive Anti-Gravity Repulsion Physics (local ripple as mouse passes)
        if (mouseInHero && isFinePointer && !reduceMotion) {
          const dx = screenX - mouseX;
          const dy = screenY - mouseY;
          const dist = Math.hypot(dx, dy);
          const maxDist = 110;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 12;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring friction back to original orbit
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.dispX += p.vx;
        p.dispY += p.vy;
        p.dispX *= 0.90;
        p.dispY *= 0.90;

        // Tangent orientation along the spiral arm
        const tangentAngle = p.baseAngle + 0.35 + rotY;
        const finalAlpha = Math.max(0.12, Math.min(0.85, p.baseAlpha * scale));

        projectedList.push({
          screenX,
          screenY,
          width: Math.max(1, p.width * scale),
          length: Math.max(2.5, p.length * scale),
          color: p.color,
          glowColor: p.glowColor,
          alpha: finalAlpha,
          angleRad: tangentAngle,
          z: z2,
        });
      }

      // Sort by depth
      projectedList.sort((a, b) => a.z - b.z);

      // Draw Antigravity Radial Dashes
      for (let i = 0; i < projectedList.length; i++) {
        const p = projectedList[i];

        ctx.save();
        ctx.translate(p.screenX, p.screenY);
        ctx.rotate(p.angleRad);

        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.width * 2.5;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;

        ctx.beginPath();
        ctx.roundRect(-p.length / 2, -p.width / 2, p.length, p.width, p.width / 2);
        ctx.fill();

        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", handleCardMove);
      cancelAnimationFrame(rafId);
      cleanupMagnetic.forEach((c) => c());
    };
  }, []);

  return (
    <>
      {/* ── High-Performance Interactive HTML5 Canvas Antigravity Particle Field ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block w-full h-full"
      />

      {/* ── Ambient Radial Cursor Glow ── */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-500 hidden md:block"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(74, 171, 184, 0.15) 0%, rgba(42, 107, 130, 0.05) 50%, transparent 70%)",
          filter: "blur(35px)",
          willChange: "transform",
        }}
      />
    </>
  );
}
