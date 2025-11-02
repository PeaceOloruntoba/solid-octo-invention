import MainLayout from "../layouts/MainLayout";

export default function ShoppingList() {
  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-2">Shopping List</h1>
      <p className="text-gray-600 text-sm">Add ingredients from your plan.</p>
    </MainLayout>
  );
}
