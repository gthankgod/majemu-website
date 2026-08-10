"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { NUMBERS } from "@/lib/data";

export default function Numbers() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      q(".num-value").forEach((el) => {
        const target = Number(el.getAttribute("data-value") || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      gsap.fromTo(
        q(".num-item"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="border-y border-bone/10 bg-ink px-5 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
        {NUMBERS.map((n) => (
          <div key={n.label} className="num-item">
            <p className="h-mega font-display text-[16vw] text-bone md:text-[6.5vw]">
              <span className="num-value" data-value={n.value}>
                0
              </span>
              <span className="text-blood">{n.suffix}</span>
            </p>
            <p className="mt-3 font-display text-[10px] font-bold uppercase tracking-mega text-bone/50">
              {n.label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-16 border-t border-bone/10 pt-8 text-center font-serif text-lg italic text-bone/60 md:text-xl">
        Corporate <span className="mx-3 text-blood">·</span> Faith
        <span className="mx-3 text-blood">·</span> Social
        <span className="mx-3 text-blood">·</span> Virtual
      </p>
    </section>
  );
}
