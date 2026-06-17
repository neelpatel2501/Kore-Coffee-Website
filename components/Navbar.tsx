"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Menu", href: "#menu", id: "menu" },
    { name: "Story", href: "#story", id: "story" },
    { name: "Find Us", href: "#findus", id: "findus" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans ${
          scrolled
            ? "bg-background/95 backdrop-blur-[12px] py-4 border-b border-border/40"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">

          {/* Logo */}
          <Link 
            href="#home" 
            className={`flex items-center gap-3 shrink-0 transition-all duration-500 ${scrolled ? 'text-foreground' : 'text-white'}`}
            onClick={(e) => {
              // Smooth scroll to top
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection("home");
            }}
          >
            <div className="relative w-20 h-20 rounded-sm overflow-hidden transition-all duration-500">
              <Image
                src="/kore coffee logo.png"
                alt="Koré Coffee Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[14px] tracking-[0.15em] font-medium hidden sm:block">
              KORÉ COFFEE
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[14px] uppercase tracking-wider relative group transition-colors duration-200 ${
                  activeSection === link.id ? "text-[#C49A6C] font-medium" : (scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white")
                }`}
                onClick={() => setActiveSection(link.id)}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-[#C49A6C] transition-all duration-300 ${
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/kore.coffee/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Koré Coffee on Instagram"
              className={`transition-colors duration-200 ${scrolled ? "text-foreground/60 hover:text-[#C49A6C]" : "text-white/80 hover:text-[#C49A6C]"}`}
            >
              <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`md:hidden transition-colors ${scrolled ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-screen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-400 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Logo in mobile menu */}
        <div className="relative w-32 h-32 rounded-md overflow-hidden mb-12">
          <Image src="/kore coffee logo.png" alt="Koré Coffee" fill className="object-contain" />
        </div>

        <div className="flex flex-col items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground text-[22px] uppercase tracking-[0.2em] font-light hover:text-[#C49A6C] transition-colors"
              onClick={() => { setMobileMenuOpen(false); setActiveSection(link.id); }}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/kore.coffee/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/60 hover:text-[#C49A6C] transition-colors mt-4 text-[13px] tracking-widest uppercase"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
