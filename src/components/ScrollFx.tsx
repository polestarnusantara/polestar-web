"use client";

import { useEffect } from "react";

/**
 * High-performance Scroll Pop-up Reveal & Count-up Engine.
 * Fully optimized for both Desktop and Mobile / Touch screens.
 */
export default function ScrollFx() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. Scroll Reveal (Pop-up on Scroll) ──
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-pop"));

    const revealElement = (el: HTMLElement) => {
      el.classList.add("in");
    };

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(revealElement);
    } else {
      const isMobile = window.innerWidth < 768;

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target as HTMLElement);
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: isMobile ? 0.05 : 0.1,
          rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -40px 0px",
        }
      );

      reveals.forEach((el) => {
        // If element is already in the initial viewport, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          revealElement(el);
        } else {
          observer.observe(el);
        }
      });
    }

    // ── 2. Animated Counter (Stats) ──
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const animateCounter = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      if (reduce) {
        el.textContent = target.toLocaleString("id-ID") + suffix;
        return;
      }
      const dur = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        // Smooth cubic ease out
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("id-ID") + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window && !reduce) {
      const counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target as HTMLElement);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => counterObserver.observe(el));
    } else {
      counters.forEach(animateCounter);
    }

    return () => {
      // Cleanup
    };
  }, []);

  return null;
}
