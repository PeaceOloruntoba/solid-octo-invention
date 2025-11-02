import { create } from "zustand";
import { handleError } from "../utils/handleError";
import { recipes } from "../lib/data";
import type { Recipe } from "../types";

type RecipeState = {
  items: Recipe[];
  loading: boolean;
  fetch: () => Promise<void>;
};

export const useRecipeStore = create<RecipeState>((set) => ({
  items: [],
  loading: false,
  fetch: async () => {
    set({ loading: true });
    try {
      await new Promise((r) => setTimeout(r, 500));
      set({ items: recipes });
    } catch (e) {
      handleError(e, "Failed to fetch recipes");
    } finally {
      set({ loading: false });
    }
  },
}));
