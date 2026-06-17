"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryItems = [
  { name: "Tiramisu Latte", file: "Tiramisu Latte.png" },
  { name: "Matcha Tiramisu Latte", file: "MATCHA Tiramisu Latte.png" },
  { name: "Strawberry Tiramisu Latte", file: "Strwberry tiramisu latte.png" },
  { name: "Einspänner", file: "Einspänner.png" },
  { name: "Peppermint Mocha", file: "Peppermint Mocha Tiramisu Latte.png" },
  { name: "Maple Spice Latte", file: "Maple Spice Latte.png" },
  { name: "Purple U Lemonade", file: "PURPLE U Lemonade.png" },
  { name: "Strawberry Sparkling", file: "Strawberry Sparkling Lemonade.png" },
  { name: "Oat Cortado", file: "Oat Cortado.png" },
  { name: "Macchiato", file: "macchiato.png" },
  { name: "Tahni Latte", file: "TAHNI Latte.png" },
  { name: "Tahni Matcha Latte", file: "Tahni Matcha Latte.png" },
  { name: "Mikrokosmos", file: "Mikrokosmos Espresso-Da.png" },
  { name: "Strawberry Matcha", file: "Strawberry Matcha Latte.png" },
  { name: "Almond Croffle", file: "Almond De Loco croffles.png" },
  { name: "Blueberry Croffle", file: "Blueberry Croffle.png" },
  { name: "Chocolate Croffle", file: "Chocolate Croffle.png" },
  { name: "Matcha Croffle", file: "Matcha Croffle.png" },
  { name: "Strawberry Croffle", file: "Strawberry Croffle.png" },
  { name: "Tiramisu Croffle", file: "Tiramisu Croffle.png" }
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = gsap.utils.toArray(".gallery-item");
    items.forEach((item: any) => {
      gsap.fromTo(
        item,
        { y: 30, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="story" className="w-full bg-background py-28 px-4 md:px-10 font-sans border-t border-border/40">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <p className="text-[#C49A6C] text-[11px] uppercase tracking-[0.3em] font-semibold mb-4">
            As Seen In Our Café
          </p>
          <h2 className="text-foreground text-[38px] md:text-[52px] font-extralight tracking-wide mb-3">
            Fresh daily.
          </h2>
          <p className="text-foreground/40 text-[15px] tracking-wide">Made with love in New York City.</p>

          {/* Instagram CTA */}
          <a
            href="https://www.instagram.com/kore.coffee/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-foreground/50 text-[12px] tracking-[0.2em] uppercase border border-border/60 rounded-full px-5 py-2.5 hover:border-[#C49A6C]/50 hover:text-[#C49A6C] transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @kore.coffee
          </a>
        </div>

        {/* Perfect Square Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="gallery-item group relative overflow-hidden rounded-sm cursor-pointer aspect-square bg-muted/30"
            >
              <img
                src={`/Gallery/${item.file}`}
                alt={item.name}
                className="w-full h-full block object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                loading="lazy"
              />
              {/* Hover overlay (Always visible on mobile/tablet, hover on desktop) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                <span className="text-white text-[10px] md:text-[12px] font-medium tracking-wider uppercase max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {item.name}
                </span>
                <div className="absolute inset-0 border-[3px] border-[#C49A6C] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none hidden lg:block" />
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA row at bottom */}
        <div className="flex justify-center mt-14">
          <a
            href="https://www.instagram.com/kore.coffee/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#C49A6C] text-white text-[13px] tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full hover:bg-[#b04600] transition-all duration-300 hover:scale-[1.02]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @kore.coffee
          </a>
        </div>

      </div>
    </section>
  );
}
