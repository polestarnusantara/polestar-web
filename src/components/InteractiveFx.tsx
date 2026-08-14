"use client";

import { useEffect, useRef, useState } from "react";

interface Star3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  angle: number;
  orbitSpeed: number;
  size: number;
  color: string;
  glowColor: string;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  dispX: number;
  dispY: number;
  vx: number;
  vy: number;
}

const COLORS = [
  { fill: "#7ED4E0", glow: "rgba(126, 212, 224, 0.8)" }, // Bright Cyan
  { fill: "#4AABB8", glow: "rgba(74, 171, 184, 0.8)" },  // Brand Teal
  { fill: "#B8E6F0", glow: "rgba(184, 230, 240, 0.9)" }, // Ice White-Blue
  { fill: "#E8EDF5", glow: "rgba(232, 237, 245, 0.9)" }, // Starlight White
  { fill: "#2A7A8A", glow: "rgba(42, 122, 138, 0.6)" },  // Deep Cyan
];

export default function InteractiveFx() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const hero = document.getElementById("hero");
      width = hero ? hero.clientWidth : window.innerWidth;
      height = hero ? hero.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Generate 220 3D Antigravity Particles (Concentric orbital vortex like Antigravity) ──
    const PARTICLE_COUNT = 220;
    const particles: Star3D[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create multi-ring orbital shells
      const ringIndex = i % 7;
      const minR = 120 + ringIndex * 45;
      const maxR = minR + 40;
      const radius = minR + Math.random() * (maxR - minR);
      const angle = Math.random() * Math.PI * 2;
      
      // 3D inclination
      const inclination = ((i % 5) - 2) * 0.25;
      const baseZ = (Math.random() - 0.5) * 350;
      const colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];

      particles.push({
        baseX: Math.cos(angle) * radius,
        baseY: Math.sin(angle) * radius * 0.7,
        baseZ,
        radius,
        angle,
        orbitSpeed: (0.002 + Math.random() * 0.003) * (i % 2 === 0 ? 1 : -0.8),
        size: 1.5 + Math.random() * 2.5,
        color: colorObj.fill,
        glowColor: colorObj.glow,
        alpha: 0.35 + Math.random() * 0.55,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
        dispX: 0,
        dispY: 0,
        vx: 0,
        vy: 0,
      });
    }

    // ── Mouse & Damping Variables ──
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

    // ── Animation Loop ──
    let rafId: number;
    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth lerp mouse tracking
      curHeroX += (heroMouseX - curHeroX) * 0.05;
      curHeroY += (heroMouseY - curHeroY) * 0.05;

      // Spotlight glow follower
      if (spotlightRef.current) {
        curSpotX += ((mouseInHero ? mouseX : width / 2) - curSpotX) * 0.08;
        curSpotY += ((mouseInHero ? mouseY : height / 2) - curSpotY) * 0.08;
        spotlightRef.current.style.transform = `translate3d(${curSpotX}px, ${curSpotY}px, 0)`;
      }

      // 3D Logo Tilt
      const heroLogo = document.querySelector<HTMLElement>(".hero-logo-interactive");
      if (heroLogo && isFinePointer && !reduceMotion) {
        const tiltX = -curHeroY * 18;
        const tiltY = curHeroX * 18;
        const panX = curHeroX * 22;
        const panY = curHeroY * 16;
        heroLogo.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${panX}px, ${panY}px, 0)`;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.38; // Centered around Logo and Headline
      const fov = 450;

      // 3D Rotation Angles based on cursor & subtle idle spin
      const rotY = curHeroX * 0.45 + time * 0.08;
      const rotX = -curHeroY * 0.35 + 0.15;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Render Antigravity Particles
      const projectedList: {
        screenX: number;
        screenY: number;
        size: number;
        color: string;
        glowColor: string;
        alpha: number;
        angleRad: number;
        z: number;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbit update
        if (!reduceMotion) {
          p.angle += p.orbitSpeed;
          p.twinklePhase += p.twinkleSpeed;
        }

        const rawX = Math.cos(p.angle) * p.radius;
        const rawY = Math.sin(p.angle) * p.radius * 0.65;
        const rawZ = p.baseZ + Math.sin(p.angle * 2) * 50;

        // 3D Rotation Matrix (Around Y and X axes)
        // 1. Rotate around Y
        const x1 = rawX * cosY - rawZ * sinY;
        const z1 = rawX * sinY + rawZ * cosY;

        // 2. Rotate around X
        const y2 = rawY * cosX - z1 * sinX;
        const z2 = rawY * sinX + z1 * cosX;

        // Perspective Projection
        const scale = fov / (fov + z2);
        let screenX = centerX + x1 * scale + p.dispX;
        let screenY = centerY + y2 * scale + p.dispY;

        // Interactive Anti-Gravity Mouse Repulsion / Deflection Physics
        if (mouseInHero && isFinePointer && !reduceMotion) {
          const dx = screenX - mouseX;
          const dy = screenY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 16;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring friction back to original position
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.dispX += p.vx;
        p.dispY += p.vy;
        p.dispX *= 0.92;
        p.dispY *= 0.92;

        // Twinkle calculation
        const twinkle = 0.7 + Math.sin(p.twinklePhase) * 0.3;
        const finalAlpha = Math.max(0.1, Math.min(1, p.alpha * twinkle * scale));

        // Tangent angle for Antigravity-style directional particle dash
        const dashAngle = p.angle + Math.PI / 2 + rotY * 0.5;

        projectedList.push({
          screenX,
          screenY,
          size: Math.max(1, p.size * scale),
          color: p.color,
          glowColor: p.glowColor,
          alpha: finalAlpha,
          angleRad: dashAngle,
          z: z2,
        });
      }

      // Sort by depth for correct 3D rendering order
      projectedList.sort((a, b) => a.z - b.z);

      // ── Draw Faint Constellation Connections Between Close Particles ──
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedList.length; i += 2) {
        const p1 = projectedList[i];
        for (let j = i + 1; j < projectedList.length; j += 3) {
          const p2 = projectedList[j];
          const dist = Math.hypot(p1.screenX - p2.screenX, p1.screenY - p2.screenY);
          if (dist < 48) {
            const lineAlpha = (1 - dist / 48) * 0.18 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(126, 212, 224, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }
      }

      // ── Draw Directional Antigravity Dashes & Star Points ──
      for (let i = 0; i < projectedList.length; i++) {
        const p = projectedList[i];

        ctx.save();
        ctx.translate(p.screenX, p.screenY);
        ctx.rotate(p.angleRad);

        // Particle shape: Antigravity dash capsule or glowing star point
        const isDash = i % 3 === 0;
        const dashLength = isDash ? p.size * 3.2 : p.size;

        // Outer glow
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.size * 3;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;

        if (isDash) {
          ctx.beginPath();
          ctx.roundRect(-dashLength / 2, -p.size / 2, dashLength, p.size, p.size / 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

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

  if (!mounted) return null;

  return (
    <>
      {/* ── High-Performance Interactive HTML5 Canvas Antigravity Particle Field ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 block"
      />

      {/* ── Ambient Radial Cursor Glow (Follows mouse smoothly) ── */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-500 hidden md:block"
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
