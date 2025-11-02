import MainLayout from "../layouts/MainLayout";
import { useAppStore } from "../store/app";
import type { DayId, MealType } from "../types";

const DAYS: { id: DayId; label: string }[] = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];
const MEALS: MealType[] = ["breakfast", "lunch", "dinner"];

export default function MealPlan() {
  const mealPlan = useAppStore((s) => s.mealPlan);
  const removeFromMealPlan = useAppStore((s) => s.removeFromMealPlan);
  const generateShoppingList = useAppStore((s) => s.generateShoppingList);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold">Meal Plan</h1>
        <button onClick={generateShoppingList} className="rounded bg-black text-white px-3 py-1 text-sm">Generate list</button>
      </div>
      <div className="space-y-3">
        {DAYS.map((d) => (
          <div key={d.id} className="rounded border p-3">
            <p className="font-medium mb-2">{d.label}</p>
            <div className="grid grid-cols-3 gap-2">
              {MEALS.map((m) => {
                const r = mealPlan[d.id]?.[m];
                return (
                  <div key={m} className="rounded border p-2">
                    <p className="text-xs uppercase text-gray-500 mb-1">{m}</p>
                    {r ? (
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <button className="mt-2 text-xs underline" onClick={() => removeFromMealPlan(d.id, m)}>Remove</button>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">No selection</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
