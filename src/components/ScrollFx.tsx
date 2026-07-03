"use client";

import { useEffect } from "react";

/** Animasi scroll-reveal + count-up (fail-open). Tidak merender apa pun. */
export default function ScrollFx() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Scroll reveal ──
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
    const revealAll = () => reveals.forEach((el) => el.classList.add("in"));

    let io: IntersectionObserver | undefined;
    let failSafe: ReturnType<typeof setTimeout> | undefined;

    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      reveals.forEach((el) => io!.observe(el));
      failSafe = setTimeout(revealAll, 1800);
    }

    // ── Count-up ──
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]"),
    );
    const animate = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      if (reduce) {
        el.textContent = target.toLocaleString("id-ID") + suffix;
        return;
      }
      const dur = 1500;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("id-ID") + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    let cio: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      cio = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate(e.target as HTMLElement);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      counters.forEach((el) => cio!.observe(el));
    } else {
      counters.forEach(animate);
    }

    return () => {
      io?.disconnect();
      cio?.disconnect();
      if (failSafe) clearTimeout(failSafe);
    };
  }, []);

  return null;
}
