"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function FloatingBook() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { autoAlpha: 0, y: 30 });

    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const nearEnd =
        window.scrollY + window.innerHeight >
        document.body.scrollHeight - window.innerHeight * 1.2;
      gsap.to(el, {
        autoAlpha: past && !nearEnd ? 1 : 0,
        y: past && !nearEnd ? 0 : 30,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      ref={ref}
      href="#book"
      data-cursor="BOOK"
      className="fixed bottom-6 right-6 z-[130] flex items-center gap-3 rounded-full bg-blood px-6 py-4 font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-bone shadow-[0_10px_40px_rgba(168,20,8,0.45)] transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bone opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-bone" />
      </span>
      Book Majemu
    </a>
  );
}
