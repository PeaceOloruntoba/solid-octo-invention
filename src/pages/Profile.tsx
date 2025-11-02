import MainLayout from "../layouts/MainLayout";
import { useAuthStore } from "../store/auth";

export default function Profile() {
  const { user } = useAuthStore();
  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-2">Profile</h1>
      {user ? (
        <div className="rounded border p-3">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p className="text-gray-600 text-sm">You are not logged in.</p>
      )}
    </MainLayout>
  );
}
