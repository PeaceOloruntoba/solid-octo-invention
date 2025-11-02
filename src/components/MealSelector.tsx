import { useState } from "react";
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

export default function MealSelector({ onConfirm, onCancel }: { onConfirm: (day: DayId, meal: MealType) => void; onCancel: () => void; }) {
  const [day, setDay] = useState<DayId>("mon");
  const [meal, setMeal] = useState<MealType>("breakfast");

  return (
    <div className="mt-2 rounded border p-2 flex items-center gap-2">
      <select className="rounded border px-2 py-1" value={day} onChange={(e) => setDay(e.target.value as DayId)}>
        {DAYS.map((d) => (
          <option key={d.id} value={d.id}>{d.label}</option>
        ))}
      </select>
      <select className="rounded border px-2 py-1" value={meal} onChange={(e) => setMeal(e.target.value as MealType)}>
        {MEALS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button className="rounded bg-black text-white px-3 py-1 text-sm" onClick={() => onConfirm(day, meal)}>Add</button>
      <button className="rounded border px-3 py-1 text-sm" onClick={onCancel}>Cancel</button>
    </div>
  );
}
