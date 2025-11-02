import MainLayout from "../layouts/MainLayout";
import { useRecipeStore } from "../store/recipes";
import type { Recipe } from "../types";
import { useEffect, useMemo, useState } from "react";
import FiltersBar from "../components/FiltersBar";
import RecipeCard from "../components/RecipeCard";
import MealSelector from "../components/MealSelector";
import { useAppStore } from "../store/app";
import { scoreRecipe } from "../utils/health";
import type { DayId, MealType } from "../types";

export default function Recipes() {
  const { items, loading, fetch } = useRecipeStore();
  const filters = useAppStore((s) => s.filters);
  const setFilters = useAppStore((s) => s.setFilters);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const addToMealPlan = useAppStore((s) => s.addToMealPlan);

  const [selectingFor, setSelectingFor] = useState<null | Recipe>(null);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const filtered = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    const prefs = useAppStore.getState().preferences;
    const filteredList = items.filter((r) => {
      if (term && !r.name.toLowerCase().includes(term)) return false;
      if (filters.category !== "all" && r.category !== filters.category) return false;
      if (filters.region !== "all" && r.region !== filters.region) return false;
      if (filters.spiceLevel !== "all" && r.spiceLevel !== filters.spiceLevel) return false;
      return true;
    });
    // sort by health score desc
    return filteredList.sort((a, b) => scoreRecipe(b, prefs) - scoreRecipe(a, prefs));
  }, [items, filters]);

  function handleConfirm(day: DayId, meal: MealType) {
    if (selectingFor) addToMealPlan(selectingFor, day, meal);
    setSelectingFor(null);
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold">Recipes</h1>
        {filters.search && (
          <button className="text-sm underline" onClick={() => setFilters({ search: "" })}>Clear</button>
        )}
      </div>
      <FiltersBar items={items} />
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filtered.length ? (
        <ul className="space-y-2">
          {filtered.map((r: Recipe) => (
            <li key={r.id}>
              <RecipeCard
                recipe={r}
                isFavorite={favorites.includes(r.id)}
                onToggleFavorite={() => toggleFavorite(r.id)}
                onAdd={() => setSelectingFor(r)}
              />
              {selectingFor?.id === r.id && (
                <MealSelector onConfirm={handleConfirm} onCancel={() => setSelectingFor(null)} />)
              }
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recipes found.</p>
      )}
    </MainLayout>
  );
}
