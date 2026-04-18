"use client";

import { InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="font-serif text-neutral-800">
      {/* Newsletter strip */}
      <div className="bg-orange-50/60 border-y border-orange-200/40 py-9">
        <div className="max-w-lg mx-auto text-center px-6">
          <p
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl font-bold italic mb-1.5"
          >
            Weekly recipes,{" "}
            <span className="text-[#FF6B00] not-italic">
              straight to your inbox.
            </span>
          </p>
          <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
            Seasonal menus, kitchen tips, and fresh ideas — every Sunday
            morning.
          </p>
          <div className="flex max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 h-10 rounded-l-lg border border-r-0 border-black/15 bg-white text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#FF6B00]"
            />
            <button className="px-5 h-10 rounded-r-lg bg-[#FF6B00] hover:bg-orange-600 text-white text-sm font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        {/* Brand column */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
            <div className="w-9 h-9 rounded-lg bg-[#FF6B00] flex items-center justify-center text-lg shadow-sm transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
              🍴
            </div>
            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl font-bold italic tracking-tight"
            >
              Wholsome
              <span className="italic font-normal text-[#FF6B00]">meals</span>
            </span>
          </Link>

          <p className="text-sm text-neutral-500 leading-relaxed mb-5 max-w-60">
            Real food for real life. Simple, nourishing recipes built around
            seasonal ingredients and honest cooking.
          </p>

          {/* Social icons */}
          <div className="flex gap-2 mb-6">
            <button className="w-9 h-9 rounded-md border border-black/10 flex items-center justify-center text-neutral-500 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:bg-orange-50 transition">
              <InstagramLogoIcon />
            </button>
            <button className="w-9 h-9 rounded-md border border-black/10 flex items-center justify-center text-neutral-500 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:bg-orange-50 transition">
              <YoutubeLogoIcon />
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              "🫚 Gluten-free",
              "🥦 Vegan",
              "⏱ Under 30 min",
              "🌿 Seasonal",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-orange-700 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-3.5">
            Explore
          </p>
          {[
            "All Recipes",
            "Collections",
            "Meal Planner",
            "Ingredient Search",
            "Seasonal Guide",
            "Kitchen Basics",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              className="block text-sm text-neutral-500 hover:text-[#FF6B00] mb-2.5 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-3.5">
            Categories
          </p>
          {[
            ["🍳 Breakfast", false],
            ["🥗 Lunch", false],
            ["🍽️ Dinner", false],
            ["🍰 Desserts", true],
            ["🥤 Drinks", false],
            ["🧁 Baking", false],
          ].map(([label, isNew]) => (
            <Link
              key={label as string}
              href="#"
              className="block text-sm text-neutral-500 hover:text-[#FF6B00] mb-2.5 transition-colors"
            >
              {label}
              {isNew && (
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600">
                  New
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* About */}
        <div>
          <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-3.5">
            About
          </p>
          {[
            "Our Story",
            "The Kitchen",
            "Contributors",
            "Write for Us",
            "Press",
            "Contact",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              className="block text-sm text-neutral-500 hover:text-[#FF6B00] mb-2.5 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            © {year} Wholsomemeals. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Cookie Settings",
              "Sitemap",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-neutral-400 hover:text-[#FF6B00] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 text-xs">
            <p>built by </p>
            <Link
              href="https://kharbache.vercel.app/"
              className="text-[#FF6B00]"
            >
              Issam kharbache
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
