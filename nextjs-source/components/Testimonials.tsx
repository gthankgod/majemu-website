"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      q(".tst-item").forEach((el) => {
        const words = el.querySelectorAll(".tst-word");
        gsap.fromTo(
          words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          el.querySelector(".tst-meta"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 45%" },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="testimonials"
      className="bg-ink px-5 py-28 md:px-10 md:py-40"
    >
      <p className="font-display text-[10px] font-bold uppercase tracking-mega text-bone/40">
        Act IV — Trusted Voices
      </p>
      <h2 className="h-mega mt-6 font-display text-[11vw] text-bone md:text-[6vw]">
        People remember
        <br />
        the <span className="text-stroke">experience</span>
        <span className="text-blood">.</span>
      </h2>

      <div className="mt-24 flex flex-col gap-32 md:mt-32 md:gap-44">
        {TESTIMONIALS.map((t, i) => (
          <blockquote
            key={t.name}
            className={`tst-item relative max-w-4xl ${
              i % 2 ? "self-end text-right" : "self-start"
            }`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-20 font-serif text-[10rem] leading-none text-blood/40 md:text-[14rem] ${
                i % 2 ? "-right-4" : "-left-4"
              }`}
            >
              &ldquo;
            </span>
            <p className="relative font-serif text-2xl font-light italic leading-snug text-bone md:text-4xl">
              {t.quote.split(" ").map((w, wi) => (
                <span key={wi} className="tst-word">
                  {w}{" "}
                </span>
              ))}
            </p>
            <footer className="tst-meta mt-8">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-blood">
                {t.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bone/50">
                {t.title}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
