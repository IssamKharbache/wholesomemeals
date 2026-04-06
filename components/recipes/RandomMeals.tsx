"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "./RecipeSection";
import { Shuffle } from "lucide-react";
const fetchMeal = async (): Promise<Meal> => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  if (!res.ok) throw new Error("Failed to fetch meal");

  const data = await res.json();
  return data.meals[0];
};

const fetchMeals = async (): Promise<Meal[]> => {
  return Promise.all(Array.from({ length: 8 }, fetchMeal));
};

const RandomMeals = () => {
  const {
    data: meals,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["randomMeals"],
    queryFn: fetchMeals,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
                Explore
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Random today{" "}
                <em style={{ fontStyle: "italic", color: "#FF6B00" }}>meals</em>
              </h2>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center gap-2 text-sm border rounded-full py-2 px-7 hover:bg-orange-400 duration-200 hover:cursor-pointer "
          >
            <Shuffle size={15} />
            <span className="hidden md:block">Shuffle meals</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {isLoading || isRefetching ? (
            Array.from({ length: 8 }).map((_, i) => (
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
          ) : isError ? (
            <p className="text-red-500 col-span-full">
              Failed to load meals. Try again later.
            </p>
          ) : (
            meals?.map((meal) => (
              <Link
                key={meal.idMeal}
                href={`/recipes/${meal.idMeal}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 ease-out ring-1 ring-black/5"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    →
                  </span>
                </div>

                <div className="flex flex-col gap-3 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
                    {meal.strMeal}
                  </h3>

                  <div className="h-px w-full bg-gray-100" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      ~30 min
                    </span>

                    <span className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RandomMeals;
