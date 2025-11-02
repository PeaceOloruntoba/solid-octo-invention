import type { Preferences, Recipe } from "../types";

export function scoreRecipe(recipe: Recipe, prefs: Preferences): number {
  let score = 100;
  // health conditions influence
  for (const cond of prefs.healthConditions) {
    const note = recipe.healthNotes?.[cond];
    if (!note) continue;
    if (note === "not-recommended") score -= 50;
    else if (note === "limit") score -= 20;
    else if (note === "moderate") score -= 5;
    else if (note === "excellent") score += 10;
    else if (note === "reduce-pepper" || note === "reduce-salt" || note === "reduce-spice") score -= 5;
  }
  // spice preference penalty
  const spiceDiff = Math.abs((recipe.spiceLevel ?? 0) - (prefs.spicePreference ?? 0));
  score -= spiceDiff * 5;
  return score;
}

export function getHealthAdvice(recipe: Recipe, prefs: Preferences): string[] {
  const advice: string[] = [];
  for (const cond of prefs.healthConditions) {
    const note = recipe.healthNotes?.[cond];
    if (!note) continue;
    if (note === "not-recommended") advice.push("Not recommended for this condition");
    if (note === "limit") advice.push("Limit portions");
    if (note === "moderate") advice.push("Moderate choice");
    if (note === "excellent") advice.push("Excellent choice");
    if (note === "reduce-pepper") advice.push("Reduce pepper/spice");
    if (note === "reduce-salt") advice.push("Reduce salt");
    if (note === "reduce-spice") advice.push("Use milder spice level");
  }
  const spiceDiff = Math.abs((recipe.spiceLevel ?? 0) - (prefs.spicePreference ?? 0));
  if (spiceDiff >= 2) advice.push("Adjust spice level to match your preference");
  return advice;
}
