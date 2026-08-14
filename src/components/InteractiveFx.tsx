"use client";

import { useEffect, useRef } from "react";

interface SphereParticle {
  x: number;
  y: number;
  z: number;
  radius: number;
  phi: number;
  theta: number;
  orbitSpeed: number;
  size: number;
  length: number;
  color: string;
  glowColor: string;
  baseAlpha: number;
  dispX: number;
  dispY: number;
  dispZ: number;
  vx: number;
  vy: number;
}

// Spectrum palette matching the vibrant Google Antigravity & Polestar Theme
const SPECTRUM_COLORS = [
  { fill: "#38BDF8", glow: "rgba(56, 189, 248, 0.7)" },  // Electric Sky Blue
  { fill: "#7ED4E0", glow: "rgba(126, 212, 224, 0.7)" }, // Neon Cyan
  { fill: "#4AABB8", glow: "rgba(74, 171, 184, 0.6)" },  // Polestar Brand Teal
  { fill: "#818CF8", glow: "rgba(129, 140, 248, 0.6)" }, // Indigo / Violet
  { fill: "#F43F5E", glow: "rgba(244, 63, 94, 0.6)" },   // Coral / Red-Pink (Antigravity accent)
  { fill: "#F59E0B", glow: "rgba(245, 158, 11, 0.6)" },  // Amber / Gold (Antigravity accent)
  { fill: "#10B981", glow: "rgba(16, 185, 129, 0.6)" },  // Emerald
  { fill: "#FFFFFF", glow: "rgba(255, 255, 255, 0.8)" }, // Diamond White
];

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
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Generate 680 Particles on a 3D Fibonacci Sphere (Google Antigravity Globe) ──
    const PARTICLE_COUNT = 680;
    const particles: SphereParticle[] = [];
    const sphereRadius = Math.min(Math.max(width * 0.44, 380), 580);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci spherical distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT); // latitude [0, PI]
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;            // golden ratio longitude

      // Slight radius variance for realistic depth shell
      const r = sphereRadius * (0.85 + Math.random() * 0.3);

      const colorObj = SPECTRUM_COLORS[i % SPECTRUM_COLORS.length];
      const size = 1.2 + Math.random() * 1.2;
      const length = 3.5 + Math.random() * 3.5;

      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi) * 0.78, // Slightly elliptical for screen harmony
        z: r * Math.sin(phi) * Math.sin(theta),
        radius: r,
        phi,
        theta,
        orbitSpeed: (0.0015 + Math.random() * 0.002) * (i % 2 === 0 ? 1 : -1),
        size,
        length,
        color: colorObj.fill,
        glowColor: colorObj.glow,
        baseAlpha: 0.35 + Math.random() * 0.55,
        dispX: 0,
        dispY: 0,
        dispZ: 0,
        vx: 0,
        vy: 0,
      });
    }

    // ── Mouse & Physics Tracking ──
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

    // ── Animation Loop ──
    let rafId: number;
    let time = 0;

    const render = () => {
      time += 0.006; // Steady, calm, hypnotic 3D globe spin

      ctx.clearRect(0, 0, width, height);

      // Centered around the hero headline & logo
      const centerX = width / 2;
      const centerY = height * 0.42;
      const fov = 650;

      // Pure fixed 3D spherical rotation without camera parallax wobble
      const rotY = reduceMotion ? 0 : time;
      const rotX = 0.22; // Fixed elegant tilt

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projectedList: {
        screenX: number;
        screenY: number;
        size: number;
        length: number;
        color: string;
        glowColor: string;
        alpha: number;
        angleRad: number;
        z: number;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotation of the sphere
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective scaling
        const scale = fov / (fov + z2);
        let screenX = centerX + x1 * scale + p.dispX;
        let screenY = centerY + y2 * scale + p.dispY;

        // Local Anti-Gravity Mouse Repulsion / Deflection
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

        // Spring friction back to exact sphere coordinate
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.dispX += p.vx;
        p.dispY += p.vy;
        p.dispX *= 0.92;
        p.dispY *= 0.92;

        // Directional dash tangent to the latitude ring
        const dashAngle = Math.atan2(y2, x1) + Math.PI / 2 + 0.2;

        // Alpha based on 3D depth (closer particles brighter, background softer)
        const depthAlpha = ((z2 + sphereRadius) / (sphereRadius * 2));
        const finalAlpha = Math.max(0.1, Math.min(0.9, p.baseAlpha * (0.35 + depthAlpha * 0.65) * scale));

        projectedList.push({
          screenX,
          screenY,
          size: Math.max(1, p.size * scale),
          length: Math.max(2.5, p.length * scale),
          color: p.color,
          glowColor: p.glowColor,
          alpha: finalAlpha,
          angleRad: dashAngle,
          z: z2,
        });
      }

      // Sort by depth (back to front)
      projectedList.sort((a, b) => a.z - b.z);

      // Draw 3D Antigravity Dashes
      for (let i = 0; i < projectedList.length; i++) {
        const p = projectedList[i];

        ctx.save();
        ctx.translate(p.screenX, p.screenY);
        ctx.rotate(p.angleRad);

        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.size * 2.5;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;

        ctx.beginPath();
        ctx.roundRect(-p.length / 2, -p.size / 2, p.length, p.size, p.size / 2);
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
