"use client";

import { useEffect, useRef } from "react";

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
  { fill: "#7ED4E0", glow: "rgba(126, 212, 224, 0.9)" }, // Bright Cyan
  { fill: "#4AABB8", glow: "rgba(74, 171, 184, 0.85)" }, // Brand Teal
  { fill: "#B8E6F0", glow: "rgba(184, 230, 240, 0.95)" },// Ice White-Blue
  { fill: "#FFFFFF", glow: "rgba(255, 255, 255, 0.95)" },// Pure Starlight White
  { fill: "#38BDF8", glow: "rgba(56, 189, 248, 0.8)" },  // Electric Sky Blue
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

    // ── Generate 260 3D Antigravity Particles (Concentric multi-orbit vortex) ──
    const PARTICLE_COUNT = 260;
    const particles: Star3D[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ringIndex = i % 8;
      const minR = 100 + ringIndex * 50;
      const maxR = minR + 45;
      const radius = minR + Math.random() * (maxR - minR);
      const angle = Math.random() * Math.PI * 2;
      const baseZ = (Math.random() - 0.5) * 380;
      const colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];

      particles.push({
        baseX: Math.cos(angle) * radius,
        baseY: Math.sin(angle) * radius * 0.65,
        baseZ,
        radius,
        angle,
        orbitSpeed: (0.0025 + Math.random() * 0.0035) * (i % 2 === 0 ? 1 : -0.75),
        size: 1.8 + Math.random() * 3,
        color: colorObj.fill,
        glowColor: colorObj.glow,
        alpha: 0.45 + Math.random() * 0.5,
        twinkleSpeed: 0.025 + Math.random() * 0.045,
        twinklePhase: Math.random() * Math.PI * 2,
        dispX: 0,
        dispY: 0,
        vx: 0,
        vy: 0,
      });
    }

    // ── Mouse & Physics Variables ──
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

    // Interactive card spotlight
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
      curHeroX += (heroMouseX - curHeroX) * 0.06;
      curHeroY += (heroMouseY - curHeroY) * 0.06;

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
      const centerY = height * 0.38; // Center of orbital constellation
      const fov = 450;

      // 3D Rotation Angles based on cursor & ambient idle drift
      const rotY = curHeroX * 0.5 + time * 0.09;
      const rotX = -curHeroY * 0.35 + 0.15;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

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

        if (!reduceMotion) {
          p.angle += p.orbitSpeed;
          p.twinklePhase += p.twinkleSpeed;
        }

        const rawX = Math.cos(p.angle) * p.radius;
        const rawY = Math.sin(p.angle) * p.radius * 0.65;
        const rawZ = p.baseZ + Math.sin(p.angle * 2) * 50;

        // 3D Rotation Matrix
        const x1 = rawX * cosY - rawZ * sinY;
        const z1 = rawX * sinY + rawZ * cosY;

        const y2 = rawY * cosX - z1 * sinX;
        const z2 = rawY * sinX + z1 * cosX;

        // Perspective
        const scale = fov / (fov + z2);
        let screenX = centerX + x1 * scale + p.dispX;
        let screenY = centerY + y2 * scale + p.dispY;

        // Interactive Anti-Gravity Mouse Repulsion / Deflection Physics
        if (mouseInHero && isFinePointer && !reduceMotion) {
          const dx = screenX - mouseX;
          const dy = screenY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 18;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.dispX += p.vx;
        p.dispY += p.vy;
        p.dispX *= 0.92;
        p.dispY *= 0.92;

        const twinkle = 0.75 + Math.sin(p.twinklePhase) * 0.25;
        const finalAlpha = Math.max(0.15, Math.min(1, p.alpha * twinkle * scale));
        const dashAngle = p.angle + Math.PI / 2 + rotY * 0.5;

        projectedList.push({
          screenX,
          screenY,
          size: Math.max(1.2, p.size * scale),
          color: p.color,
          glowColor: p.glowColor,
          alpha: finalAlpha,
          angleRad: dashAngle,
          z: z2,
        });
      }

      // Sort by depth
      projectedList.sort((a, b) => a.z - b.z);

      // Draw Constellation Connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projectedList.length; i += 2) {
        const p1 = projectedList[i];
        for (let j = i + 1; j < projectedList.length; j += 3) {
          const p2 = projectedList[j];
          const dist = Math.hypot(p1.screenX - p2.screenX, p1.screenY - p2.screenY);
          if (dist < 52) {
            const lineAlpha = (1 - dist / 52) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(126, 212, 224, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }
      }

      // Draw Antigravity Radial Dashes & Star Points
      for (let i = 0; i < projectedList.length; i++) {
        const p = projectedList[i];

        ctx.save();
        ctx.translate(p.screenX, p.screenY);
        ctx.rotate(p.angleRad);

        const isDash = i % 3 === 0;
        const dashLength = isDash ? p.size * 3.4 : p.size;

        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.size * 3.5;
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
