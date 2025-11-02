import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAppStore } from "../store/app";

export default function ShoppingList() {
  const list = useAppStore((s) => s.shoppingList);
  const toggle = useAppStore((s) => s.toggleShoppingItem);
  const addPantry = useAppStore((s) => s.addPantryItem);
  const moveCheckedToPantry = useAppStore((s) => s.moveCheckedToPantry);
  const [name, setName] = useState("");

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addPantry(name.trim());
    setName("");
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold">Shopping List</h1>
        <button onClick={moveCheckedToPantry} className="rounded bg-black text-white px-3 py-1 text-sm">Move checked to pantry</button>
      </div>

      {list.length ? (
        <ul className="space-y-2 mb-4">
          {list.map((i) => (
            <li key={i.name} className="rounded border p-2 flex items-center gap-2">
              <input type="checkbox" checked={!!i.checked} onChange={() => toggle(i.name)} />
              <span className={`text-sm ${i.checked ? "line-through text-gray-400" : ""}`}>{i.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-sm mb-4">No items yet. Generate from your meal plan.</p>
      )}

      <form onSubmit={onAdd} className="flex items-center gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Add pantry item" className="flex-1 rounded border px-3 py-2" />
        <button className="rounded bg-black text-white px-3 py-2 text-sm">Add</button>
      </form>
    </MainLayout>
  );
}
