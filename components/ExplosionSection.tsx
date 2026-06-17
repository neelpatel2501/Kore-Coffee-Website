"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ExplosionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const calmCupRef = useRef<HTMLImageElement>(null);
  const explosionCupRef = useRef<HTMLImageElement>(null);
  const whiteFlashRef = useRef<HTMLDivElement>(null);

  // We use state to safely generate random data on mount to avoid hydration mismatch
  const [particleData, setParticleData] = useState<any[]>([]);
  const [iceCubeData, setIceCubeData] = useState<any[]>([]);

  // Track if animation has played so it only triggers once
  const hasTriggered = useRef(false);

  useEffect(() => {
    // 12 particles radiating outward
    const pData = Array.from({ length: 12 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 200 + Math.random() * 300; // 200 - 500px
      const size = 20 + Math.random() * 20; // 20 - 40px
      const opacity = 0.4 + Math.random() * 0.6; 
      return {
        xOut: Math.cos(angle) * distance,
        yOut: Math.sin(angle) * distance,
        size,
        opacity,
        rotation: Math.random() * 360,
      };
    });
    setParticleData(pData);

    // 3 Ice Cubes flying mostly upward
    const iData = Array.from({ length: 3 }).map(() => {
      // Angle between 45 and 135 degrees (upward cone)
      const angle = (Math.PI / 4) + Math.random() * (Math.PI / 2);
      const distance = 300 + Math.random() * 200;
      return {
        // randomly flip X to send it left or right
        xOut: Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1),
        yOut: -Math.sin(angle) * distance - 100,
        rotation: Math.random() * 360,
      };
    });
    setIceCubeData(iData);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || particleData.length === 0) return;

    let scrollTimeout: NodeJS.Timeout;
    
    // Master Explosion Timeline (total duration approx 1.8s)
    const tl = gsap.timeline({ paused: true });

    // t=0: scale up and shake cup
    tl.to(calmCupRef.current, {
      scale: 1.05,
      x: () => gsap.utils.random(-10, 10),
      y: () => gsap.utils.random(-10, 10),
      duration: 0.1,
      repeat: 2, // repeats twice over 0.3s total
      yoyo: true,
      ease: "power1.inOut"
    }, 0);

    // Pre-set the explosion cup scale to match the calm cup scale state
    tl.set(explosionCupRef.current, { scale: 1.05 }, 0);

    // t=0.3: crossfade cups
    tl.to(calmCupRef.current, { opacity: 0, duration: 0.2 }, 0.3);
    tl.to(explosionCupRef.current, { opacity: 1, duration: 0.2 }, 0.3);

    // t=0.3: scramble particles
    const particleEls = gsap.utils.toArray(".explosion-particle");
    particleEls.forEach((p: any, i) => {
      tl.fromTo(p,
        { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 },
        { 
          x: particleData[i].xOut, 
          y: particleData[i].yOut, 
          scale: 1, 
          opacity: particleData[i].opacity, 
          rotation: particleData[i].rotation,
          duration: 0.7, 
          ease: "power4.out" 
        },
        0.3
      );
      // t=1.0: gravity down
      tl.to(p, { y: "+=250", ease: "power2.in", duration: 0.8 }, 1.0);
    });

    // t=0.3: ice cubes fly upward/outward
    const iceEls = gsap.utils.toArray(".ice-cube");
    iceEls.forEach((ice: any, i) => {
      tl.fromTo(ice,
        { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 },
        {
          x: iceCubeData[i].xOut,
          y: iceCubeData[i].yOut,
          scale: 1,
          opacity: 0.8,
          rotation: iceCubeData[i].rotation,
          duration: 0.7,
          ease: "power3.out"
        },
        0.3
      );
      // t=1.0: gravity down
      tl.to(ice, { y: "+=400", ease: "power2.in", duration: 0.8 }, 1.0);
    });

    // t=0.6: screen flashes white briefly
    tl.fromTo(whiteFlashRef.current, { opacity: 0 }, { opacity: 0.3, duration: 0.1 }, 0.6);
    tl.to(whiteFlashRef.current, { opacity: 0, duration: 0.1 }, 0.7);

    // Trigger orchestration
    const triggerExplosion = () => {
      hasTriggered.current = true;
      clearTimeout(scrollTimeout);
      tl.play();
    };

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%", // Pin section
      pin: true,
      onUpdate: (self) => {
        if (hasTriggered.current) return;
        
        // Trigger if user scrolls past 50%
        if (self.progress >= 0.5) {
          triggerExplosion();
          return;
        }

        // Trigger if user stops scrolling for 2 seconds
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!hasTriggered.current) triggerExplosion();
        }, 2000);
      },
      onEnter: () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!hasTriggered.current) triggerExplosion();
        }, 2000);
      },
      onLeave: () => clearTimeout(scrollTimeout),
      onLeaveBack: () => clearTimeout(scrollTimeout),
    });

    return () => {
      clearTimeout(scrollTimeout);
    };

  }, { scope: sectionRef, dependencies: [particleData, iceCubeData] });

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-full h-full flex items-center justify-center z-10">
        
        {/* Calm Cup */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[500px] h-[500px]">
            <Image
              ref={calmCupRef}
              src="/hero/tiramisu_latte_calm.png"
              alt="Calm Latte"
              fill
              className="object-contain mix-blend-screen drop-shadow-2xl z-20"
              priority
            />
            {/* Explosion Cup (Hidden Initially) */}
            <Image
              ref={explosionCupRef}
              src="/hero/tiramisu_latte_explosion.png"
              alt="Exploding Latte"
              fill
              className="object-contain mix-blend-screen drop-shadow-2xl z-20 opacity-0"
              priority
            />
          </div>
        </div>

        {/* Generated Particles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {particleData.map((p, i) => (
            <div
              key={`particle-${i}`}
              className="explosion-particle absolute"
              style={{
                width: p.size,
                height: p.size,
                opacity: 0,
              }}
            >
              <Image 
                src="/ingredients/cocoa_dust.png" 
                alt="Particle" 
                fill 
                className="object-contain" 
              />
            </div>
          ))}
        </div>

        {/* Generated Ice Cubes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {iceCubeData.map((ice, i) => (
            <div
              key={`ice-${i}`}
              className="ice-cube absolute bg-white rounded-[6px]"
              style={{ 
                width: 30, 
                height: 30, 
                opacity: 0 
              }}
            />
          ))}
        </div>

      </div>

      {/* Full Screen White Flash */}
      <div 
        ref={whiteFlashRef} 
        className="absolute inset-0 bg-white opacity-0 pointer-events-none z-50 mix-blend-overlay" 
      />
      
    </section>
  );
}
