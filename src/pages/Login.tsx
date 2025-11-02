import MainLayout from "../layouts/MainLayout";
import { useAuthStore } from "../store/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const { login, loading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  }

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading} className="w-full rounded bg-black text-white py-2 disabled:opacity-50">{loading ? "Loading..." : "Sign in"}</button>
      </form>
      <p className="text-sm text-gray-600 mt-3">No account? <a className="underline" href="/register">Register</a></p>
    </MainLayout>
  );
}
