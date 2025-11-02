import MainLayout from "../layouts/MainLayout";

export default function Settings() {
  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-2">Settings</h1>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark mode</span>
          <span className="text-xs text-gray-500">Soon</span>
        </div>
      </div>
    </MainLayout>
  );
}
