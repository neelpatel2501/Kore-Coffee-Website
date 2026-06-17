"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const textGroup = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [particleData, setParticleData] = useState<any[]>([]);

  useEffect(() => {
    setParticleData(
      Array.from({ length: 40 }).map(() => ({
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.5 + 0.3,
        top: Math.random() * 100,
        left: Math.random() * 100,
      }))
    );
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: isMobile ? 0.1 : undefined,
    });
    lenisRef.current = lenis;
    lenis.stop(); // Pause scrolling during the 2.2s load sequence

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (!container.current || !textGroup.current || particleData.length === 0) return;

    // --- Page Load Sequence ---
    const loadTl = gsap.timeline({
      onComplete: () => {
        lenisRef.current?.start(); // Re-enable scrolling after sequence
      }
    });

    loadTl.fromTo(textGroup.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0);
    loadTl.fromTo(".particles-container", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.8);

    // --- Scroll Animation Sequence ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 1. Accelerate particles upward on scroll
    scrollTl.to(
      ".particle",
      {
        y: "-=400",
        ease: "none",
      },
      0
    );

    // Initial continuous gentle floating for particles
    const particles = gsap.utils.toArray(".particle");
    particles.forEach((particle: any) => {
      gsap.to(particle, {
        y: "-=150",
        x: "random(-30, 30)",
        rotation: "random(-180, 180)",
        duration: "random(6, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

  }, { scope: container, dependencies: [particleData] });

  // Render 40 cocoa particles safely
  const particles = particleData.map((p, i) => (
    <div
      key={i}
      className="particle absolute rounded-full"
      style={{
        width: p.size,
        height: p.size,
        top: `${p.top}%`,
        left: `${p.left}%`,
        opacity: p.opacity,
        backgroundColor: "#5C4033", // Dark cocoa brown
        filter: "blur(0.5px)",
      }}
    />
  ));

  return (
    <section 
      ref={container} 
      id="home"
      className="relative h-screen w-full flex flex-col items-center justify-center font-sans overflow-hidden"
      style={{
        backgroundImage: "url('/exterior.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay fading to site background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.30) 50%, var(--background) 100%)"
        }}
      />

      {/* Particles Container */}
      <div className="particles-container absolute inset-0 z-0 pointer-events-none opacity-0">
        {particles}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
        {/* Text Block */}
        <div ref={textGroup} className="absolute top-[50%] -translate-y-1/2 flex flex-col items-center text-center z-20 w-full px-4">
          <h1 
            className="text-white font-light leading-none mb-3"
            style={{ 
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              letterSpacing: "0.25em"
            }}
          >
            KORÉ COFFEE
          </h1>
          <p 
            className="text-white/90"
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
              letterSpacing: "0.25em"
            }}
          >
            SEOUL INSPIRATION. NEW YORK ENERGY.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-10 w-full justify-center">
            <a 
              href="tel:+19292571255"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-[12px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:border-white hover:text-[#1A1612] transition-all duration-300 shadow-lg shadow-black/20"
            >
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Contact Us
            </a>
            <a 
              href="https://www.instagram.com/kore.coffee/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-[12px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:border-white hover:text-[#1A1612] transition-all duration-300 shadow-lg shadow-black/20"
            >
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Watch Us Brew
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
