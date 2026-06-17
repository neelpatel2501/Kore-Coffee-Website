"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const drinks = [
  {
    name: "Koré Coffee Tiramisu",
    image: "/Gallery/Tiramisu Latte.png",
    desc: "Our signature house espresso layered with creamy mascarpone and premium cocoa.",
    price: "$9.50",
    tags: ["Iced Only", "Signature"]
  },
  {
    name: "Matcha Tiramisu",
    image: "/Gallery/MATCHA Tiramisu Latte.png",
    desc: "Earthy ceremonial matcha meets our sweet homemade mascarpone cream.",
    price: "$9.75",
    tags: ["Fan Favourite"]
  },
  {
    name: "Strawberry Tiramisu",
    image: "/Gallery/Strwberry tiramisu latte.png",
    desc: "Sweet strawberry puree topped with rich espresso and cream.",
    price: "$9.25",
    tags: ["Seasonal"]
  }
];

export default function SignatureDrinksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);
  const [selectedDrink, setSelectedDrink] = useState<typeof drinks[0] | null>(null);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedDrink) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
      
      // Animate modal in
      gsap.fromTo(modalBgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedDrink]);

  const closeModal = () => {
    if (!modalRef.current || !modalBgRef.current) return;
    gsap.to(modalBgRef.current, { opacity: 0, duration: 0.25 });
    gsap.to(modalRef.current, { 
      opacity: 0, scale: 0.95, duration: 0.25, 
      onComplete: () => setSelectedDrink(null) 
    });
  };

  useGSAP(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    // Cards scroll-reveal stagger
    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative w-full bg-background py-28 px-6 md:px-12 font-sans overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C49A6C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="text-[#C49A6C] text-[11px] uppercase tracking-[0.3em] font-semibold mb-4">
            Signature Lattes
          </p>
          <h2 className="text-foreground text-[42px] md:text-[56px] font-extralight tracking-wide">
            Our Three Musketeers
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
          {drinks.map((drink, i) => (
            <div
              key={drink.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              onClick={() => setSelectedDrink(drink)}
              className="group flex flex-col bg-card rounded-[16px] border border-border/60 shadow-sm overflow-hidden hover:border-[#C49A6C]/40 hover:shadow-xl hover:shadow-[#C49A6C]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Drink Image */}
              <div className="relative w-full h-[320px] overflow-hidden bg-muted/30">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-foreground text-[17px] font-medium leading-snug mb-2">
                  {drink.name}
                </h3>
                <p className="text-foreground/60 text-[13px] leading-relaxed flex-grow mb-5">
                  {drink.desc}
                </p>
                <div className="pt-4 border-t border-border/40">
                  <span className="text-[#C49A6C] text-[15px] font-medium tracking-wider">
                    {drink.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedDrink && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            ref={modalBgRef}
            className="absolute inset-0 cursor-pointer"
            style={{ background: 'rgba(20,16,10,0.72)', backdropFilter: 'blur(6px)' }}
            onClick={closeModal}
          />
          <div 
            ref={modalRef}
            className="relative w-full max-w-[560px] rounded-[16px] overflow-hidden flex flex-col z-10"
            style={{ backgroundColor: '#EDEADB' }}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-full max-h-[45vh] sm:max-h-[500px] flex justify-center bg-black/5 overflow-hidden">
              <img 
                src={selectedDrink.image} 
                alt={selectedDrink.name}
                className="w-full max-w-[520px] h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div>
                <h3 className="text-[#1A1612] text-[28px] md:text-[32px] font-serif font-light leading-tight mb-2">
                  {selectedDrink.name}
                </h3>
                {selectedDrink.tags && (
                  <div className="flex gap-2 mb-2">
                    {selectedDrink.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-[#C9975A]/20 text-[#C9975A] rounded-sm font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-[#1A1612]/70 text-[15px] leading-relaxed">
                {selectedDrink.desc}
              </p>
              
              <div className="pt-4 border-t border-[#1A1612]/10 flex justify-between items-center">
                <span className="text-[#C9975A] text-[18px] font-medium tracking-wide">
                  {selectedDrink.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
