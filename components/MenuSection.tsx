"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, ZoomIn } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useGSAP(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <>
      <section
        ref={sectionRef}
        id="menu"
        className="w-full bg-background py-28 px-4 md:px-12 font-sans overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-[#C49A6C] text-[11px] uppercase tracking-[0.3em] font-semibold mb-4">
              Our Menu
            </p>
            <h2 className="text-foreground text-[40px] md:text-[54px] font-extralight tracking-wide">
              What we serve
            </h2>
          </div>

          {/* Menu image */}
          <div
            ref={imageRef}
            className="group relative rounded-2xl overflow-hidden border border-border/40 shadow-2xl cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src="/menu.png"
              alt="Koré Coffee Menu"
              width={1200}
              height={1600}
              className="w-full h-auto object-contain"
              priority
            />

            {/* Zoom hint overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                <ZoomIn size={36} strokeWidth={1.5} />
                <span className="text-[12px] uppercase tracking-[0.2em]">View Full Menu</span>
              </div>
            </div>
          </div>

          {/* Order CTA */}
          <div className="flex justify-center mt-12">
            <a
              href="https://www.instagram.com/kore.coffee/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-border/60 text-foreground/70 rounded-full px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase hover:border-[#C49A6C]/50 hover:text-[#C49A6C] transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Order via Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          <div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/menu.png"
              alt="Koré Coffee Menu"
              width={1200}
              height={1600}
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
