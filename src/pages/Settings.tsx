import MainLayout from "../layouts/MainLayout";
import { useAppStore } from "../store/app";

const CONDITIONS = [
  { id: "diabetes", name: "Diabetes" },
  { id: "hypertension", name: "Hypertension" },
  { id: "ulcer", name: "Ulcer" },
  { id: "pcos", name: "PCOS" },
  { id: "pregnancy", name: "Pregnancy" },
  { id: "weightLoss", name: "Weight Loss" },
] as const;

export default function Settings() {
  const prefs = useAppStore((s) => s.preferences);
  const setPreferences = useAppStore((s) => s.setPreferences);

  function toggleCond(id: (typeof CONDITIONS)[number]["id"]) {
    const set = new Set(prefs.healthConditions);
    if (set.has(id as any)) set.delete(id as any); else set.add(id as any);
    setPreferences({ healthConditions: Array.from(set) as any });
  }

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-3">Settings</h1>

      <section className="mb-4">
        <h2 className="text-sm font-medium mb-2">Health conditions</h2>
        <div className="grid grid-cols-2 gap-2">
          {CONDITIONS.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={prefs.healthConditions.includes(c.id as any)} onChange={() => toggleCond(c.id)} />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Spice preference</h2>
          <span className="text-xs text-gray-500">{prefs.spicePreference}</span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          value={prefs.spicePreference}
          onChange={(e) => setPreferences({ spicePreference: Number(e.target.value) })}
          className="w-full"
        />
      </section>

      <section>
        <h2 className="text-sm font-medium mb-2">Theme</h2>
        <p className="text-xs text-gray-500">Dark mode coming soon.</p>
      </section>
    </MainLayout>
  );
}
