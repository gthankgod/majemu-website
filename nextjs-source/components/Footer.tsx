"use client";

import { FiInstagram, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { SITE } from "@/lib/data";

const NAV = [
  { label: "The Experience", href: "#manifesto" },
  { label: "Events", href: "#events" },
  { label: "Energy", href: "#energy" },
  { label: "Kind Words", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Book", href: "#book" },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-24 md:px-10">
      <div className="grid grid-cols-1 gap-14 border-b border-bone/10 pb-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-extrabold uppercase tracking-tightest text-bone">
            Majemu<span className="text-blood">.</span>
          </p>
          <p className="mt-4 max-w-xs font-serif text-sm italic leading-relaxed text-bone/60">
            MC · Compère · Moderator · Event Host.
            <br />
            {SITE.location}.
          </p>
        </div>

        <nav className="md:col-span-3">
          <p className="font-display text-[10px] font-bold uppercase tracking-mega text-bone/40">
            Navigate
          </p>
          <ul className="mt-5 flex flex-col gap-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-sm uppercase tracking-[0.15em] text-bone/70 transition-colors hover:text-blood"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-display text-[10px] font-bold uppercase tracking-mega text-bone/40">
            Get In Touch
          </p>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-bone/70">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-blood"
              >
                <FiMail aria-hidden /> {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-blood"
              >
                <FiPhone aria-hidden /> {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-blood"
              >
                <FiInstagram aria-hidden /> {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-blood"
              >
                <FiLinkedin aria-hidden /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
        <p className="text-[11px] uppercase tracking-[0.2em] text-bone/40">
          © {new Date().getFullYear()} Majemu Olowodola. All rights reserved.
        </p>
        <p className="font-script text-2xl text-bone/80">
          Creating experiences. One event at a time.
        </p>
      </div>
    </footer>
  );
}
