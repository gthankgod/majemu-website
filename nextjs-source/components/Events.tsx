"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EVENTS, EventItem } from "@/lib/data";

function EventCard({ ev, i }: { ev: EventItem; i: number }) {
  const aspect =
    ev.ratio === "portrait"
      ? "aspect-[4/5]"
      : ev.ratio === "tall"
        ? "aspect-[9/13]"
        : "aspect-[4/3]";

  return (
    <figure
      data-cursor="VIEW"
      className={`ev-card group relative mb-5 break-inside-avoid overflow-hidden bg-smoke ${
        i % 3 === 1 ? "md:mt-10" : ""
      }`}
    >
      <div className={`relative w-full ${aspect} overflow-hidden`}>
        <Image
          src={ev.src}
          alt={`${ev.title} — ${ev.role}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-[10px] font-bold uppercase tracking-mega text-blood">
          {ev.tag} · {ev.role}
        </p>
        <h3 className="mt-1 font-display text-xl font-extrabold uppercase leading-tight tracking-tightest text-bone md:text-2xl">
          {ev.title}
        </h3>
        <p className="mt-1 font-serif text-sm italic text-bone/70">{ev.venue}</p>
      </figcaption>
      <span className="absolute left-4 top-4 font-serif text-sm italic text-bone/0 transition-colors duration-500 group-hover:text-bone/70">
        0{i + 1}
      </span>
    </figure>
  );
}

export default function Events() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q(".ev-heading > span"),
          { yPercent: 110 },
          {
            yPercent: 0,
            stagger: 0.1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
          }
        );

        q(".ev-card").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="events" className="bg-ink px-5 py-28 md:px-10 md:py-40">
      <p className="font-display text-[10px] font-bold uppercase tracking-mega text-bone/40">
        Act II — The Performance
      </p>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <h2 className="ev-heading h-mega font-display text-[12vw] text-bone md:text-[7vw]">
          <span className="reveal-line">
            <span>Moments</span>
          </span>
          <span className="reveal-line">
            <span>
              that <span className="text-stroke">matter</span>
              <span className="text-blood">.</span>
            </span>
          </span>
        </h2>
        <p className="max-w-xs pb-3 text-sm leading-relaxed text-bone/60">
          Corporate summits. Fireside chats. Faith gatherings. Gaming arenas.
          Every stage gets the same standard: unforgettable.
        </p>
      </div>

      <div className="mt-16 columns-1 gap-5 md:mt-20 md:columns-3">
        {EVENTS.map((ev, i) => (
          <EventCard key={ev.title} ev={ev} i={i} />
        ))}
      </div>
    </section>
  );
}
