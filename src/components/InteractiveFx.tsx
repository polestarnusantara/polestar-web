"use client";

import { useEffect, useRef } from "react";

interface StaticSpiralDot {
  arm: number;
  dotIndex: number;
  t: number;
  baseX: number;
  baseY: number;
  width: number;
  length: number;
  color: string;
  glowColor: string;
  baseAlpha: number;
  tangentAngle: number;
  dispX: number;
  dispY: number;
  vx: number;
  vy: number;
}

// Polestar Signature Brand Gradient Interpolator
function getPolestarBrandColor(t: number, armIndex: number) {
  // t: 0 (inner halo) to 1 (outer galaxy rim)
  if (t < 0.25) {
    return {
      fill: armIndex % 2 === 0 ? "#FFFFFF" : "#E0F7FA",
      glow: "rgba(224, 247, 250, 0.9)",
      alpha: 0.85,
    };
  } else if (t < 0.55) {
    return {
      fill: armIndex % 2 === 0 ? "#7ED4E0" : "#B8E6F0",
      glow: "rgba(126, 212, 224, 0.8)",
      alpha: 0.7,
    };
  } else if (t < 0.8) {
    return {
      fill: armIndex % 2 === 0 ? "#4AABB8" : "#369CA9",
      glow: "rgba(74, 171, 184, 0.65)",
      alpha: 0.55,
    };
  } else {
    return {
      fill: "#2A7A8A",
      glow: "rgba(42, 122, 138, 0.45)",
      alpha: 0.35,
    };
  }
}

export default function InteractiveFx() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    let particles: StaticSpiralDot[] = [];

    const initParticles = () => {
      particles = [];
      const NUM_ARMS = 32;       // 32 symmetric spiral arms
      const DOTS_PER_ARM = 16;   // 16 particles per arm = 512 total particles

      const centerX = width / 2;
      const centerY = height * 0.40; // Centered around Logo and Headline

      for (let arm = 0; arm < NUM_ARMS; arm++) {
        const armAngleOffset = (arm / NUM_ARMS) * Math.PI * 2;

        for (let d = 0; d < DOTS_PER_ARM; d++) {
          const t = (d + 1) / (DOTS_PER_ARM + 1); // 0.05 to 0.95
          
          // Clear void in the center for headline readability
          const innerRadius = 240;
          const outerRadius = Math.max(width * 0.48, 580);
          const r = innerRadius + Math.pow(t, 1.2) * (outerRadius - innerRadius);

          // Logarithmic spiral curve angle
          const curveOffset = Math.pow(t, 0.85) * 1.6;
          const angle = armAngleOffset + curveOffset;

          // Static 2D coordinates with widescreen perspective flattening
          const baseX = centerX + Math.cos(angle) * r;
          const baseY = centerY + Math.sin(angle) * r * 0.72;

          // Tangent angle along the spiral curve
          const tangentAngle = angle + 0.35;

          const sizeWidth = 1.2 + t * 1.2; // 1.2px to 2.4px
          const length = 3.5 + t * 4.5;    // 3.5px to 8px

          const colorData = getPolestarBrandColor(t, arm);

          particles.push({
            arm,
            dotIndex: d,
            t,
            baseX,
            baseY,
            width: sizeWidth,
            length,
            color: colorData.fill,
            glowColor: colorData.glow,
            baseAlpha: colorData.alpha,
            tangentAngle,
            dispX: 0,
            dispY: 0,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const resize = () => {
      const hero = document.getElementById("hero") || canvas.parentElement;
      width = hero ? hero.clientWidth : window.innerWidth;
      height = hero ? hero.clientHeight : 750;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(width * dpr, 100);
      canvas.height = Math.max(height * dpr, 100);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Mouse Tracking (Purely for Local Ripple/Deflection) ──
    let mouseX = -9999;
    let mouseY = -9999;
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
        } else {
          mouseInHero = false;
          mouseX = -9999;
          mouseY = -9999;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Render Loop (Static Form, Zero Parallax, Polestar Brand Gradient, Interactive Repulsion) ──
    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const screenX = p.baseX + p.dispX;
        const screenY = p.baseY + p.dispY;

        // Local Anti-Gravity Mouse Repulsion
        if (mouseInHero && isFinePointer && !reduceMotion) {
          const dx = screenX - mouseX;
          const dy = screenY - mouseY;
          const dist = Math.hypot(dx, dy);
          const maxDist = 120;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 14;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Elastic spring back to exact spiral base coordinate
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.dispX += p.vx;
        p.dispY += p.vy;
        p.dispX *= 0.92;
        p.dispY *= 0.92;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(p.tangentAngle);

        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.width * 3;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;

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
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 block w-full h-full"
    />
  );
}
