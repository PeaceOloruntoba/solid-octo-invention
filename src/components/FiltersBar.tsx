import { useMemo } from "react";
import { useAppStore } from "../store/app";
import type { Recipe } from "../types";

export default function FiltersBar({ items }: { items: Recipe[] }) {
  const filters = useAppStore((s) => s.filters);
  const setFilters = useAppStore((s) => s.setFilters);

  const regions = useMemo(() => Array.from(new Set(items.map((i) => i.region))), [items]);
  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);

  return (
    <div className="grid grid-cols-3 gap-2 mb-3">
      <input
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        placeholder="Search"
        className="col-span-3 rounded border px-3 py-2"
      />
      <select
        className="rounded border px-2 py-2"
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value as any })}
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        className="rounded border px-2 py-2"
        value={filters.region}
        onChange={(e) => setFilters({ region: e.target.value })}
      >
        <option value="all">All regions</option>
        {regions.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <select
        className="rounded border px-2 py-2"
        value={String(filters.spiceLevel)}
        onChange={(e) => setFilters({ spiceLevel: e.target.value === "all" ? "all" : Number(e.target.value) })}
      >
        <option value="all">Any spice</option>
        {[0,1,2,3,4,5].map((n) => <option key={n} value={n}>Spice {n}</option>)}
      </select>
    </div>
  );
}
