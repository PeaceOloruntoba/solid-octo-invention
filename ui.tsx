import React, { useState, useEffect } from 'react';
import { Calendar, ShoppingCart, Book, Package, Settings, Plus, Search, Mic, ChevronRight, AlertCircle, Check, X, Filter, Info, LogOut, User } from 'lucide-react';

// Expanded Nigerian Recipe Database (50+ recipes)
const NIGERIAN_RECIPES = [
  // Breakfast (15 recipes)
  { id: 1, name: "Akara (Bean Cakes)", category: "breakfast", region: "yoruba", calories: 180, protein: 8, carbs: 15, fat: 10, fiber: 4, spiceLevel: 2, prepTime: 30, tags: ["vegetarian", "protein-rich"], ingredients: ["beans", "onions", "pepper", "salt", "oil"], healthNotes: { diabetes: "good", hypertension: "moderate", ulcer: "reduce-pepper", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 2, name: "Moi Moi", category: "breakfast", region: "yoruba", calories: 200, protein: 10, carbs: 20, fat: 8, fiber: 5, spiceLevel: 2, prepTime: 45, tags: ["vegetarian", "high-fiber"], ingredients: ["beans", "eggs", "fish", "onions", "pepper", "oil"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "reduce-pepper", pcos: "excellent", pregnancy: "safe", weightLoss: "good" }},
  { id: 3, name: "Yam & Egg Sauce", category: "breakfast", region: "general", calories: 320, protein: 12, carbs: 45, fat: 10, fiber: 4, spiceLevel: 1, prepTime: 25, tags: ["quick", "filling"], ingredients: ["yam", "eggs", "tomatoes", "onions", "pepper", "oil"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 4, name: "Pap & Akara", category: "breakfast", region: "general", calories: 280, protein: 9, carbs: 38, fat: 10, fiber: 3, spiceLevel: 2, prepTime: 35, tags: ["traditional", "filling"], ingredients: ["cornmeal", "beans", "onions", "pepper", "sugar"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 5, name: "Plantain Porridge", category: "breakfast", region: "general", calories: 340, protein: 6, carbs: 52, fat: 12, fiber: 5, spiceLevel: 2, prepTime: 30, tags: ["filling", "sweet"], ingredients: ["plantain", "palm-oil", "onions", "crayfish", "pepper"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 6, name: "Bread & Scrambled Eggs", category: "breakfast", region: "general", calories: 300, protein: 14, carbs: 35, fat: 12, fiber: 2, spiceLevel: 1, prepTime: 15, tags: ["quick", "protein-rich"], ingredients: ["bread", "eggs", "tomatoes", "onions", "butter"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "good", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 7, name: "Yam Porridge (Asaro)", category: "breakfast", region: "yoruba", calories: 310, protein: 8, carbs: 48, fat: 10, fiber: 6, spiceLevel: 2, prepTime: 35, tags: ["filling", "comfort-food"], ingredients: ["yam", "palm-oil", "onions", "pepper", "crayfish"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 8, name: "Pancakes (Nigerian Style)", category: "breakfast", region: "general", calories: 250, protein: 6, carbs: 35, fat: 10, fiber: 2, spiceLevel: 0, prepTime: 20, tags: ["sweet", "quick"], ingredients: ["flour", "eggs", "milk", "sugar", "butter"], healthNotes: { diabetes: "limit", hypertension: "moderate", ulcer: "good", pcos: "limit", pregnancy: "safe", weightLoss: "limit" }},
  { id: 9, name: "Fried Plantain & Beans", category: "breakfast", region: "general", calories: 380, protein: 12, carbs: 55, fat: 14, fiber: 10, spiceLevel: 1, prepTime: 40, tags: ["filling", "high-fiber"], ingredients: ["plantain", "beans", "palm-oil", "onions"], healthNotes: { diabetes: "good", hypertension: "moderate", ulcer: "good", pcos: "excellent", pregnancy: "safe", weightLoss: "good" }},
  { id: 10, name: "Custard & Bread", category: "breakfast", region: "general", calories: 280, protein: 7, carbs: 45, fat: 8, fiber: 2, spiceLevel: 0, prepTime: 10, tags: ["quick", "light"], ingredients: ["custard-powder", "milk", "sugar", "bread"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "excellent", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 11, name: "Pap & Moi Moi", category: "breakfast", region: "general", calories: 290, protein: 11, carbs: 40, fat: 9, fiber: 4, spiceLevel: 2, prepTime: 50, tags: ["traditional", "nutritious"], ingredients: ["cornmeal", "beans", "eggs", "fish", "pepper"], healthNotes: { diabetes: "good", hypertension: "good", ulcer: "reduce-pepper", pcos: "excellent", pregnancy: "safe", weightLoss: "good" }},
  { id: 12, name: "Oat Meal with Fruit", category: "breakfast", region: "general", calories: 220, protein: 6, carbs: 38, fat: 5, fiber: 6, spiceLevel: 0, prepTime: 15, tags: ["healthy", "quick"], ingredients: ["oats", "milk", "banana", "honey"], healthNotes: { diabetes: "excellent", hypertension: "excellent", ulcer: "excellent", pcos: "excellent", pregnancy: "safe", weightLoss: "excellent" }},
  { id: 13, name: "Fried Yam & Pepper Sauce", category: "breakfast", region: "general", calories: 350, protein: 8, carbs: 48, fat: 15, fiber: 4, spiceLevel: 3, prepTime: 30, tags: ["filling", "spicy"], ingredients: ["yam", "oil", "tomatoes", "pepper", "onions"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "not-recommended", pcos: "moderate", pregnancy: "reduce-spice", weightLoss: "moderate" }},
  { id: 14, name: "Boiled Yam & Garden Egg Sauce", category: "breakfast", region: "general", calories: 290, protein: 7, carbs: 50, fat: 8, fiber: 5, spiceLevel: 2, prepTime: 35, tags: ["traditional", "vegetable-rich"], ingredients: ["yam", "garden-eggs", "palm-oil", "onions", "crayfish"], healthNotes: { diabetes: "good", hypertension: "good", ulcer: "good", pcos: "good", pregnancy: "safe", weightLoss: "good" }},
  { id: 15, name: "Masa (Rice Cakes)", category: "breakfast", region: "hausa", calories: 200, protein: 5, carbs: 35, fat: 6, fiber: 2, spiceLevel: 1, prepTime: 40, tags: ["traditional", "light"], ingredients: ["rice", "yeast", "sugar", "oil"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},

  // Lunch & Soups (25 recipes)
  { id: 16, name: "Jollof Rice", category: "lunch", region: "general", calories: 380, protein: 8, carbs: 65, fat: 10, fiber: 3, spiceLevel: 3, prepTime: 60, tags: ["popular", "party-food"], ingredients: ["rice", "tomatoes", "onions", "pepper", "chicken-stock", "oil"], healthNotes: { diabetes: "moderate", hypertension: "reduce-salt", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 17, name: "Efo Riro (Vegetable Soup)", category: "lunch", region: "yoruba", calories: 280, protein: 15, carbs: 12, fat: 18, fiber: 6, spiceLevel: 2, prepTime: 45, tags: ["nutritious", "vegetable-rich"], ingredients: ["spinach", "meat", "fish", "palm-oil", "onions", "pepper", "locust-beans"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "reduce-pepper", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 18, name: "Egusi Soup", category: "lunch", region: "general", calories: 420, protein: 18, carbs: 15, fat: 30, fiber: 5, spiceLevel: 2, prepTime: 50, tags: ["protein-rich", "traditional"], ingredients: ["egusi", "meat", "fish", "palm-oil", "spinach", "onions", "pepper"], healthNotes: { diabetes: "good", hypertension: "moderate", ulcer: "reduce-pepper", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 19, name: "Ofada Rice & Ayamase Sauce", category: "lunch", region: "yoruba", calories: 450, protein: 12, carbs: 58, fat: 18, fiber: 4, spiceLevel: 4, prepTime: 70, tags: ["spicy", "flavorful"], ingredients: ["ofada-rice", "green-peppers", "onions", "locust-beans", "meat", "palm-oil"], healthNotes: { diabetes: "moderate", hypertension: "reduce-salt", ulcer: "not-recommended", pcos: "moderate", pregnancy: "reduce-spice", weightLoss: "moderate" }},
  { id: 20, name: "Banga Soup", category: "lunch", region: "edo", calories: 390, protein: 16, carbs: 18, fat: 25, fiber: 4, spiceLevel: 2, prepTime: 60, tags: ["rich", "traditional"], ingredients: ["palm-fruit", "meat", "fish", "onions", "spices"], healthNotes: { diabetes: "good", hypertension: "moderate", ulcer: "good", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 21, name: "Edikang Ikong", category: "lunch", region: "calabar", calories: 320, protein: 17, carbs: 10, fat: 22, fiber: 7, spiceLevel: 2, prepTime: 45, tags: ["vegetable-rich", "nutritious"], ingredients: ["fluted-pumpkin", "waterleaf", "meat", "fish", "palm-oil", "periwinkle"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "good", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 22, name: "Afang Soup", category: "lunch", region: "calabar", calories: 340, protein: 16, carbs: 12, fat: 24, fiber: 6, spiceLevel: 2, prepTime: 50, tags: ["vegetable-rich", "traditional"], ingredients: ["afang-leaves", "waterleaf", "meat", "fish", "palm-oil", "periwinkle"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "good", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 23, name: "Beans & Plantain (Ewa Riro)", category: "lunch", region: "yoruba", calories: 380, protein: 14, carbs: 55, fat: 12, fiber: 12, spiceLevel: 2, prepTime: 90, tags: ["high-fiber", "filling"], ingredients: ["beans", "plantain", "palm-oil", "onions", "pepper"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "reduce-pepper", pcos: "excellent", pregnancy: "safe", weightLoss: "excellent" }},
  { id: 24, name: "Okro Soup", category: "lunch", region: "general", calories: 280, protein: 14, carbs: 15, fat: 18, fiber: 5, spiceLevel: 2, prepTime: 35, tags: ["light", "vegetable-rich"], ingredients: ["okro", "meat", "fish", "palm-oil", "onions", "pepper"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "good", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 25, name: "Ogbono Soup", category: "lunch", region: "igbo", calories: 400, protein: 15, carbs: 18, fat: 28, fiber: 6, spiceLevel: 2, prepTime: 40, tags: ["thick", "rich"], ingredients: ["ogbono", "meat", "fish", "palm-oil", "spinach", "pepper"], healthNotes: { diabetes: "good", hypertension: "moderate", ulcer: "good", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 26, name: "Bitter Leaf Soup (Ofe Onugbu)", category: "lunch", region: "igbo", calories: 350, protein: 16, carbs: 14, fat: 24, fiber: 5, spiceLevel: 2, prepTime: 55, tags: ["traditional", "nutritious"], ingredients: ["bitter-leaf", "meat", "fish", "palm-oil", "ogiri", "crayfish"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "good", pcos: "excellent", pregnancy: "safe", weightLoss: "excellent" }},
  { id: 27, name: "White Rice & Stew", category: "lunch", region: "general", calories: 420, protein: 12, carbs: 68, fat: 12, fiber: 2, spiceLevel: 3, prepTime: 50, tags: ["popular", "filling"], ingredients: ["rice", "tomatoes", "pepper", "onions", "meat", "oil"], healthNotes: { diabetes: "moderate", hypertension: "reduce-salt", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 28, name: "Fried Rice", category: "lunch", region: "general", calories: 450, protein: 10, carbs: 62, fat: 18, fiber: 3, spiceLevel: 2, prepTime: 45, tags: ["party-food", "colorful"], ingredients: ["rice", "vegetables", "chicken", "liver", "curry", "thyme"], healthNotes: { diabetes: "moderate", hypertension: "reduce-salt", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 29, name: "Coconut Rice", category: "lunch", region: "general", calories: 380, protein: 7, carbs: 58, fat: 14, fiber: 3, spiceLevel: 1, prepTime: 40, tags: ["aromatic", "mild"], ingredients: ["rice", "coconut-milk", "onions", "bay-leaves"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "excellent", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 30, name: "Tuwo Shinkafa & Miyan Kuka", category: "lunch", region: "hausa", calories: 360, protein: 10, carbs: 65, fat: 8, fiber: 4, spiceLevel: 2, prepTime: 60, tags: ["northern", "traditional"], ingredients: ["rice-flour", "baobab-leaves", "meat", "onions", "locust-beans"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "good", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 31, name: "Amala & Ewedu Soup", category: "lunch", region: "yoruba", calories: 320, protein: 8, carbs: 58, fat: 8, fiber: 7, spiceLevel: 2, prepTime: 50, tags: ["traditional", "nutritious"], ingredients: ["yam-flour", "ewedu-leaves", "locust-beans", "crayfish"], healthNotes: { diabetes: "good", hypertension: "good", ulcer: "good", pcos: "excellent", pregnancy: "safe", weightLoss: "good" }},
  { id: 32, name: "Pounded Yam & Egusi", category: "lunch", region: "general", calories: 520, protein: 16, carbs: 78, fat: 18, fiber: 6, spiceLevel: 2, prepTime: 70, tags: ["filling", "heavy"], ingredients: ["yam", "egusi", "meat", "fish", "palm-oil", "spinach"], healthNotes: { diabetes: "limit", hypertension: "moderate", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "limit" }},
  { id: 33, name: "Fufu & Light Soup", category: "lunch", region: "general", calories: 380, protein: 12, carbs: 68, fat: 10, fiber: 5, spiceLevel: 3, prepTime: 65, tags: ["traditional", "filling"], ingredients: ["cassava-flour", "tomatoes", "fish", "pepper", "onions"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 34, name: "Semo & Vegetable Soup", category: "lunch", region: "general", calories: 350, protein: 10, carbs: 62, fat: 10, fiber: 6, spiceLevel: 2, prepTime: 40, tags: ["quick", "nutritious"], ingredients: ["semovita", "ugu", "meat", "fish", "palm-oil"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "good", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 35, name: "Abacha (African Salad)", category: "lunch", region: "igbo", calories: 280, protein: 8, carbs: 32, fat: 14, fiber: 4, spiceLevel: 2, prepTime: 30, tags: ["cold-dish", "unique"], ingredients: ["cassava-flakes", "garden-eggs", "ugba", "palm-oil", "crayfish"], healthNotes: { diabetes: "good", hypertension: "moderate", ulcer: "good", pcos: "good", pregnancy: "safe", weightLoss: "good" }},
  { id: 36, name: "Nkwobi", category: "lunch", region: "igbo", calories: 380, protein: 28, carbs: 8, fat: 26, fiber: 2, spiceLevel: 3, prepTime: 50, tags: ["protein-rich", "spicy"], ingredients: ["cow-foot", "palm-oil", "potash", "ehuru", "pepper"], healthNotes: { diabetes: "good", hypertension: "moderate", ulcer: "not-recommended", pcos: "good", pregnancy: "moderate", weightLoss: "moderate" }},
  { id: 37, name: "Fisherman Soup", category: "lunch", region: "calabar", calories: 260, protein: 22, carbs: 10, fat: 16, fiber: 3, spiceLevel: 3, prepTime: 45, tags: ["seafood", "light"], ingredients: ["fresh-fish", "periwinkle", "yam", "palm-oil", "pepper"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "reduce-pepper", pcos: "excellent", pregnancy: "safe", weightLoss: "excellent" }},
  { id: 38, name: "Oha Soup", category: "lunch", region: "igbo", calories: 330, protein: 15, carbs: 14, fat: 22, fiber: 5, spiceLevel: 2, prepTime: 50, tags: ["traditional", "aromatic"], ingredients: ["oha-leaves", "meat", "fish", "palm-oil", "cocoyam", "uziza"], healthNotes: { diabetes: "good", hypertension: "good", ulcer: "good", pcos: "excellent", pregnancy: "safe", weightLoss: "good" }},
  { id: 39, name: "Native Rice (Iwuk Edesi)", category: "lunch", region: "calabar", calories: 410, protein: 12, carbs: 56, fat: 16, fiber: 4, spiceLevel: 2, prepTime: 55, tags: ["traditional", "rich"], ingredients: ["rice", "palm-oil", "meat", "periwinkle", "crayfish", "pepper"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 40, name: "Gizdodo (Gizzard & Plantain)", category: "lunch", region: "general", calories: 420, protein: 18, carbs: 42, fat: 20, fiber: 4, spiceLevel: 3, prepTime: 40, tags: ["protein-rich", "popular"], ingredients: ["gizzard", "plantain", "tomatoes", "pepper", "onions", "oil"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "reduce-pepper", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},

  // Dinner (8 recipes)
  { id: 41, name: "Pepper Soup", category: "dinner", region: "general", calories: 220, protein: 20, carbs: 8, fat: 10, fiber: 2, spiceLevel: 4, prepTime: 40, tags: ["light", "protein-rich"], ingredients: ["meat", "pepper-soup-spices", "onions", "pepper"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "not-recommended", pcos: "good", pregnancy: "reduce-spice", weightLoss: "excellent" }},
  { id: 42, name: "Vegetable Soup (Light)", category: "dinner", region: "general", calories: 240, protein: 12, carbs: 10, fat: 16, fiber: 6, spiceLevel: 1, prepTime: 30, tags: ["light", "low-calorie"], ingredients: ["ugu", "meat", "fish", "palm-oil", "onions"], healthNotes: { diabetes: "excellent", hypertension: "excellent", ulcer: "excellent", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 43, name: "Grilled Fish & Salad", category: "dinner", region: "general", calories: 260, protein: 28, carbs: 8, fat: 12, fiber: 3, spiceLevel: 2, prepTime: 25, tags: ["light", "protein-rich", "low-carb"], ingredients: ["fish", "lettuce", "tomatoes", "cucumber", "lemon"], healthNotes: { diabetes: "excellent", hypertension: "excellent", ulcer: "excellent", pcos: "excellent", pregnancy: "safe", weightLoss: "excellent" }},
  { id: 44, name: "Okro Soup (Light)", category: "dinner", region: "general", calories: 200, protein: 10, carbs: 12, fat: 12, fiber: 4, spiceLevel: 1, prepTime: 25, tags: ["light", "quick"], ingredients: ["okro", "fish", "palm-oil", "onions", "crayfish"], healthNotes: { diabetes: "excellent", hypertension: "excellent", ulcer: "excellent", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 45, name: "Steamed Fish & Vegetables", category: "dinner", region: "general", calories: 240, protein: 26, carbs: 10, fat: 10, fiber: 4, spiceLevel: 1, prepTime: 30, tags: ["healthy", "low-calorie"], ingredients: ["fish", "carrots", "green-beans", "onions", "ginger"], healthNotes: { diabetes: "excellent", hypertension: "excellent", ulcer: "excellent", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 46, name: "Light Efo Riro", category: "dinner", region: "yoruba", calories: 220, protein: 12, carbs: 10, fat: 14, fiber: 5, spiceLevel: 1, prepTime: 30, tags: ["vegetable-rich", "light"], ingredients: ["spinach", "fish", "palm-oil", "onions", "crayfish"], healthNotes: { diabetes: "excellent", hypertension: "excellent", ulcer: "excellent", pcos: "excellent", pregnancy: "excellent", weightLoss: "excellent" }},
  { id: 47, name: "Yam Porridge (Light)", category: "dinner", region: "general", calories: 280, protein: 8, carbs: 44, fat: 8, fiber: 5, spiceLevel: 1, prepTime: 35, tags: ["filling", "comfort-food"], ingredients: ["yam", "palm-oil", "onions", "crayfish"], healthNotes: { diabetes: "moderate", hypertension: "good", ulcer: "excellent", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 48, name: "Catfish Pepper Soup", category: "dinner", region: "general", calories: 240, protein: 22, carbs: 6, fat: 14, fiber: 2, spiceLevel: 4, prepTime: 35, tags: ["seafood", "spicy"], ingredients: ["catfish", "pepper-soup-spices", "onions", "pepper", "scent-leaves"], healthNotes: { diabetes: "excellent", hypertension: "good", ulcer: "not-recommended", pcos: "excellent", pregnancy: "reduce-spice", weightLoss: "excellent" }},

  // Snacks (12 recipes)
  { id: 49, name: "Puff Puff", category: "snack", region: "general", calories: 150, protein: 3, carbs: 22, fat: 6, fiber: 1, spiceLevel: 0, prepTime: 30, tags: ["sweet", "popular"], ingredients: ["flour", "sugar", "yeast", "oil"], healthNotes: { diabetes: "limit", hypertension: "moderate", ulcer: "good", pcos: "limit", pregnancy: "safe", weightLoss: "limit" }},
  { id: 50, name: "Chin Chin", category: "snack", region: "general", calories: 180, protein: 3, carbs: 24, fat: 8, fiber: 1, spiceLevel: 0, prepTime: 45, tags: ["crunchy", "popular"], ingredients: ["flour", "sugar", "butter", "eggs", "oil"], healthNotes: { diabetes: "limit", hypertension: "moderate", ulcer: "good", pcos: "limit", pregnancy: "safe", weightLoss: "limit" }},
  { id: 51, name: "Plantain Chips", category: "snack", region: "general", calories: 160, protein: 1, carbs: 20, fat: 9, fiber: 2, spiceLevel: 1, prepTime: 20, tags: ["crunchy", "sweet"], ingredients: ["plantain", "oil", "salt"], healthNotes: { diabetes: "moderate", hypertension: "reduce-salt", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 52, name: "Coconut Candy", category: "snack", region: "general", calories: 140, protein: 2, carbs: 18, fat: 7, fiber: 2, spiceLevel: 0, prepTime: 25, tags: ["sweet", "chewy"], ingredients: ["coconut", "sugar", "ginger"], healthNotes: { diabetes: "limit", hypertension: "good", ulcer: "good", pcos: "limit", pregnancy: "safe", weightLoss: "limit" }},
  { id: 53, name: "Boli (Roasted Plantain)", category: "snack", region: "general", calories: 140, protein: 2, carbs: 32, fat: 1, fiber: 3, spiceLevel: 0, prepTime: 15, tags: ["healthy", "sweet"], ingredients: ["plantain"], healthNotes: { diabetes: "moderate", hypertension: "excellent", ulcer: "excellent", pcos: "good", pregnancy: "safe", weightLoss: "good" }},
  { id: 54, name: "Meat Pie", category: "snack", region: "general", calories: 320, protein: 8, carbs: 35, fat: 16, fiber: 2, spiceLevel: 1, prepTime: 60, tags: ["savory", "filling"], ingredients: ["flour", "butter", "minced-meat", "potatoes", "carrots"], healthNotes: { diabetes: "limit", hypertension: "moderate", ulcer: "good", pcos: "limit", pregnancy: "safe", weightLoss: "limit" }},
  { id: 55, name: "Samosa", category: "snack", region: "general", calories: 180, protein: 6, carbs: 22, fat: 8, fiber: 2, spiceLevel: 2, prepTime: 45, tags: ["savory", "crispy"], ingredients: ["flour", "minced-meat", "onions", "curry", "oil"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 56, name: "Fish Roll", category: "snack", region: "general", calories: 200, protein: 10, carbs: 24, fat: 8, fiber: 2, spiceLevel: 1, prepTime: 50, tags: ["savory", "protein-rich"], ingredients: ["flour", "fish", "onions", "pepper", "oil"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 57, name: "Groundnut (Roasted)", category: "snack", region: "general", calories: 170, protein: 7, carbs: 6, fat: 14, fiber: 3, spiceLevel: 0, prepTime: 5, tags: ["protein-rich", "quick"], ingredients: ["groundnuts"], healthNotes: { diabetes: "good", hypertension: "good", ulcer: "moderate", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 58, name: "Tiger Nut Drink (Kunu Aya)", category: "snack", region: "hausa", calories: 120, protein: 2, carbs: 24, fat: 3, fiber: 2, spiceLevel: 0, prepTime: 30, tags: ["drink", "refreshing"], ingredients: ["tiger-nuts", "coconut", "dates", "ginger"], healthNotes: { diabetes: "moderate", hypertension: "excellent", ulcer: "excellent", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 59, name: "Akara Burger", category: "snack", region: "general", calories: 280, protein: 12, carbs: 32, fat: 12, fiber: 4, spiceLevel: 2, prepTime: 35, tags: ["modern", "filling"], ingredients: ["beans", "bread", "lettuce", "tomatoes", "mayonnaise"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "reduce-pepper", pcos: "good", pregnancy: "safe", weightLoss: "moderate" }},
  { id: 60, name: "Yamarita (Egg Coated Yam)", category: "snack", region: "general", calories: 250, protein: 8, carbs: 35, fat: 10, fiber: 3, spiceLevel: 1, prepTime: 25, tags: ["filling", "savory"], ingredients: ["yam", "eggs", "flour", "oil"], healthNotes: { diabetes: "moderate", hypertension: "moderate", ulcer: "good", pcos: "moderate", pregnancy: "safe", weightLoss: "moderate" }},
];

const HEALTH_CONDITIONS = [
  { id: "diabetes", name: "Diabetes", icon: "🩸" },
  { id: "hypertension", name: "Hypertension (High BP)", icon: "💓" },
  { id: "ulcer", name: "Ulcer", icon: "🫀" },
  { id: "pcos", name: "PCOS", icon: "🌸" },
  { id: "pregnancy", name: "Pregnancy", icon: "🤰" },
  { id: "weightLoss", name: "Weight Loss", icon: "⚖️" },
];

const NUTRITIONAL_GUIDES = [
  {
    condition: "diabetes",
    title: "Managing Diabetes with Nigerian Food",
    guidelines: [
      "Choose high-fiber foods like beans, vegetables, and whole grains",
      "Limit refined carbs: reduce white rice, prefer ofada or brown rice",
      "Control portion sizes of swallow (fufu, pounded yam, semo)",
      "Include protein in every meal to stabilize blood sugar",
      "Focus on vegetable soups: Efo Riro, Edikang Ikong, Bitter Leaf",
      "Avoid excessive sugar in drinks and snacks",
      "Choose grilled or boiled foods over fried options when possible"
    ],
    recommendations: "Excellent choices: Moi Moi, Vegetable Soups, Okro Soup, Beans, Grilled Fish"
  },
  {
    condition: "hypertension",
    title: "Blood Pressure Control with Nigerian Meals",
    guidelines: [
      "Reduce salt and Maggi/seasoning cubes in cooking",
      "Use more herbs and spices for flavor instead of salt",
      "Limit palm oil consumption, use in moderation",
      "Increase potassium-rich foods: plantain, beans, vegetables",
      "Choose fresh ingredients over processed foods",
      "Drink plenty of water and reduce alcohol intake",
      "Include more vegetable-based soups and salads"
    ],
    recommendations: "Best options: Vegetable Soups, Grilled Fish, Okro Soup, Light Efo Riro"
  },
  {
    condition: "ulcer",
    title: "Ulcer-Friendly Nigerian Eating",
    guidelines: [
      "Avoid very spicy foods and excessive pepper",
      "Eat smaller, more frequent meals throughout the day",
      "Choose mild soups and reduce hot spices",
      "Include soothing foods like pap, custard, and oatmeal",
      "Avoid fried foods during flare-ups",
      "Stay away from very hot or very cold foods",
      "Don't skip meals, maintain regular eating schedule"
    ],
    recommendations: "Gentle choices: Custard, Pap, Moi Moi, Vegetable Soup (mild), Boiled Yam"
  },
  {
    condition: "pcos",
    title: "PCOS Management Through Nigerian Diet",
    guidelines: [
      "Focus on low-glycemic foods: beans, vegetables, whole grains",
      "Increase fiber intake with vegetable soups and legumes",
      "Choose complex carbs over simple carbs",
      "Include healthy fats from fish, groundnuts, and moderate palm oil",
      "Eat regular meals to balance hormones",
      "Limit processed foods and sugary snacks",
      "Stay hydrated and include anti-inflammatory foods"
    ],
    recommendations: "Great picks: Beans & Plantain, Vegetable Soups, Moi Moi, Edikang Ikong"
  },
  {
    condition: "pregnancy",
    title: "Healthy Nigerian Meals for Pregnancy",
    guidelines: [
      "Ensure adequate protein from fish, meat, beans, and eggs",
      "Eat iron-rich foods: dark leafy vegetables, meat, beans",
      "Include folate sources: vegetables, beans, groundnuts",
      "Stay hydrated with water and natural drinks",
      "Eat regular, balanced meals to maintain energy",
      "Choose moderate spice levels for comfort",
      "Include calcium-rich foods and variety in diet"
    ],
    recommendations: "Nutritious options: Edikang Ikong, Efo Riro, Fish Pepper Soup, Beans, Eggs"
  },
  {
    condition: "weightLoss",
    title: "Nigerian Meals for Weight Management",
    guidelines: [
      "Control portion sizes, especially of swallow and rice",
      "Choose vegetable-based soups over heavy, oil-rich options",
      "Include more lean protein: fish, chicken breast, beans",
      "Limit oil usage in cooking",
      "Choose boiled, grilled, or steamed over fried foods",
      "Eat more vegetables and reduce starchy foods",
      "Stay active and maintain calorie deficit"
    ],
    recommendations: "Light meals: Vegetable Soups, Pepper Soup, Grilled Fish, Okro Soup, Light Efo"
  }
];

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [authScreen, setAuthScreen] = useState('login'); // 'login' or 'register'
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [userData, setUserData] = useState({
    email: 'demo@naijplate.com',
    name: 'Chidi Okafor',
    weeklyCalories: 14000,
    healthConditions: ['diabetes', 'hypertension'],
    dietaryGoals: [],
    spicePreference: 3,
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [mealPlan, setMealPlan] = useState({
    Monday: {
      breakfast: NIGERIAN_RECIPES[1], // Moi Moi
      lunch: NIGERIAN_RECIPES[16], // Efo Riro
      dinner: NIGERIAN_RECIPES[42] // Grilled Fish & Salad
    },
    Tuesday: {
      breakfast: NIGERIAN_RECIPES[0], // Akara
      lunch: NIGERIAN_RECIPES[17], // Egusi Soup
    },
    Wednesday: {
      breakfast: NIGERIAN_RECIPES[2], // Yam & Egg
      lunch: NIGERIAN_RECIPES[20], // Edikang Ikong
      dinner: NIGERIAN_RECIPES[41] // Pepper Soup
    },
    Thursday: {
      lunch: NIGERIAN_RECIPES[15], // Jollof Rice
    },
    Friday: {
      breakfast: NIGERIAN_RECIPES[4], // Plantain Porridge
      lunch: NIGERIAN_RECIPES[22], // Beans & Plantain
    },
    Saturday: {},
    Sunday: {
      lunch: NIGERIAN_RECIPES[19], // Ofada Rice & Ayamase
    }
  });
  const [pantry, setPantry] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({ category: 'all', region: 'all', spiceLevel: 'all' });
  const [shoppingList, setShoppingList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authResult = await window.storage.get('current-user-email');
      if (authResult) {
        const email = authResult.value;
        await loadUserData(email);
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.log('No active session');
    }
  };

  const loadUserData = async (email) => {
    try {
      const userResult = await window.storage.get(`user-${email}`);
      const mealResult = await window.storage.get(`meals-${email}`);
      const pantryResult = await window.storage.get(`pantry-${email}`);
      const favResult = await window.storage.get(`favorites-${email}`);
      const shopResult = await window.storage.get(`shopping-${email}`);

      if (userResult) setUserData(JSON.parse(userResult.value));
      if (mealResult) setMealPlan(JSON.parse(mealResult.value));
      if (pantryResult) setPantry(JSON.parse(pantryResult.value));
      if (favResult) setFavorites(JSON.parse(favResult.value));
      if (shopResult) setShoppingList(JSON.parse(shopResult.value));
    } catch (error) {
      console.log('Error loading user data');
    }
  };

  const handleRegister = async () => {
    if (!registerData.email || !registerData.password) {
      setError('Please fill all fields');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Check if user exists
      const existingUser = await window.storage.get(`user-${registerData.email}`);
      if (existingUser) {
        setError('Email already registered');
        return;
      }

      // Save password hash (in production, use proper hashing)
      await window.storage.set(`auth-${registerData.email}`, registerData.password);
      
      setError('');
      setUserData({ ...userData, email: registerData.email });
      setCurrentView('onboarding');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const authResult = await window.storage.get(`auth-${loginData.email}`);
      
      if (!authResult || authResult.value !== loginData.password) {
        setError('Invalid email or password');
        return;
      }

      await window.storage.set('current-user-email', loginData.email);
      await loadUserData(loginData.email);
      setError('');
      setCurrentView('dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await window.storage.delete('current-user-email');
      setCurrentView('login');
      setUserData({
        email: '',
        name: '',
        weeklyCalories: 14000,
        healthConditions: [],
        dietaryGoals: [],
        spicePreference: 3,
      });
      setMealPlan({});
      setPantry([]);
      setFavorites([]);
      setShoppingList([]);
    } catch (error) {
      console.error('Logout failed');
    }
  };

  const saveUserData = async (data) => {
    try {
      await window.storage.set(`user-${data.email}`, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save user data');
    }
  };

  const saveMealPlan = async (plan) => {
    try {
      await window.storage.set(`meals-${userData.email}`, JSON.stringify(plan));
    } catch (error) {
      console.error('Failed to save meal plan');
    }
  };

  const savePantry = async (items) => {
    try {
      await window.storage.set(`pantry-${userData.email}`, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save pantry');
    }
  };

  const saveFavorites = async (favs) => {
    try {
      await window.storage.set(`favorites-${userData.email}`, JSON.stringify(favs));
    } catch (error) {
      console.error('Failed to save favorites');
    }
  };

  const saveShoppingList = async (list) => {
    try {
      await window.storage.set(`shopping-${userData.email}`, JSON.stringify(list));
    } catch (error) {
      console.error('Failed to save shopping list');
    }
  };

  const completeOnboarding = async () => {
    await saveUserData(userData);
    await window.storage.set('current-user-email', userData.email);
    setCurrentView('dashboard');
  };

  const getRecommendedRecipes = () => {
    return NIGERIAN_RECIPES.filter(recipe => {
      let score = 100;
      
      userData.healthConditions.forEach(condition => {
        const note = recipe.healthNotes[condition];
        if (note === 'not-recommended') score -= 50;
        else if (note === 'limit') score -= 20;
        else if (note === 'moderate') score -= 5;
        else if (note === 'excellent') score += 10;
      });
      
      const spiceDiff = Math.abs(recipe.spiceLevel - userData.spicePreference);
      score -= spiceDiff * 5;
      
      return score > 30;
    }).sort((a, b) => b.calories - a.calories);
  };

  const getWeeklyStats = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let mealCount = 0;

    Object.values(mealPlan).forEach(day => {
      Object.values(day).forEach(meal => {
        if (meal) {
          totalCalories += meal.calories || 0;
          totalProtein += meal.protein || 0;
          totalCarbs += meal.carbs || 0;
          totalFat += meal.fat || 0;
          totalFiber += meal.fiber || 0;
          mealCount++;
        }
      });
    });

    const caloriePercentage = Math.min(100, Math.round((totalCalories / userData.weeklyCalories) * 100));
    
    // Calculate macronutrient percentages based on calories
    const proteinCals = totalProtein * 4;
    const carbsCals = totalCarbs * 4;
    const fatCals = totalFat * 9;
    const totalMacroCals = proteinCals + carbsCals + fatCals;

    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      totalFiber,
      mealCount,
      caloriePercentage,
      proteinPercentage: totalMacroCals > 0 ? Math.round((proteinCals / totalMacroCals) * 100) : 0,
      carbsPercentage: totalMacroCals > 0 ? Math.round((carbsCals / totalMacroCals) * 100) : 0,
      fatPercentage: totalMacroCals > 0 ? Math.round((fatCals / totalMacroCals) * 100) : 0,
    };
  };

  const getDailyStats = (day) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    Object.values(mealPlan[day] || {}).forEach(meal => {
      if (meal) {
        totalCalories += meal.calories || 0;
        totalProtein += meal.protein || 0;
        totalCarbs += meal.carbs || 0;
        totalFat += meal.fat || 0;
      }
    });

    const dailyTarget = userData.weeklyCalories / 7;
    const caloriePercentage = Math.min(100, Math.round((totalCalories / dailyTarget) * 100));

    const proteinCals = totalProtein * 4;
    const carbsCals = totalCarbs * 4;
    const fatCals = totalFat * 9;
    const totalMacroCals = proteinCals + carbsCals + fatCals;

    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      caloriePercentage,
      proteinPercentage: totalMacroCals > 0 ? Math.round((proteinCals / totalMacroCals) * 100) : 0,
      carbsPercentage: totalMacroCals > 0 ? Math.round((carbsCals / totalMacroCals) * 100) : 0,
      fatPercentage: totalMacroCals > 0 ? Math.round((fatCals / totalMacroCals) * 100) : 0,
    };
  };

  const addToMealPlan = (recipe, day, mealType) => {
    const newPlan = { ...mealPlan };
    if (!newPlan[day]) newPlan[day] = {};
    newPlan[day][mealType] = recipe;
    setMealPlan(newPlan);
    saveMealPlan(newPlan);
  };

  const generateShoppingListFromPlan = () => {
    const ingredients = new Set();
    Object.values(mealPlan).forEach(day => {
      Object.values(day).forEach(meal => {
        if (meal && meal.ingredients) {
          meal.ingredients.forEach(ing => ingredients.add(ing));
        }
      });
    });
    
    const list = Array.from(ingredients).filter(ing => {
      return !pantry.some(p => p.name.toLowerCase() === ing.toLowerCase());
    }).map(ing => ({ name: ing, checked: false }));
    
    setShoppingList(list);
    saveShoppingList(list);
  };

  const getHealthAdvice = (recipe) => {
    const advice = [];
    userData.healthConditions.forEach(condition => {
      const note = recipe.healthNotes[condition];
      if (note === 'reduce-pepper') advice.push('Use less pepper for ulcer management');
      if (note === 'reduce-salt') advice.push('Reduce salt for blood pressure control');
      if (note === 'reduce-spice') advice.push('Lower spice level for comfort');
      if (note === 'not-recommended') advice.push(`Not recommended for ${condition}`);
    });
    return advice;
  };

  // Login/Register Screen
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-2">🍲 NaijaPlate</h1>
            <p className="text-gray-600">Your Nigerian Meal Planning Companion</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {authScreen === 'login' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="your@email.com"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700"
              >
                Log In
              </button>

              <div className="text-center">
                <button
                  onClick={() => {
                    setAuthScreen('register');
                    setError('');
                  }}
                  className="text-green-600 hover:underline"
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  placeholder="your@email.com"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700"
              >
                Sign Up
              </button>

              <div className="text-center">
                <button
                  onClick={() => {
                    setAuthScreen('login');
                    setError('');
                  }}
                  className="text-green-600 hover:underline"
                >
                  Already have an account? Log In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Onboarding Component
  if (currentView === 'onboarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-green-800">🍲 NaijaPlate</h1>
            <span className="text-sm text-gray-500">Step {onboardingStep}/4</span>
          </div>

          {onboardingStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Welcome! What's your name?</h2>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                placeholder="Enter your name"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              />
              <button
                onClick={() => userData.name && setOnboardingStep(2)}
                disabled={!userData.name}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300"
              >
                Continue <ChevronRight className="inline" size={20} />
              </button>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Weekly Calorie Target</h2>
              <p className="text-gray-600">Set your total calories for the week (e.g., 14,000 calories = 2,000/day)</p>
              <input
                type="number"
                value={userData.weeklyCalories}
                onChange={(e) => setUserData({...userData, weeklyCalories: parseInt(e.target.value)})}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              />
              <div className="text-sm text-gray-500">
                Daily average: {Math.round(userData.weeklyCalories / 7)} calories
              </div>
              <button
                onClick={() => setOnboardingStep(3)}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700"
              >
                Continue <ChevronRight className="inline" size={20} />
              </button>
            </div>
          )}

          {onboardingStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Health Conditions</h2>
              <p className="text-gray-600">Select any that apply (we'll recommend suitable meals)</p>
              <div className="grid grid-cols-2 gap-4">
                {HEALTH_CONDITIONS.map(condition => (
                  <button
                    key={condition.id}
                    onClick={() => {
                      const selected = userData.healthConditions.includes(condition.id);
                      setUserData({
                        ...userData,
                        healthConditions: selected
                          ? userData.healthConditions.filter(c => c !== condition.id)
                          : [...userData.healthConditions, condition.id]
                      });
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition ${
                      userData.healthConditions.includes(condition.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{condition.icon}</div>
                    <div className="font-semibold text-sm">{condition.name}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setOnboardingStep(4)}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700"
              >
                Continue <ChevronRight className="inline" size={20} />
              </button>
            </div>
          )}

          {onboardingStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Spice Preference</h2>
              <p className="text-gray-600">How spicy do you like your meals?</p>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={userData.spicePreference}
                  onChange={(e) => setUserData({...userData, spicePreference: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Mild</span>
                  <span className="font-semibold">Level {userData.spicePreference}</span>
                  <span>Very Spicy 🌶️</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start">
                  <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" size={20} />
                  <p className="text-sm text-yellow-800">
                    <strong>Disclaimer:</strong> This app provides meal suggestions and nutritional information for educational purposes only. It is not medical advice. Please consult healthcare professionals for medical guidance regarding your diet and health conditions.
                  </p>
                </div>
              </div>

              <button
                onClick={completeOnboarding}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700"
              >
                Start Planning Meals! 🎉
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🍲</div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                NaijaPlate
              </h1>
              <p className="text-xs text-gray-500">Healthy Nigerian Living</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">{userData.name}</p>
              <p className="text-xs text-gray-500">{Math.round(userData.weeklyCalories / 7)} cal/day</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition text-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-[73px] z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto scrollbar-hide">
          {[
            { id: 'dashboard', icon: Calendar, label: 'My Plan', color: 'green' },
            { id: 'recipes', icon: Book, label: 'Recipes', color: 'orange' },
            { id: 'nutrition', icon: Info, label: 'Nutrition', color: 'blue' },
            { id: 'shopping', icon: ShoppingCart, label: 'Shopping', color: 'purple' },
            { id: 'pantry', icon: Package, label: 'Pantry', color: 'yellow' },
            { id: 'settings', icon: Settings, label: 'Settings', color: 'gray' },
          ].map(view => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-3 whitespace-nowrap transition-all ${
                currentView === view.id
                  ? `border-${view.color}-500 text-${view.color}-600 font-bold`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <view.icon size={20} />
              <span className="text-sm">{view.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-4 pb-8">
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            {/* Weekly Overview Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 shadow-xl text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Weekly Overview</h2>
                  <p className="text-green-100 text-sm">Your nutrition at a glance</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-4 py-2">
                  <p className="text-xs font-semibold">Target</p>
                  <p className="text-xl font-bold">{userData.weeklyCalories.toLocaleString()}</p>
                  <p className="text-xs">cal/week</p>
                </div>
              </div>

              {(() => {
                const stats = getWeeklyStats();
                return (
                  <>
                    {/* Calorie Progress */}
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-semibold text-green-100">Calories Consumed</p>
                          <p className="text-3xl font-bold">{stats.totalCalories.toLocaleString()}</p>
                          <p className="text-xs text-green-100">of {userData.weeklyCalories.toLocaleString()} cal</p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-bold">{stats.caloriePercentage}%</div>
                          <p className="text-xs text-green-100">Complete</p>
                        </div>
                      </div>
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-white h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.caloriePercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Macronutrient Breakdown */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Protein */}
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          <p className="text-xs font-bold text-green-100">PROTEIN</p>
                        </div>
                        <p className="text-2xl font-bold mb-1">{stats.proteinPercentage}%</p>
                        <p className="text-xs text-green-100">{stats.totalProtein}g total</p>
                        <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-blue-400 h-full rounded-full transition-all"
                            style={{ width: `${stats.proteinPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Carbs */}
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <p className="text-xs font-bold text-green-100">CARBS</p>
                        </div>
                        <p className="text-2xl font-bold mb-1">{stats.carbsPercentage}%</p>
                        <p className="text-xs text-green-100">{stats.totalCarbs}g total</p>
                        <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-yellow-400 h-full rounded-full transition-all"
                            style={{ width: `${stats.carbsPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Fat */}
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                          <p className="text-xs font-bold text-green-100">FAT</p>
                        </div>
                        <p className="text-2xl font-bold mb-1">{stats.fatPercentage}%</p>
                        <p className="text-xs text-green-100">{stats.totalFat}g total</p>
                        <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-orange-400 h-full rounded-full transition-all"
                            style={{ width: `${stats.fatPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-center">
                        <p className="text-xs text-green-100 mb-1">Fiber Intake</p>
                        <p className="text-2xl font-bold">{stats.totalFiber}g</p>
                      </div>
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-center">
                        <p className="text-xs text-green-100 mb-1">Meals Planned</p>
                        <p className="text-2xl font-bold">{stats.mealCount}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Calendar className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {Object.keys(mealPlan).filter(day => Object.keys(mealPlan[day]).length > 0).length}
                    </p>
                    <p className="text-xs text-gray-500">Days Planned</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Book className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{NIGERIAN_RECIPES.length}</p>
                    <p className="text-xs text-gray-500">Recipes</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <ShoppingCart className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{shoppingList.length}</p>
                    <p className="text-xs text-gray-500">Shopping Items</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{favorites.length}</p>
                    <p className="text-xs text-gray-500">Favorites</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl p-6 shadow-md">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Daily Breakdown</h2>
                <p className="text-sm text-gray-600">
                  Track your nutrition day by day
                </p>
              </div>
              <button
                onClick={generateShoppingListFromPlan}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Generate List
              </button>
            </div>

            {/* Weekly Calendar */}
            <div className="grid gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, dayIndex) => {
                const dayStats = getDailyStats(day);
                const isToday = new Date().getDay() === (dayIndex + 1) % 7;
                
                return (
                  <div 
                    key={day} 
                    className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden ${
                      isToday ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <div className={`p-4 ${isToday ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-gray-100 to-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className={`text-xl font-bold ${isToday ? 'text-white' : 'text-gray-800'}`}>
                            {day}
                          </h3>
                          {isToday && (
                            <span className="bg-white text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                              TODAY
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          {dayStats.totalCalories > 0 && (
                            <>
                              <div className="text-right hidden sm:block">
                                <p className={`text-xs font-semibold ${isToday ? 'text-green-100' : 'text-gray-500'}`}>
                                  Macros: P {dayStats.proteinPercentage}% • C {dayStats.carbsPercentage}% • F {dayStats.fatPercentage}%
                                </p>
                              </div>
                              <div className={`text-right`}>
                                <p className={`text-lg font-bold ${isToday ? 'text-white' : 'text-gray-800'}`}>
                                  {dayStats.caloriePercentage}%
                                </p>
                                <p className={`text-xs ${isToday ? 'text-green-100' : 'text-gray-600'}`}>
                                  {dayStats.totalCalories} cal
                                </p>
                              </div>
                            </>
                          )}
                          {dayStats.totalCalories === 0 && (
                            <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-gray-500'}`}>
                              Not planned
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Daily Calorie Progress Bar */}
                      {dayStats.totalCalories > 0 && (
                        <div className="mt-3">
                          <div className={`w-full ${isToday ? 'bg-white bg-opacity-30' : 'bg-gray-300'} rounded-full h-2 overflow-hidden`}>
                            <div 
                              className={`${isToday ? 'bg-white' : 'bg-green-500'} h-full rounded-full transition-all duration-500`}
                              style={{ width: `${dayStats.caloriePercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="grid md:grid-cols-3 gap-3">
                        {['breakfast', 'lunch', 'dinner'].map(mealType => (
                          <div 
                            key={mealType} 
                            className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-4 hover:border-green-200 transition-all"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-2 h-2 rounded-full ${
                                mealType === 'breakfast' ? 'bg-yellow-400' :
                                mealType === 'lunch' ? 'bg-orange-400' : 'bg-blue-400'
                              }`}></div>
                              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                {mealType}
                              </div>
                            </div>
                            
                            {mealPlan[day]?.[mealType] ? (
                              <div className="space-y-2">
                                <div className="font-bold text-gray-800 text-sm leading-tight">
                                  {mealPlan[day][mealType].name}
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-semibold text-green-600">
                                    {mealPlan[day][mealType].calories} cal
                                  </span>
                                  <span className="text-gray-500">
                                    {mealPlan[day][mealType].prepTime}min
                                  </span>
                                </div>
                                {/* Meal Macros */}
                                <div className="flex gap-1 text-xs">
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    P: {mealPlan[day][mealType].protein}g
                                  </span>
                                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                    C: {mealPlan[day][mealType].carbs}g
                                  </span>
                                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                    F: {mealPlan[day][mealType].fat}g
                                  </span>
                                </div>
                                <button
                                  onClick={() => {
                                    const newPlan = { ...mealPlan };
                                    delete newPlan[day][mealType];
                                    setMealPlan(newPlan);
                                    saveMealPlan(newPlan);
                                  }}
                                  className="text-red-500 text-xs font-semibold hover:text-red-700 transition flex items-center gap-1 mt-2"
                                >
                                  <X size={14} />
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setCurrentView('recipes');
                                  setSelectedFilters({...selectedFilters, category: mealType});
                                }}
                                className="w-full bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                              >
                                <Plus size={16} />
                                Add meal
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recipes View */}
        {currentView === 'recipes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Recipe Library ({NIGERIAN_RECIPES.length} recipes)</h2>

            {/* Search & Filters */}
            <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <select
                  value={selectedFilters.category}
                  onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="all">All Meals</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snacks</option>
                </select>

                <select
                  value={selectedFilters.region}
                  onChange={(e) => setSelectedFilters({...selectedFilters, region: e.target.value})}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="all">All Regions</option>
                  <option value="yoruba">Yoruba</option>
                  <option value="igbo">Igbo</option>
                  <option value="hausa">Hausa</option>
                  <option value="calabar">Calabar</option>
                  <option value="edo">Edo</option>
                  <option value="general">General</option>
                </select>

                <select
                  value={selectedFilters.spiceLevel}
                  onChange={(e) => setSelectedFilters({...selectedFilters, spiceLevel: e.target.value})}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="all">All Spice Levels</option>
                  <option value="0">No Spice</option>
                  <option value="1">Mild</option>
                  <option value="2">Medium</option>
                  <option value="3">Spicy</option>
                  <option value="4">Very Spicy</option>
                </select>
              </div>
            </div>

            {/* Recipe Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRecommendedRecipes()
                .filter(recipe => {
                  const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesCategory = selectedFilters.category === 'all' || recipe.category === selectedFilters.category;
                  const matchesRegion = selectedFilters.region === 'all' || recipe.region === selectedFilters.region;
                  const matchesSpice = selectedFilters.spiceLevel === 'all' || recipe.spiceLevel === parseInt(selectedFilters.spiceLevel);
                  return matchesSearch && matchesCategory && matchesRegion && matchesSpice;
                })
                .map(recipe => {
                  const advice = getHealthAdvice(recipe);
                  const isFavorite = favorites.includes(recipe.id);
                  
                  return (
                    <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-gray-800">{recipe.name}</h3>
                          <button
                            onClick={() => {
                              const newFavs = isFavorite
                                ? favorites.filter(id => id !== recipe.id)
                                : [...favorites, recipe.id];
                              setFavorites(newFavs);
                              saveFavorites(newFavs);
                            }}
                            className="text-2xl"
                          >
                            {isFavorite ? '❤️' : '🤍'}
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {recipe.region.charAt(0).toUpperCase() + recipe.region.slice(1)}
                          </span>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {'🌶️'.repeat(recipe.spiceLevel) || 'No spice'}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Calories:</span>
                            <span className="font-semibold">{recipe.calories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Protein:</span>
                            <span className="font-semibold">{recipe.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Carbs:</span>
                            <span className="font-semibold">{recipe.carbs}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Prep Time:</span>
                            <span className="font-semibold">{recipe.prepTime} min</span>
                          </div>
                        </div>

                        {advice.length > 0 && (
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                            <div className="text-xs font-semibold text-blue-800 mb-1">Health Notes:</div>
                            {advice.map((note, idx) => (
                              <div key={idx} className="text-xs text-blue-700">• {note}</div>
                            ))}
                          </div>
                        )}

                        <details className="mb-4">
                          <summary className="text-sm font-semibold text-green-600 cursor-pointer hover:text-green-700">
                            Ingredients ({recipe.ingredients.length})
                          </summary>
                          <div className="mt-2 space-y-1">
                            {recipe.ingredients.map((ing, idx) => (
                              <div key={idx} className="text-xs text-gray-600">
                                • {ing.replace(/-/g, ' ').charAt(0).toUpperCase() + ing.replace(/-/g, ' ').slice(1)}
                              </div>
                            ))}
                          </div>
                        </details>

                        <div className="flex gap-2">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                const [day, mealType] = e.target.value.split('-');
                                addToMealPlan(recipe, day, mealType);
                                e.target.value = '';
                              }
                            }}
                            className="flex-1 px-3 py-2 border-2 border-green-500 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-50"
                          >
                            <option value="">Add to Plan</option>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                              <optgroup key={day} label={day}>
                                <option value={`${day}-breakfast`}>Breakfast</option>
                                <option value={`${day}-lunch`}>Lunch</option>
                                <option value={`${day}-dinner`}>Dinner</option>
                              </optgroup>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Nutrition Guide View */}
        {currentView === 'nutrition' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Nutritional Guidance for Nigerian Foods</h2>

            {userData.healthConditions.length > 0 ? (
              <div className="space-y-6">
                {NUTRITIONAL_GUIDES.filter(guide => userData.healthConditions.includes(guide.condition)).map(guide => (
                  <div key={guide.condition} className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4">
                      {HEALTH_CONDITIONS.find(c => c.id === guide.condition)?.icon} {guide.title}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Guidelines:</h4>
                        <ul className="space-y-2">
                          {guide.guidelines.map((guideline, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                              <Check size={16} className="text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-sm">{guideline}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Recommended Dishes:</h4>
                        <p className="text-sm text-green-700">{guide.recommendations}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Info size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">Select health conditions in Settings to see personalized nutritional guidance</p>
                <button
                  onClick={() => setCurrentView('settings')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Go to Settings
                </button>
              </div>
            )}

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" size={20} />
                <div className="text-sm text-yellow-800">
                  <strong>Important:</strong> This nutritional guidance is for educational purposes only. Always consult with a registered dietitian, nutritionist, or healthcare provider for personalized medical and dietary advice specific to your health conditions.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shopping List View */}
        {currentView === 'shopping' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Shopping List</h2>
              <button
                onClick={() => {
                  setShoppingList([]);
                  saveShoppingList([]);
                }}
                className="text-red-600 text-sm font-semibold hover:underline"
              >
                Clear All
              </button>
            </div>

            {shoppingList.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">No items in your shopping list</p>
                <button
                  onClick={generateShoppingListFromPlan}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Generate from Meal Plan
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="space-y-3">
                  {shoppingList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 border-b last:border-b-0">
                      <button
                        onClick={() => {
                          const newList = [...shoppingList];
                          newList[idx].checked = !newList[idx].checked;
                          setShoppingList(newList);
                          saveShoppingList(newList);
                        }}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          item.checked ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}
                      >
                        {item.checked && <Check size={16} className="text-white" />}
                      </button>
                      <span className={`flex-1 ${item.checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {item.name.replace(/-/g, ' ').charAt(0).toUpperCase() + item.name.replace(/-/g, ' ').slice(1)}
                      </span>
                      <button
                        onClick={() => {
                          const newList = shoppingList.filter((_, i) => i !== idx);
                          setShoppingList(newList);
                          saveShoppingList(newList);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-600">
                    {shoppingList.filter(item => item.checked).length} of {shoppingList.length} items checked
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pantry View */}
        {currentView === 'pantry' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Pantry</h2>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Add ingredient to pantry..."
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      const newPantry = [...pantry, { name: e.target.value.trim(), addedDate: new Date().toISOString() }];
                      setPantry(newPantry);
                      savePantry(newPantry);
                      e.target.value = '';
                    }
                  }}
                />
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">
                  <Plus size={20} />
                </button>
              </div>

              {pantry.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No items in your pantry yet</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-3">
                  {pantry.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-800">{item.name}</span>
                      <button
                        onClick={() => {
                          const newPantry = pantry.filter((_, i) => i !== idx);
                          setPantry(newPantry);
                          savePantry(newPantry);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings View */}
        {currentView === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="text"
                  value={userData.email}
                  disabled
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => {
                    const newData = {...userData, name: e.target.value};
                    setUserData(newData);
                    saveUserData(newData);
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weekly Calorie Target: {userData.weeklyCalories} cal
                </label>
                <input
                  type="range"
                  min="7000"
                  max="21000"
                  step="500"
                  value={userData.weeklyCalories}
                  onChange={(e) => {
                    const newData = {...userData, weeklyCalories: parseInt(e.target.value)};
                    setUserData(newData);
                    saveUserData(newData);
                  }}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">
                  Daily average: {Math.round(userData.weeklyCalories / 7)} calories
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Health Conditions</label>
                <div className="grid grid-cols-2 gap-3">
                  {HEALTH_CONDITIONS.map(condition => (
                    <button
                      key={condition.id}
                      onClick={() => {
                        const selected = userData.healthConditions.includes(condition.id);
                        const newData = {
                          ...userData,
                          healthConditions: selected
                            ? userData.healthConditions.filter(c => c !== condition.id)
                            : [...userData.healthConditions, condition.id]
                        };
                        setUserData(newData);
                        saveUserData(newData);
                      }}
                      className={`p-3 rounded-lg border-2 text-left transition ${
                        userData.healthConditions.includes(condition.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{condition.icon}</div>
                      <div className="font-semibold text-sm">{condition.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Spice Preference: Level {userData.spicePreference}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={userData.spicePreference}
                  onChange={(e) => {
                    const newData = {...userData, spicePreference: parseInt(e.target.value)};
                    setUserData(newData);
                    saveUserData(newData);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Mild</span>
                  <span>Very Spicy 🌶️</span>
                </div>
              </div>

              <div className="pt-6 border-t">
                <button
                  onClick={async () => {
                    if (confirm('Are you sure? This will delete all your data.')) {
                      try {
                        await window.storage.delete(`user-${userData.email}`);
                        await window.storage.delete(`meals-${userData.email}`);
                        await window.storage.delete(`pantry-${userData.email}`);
                        await window.storage.delete(`favorites-${userData.email}`);
                        await window.storage.delete(`shopping-${userData.email}`);
                        await window.storage.delete('current-user-email');
                        window.location.reload();
                      } catch (error) {
                        console.error('Failed to reset data');
                      }
                    }
                  }}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                >
                  Delete Account & All Data
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" size={20} />
                <div className="text-sm text-yellow-800">
                  <strong>Medical Disclaimer:</strong> This app provides meal planning and nutritional information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers regarding your diet and health conditions.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;