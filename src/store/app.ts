import { create } from "zustand";
import { toast } from "sonner";
import type { DayId, MealPlan, MealType, PantryItem, Preferences, Recipe } from "../types";

export type Filters = {
  category: "all" | Recipe["category"]; 
  region: "all" | string;
  spiceLevel: "all" | number;
  search: string;
};

const DAYS: DayId[] = ["mon","tue","wed","thu","fri","sat","sun"];
const MEALS: MealType[] = ["breakfast","lunch","dinner"];

export type AppState = {
  favorites: number[]; // recipe ids
  pantry: PantryItem[];
  mealPlan: MealPlan;
  shoppingList: PantryItem[];
  filters: Filters;
  preferences: Preferences;
  // actions
  toggleFavorite: (id: number) => void;
  setFilters: (p: Partial<Filters>) => void;
  setPreferences: (p: Partial<Preferences>) => void;
  addPantryItem: (name: string) => void;
  togglePantryItem: (name: string) => void;
  addToMealPlan: (recipe: Recipe, day: DayId, meal: MealType) => void;
  removeFromMealPlan: (day: DayId, meal: MealType) => void;
  generateShoppingList: () => void;
  toggleShoppingItem: (name: string) => void;
  moveCheckedToPantry: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  favorites: [],
  pantry: [],
  mealPlan: {},
  shoppingList: [],
  filters: { category: "all", region: "all", spiceLevel: "all", search: "" },
  preferences: { healthConditions: [], spicePreference: 3 },
  toggleFavorite: (id) => set((s) => {
    const exists = s.favorites.includes(id);
    const next = exists ? s.favorites.filter(x => x !== id) : [...s.favorites, id];
    toast.success(exists ? "Removed from favorites" : "Added to favorites");
    return { favorites: next };
  }),
  setFilters: (p) => set((s) => ({ filters: { ...s.filters, ...p } })),
  setPreferences: (p) => set((s) => ({ preferences: { ...s.preferences, ...p } })),
  addPantryItem: (name) => set((s) => ({ pantry: s.pantry.find(p => p.name.toLowerCase() === name.toLowerCase()) ? s.pantry : [...s.pantry, { name, checked: false }] })),
  togglePantryItem: (name) => set((s) => ({ pantry: s.pantry.map(p => p.name === name ? { ...p, checked: !p.checked } : p) })),
  addToMealPlan: (recipe, day, meal) => set((s) => {
    const copy: MealPlan = { ...s.mealPlan };
    copy[day] = { ...(copy[day] || {}), [meal]: recipe };
    toast.success("Added to plan");
    return { mealPlan: copy };
  }),
  removeFromMealPlan: (day, meal) => set((s) => {
    const copy: MealPlan = { ...s.mealPlan };
    if (copy[day]) {
      const m = { ...copy[day] };
      delete m[meal];
      copy[day] = m;
    }
    return { mealPlan: copy };
  }),
  generateShoppingList: () => {
    const { mealPlan, pantry } = get();
    const ingredients = new Set<string>();
    DAYS.forEach(d => {
      const dayMeals = mealPlan[d];
      if (!dayMeals) return;
      MEALS.forEach(mt => {
        const r = dayMeals[mt];
        if (r?.ingredients) r.ingredients.forEach(i => ingredients.add(i));
      })
    });
    const list = Array.from(ingredients)
      .filter(i => !pantry.some(p => p.name.toLowerCase() === i.toLowerCase()))
      .map((i) => ({ name: i, checked: false }));
    set({ shoppingList: list });
    toast.success("Shopping list generated");
  },
  toggleShoppingItem: (name) => set((s) => ({
    shoppingList: s.shoppingList.map((it) => it.name === name ? { ...it, checked: !it.checked } : it)
  })),
  moveCheckedToPantry: () => set((s) => {
    const checked = s.shoppingList.filter((i) => i.checked);
    if (!checked.length) return {} as any;
    const newPantry = [...s.pantry];
    checked.forEach((i) => {
      if (!newPantry.find((p) => p.name.toLowerCase() === i.name.toLowerCase())) newPantry.push({ name: i.name, checked: false });
    });
    const remaining = s.shoppingList.filter((i) => !i.checked);
    toast.success("Moved checked items to pantry");
    return { pantry: newPantry, shoppingList: remaining };
  }),
}));
