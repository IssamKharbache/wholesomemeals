"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,120,0,0.08)] border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-[#FF6B00] flex items-center justify-center text-lg shadow-md transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
            🍴
          </div>
          <span
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-xl font-bold tracking-tight font-serif text-neutral-900 italic"
          >
            Wholsome
            <span className="italic font-normal text-[#FF6B00]">meals</span>
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/recipes"
            className="text-sm font-medium px-3 py-1.5 rounded-md text-neutral-700 hover:bg-orange-100/60 hover:text-[#FF6B00] transition"
          >
            Recipes
          </Link>

          <Link
            href="/meal-planner"
            className="text-sm font-medium px-3 py-1.5 rounded-md text-neutral-700 hover:bg-orange-100/60 hover:text-[#FF6B00] transition"
          >
            Meal Planner
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-black/10 mx-2" />

          {/* Pills */}
          <Link
            href="/categories/dinner"
            className="text-xs px-3 py-1 rounded-full bg-black/5 text-neutral-600 hover:bg-[#FF6B00] hover:text-white transition font-medium"
          >
            🍽️ Dinner
          </Link>

          <Link
            href="/categories/desserts"
            className="text-xs px-3 py-1 rounded-full bg-black/5 text-neutral-600 hover:bg-[#FF6B00] hover:text-white transition font-medium"
          >
            🍰 Desserts
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="w-9 h-9 rounded-md border border-black/10 flex items-center justify-center text-neutral-600 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:bg-orange-100/50 transition">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
