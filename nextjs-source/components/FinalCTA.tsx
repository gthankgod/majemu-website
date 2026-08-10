"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/data";

export default function FinalCTA() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q(".cta-line > span"),
          { yPercent: 115 },
          {
            yPercent: 0,
            stagger: 0.12,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
          }
        );

        gsap.fromTo(
          q(".cta-img"),
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          q(".cta-btn"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 40%" },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="book"
      className="relative flex min-h-screen items-center overflow-hidden bg-blood"
    >
      {/* Cinematic image */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] md:block">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/images/event-cod-hosting.jpg"
            alt="Majemu hosting live"
            fill
            sizes="42vw"
            className="cta-img object-cover mix-blend-luminosity opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blood via-blood/40 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full px-5 py-32 md:px-10">
        <p className="font-display text-[10px] font-bold uppercase tracking-mega text-bone/60">
          Encore — Your Move
        </p>
        <h2 className="h-mega mt-8 font-display text-[13.5vw] text-bone md:text-[8.5vw]">
          <span className="cta-line reveal-line">
            <span>Let&apos;s create</span>
          </span>
          <span className="cta-line reveal-line">
            <span>your next</span>
          </span>
          <span className="cta-line reveal-line">
            <span className="text-stroke">unforgettable</span>
          </span>
          <span className="cta-line reveal-line">
            <span>
              event<span className="font-serif italic">.</span>
            </span>
          </span>
        </h2>

        <div className="cta-btn mt-14 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <a
            href={`mailto:${SITE.email}?subject=Booking%20Enquiry%20—%20Majemu%20Olowodola`}
            data-cursor="BOOK"
            className="group relative overflow-hidden bg-ink px-12 py-6 font-display text-sm font-extrabold uppercase tracking-[0.3em] text-bone"
          >
            <span className="absolute inset-0 -translate-y-full bg-bone transition-transform duration-500 ease-expo group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-ink">
              Book Now
            </span>
          </a>
          <p className="font-script text-3xl text-bone/90 md:text-4xl">
            Your audience will thank you.
          </p>
        </div>
      </div>
    </section>
  );
}
