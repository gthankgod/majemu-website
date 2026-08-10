"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ENERGY } from "@/lib/data";

const BGS = ["#0A0A0A", "#A81408", "#0A0A0A", "#F5F0E8", "#A81408"];
const FGS = ["#FAF7F2", "#FAF7F2", "#A81408", "#0A0A0A", "#0A0A0A"];

export default function Energy() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const slides = q(".energy-slide");
        gsap.set(slides.slice(1), { autoAlpha: 0 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: `+=${ENERGY.length * 90}%`,
            pin: true,
            scrub: 0.6,
          },
        });

        slides.forEach((slide, i) => {
          const word = slide.querySelector(".energy-word");
          const line = slide.querySelector(".energy-line");
          const idx = slide.querySelector(".energy-idx");

          if (i > 0) {
            tl.to(rootRef.current, {
              backgroundColor: BGS[i],
              duration: 0.35,
            });
            tl.fromTo(
              slide,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.15 },
              "<"
            );
          }
          if (i === 0) {
            // First word is fully visible at pin start, then just holds
            gsap.set(word, { scale: 1, opacity: 1 });
            gsap.set([line, idx], { opacity: 1, y: 0 });
          } else {
            tl.fromTo(
              word,
              { scale: 0.55, opacity: 0, yPercent: 20 },
              { scale: 1, opacity: 1, yPercent: 0, duration: 0.5, ease: "power2.out" },
              "<"
            );
            tl.fromTo(
              [line, idx],
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.35 },
              "-=0.2"
            );
          }
          tl.to(slide, { duration: 0.5 }); // hold
          if (i < slides.length - 1) {
            tl.to(slide, {
              autoAlpha: 0,
              scale: 1.4,
              filter: "blur(6px)",
              duration: 0.3,
            });
          }
        });
      });

      // Mobile / reduced motion: simple stacked reveals
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        q(".energy-slide").forEach((slide) => {
          gsap.set(slide, { autoAlpha: 1, position: "relative" });
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="energy"
      className="relative overflow-hidden bg-ink md:h-screen"
    >
      <p className="absolute left-5 top-24 z-10 font-display text-[10px] font-bold uppercase tracking-mega mix-blend-difference text-bone opacity-40 md:left-10">
        Act III — The Energy
      </p>

      <div className="relative flex flex-col md:h-full">
        {ENERGY.map((e, i) => (
          <div
            key={e.word}
            className="energy-slide flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center md:!bg-transparent md:absolute md:inset-0 md:min-h-0 md:py-0"
            style={{ color: FGS[i], backgroundColor: BGS[i] }}
          >
            <span className="energy-idx font-serif text-sm italic opacity-60">
              {String(i + 1).padStart(2, "0")} / {String(ENERGY.length).padStart(2, "0")}
            </span>
            <h3 className="energy-word h-mega mt-4 font-display text-[16vw] md:text-[11vw]">
              {e.word}
            </h3>
            <p className="energy-line mt-6 max-w-md font-serif text-lg italic leading-relaxed opacity-80 md:text-2xl">
              {e.line}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
