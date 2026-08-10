"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { BACKSTAGE } from "@/lib/data";

export default function Backstage() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const track = trackRef.current!;
        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.fromTo(
        q(".bs-heading > span"),
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="backstage" className="overflow-hidden bg-smoke py-24 md:h-screen md:py-0">
      <div className="flex h-full flex-col justify-center">
        <div className="px-5 md:px-10 md:pt-32">
          <p className="font-display text-[10px] font-bold uppercase tracking-mega text-bone/40">
            Act V — Backstage Access
          </p>
          <h2 className="bs-heading h-mega mt-4 font-display text-[11vw] text-bone md:text-[5vw]">
            <span className="reveal-line">
              <span>
                Beyond the <span className="text-blood">stage.</span>
              </span>
            </span>
          </h2>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex flex-col gap-6 px-5 md:mt-14 md:flex-row md:items-center md:gap-8 md:px-10 md:pb-16"
        >
          {BACKSTAGE.map((b, i) => (
            <figure
              key={b.src + i}
              data-cursor="RAW"
              className="group relative w-full shrink-0 md:w-[34vw]"
            >
              <div className={`relative overflow-hidden ${i % 2 ? "aspect-[4/5] md:mt-16" : "aspect-[4/3]"}`}>
                <Image
                  src={b.src}
                  alt={b.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="object-cover grayscale transition-all duration-700 ease-expo group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between">
                <p className="font-serif text-sm italic text-bone/60">
                  {b.caption}
                </p>
                <span className="font-display text-[10px] font-bold tracking-mega text-bone/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="flex w-full shrink-0 items-center justify-center md:w-[24vw]">
            <p className="text-center font-script text-4xl leading-tight text-blood md:text-5xl">
              This is the part
              <br />
              you don&apos;t see.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
