import Hero from "@/components/hero/Hero";
import RandomMeals from "@/components/recipes/RandomMeals";
import RecipeSection from "@/components/recipes/RecipeSection";
export default function Home() {
  return (
    <div>
      <Hero />
      <RecipeSection />
      <RandomMeals />
    </div>
  );
}
