"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AssemblySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineLine1Ref = useRef<HTMLDivElement>(null);
  const headlineLine2Ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const pillsRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. Eyebrow Animation
    gsap.from(eyebrowRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // 2. Headline Words Animation (Simulating SplitText)
    const wordsLine1 = headlineLine1Ref.current?.querySelectorAll('.word');
    const wordsLine2 = headlineLine2Ref.current?.querySelectorAll('.word');
    
    const wordStagger = 0.05;

    if (wordsLine1 && wordsLine2) {
      gsap.from(wordsLine1, {
        opacity: 0,
        y: 30,
        stagger: wordStagger,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      gsap.from(wordsLine2, {
        opacity: 0,
        y: 30,
        stagger: wordStagger,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }

    // 3. Body Copy Animation
    gsap.from(bodyRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.8,
      delay: 0.4 + (wordsLine1 ? wordsLine1.length * wordStagger : 0),
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    // 4. Divider Animation
    gsap.from(dividerRef.current, {
      scaleX: 0,
      transformOrigin: "center",
      duration: 0.6,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: dividerRef.current,
        start: "top 85%",
      }
    });

    // 5. Stats Row Animation
    const stats = statsRowRef.current?.querySelectorAll('.stat-item');
    if (stats) {
      gsap.from(stats, {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: statsRowRef.current,
          start: "top 80%",
        }
      });
    }

    // 6. Brand Pills Animation
    const pills = pillsRowRef.current?.querySelectorAll('.brand-pill');
    if (pills) {
      gsap.from(pills, {
        opacity: 0,
        y: 10,
        stagger: 0.07,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: statsRowRef.current,
          start: "top 80%",
        }
      });
    }

    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="section-manifesto relative w-full bg-[#1A1612] overflow-hidden"
    >
      {/* Entry/Exit Gradient Bridges (keep existing) */}
      <div className="absolute top-0 left-0 w-full h-[48px] md:h-[80px] bg-gradient-to-b from-background to-[#1A1612] pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[48px] md:h-[80px] bg-gradient-to-b from-[#1A1612] to-background pointer-events-none z-20" />

      {/* Main Layout Container */}
      <div className="mx-auto w-full relative z-10 flex flex-col lg:flex-row items-stretch min-h-0 lg:min-h-[100vh]">
        
        {/* RIGHT COLUMN ON MOBILE/TABLET (Moves to top) */}
        <div className="lg:hidden w-full relative block flex-shrink-0 bg-[#1A1612] h-[clamp(220px,60vw,300px)] md:h-[clamp(280px,42vw,420px)]">
          <img 
            src="/person drinking-clean.png" 
            alt="Koré Coffee Culture" 
            className="w-full h-full object-cover object-center"
          />
          {/* Bottom-edge fade on mobile/tablet */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, transparent 50%, #1A1612 100%)" }}
          />
        </div>

        {/* LEFT COLUMN: TEXT CONTENT */}
        <div 
          className="flex flex-col max-w-full max-md:items-center max-md:text-center justify-start lg:justify-center p-[2.5rem_5vw_3rem] md:p-[3rem_6vw_4rem] lg:p-[6vh_4vw_6vh_5vw] xl:p-[8vh_5vw_8vh_6vw] lg:flex-[0_0_54%] xl:flex-[0_0_52%] min-w-0"
        >
          {/* Eyebrow */}
          <p 
            ref={eyebrowRef}
            className="text-[#C9975A] uppercase tracking-[0.22em] break-words text-[clamp(0.55rem,2.2vw,0.68rem)] lg:text-[clamp(0.6rem,1.2vw,0.75rem)]"
            style={{ marginBottom: "clamp(1rem, 2vh, 1.5rem)", maxWidth: "100%", wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            CRAFTED WITH INTENTION
          </p>

          {/* Headline */}
          <div 
            className="font-serif font-normal text-[#F5EDD8] leading-[1.05] break-words text-[clamp(1.9rem,8.5vw,2.8rem)] max-[390px]:text-[8vw] md:text-[clamp(2.2rem,6vw,3.5rem)] lg:text-[clamp(2.4rem,4.5vw,4rem)] xl:text-[clamp(2.6rem,5vw,5rem)]"
            style={{ marginBottom: "clamp(1.2rem, 2.5vh, 2rem)", maxWidth: "100%", wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            <div ref={headlineLine1Ref} className="mb-1 flex flex-wrap gap-x-[0.25em] max-md:justify-center md:justify-start">
              {"Every cup is a".split(" ").map((word, i) => (
                <span key={i} className="word inline-block">{word}</span>
              ))}
            </div>
            <div ref={headlineLine2Ref} className="flex flex-wrap gap-x-[0.25em] max-md:justify-center md:justify-start">
              {"deliberate act.".split(" ").map((word, i) => (
                <span key={i} className="word inline-block">{word}</span>
              ))}
            </div>
          </div>

          {/* Body Copy */}
          <p 
            ref={bodyRef}
            className="text-[#8B7D6B] leading-[1.75] max-w-[480px] break-words text-[clamp(0.82rem,3.5vw,0.95rem)] lg:text-[clamp(0.85rem,1.3vw,0.95rem)] xl:text-[clamp(0.88rem,1.4vw,1rem)]"
            style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)", wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            We source obsessively, layer carefully, and finish with the kind of detail you only notice on the second sip. Seoul taught us patience. New York gave us urgency. Every recipe lives at that intersection.
          </p>

          {/* Divider */}
          <div 
            ref={dividerRef}
            className="w-[48px] h-[1px] bg-[#3A3028]"
            style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
          />

          {/* Stats Row */}
          <div 
            ref={statsRowRef}
            className="w-full min-w-0 max-md:grid max-md:grid-cols-2 max-md:gap-[1.25rem_1.5rem] md:grid md:grid-cols-3 md:gap-[1.5rem] lg:flex lg:flex-row lg:items-start lg:flex-nowrap lg:gap-[clamp(1.5rem,3vw,3.5rem)]"
            style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
          >
            {/* Stat 1 */}
            <div className="stat-item flex-1 min-w-0 flex flex-col max-md:items-center">
              <span className="text-[#C9975A] font-normal block leading-none mb-[6px] font-serif whitespace-nowrap text-[clamp(1.2rem,6.5vw,1.7rem)] max-[390px]:text-[6vw] md:text-[clamp(1.1rem,3.5vw,1.6rem)] lg:text-[clamp(1.2rem,2.4vw,2rem)] xl:text-[clamp(1.4rem,2.8vw,2.4rem)]">
                Est. 2022
              </span>
              <span className="text-[#D4C4A8] block mb-[3px] text-[clamp(0.65rem,1.1vw,0.78rem)] whitespace-nowrap max-md:whitespace-normal md:whitespace-normal lg:whitespace-nowrap">
                Born in Chinatown
              </span>
              <span className="text-[#5A4E42] tracking-[0.08em] uppercase block text-[clamp(0.58rem,0.9vw,0.68rem)] whitespace-nowrap max-md:whitespace-normal md:whitespace-normal lg:whitespace-nowrap">
                New York City
              </span>
            </div>

            {/* Stat 2 */}
            <div className="stat-item flex-1 min-w-0 flex flex-col max-md:items-center">
              <span className="text-[#C9975A] font-normal block leading-none mb-[6px] font-serif whitespace-nowrap text-[clamp(1.2rem,6.5vw,1.7rem)] max-[390px]:text-[6vw] md:text-[clamp(1.1rem,3.5vw,1.6rem)] lg:text-[clamp(1.2rem,2.4vw,2rem)] xl:text-[clamp(1.4rem,2.8vw,2.4rem)]">
                Daily
              </span>
              <span className="text-[#D4C4A8] block mb-[3px] text-[clamp(0.65rem,1.1vw,0.78rem)] whitespace-nowrap max-md:whitespace-normal md:whitespace-normal lg:whitespace-nowrap">
                Mascarpone made fresh
              </span>
              <span className="text-[#5A4E42] tracking-[0.08em] uppercase block text-[clamp(0.58rem,0.9vw,0.68rem)] whitespace-nowrap max-md:whitespace-normal md:whitespace-normal lg:whitespace-nowrap">
                Every single morning
              </span>
            </div>

            {/* Stat 3 */}
            <div className="stat-item flex-1 min-w-0 max-md:col-span-full max-md:flex max-md:flex-col max-md:items-center max-md:border-t max-md:border-[#2A2218] max-md:pt-[1rem] max-md:mt-[0.5rem] md:flex md:flex-col">
              <span className="text-[#C9975A] font-normal block leading-none max-md:mb-[6px] mb-[6px] font-serif whitespace-nowrap max-md:shrink-0 text-[clamp(1.2rem,6.5vw,1.7rem)] max-[390px]:text-[6vw] md:text-[clamp(1.1rem,3.5vw,1.6rem)] lg:text-[clamp(1.2rem,2.4vw,2rem)] xl:text-[clamp(1.4rem,2.8vw,2.4rem)]">
                Seoul
              </span>
              <div className="flex flex-col min-w-0 max-md:items-center">
                <span className="text-[#D4C4A8] block mb-[3px] text-[clamp(0.65rem,1.1vw,0.78rem)] whitespace-nowrap max-md:whitespace-normal md:whitespace-normal lg:whitespace-nowrap">
                  Where it began
                </span>
                <span className="text-[#5A4E42] tracking-[0.08em] uppercase block text-[clamp(0.58rem,0.9vw,0.68rem)] whitespace-nowrap max-md:whitespace-normal md:whitespace-normal lg:whitespace-nowrap">
                  Insadong café culture
                </span>
              </div>
            </div>
          </div>

          {/* Brand Pills Row */}
          <div 
            ref={pillsRowRef}
            className="flex flex-wrap w-full max-md:justify-center md:justify-start gap-[7px] md:gap-[8px] pb-0"
          >
            {[
              { text: "Valrhona cocoa", gold: true },
              { text: "Ceremonial matcha", gold: true },
              { text: "No artificial syrups", gold: false },
              { text: "Seoul-inspired", gold: false },
              { text: "Fresh mascarpone daily", gold: false }
            ].map((pill, i) => (
              <span 
                key={i}
                className="brand-pill whitespace-nowrap transition-colors duration-200 cursor-default text-[0.62rem] max-[390px]:text-[0.58rem] max-[390px]:px-[8px] max-[390px]:py-[4px] px-[10px] py-[5px] tracking-[0.07em] uppercase rounded-full"
                style={{
                  border: pill.gold ? "1px solid #C9975A" : "1px solid #3A3028",
                  color: pill.gold ? "#C9975A" : "#7A6A58",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C9975A";
                  e.currentTarget.style.color = "#C9975A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = pill.gold ? "#C9975A" : "#3A3028";
                  e.currentTarget.style.color = pill.gold ? "#C9975A" : "#7A6A58";
                }}
              >
                {pill.text}
              </span>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: DESKTOP TALL IMAGE */}
        <div className="hidden lg:flex flex-1 min-w-0 relative bg-[#1A1612] overflow-hidden self-stretch">
          <div className="absolute top-0 left-0 w-[120px] h-full bg-gradient-to-r from-[#1A1612] to-transparent z-10 pointer-events-none" />
          <img 
            src="/person drinking-clean.png" 
            alt="Koré Coffee Culture" 
            className="absolute inset-0 w-full h-full object-cover object-[center_10%] block"
          />
          <span 
            className="absolute bottom-[2rem] left-[2rem] z-20 text-[#C9975A] uppercase tracking-[0.16em] text-[0.65rem]"
          >
            THE SIGNATURE · $9.50
          </span>
        </div>

      </div>
    </section>
  );
}
