import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router";
import { useRecipeStore } from "../store/recipes";
import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../store/app";
import MealSelector from "../components/MealSelector";
import type { DayId, MealType } from "../types";
import { getHealthAdvice } from "../utils/health";

export default function RecipeDetails() {
  const { id } = useParams();
  const { items, fetch } = useRecipeStore();
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const addToMealPlan = useAppStore((s) => s.addToMealPlan);
  const prefs = useAppStore((s) => s.preferences);

  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    if (!items.length) fetch();
  }, [fetch, items.length]);

  const recipe = useMemo(() => items.find((r) => String(r.id) === String(id)), [items, id]);
  const advice = useMemo(() => (recipe ? getHealthAdvice(recipe, prefs) : []), [recipe, prefs]);

  function onConfirm(day: DayId, meal: MealType) {
    if (recipe) addToMealPlan(recipe, day, meal);
    setSelecting(false);
  }

  if (!recipe) return (
    <MainLayout>
      <p className="text-gray-600 text-sm">Loading recipe...</p>
    </MainLayout>
  );

  const isFav = favorites.includes(recipe.id);

  return (
    <MainLayout>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-xl font-semibold">{recipe.name}</h1>
          <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
            <span className="capitalize">{recipe.category}</span>
            <span>•</span>
            <span className="capitalize">{recipe.region}</span>
            <span>•</span>
            <span>Spice {recipe.spiceLevel}</span>
          </div>
        </div>
        <button onClick={() => toggleFavorite(recipe.id)} className={`rounded border px-3 py-1 text-sm ${isFav ? "text-red-500 border-red-200" : "text-gray-700"}`}>{isFav ? "Unfavorite" : "Favorite"}</button>
      </div>

      {recipe.tags?.length ? (
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.map((t) => (
            <span key={t} className="text-[10px] rounded bg-gray-100 px-2 py-0.5 text-gray-600">{t}</span>
          ))}
        </div>
      ) : null}

      <section className="mb-4">
        <h2 className="text-sm font-medium mb-2">Ingredients</h2>
        <ul className="grid grid-cols-2 gap-1">
          {recipe.ingredients.map((i) => (
            <li key={i} className="text-sm text-gray-700">• {i}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Plan this meal</h2>
          <button onClick={() => setSelecting((v) => !v)} className="rounded bg-black text-white px-3 py-1 text-sm">{selecting ? "Cancel" : "Add to plan"}</button>
        </div>
        {selecting && (
          <MealSelector onConfirm={onConfirm} onCancel={() => setSelecting(false)} />
        )}
      </section>

      {!!advice.length && (
        <section>
          <h2 className="text-sm font-medium mb-2">Health advice</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {advice.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </section>
      )}
    </MainLayout>
  );
}
