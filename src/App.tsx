import { Route, BrowserRouter as Router, Routes } from "react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MealPlan from "./pages/MealPlan";
import ShoppingList from "./pages/ShoppingList";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import { useAuthStore } from "./store/auth";

export default function App() {
  const restore = useAuthStore((s) => s.restore);
  useEffect(() => {
    restore();
  }, [restore]);
  return (
    <div>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}
