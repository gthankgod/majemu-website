"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const WORDS = ["Presence", "Energy", "Connection", "Confidence", "Impact"];

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Statement lines rise in
        gsap.fromTo(
          q(".mf-line > span"),
          { yPercent: 110 },
          {
            yPercent: 0,
            stagger: 0.12,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: q(".mf-statement")[0],
              start: "top 75%",
            },
          }
        );

        // Portrait mask reveal + slow zoom
        gsap.fromTo(
          q(".mf-img"),
          { clipPath: "inset(100% 0 0 0)", scale: 1.25 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: q(".mf-img-wrap")[0], start: "top 70%" },
          }
        );

        // Words animate individually as they enter
        q(".mf-word").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0.08, x: i % 2 ? 60 : -60 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 82%" },
            }
          );
        });

        // subtle parallax on the floating caption
        gsap.to(q(".mf-float"), {
          yPercent: -30,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="manifesto"
      className="relative bg-bone py-28 text-ink md:py-40"
    >
      <p className="px-5 font-display text-[10px] font-bold uppercase tracking-mega text-ink/40 md:px-10">
        Act I — Meet Your Host
      </p>

      <div className="mf-statement mt-10 px-5 md:mt-16 md:px-10">
        <h2 className="h-mega font-display text-[13.5vw] text-ink md:text-[8.2vw]">
          <span className="mf-line reveal-line">
            <span>I don&apos;t host</span>
          </span>
          <span className="mf-line reveal-line">
            <span>
              events<span className="text-blood">.</span>
            </span>
          </span>
          <span className="mf-line reveal-line mt-[2vw]">
            <span>
              I create <em className="font-serif font-medium italic tracking-normal">experiences</em>
              <span className="text-blood">.</span>
            </span>
          </span>
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 px-5 md:mt-28 md:grid-cols-12 md:px-10">
        {/* Monochrome portrait */}
        <div className="mf-img-wrap relative md:col-span-5 md:col-start-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/portrait-red.jpg"
              alt="Majemu Olowodola — studio portrait"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="mf-img object-cover grayscale"
            />
          </div>
          <p className="mf-float absolute -bottom-6 -right-2 font-script text-4xl text-blood md:-right-10 md:text-5xl">
            Majemu ♥
          </p>
        </div>

        <div className="flex flex-col justify-between md:col-span-5 md:col-start-8">
          <p className="max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
            With energy, presence and intentionality, I turn moments into
            memories. From corporate stages to church auditoriums, from intimate
            gatherings to thousands in attendance — I connect, engage and
            elevate every room I step into.
          </p>

          <ul className="mt-16 md:mt-0">
            {WORDS.map((w, i) => (
              <li
                key={w}
                className={`mf-word border-t border-ink/15 py-4 font-display text-[9vw] font-extrabold uppercase leading-none tracking-tightest md:py-5 md:text-[3.6vw] ${
                  i % 2 ? "text-right text-stroke-ink" : "text-ink"
                }`}
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
