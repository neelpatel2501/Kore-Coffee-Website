"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const hours = [
  { day: "Mon", time: "8:00 AM – 6:00 PM" },
  { day: "Tue", time: "8:00 AM – 6:00 PM" },
  { day: "Wed", time: "8:00 AM – 6:00 PM" },
  { day: "Thu", time: "8:00 AM – 6:00 PM" },
  { day: "Fri", time: "8:00 AM – 7:00 PM" },
  { day: "Sat", time: "8:00 AM – 7:00 PM" },
  { day: "Sun", time: "8:00 AM – 6:00 PM" },
];

const today = new Date().toLocaleString("en-US", { weekday: "short" });

export default function VisitUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    // Other animations can go here if needed in the future
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="findus"
      className="relative w-full overflow-hidden font-sans text-white"
      style={{
        backgroundImage: "url('/exterior.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "rgba(15,12,8,0.65)" }} />
      {/* Main split layout */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">

        {/* LEFT: Map */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 lg:py-16 flex items-center justify-center min-h-[50vh] lg:min-h-screen">
          <div 
            className="relative w-full h-full min-h-[380px] lg:min-h-[520px] overflow-hidden rounded-[12px] border border-white/10"
            style={{ background: "rgba(10,8,5,0.55)", backdropFilter: "blur(10px)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9937982!2d-73.99883!3d40.71576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598a4ab00c37%3A0x90a14b4e9bb49b46!2s26A%20Elizabeth%20St%2C%20New%20York%2C%20NY%2010013!5e0!3m2!1sen!2sus!4v1689260655388!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: "contrast(95%) saturate(0.8)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Koré Coffee — 26A Elizabeth St, New York"
            />
          </div>
        </div>

        {/* RIGHT: Info panel */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 lg:py-20 lg:pr-20 flex flex-col justify-center relative">
          <div 
            className="relative z-10 p-8 md:p-12 rounded-[12px] border border-white/10"
            style={{ background: "rgba(10,8,5,0.55)", backdropFilter: "blur(10px)" }}
          >
            {/* Logo */}
            <div className="flex items-center gap-4 mb-10">
              <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                <Image src="/kore coffee logo.png" alt="Koré Coffee" fill className="object-contain" />
              </div>
              <div>
                <p className="text-[#D4A96A] text-[10px] uppercase tracking-[0.3em]">Find Us</p>
                <h2 className="text-white text-[32px] font-extralight tracking-widest uppercase leading-tight">
                  Koré Coffee
                </h2>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="mb-10">
              <p className="text-[#D4A96A] text-[10px] uppercase tracking-[0.25em] mb-2">Location & Contact</p>
              <p className="text-white text-[16px] font-light leading-relaxed">
                26A Elizabeth St
              </p>
              <p className="text-white/60 text-[15px] font-light">
                New York, NY 10013 — Chinatown
              </p>
              <p className="text-white/60 text-[15px] font-light mt-2">
                <a href="tel:+19292571255" className="hover:text-[#D4A96A] transition-colors">
                  +1 (929) 257-1255
                </a>
              </p>
            </div>

            {/* Hours */}
            <div className="mb-10">
              <p className="text-[#D4A96A] text-[10px] uppercase tracking-[0.25em] mb-4">Hours</p>
              <div className="space-y-2">
                {hours.map(({ day, time }) => {
                  const isToday = today === day;
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between py-1.5 border-b transition-colors ${
                        isToday
                          ? "border-[#D4A96A]/30"
                          : "border-white/10"
                      }`}
                    >
                      <span className={`text-[13px] tracking-wider w-10 ${isToday ? "text-[#D4A96A] font-medium" : "text-white/40 font-light"}`}>
                        {day}
                      </span>
                      <span className={`text-[13px] font-light ${isToday ? "text-white" : "text-white/50"}`}>
                        {time}
                      </span>
                      {isToday && (
                        <span className="text-[10px] text-[#D4A96A] uppercase tracking-wider bg-[#D4A96A]/10 px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <a
                href="#menu"
                className="w-full py-4 px-6 bg-transparent border border-white text-white rounded-xl text-[13px] font-medium tracking-[0.15em] uppercase text-center hover:bg-white/10 transition-colors duration-200"
              >
                View Menu
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=26A+Elizabeth+St,+New+York,+NY+10013"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#C9975A] text-[#1A1612] rounded-xl text-[13px] font-medium tracking-[0.15em] uppercase text-center hover:bg-[#D4A96A] transition-colors duration-200 shadow-md shadow-[#C9975A]/20"
              >
                Get Directions
              </a>
              <a
                href="https://www.instagram.com/kore.coffee/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-transparent border border-white/20 text-white/60 rounded-xl text-[13px] font-light tracking-[0.15em] uppercase text-center hover:border-white/40 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @kore.coffee
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative z-10 border-t border-border/40 py-8 px-6 md:px-12 bg-background text-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: logo + tagline */}
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-sm overflow-hidden shrink-0">
              <Image src="/kore coffee logo.png" alt="Koré Coffee" fill className="object-contain" />
            </div>
            <div>
              <p className="text-foreground/80 text-[13px] tracking-[0.1em] uppercase font-medium">Koré Coffee</p>
              <p className="text-foreground/60 text-[15px] mt-1">Seoul Inspiration. New York Energy.</p>
            </div>
          </div>

          {/* Center: address & contact */}
          <div className="text-foreground/60 text-[15px] tracking-wide text-center leading-[2]">
            <p>26A Elizabeth St, New York, NY 10013 — Chinatown</p>
            <p>
              <a href="tel:+19292571255" className="hover:text-[#C49A6C] transition-colors">
                +1 (929) 257-1255
              </a>
            </p>
          </div>

          {/* Right: Instagram */}
          <a
            href="https://www.instagram.com/kore.coffee/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2 text-foreground/60 hover:text-[#C49A6C] transition-colors duration-200 text-[15px] tracking-wider"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @kore.coffee
          </a>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border/40 text-center">
          <p className="text-foreground/50 text-[13px] tracking-widest uppercase">
            © 2025 Koré Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
