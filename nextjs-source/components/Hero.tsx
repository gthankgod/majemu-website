"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/data";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      // Entrance — waits for preloader
      const enter = () => {
        const tl = gsap.timeline();
        tl.fromTo(
          q(".hero-img"),
          { scale: 1.35, clipPath: "inset(15% 15% 15% 15%)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.out",
          }
        )
          .fromTo(
            q(".hero-line > span"),
            { yPercent: 120 },
            { yPercent: 0, stagger: 0.09, duration: 1.1, ease: "expo.out" },
            "-=1.1"
          )
          .fromTo(
            q(".hero-fade"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" },
            "-=0.7"
          )
          .fromTo(
            q(".hero-script"),
            { opacity: 0, rotate: -6, scale: 0.9 },
            { opacity: 1, rotate: 0, scale: 1, duration: 0.9, ease: "back.out(1.6)" },
            "-=0.5"
          );
      };

      let played = false;
      const onDone = () => {
        if (!played) {
          played = true;
          enter();
        }
      };
      window.addEventListener("preloader:done", onDone);
      // Fallback if preloader was skipped (reduced motion / fast nav)
      const fallback = setTimeout(onDone, 3800);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll: typography separates, image scales & drifts
        gsap.to(q(".hero-title-top"), {
          xPercent: -14,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(q(".hero-title-bottom"), {
          xPercent: 14,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(q(".hero-img-wrap"), {
          yPercent: 18,
          scale: 1.12,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(q(".hero-meta"), {
          opacity: 0,
          y: -40,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });
      });

      return () => {
        window.removeEventListener("preloader:done", onDone);
        clearTimeout(fallback);
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-ink"
    >
      {/* Portrait */}
      <div className="hero-img-wrap absolute inset-0 flex items-end justify-center">
        <div className="hero-img relative h-[78%] w-[90vw] max-w-[560px] md:h-[88%]">
          <Image
            src="/images/portrait-brown.jpg"
            alt="Majemu Olowodola — portrait"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 560px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70" />
        </div>
      </div>

      {/* Typography over the body */}
      <div className="pointer-events-none relative z-10 w-full px-4 text-center">
        <h1 className="h-mega font-display text-bone">
          <span className="hero-line hero-title-top reveal-line block text-[19vw] md:text-[15.5vw]">
            <span>MAJEMU</span>
          </span>
          <span className="hero-line hero-title-bottom reveal-line -mt-[1vw] block text-[13.2vw] md:text-[10.8vw]">
            <span className="text-stroke">OLOWODOLA</span>
          </span>
        </h1>
        <span className="hero-script pointer-events-none absolute left-[58%] top-[68%] z-20 -translate-x-1/2 font-script text-[13vw] leading-none text-blood md:top-[64%] md:text-[6.5vw]">
          Olowodola
        </span>
      </div>

      {/* Side roles */}
      <div className="hero-meta hero-fade absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <ul className="vertical-rl flex flex-col gap-6 font-display text-[11px] font-bold uppercase tracking-mega text-bone/80">
          {SITE.roles.map((r) => (
            <li key={r} className="flex items-center gap-3">
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom bar */}
      <div className="hero-meta absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-8">
        <p className="hero-fade max-w-[180px] text-left font-serif text-sm italic leading-snug text-bone/80 md:max-w-[220px] md:text-base">
          {SITE.tagline}
        </p>
        <div className="hero-fade flex flex-col items-end gap-3 md:flex-row md:items-center md:gap-4">
          <a
            href="#book"
            data-cursor="LET'S GO"
            className="group relative overflow-hidden border border-bone/0 bg-blood px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.25em] text-bone transition-colors duration-500"
          >
            <span className="absolute inset-0 -translate-y-full bg-bone transition-transform duration-500 ease-expo group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-ink">
              Book Majemu
            </span>
          </a>
          <a
            href="#events"
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-bone/70 underline-offset-4 transition-colors hover:text-bone hover:underline"
          >
            See the work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-meta hero-fade absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[9px] uppercase tracking-mega text-bone/50">
          Scroll
        </span>
        <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-bone/60 to-transparent" />
      </div>
    </section>
  );
}
