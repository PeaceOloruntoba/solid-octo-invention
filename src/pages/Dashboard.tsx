import MainLayout from "../layouts/MainLayout";
import { useAuthStore } from "../store/auth";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <MainLayout>
      <h1 className="text-xl font-semibold">Welcome{user ? `, ${user.name}` : ""}</h1>
      <p className="text-gray-600 mt-2 text-sm">This is your overview. Explore recipes and build your meal plan.</p>
    </MainLayout>
  );
}
