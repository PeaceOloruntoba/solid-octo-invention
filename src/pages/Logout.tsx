import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";

export default function Logout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);
  return null;
}
