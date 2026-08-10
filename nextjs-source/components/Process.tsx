"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PROCESS } from "@/lib/data";

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      // Vertical line draws as you scroll
      gsap.fromTo(
        q(".proc-line"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: q(".proc-list")[0],
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      q(".proc-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      gsap.fromTo(
        q(".proc-heading > span"),
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="bg-bone px-5 py-28 text-ink md:px-10 md:py-40">
      <p className="font-display text-[10px] font-bold uppercase tracking-mega text-ink/40">
        The Experience
      </p>
      <h2 className="proc-heading h-mega mt-6 font-display text-[11vw] text-ink md:text-[6vw]">
        <span className="reveal-line">
          <span>What it&apos;s like</span>
        </span>
        <span className="reveal-line">
          <span>
            working <em className="font-serif font-medium italic tracking-normal text-blood">with me.</em>
          </span>
        </span>
      </h2>

      <div className="proc-list relative mx-auto mt-20 max-w-3xl md:mt-28">
        <span className="proc-line absolute left-4 top-0 h-full w-px bg-blood md:left-1/2" />
        {PROCESS.map((p, i) => (
          <div
            key={p.step}
            className={`proc-item relative mb-14 pl-12 md:mb-20 md:w-1/2 md:pl-0 ${
              i % 2
                ? "md:ml-auto md:pl-14 md:text-left"
                : "md:mr-auto md:pr-14 md:text-right"
            }`}
          >
            <span
              className={`absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blood bg-bone md:translate-x-0 ${
                i % 2 ? "md:left-[-6px]" : "md:left-auto md:right-[-6px]"
              }`}
            />
            <p className="font-serif text-sm italic text-ink/40">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tightest md:text-4xl">
              {p.step}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60 md:text-base">
              {p.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
