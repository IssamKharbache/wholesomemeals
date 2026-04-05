"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  Beef: "🥩",
  Chicken: "🍗",
  Dessert: "🍰",
  Lamb: "🫕",
  Pasta: "🍝",
  Pork: "🥓",
  Seafood: "🦞",
  Side: "🥙",
  Starter: "🥗",
  Vegan: "🌱",
  Vegetarian: "🥦",
  Breakfast: "🍳",
  Goat: "🐐",
  Miscellaneous: "🍴",
};

const RecipesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("Chicken");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingMeals, setLoadingMeals] = useState(true);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data.categories ?? []);
        setLoadingCategories(false);
      })
      .catch(() => setLoadingCategories(false));
  }, []);

  useEffect(() => {
    const fetchMeals = () => {
      setLoadingMeals(true);
      setMeals([]);
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(activeCategory)}`,
      )
        .then((r) => r.json())
        .then((data) => {
          setMeals((data.meals ?? []).slice(0, 8));
          setLoadingMeals(false);
        })
        .catch(() => setLoadingMeals(false));
    };
    fetchMeals();
  }, [activeCategory]);

  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
              Explore
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What are you{" "}
              <em style={{ fontStyle: "italic", color: "#FF6B00" }}>
                craving?
              </em>
            </h2>
          </div>
          <Link
            href="/recipes"
            className="text-sm font-medium text-gray-500 hover:text-orange-500 underline underline-offset-4 decoration-gray-300 hover:decoration-orange-400 transition-colors duration-200 whitespace-nowrap"
          >
            View all recipes →
          </Link>
        </div>

        {/* ── Category Tabs ── */}
        {loadingCategories ? (
          <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide p-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 animate-pulse" />
                <div className="w-12 h-2.5 rounded-full bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-5 overflow-x-auto p-5">
            {categories.map((cat) => {
              const isActive = cat.strCategory === activeCategory;
              return (
                <button
                  key={cat.idCategory}
                  onClick={() => setActiveCategory(cat.strCategory)}
                  className="shrink-0 flex flex-col items-center gap-2 group focus:outline-none"
                >
                  <div
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden transition-all duration-300
                      ${
                        isActive
                          ? "ring-2 ring-orange-500 ring-offset-2 shadow-lg shadow-orange-100 scale-110"
                          : "ring-1 ring-black/10 group-hover:ring-orange-300 group-hover:scale-105"
                      }`}
                  >
                    <Image
                      src={cat.strCategoryThumb}
                      alt={cat.strCategory}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-orange-500/10" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap
                    ${isActive ? "text-orange-500" : "text-gray-500 group-hover:text-orange-400"}`}
                  >
                    {cat.strCategory}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Recipe Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {loadingMeals
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden bg-white shadow-sm"
                >
                  <div className="w-full h-48 bg-gray-100 animate-pulse" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-4 bg-gray-100 animate-pulse rounded-full w-3/4" />
                    <div className="h-3 bg-gray-100 animate-pulse rounded-full w-1/2" />
                  </div>
                </div>
              ))
            : meals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  href={`/recipes/${meal.idMeal}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 ease-out ring-1 ring-black/5"
                >
                  {/* ── Image wrapper: fixed height, no fill, no stretch ── */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/5 to-transparent" />

                    {/* Category chip — top left */}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-orange-500 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide">
                      {CATEGORY_EMOJI[activeCategory] ?? "🍴"} {activeCategory}
                    </span>

                    {/* Subtle arrow CTA — bottom right, appears on hover */}
                    <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6B00"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-col gap-3 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
                      {meal.strMeal}
                    </h3>

                    {/* Divider */}
                    <div className="h-px w-full bg-gray-100" />

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        ~30 min
                      </span>
                      <span className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-200 shrink-0">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FF6B00"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="group-hover:stroke-white transition-colors duration-200"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
