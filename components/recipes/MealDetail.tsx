"use client";

import { useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string | null;
  strSource: string | null;
  strTags: string | null;
  [key: string]: string | null;
}

interface Ingredient {
  name: string;
  measure: string;
}

interface MealDetailProps {
  meal: Meal;
}

function getIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() ?? "" });
    }
  }
  return ingredients;
}

function getSteps(instructions: string): string[] {
  return instructions
    .split(/\r\n|\n|\r/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export default function MealDetail({ meal }: MealDetailProps) {
  const ingredients = getIngredients(meal);
  const steps = getSteps(meal.strInstructions);
  const tags = meal.strTags
    ? meal.strTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const youtubeId = meal.strYoutube ? getYouTubeId(meal.strYoutube) : null;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1714] font-sans">
      {/* Hero */}
      <div className="relative h-[480px] overflow-hidden max-sm:h-[300px]">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,12,10,0.85)] via-[rgba(15,12,10,0.1)] to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 max-sm:p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/30 text-white/90 bg-white/10 backdrop-blur">
              {meal.strArea}
            </span>
            <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/30 text-white/90 bg-white/10 backdrop-blur">
              {meal.strCategory}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/30 text-white/90 bg-white/10 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-white font-bold leading-tight text-[clamp(1.9rem,5vw,3.2rem)]">
            {meal.strMeal}
          </h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-12">
        <div className="grid grid-cols-[280px_1fr] gap-12 max-sm:grid-cols-1 max-sm:gap-8">
          {/* Ingredients */}
          <div>
            <div className="bg-white rounded-2xl border border-[#ede9e3] overflow-hidden sticky top-6 max-sm:static">
              <div className="bg-[#2c1f14] px-5 py-3">
                <span className="text-[10px] uppercase tracking-widest text-[#c9956a]">
                  Ingredients · {ingredients.length}
                </span>
              </div>

              {ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-5 py-2 border-b border-[#f3ede6] last:border-none hover:bg-[#fdf9f5] transition"
                >
                  <span className="text-[13.5px] text-[#2a2118]">
                    {ing.name}
                  </span>
                  <span className="text-[12.5px] font-medium text-[#b08050] whitespace-nowrap">
                    {ing.measure}
                  </span>
                </div>
              ))}
            </div>

            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[12.5px] text-[#a08070] hover:text-[#7a4f2a]"
              >
                View original recipe
              </a>
            )}
          </div>

          {/* Steps */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#b08050] mb-4 block">
              Instructions · {steps.length} steps
            </span>

            <div className="flex flex-col gap-1 mb-10">
              {steps.map((step, i) => {
                const isActive = activeStep === i;

                return (
                  <div
                    key={i}
                    onClick={() => setActiveStep(isActive ? null : i)}
                    className={`rounded-xl cursor-pointer transition border ${
                      isActive
                        ? "border-[#d4b896] bg-white shadow-[0_2px_12px_rgba(180,130,80,0.1)]"
                        : "border-transparent hover:border-[#e8dfd5] hover:bg-white"
                    }`}
                  >
                    <div className="flex gap-4 p-4">
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-[11.5px] font-semibold mt-[2px] ${
                          isActive
                            ? "bg-[#2c1f14] text-[#e8c89a]"
                            : "bg-[#f0e8de] text-[#7a4f2a]"
                        }`}
                      >
                        {i + 1}
                      </span>

                      <p
                        className={`text-[14px] leading-6 flex-1 ${
                          isActive
                            ? "text-[#2a1f15]"
                            : "text-[#7a6455] line-clamp-2"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* YouTube */}
            {youtubeId && (
              <div className="rounded-2xl overflow-hidden border border-[#ede9e3] bg-white">
                <a
                  href={meal.strYoutube!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-video overflow-hidden group"
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition">
                    <div className="w-[62px] h-[62px] bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                      ▶
                    </div>
                  </div>
                </a>

                <div className="flex justify-between items-center px-4 py-3">
                  <div>
                    <div className="text-[13px] font-medium text-[#3a2c20]">
                      Watch the recipe video
                    </div>
                    <div className="text-[11.5px] text-[#a08070]">
                      {meal.strMeal}
                    </div>
                  </div>

                  <div className="text-red-600 text-[11.5px] font-semibold">
                    YouTube
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
