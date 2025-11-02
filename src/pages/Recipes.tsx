import MainLayout from "../layouts/MainLayout";
import { useRecipeStore, type Recipe } from "../store/recipes";
import { useEffect, useMemo, useState } from "react";

export default function Recipes() {
  const { items, loading, fetch } = useRecipeStore();
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch();
  }, [fetch]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((r) => r.name.toLowerCase().includes(term));
  }, [items, q]);

  return (
    <MainLayout>
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-xl font-semibold">Recipes</h1>
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search recipes..."
        className="w-full mb-3 rounded border px-3 py-2"
      />
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filtered.length ? (
        <ul className="space-y-2">
          {filtered.map((r: Recipe) => (
            <li key={r.id} className="rounded border p-3">
              <p className="font-medium">{r.name}</p>
              <p className="text-xs text-gray-500 capitalize">{r.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recipes found.</p>
      )}
    </MainLayout>
  );
}
