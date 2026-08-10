"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const LETTERS = "MAJEMU".split("");

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const letters = root.querySelectorAll(".pl-letter");
    const bars = root.querySelectorAll(".pl-bar");
    const counter = root.querySelector(".pl-counter") as HTMLElement;

    const count = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setDone(true);
        window.dispatchEvent(new CustomEvent("preloader:done"));
      },
    });

    tl.fromTo(
      letters,
      { yPercent: 120 },
      { yPercent: 0, stagger: 0.06, duration: 0.9, ease: "expo.out" }
    )
      .to(
        count,
        {
          v: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(count.v)).padStart(3, "0");
          },
        },
        "<"
      )
      .to(letters, {
        yPercent: -120,
        stagger: 0.04,
        duration: 0.6,
        ease: "expo.in",
        delay: 0.15,
      })
      .to(counter, { opacity: 0, duration: 0.3 }, "<")
      .to(bars, {
        scaleY: 0,
        transformOrigin: "top center",
        stagger: 0.07,
        duration: 0.7,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[300]">
      {/* column bars */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="pl-bar h-full flex-1 bg-blood" />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex overflow-hidden">
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className="pl-letter h-mega font-display text-[18vw] leading-none text-bone md:text-[10vw]"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className="pl-counter absolute bottom-8 right-8 font-display text-sm tracking-mega text-bone/80">
        000
      </div>
    </div>
  );
}
