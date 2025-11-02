import { FiHeart, FiPlus } from "react-icons/fi";
import type { Recipe } from "../types";

export default function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onAdd,
}: {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="rounded border p-3 flex items-start gap-3">
      <div className="flex-1">
        <p className="font-medium">{recipe.name}</p>
        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
          <span className="capitalize">{recipe.category}</span>
          <span>•</span>
          <span className="capitalize">{recipe.region}</span>
          <span>•</span>
          <span>Spice {recipe.spiceLevel}</span>
        </div>
        {recipe.tags?.length ? (
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] rounded bg-gray-100 px-2 py-0.5 text-gray-600">{t}</span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center gap-2">
        <button aria-label="favorite" onClick={onToggleFavorite} className={`p-2 rounded-full border ${isFavorite ? "text-red-500 border-red-200" : "text-gray-600"}`}>
          <FiHeart />
        </button>
        <button aria-label="add" onClick={onAdd} className="p-2 rounded-full border text-gray-600">
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
