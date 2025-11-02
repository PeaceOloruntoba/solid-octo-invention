import MainLayout from "../layouts/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <h1 className="text-xl font-semibold">404</h1>
      <p className="text-gray-600">Page not found</p>
    </MainLayout>
  );
}
