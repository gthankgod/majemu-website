import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Majemu Olowodola — MC · Compère · Moderator · Event Host",
  description:
    "I don't host events. I create experiences. Majemu Olowodola is an event host, MC, compère and moderator based in Lagos, Nigeria — creating moments people remember.",
  keywords: [
    "MC",
    "event host",
    "compère",
    "moderator",
    "Lagos",
    "Nigeria",
    "corporate events",
    "conference host",
  ],
  openGraph: {
    title: "Majemu Olowodola — I Create Experiences",
    description:
      "Event Host · MC · Compère · Moderator. Creating moments people remember.",
    images: ["/images/portrait-brown.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain">
        <Preloader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
