"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const croffles = [
  {
    name: "Tiramisu Croffle",
    image: "/Gallery/Tiramisu Croffle.png",
    desc: "Our signature croissant-waffle hybrid topped with creamy mascarpone and cocoa dust.",
    price: "$9.00",
    tags: ["Signature", "Fresh Baked"]
  },
  {
    name: "Strawberry Croffle",
    image: "/Gallery/Strawberry Croffle.png",
    desc: "Fresh strawberries and sweet cream on a perfectly crisp, buttery croffle.",
    price: "$9.00",
    tags: ["Fresh Baked"]
  },
  {
    name: "Matcha Croffle",
    image: "/Gallery/Matcha Croffle.png",
    desc: "Earthy matcha cream layered over a warm, flaky croissant-waffle.",
    price: "$9.00",
    tags: ["Fresh Baked"]
  },
  {
    name: "Blueberry Croffle",
    image: "/Gallery/Blueberry Croffle.png",
    desc: "Sweet blueberry compote and mascarpone cream on a crispy croffle base.",
    price: "$9.00",
    tags: ["Fresh Baked"]
  }
];

export default function SignatureCrofflesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);
  const [selectedCroffle, setSelectedCroffle] = useState<typeof croffles[0] | null>(null);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedCroffle) {
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
  }, [selectedCroffle]);

  const closeModal = () => {
    if (!modalRef.current || !modalBgRef.current) return;
    gsap.to(modalBgRef.current, { opacity: 0, duration: 0.25 });
    gsap.to(modalRef.current, { 
      opacity: 0, scale: 0.95, duration: 0.25, 
      onComplete: () => setSelectedCroffle(null) 
    });
  };

  useGSAP(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

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
      className="relative w-full bg-[#f4f1ea] py-24 px-6 md:px-12 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="mb-14 text-center">
          <p className="text-[#C49A6C] text-[11px] uppercase tracking-[0.3em] font-semibold mb-4">
            Fresh Baked
          </p>
          <h2 className="text-[#1A1612] text-[42px] md:text-[56px] font-extralight tracking-wide">
            Signature Croffles
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {croffles.map((croffle, i) => (
            <div
              key={croffle.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              onClick={() => setSelectedCroffle(croffle)}
              className="group flex flex-col bg-white rounded-[16px] border border-[#1A1612]/10 shadow-sm overflow-hidden hover:border-[#C49A6C]/40 hover:shadow-xl hover:shadow-[#C49A6C]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Croffle Image */}
              <div className="relative w-full h-[320px] overflow-hidden bg-muted/30">
                <img
                  src={croffle.image}
                  alt={croffle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[#1A1612] text-[17px] font-medium leading-snug mb-2">
                  {croffle.name}
                </h3>
                <p className="text-[#1A1612]/70 text-[13px] leading-relaxed flex-grow mb-5">
                  {croffle.desc}
                </p>
                <div className="pt-4 border-t border-[#1A1612]/10">
                  <span className="text-[#d35400] text-[15px] font-medium tracking-wider">
                    {croffle.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCroffle && (
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
                src={selectedCroffle.image} 
                alt={selectedCroffle.name}
                className="w-full max-w-[520px] h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div>
                <h3 className="text-[#1A1612] text-[28px] md:text-[32px] font-serif font-light leading-tight mb-2">
                  {selectedCroffle.name}
                </h3>
                {selectedCroffle.tags && (
                  <div className="flex gap-2 mb-2">
                    {selectedCroffle.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-[#C9975A]/20 text-[#C9975A] rounded-sm font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-[#1A1612]/70 text-[15px] leading-relaxed">
                {selectedCroffle.desc}
              </p>
              
              <div className="pt-4 border-t border-[#1A1612]/10 flex justify-between items-center">
                <span className="text-[#C9975A] text-[18px] font-medium tracking-wide">
                  {selectedCroffle.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
