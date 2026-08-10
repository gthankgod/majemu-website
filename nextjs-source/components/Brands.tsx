"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { BRANDS } from "@/lib/data";

function Row({ items, reverse, speed }: { items: string[]; reverse?: boolean; speed: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="marquee-track inline-flex items-center"
        style={{
          ["--marquee-speed" as string]: speed,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((b, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-12 font-display text-[8vw] font-extrabold uppercase leading-none tracking-tightest text-bone/25 transition-colors duration-300 hover:text-blood md:text-[4.5vw]"
          >
            {b}
            <span className="h-2 w-2 rounded-full bg-blood/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Brands() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      gsap.fromTo(
        q(".brands-heading > span"),
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

  const half = Math.ceil(BRANDS.length / 2);

  return (
    <section ref={rootRef} className="bg-ink py-28 md:py-36">
      <div className="px-5 md:px-10">
        <p className="font-display text-[10px] font-bold uppercase tracking-mega text-bone/40">
          Trusted By
        </p>
        <h2 className="brands-heading mt-6 font-display text-[8.5vw] font-extrabold uppercase leading-[0.95] tracking-tightest text-bone md:text-[4.2vw]">
          <span className="reveal-line">
            <span>Brands that trust</span>
          </span>
          <span className="reveal-line">
            <span>
              <em className="font-serif font-medium italic tracking-normal text-blood">
                excellence.
              </em>
            </span>
          </span>
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-4 md:mt-20">
        <Row items={BRANDS.slice(0, half)} speed="36s" />
        <Row items={BRANDS.slice(half)} reverse speed="42s" />
      </div>
    </section>
  );
}
