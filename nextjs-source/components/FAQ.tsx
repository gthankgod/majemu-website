"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FAQS } from "@/lib/data";

function Item({
  q,
  a,
  i,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  i: number;
  open: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const body = bodyRef.current;
    if (!body) return;
    gsap.to(body, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.6,
      ease: "expo.out",
    });
  }, [open]);

  return (
    <div className="faq-item border-t border-ink/15 last:border-b">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-baseline justify-between gap-6 py-6 text-left md:py-8"
      >
        <span className="flex items-baseline gap-5">
          <span className="font-serif text-sm italic text-ink/40">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-xl font-extrabold uppercase tracking-tightest text-ink transition-colors group-hover:text-blood md:text-3xl">
            {q}
          </span>
        </span>
        <span
          className={`shrink-0 font-display text-2xl font-light text-blood transition-transform duration-500 ease-expo md:text-3xl ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div ref={bodyRef} className="h-0 overflow-hidden opacity-0">
        <p className="max-w-2xl pb-8 pl-9 text-sm leading-relaxed text-ink/60 md:pl-10 md:text-base">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      gsap.fromTo(
        q(".faq-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="faq" className="bg-bone px-5 py-28 text-ink md:px-10 md:py-40">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-[10px] font-bold uppercase tracking-mega text-ink/40">
            Before You Ask
          </p>
          <h2 className="h-mega mt-6 font-display text-[13vw] text-ink md:text-[4.5vw]">
            Good
            <br />
            questions
            <span className="text-blood">.</span>
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/60">
            Everything you&apos;re wondering before you send the booking email.
            If it&apos;s not here, just ask.
          </p>
        </div>
        <div className="md:col-span-8">
          {FAQS.map((f, i) => (
            <Item
              key={f.q}
              q={f.q}
              a={f.a}
              i={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
