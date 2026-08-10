"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/lib/data";

const LINKS = [
  { label: "The Experience", href: "#manifesto" },
  { label: "Events", href: "#events" },
  { label: "Energy", href: "#energy" },
  { label: "Kind Words", href: "#testimonials" },
  { label: "Backstage", href: "#backstage" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (open) {
      gsap.set(panel, { display: "flex" });
      gsap.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" }
      );
      gsap.fromTo(
        panel.querySelectorAll(".nav-link"),
        { yPercent: 120 },
        {
          yPercent: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "expo.out",
          delay: 0.3,
        }
      );
    } else {
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[150] mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-5 md:px-10">
          <a
            href="#top"
            className="font-display text-sm font-extrabold uppercase tracking-[0.25em] text-bone"
          >
            Majemu<span className="text-blood">.</span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#book"
              className="hidden font-display text-xs font-bold uppercase tracking-[0.25em] text-bone underline-offset-4 hover:underline md:block"
            >
              Book Majemu
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="group flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
            >
              <span
                className={`h-[2px] w-7 bg-bone transition-transform duration-300 ease-expo ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-7 bg-bone transition-transform duration-300 ease-expo ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-[140] hidden flex-col justify-between bg-blood px-5 pb-10 pt-28 md:px-10"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <nav className="flex flex-col">
          {LINKS.map((l, i) => (
            <span key={l.href} className="reveal-line overflow-hidden">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="nav-link group flex items-baseline gap-4 py-1 font-display text-[11vw] font-extrabold uppercase leading-[1.02] tracking-tightest text-bone transition-colors hover:text-ink md:text-[5.5vw]"
              >
                <span className="font-serif text-base italic tracking-normal text-bone/60">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            </span>
          ))}
        </nav>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-bone/80">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="hover:text-ink">
              Instagram
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-ink">
              Email
            </a>
          </div>
          <p className="font-script text-3xl text-bone">
            Creating experiences. One event at a time.
          </p>
        </div>
      </div>
    </>
  );
}
