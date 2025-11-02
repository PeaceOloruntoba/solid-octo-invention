import MainLayout from "../layouts/MainLayout";
import { useRecipeStore } from "../store/recipes";
import type { Recipe } from "../types";
import { useEffect } from "react";

export default function Home() {
  const { items, loading, fetch } = useRecipeStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-3">Discover</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {items.map((r: Recipe) => (
            <li key={r.id} className="rounded border p-3">
              <p className="font-medium">{r.name}</p>
              <p className="text-xs text-gray-500 capitalize">{r.category}</p>
            </li>
          ))}
        </ul>
      )}
    </MainLayout>
  );
}
