import MealDetail from "@/components/recipes/MealDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    { next: { revalidate: 3600 } },
  );
  const data = await res.json();
  const meal = data.meals?.[0];

  if (!meal) return <div>Meal not found.</div>;

  return <MealDetail meal={meal} />;
};

export default page;
