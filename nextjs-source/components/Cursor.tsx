"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);
    document.body.classList.add("has-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    gsap.set([dot, ring], { autoAlpha: 0 });
    let shown = false;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]"
      );
      if (target) {
        const text = target.dataset.cursor || "";
        label.textContent = text;
        gsap.to(ring, {
          scale: text ? 3.2 : 2,
          backgroundColor: "rgba(168,20,8,0.92)",
          borderColor: "transparent",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(label, { opacity: 1, duration: 0.25 });
      } else if ((e.target as HTMLElement).closest("a, button")) {
        label.textContent = "";
        gsap.to(ring, {
          scale: 1.8,
          backgroundColor: "rgba(250,247,242,0.12)",
          borderColor: "rgba(250,247,242,0.6)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(250,247,242,0)",
          borderColor: "rgba(250,247,242,0.5)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) {
    return (
      <>
        <div ref={dotRef} className="hidden" />
        <div ref={ringRef} className="hidden" />
        <div ref={labelRef} className="hidden" />
      </>
    );
  }

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-bone"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[199] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-bone/50"
      >
        <div
          ref={labelRef}
          className="text-[7px] font-bold uppercase tracking-[0.2em] text-bone opacity-0"
        />
      </div>
    </>
  );
}
