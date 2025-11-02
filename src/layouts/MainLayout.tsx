import type { PropsWithChildren, ReactNode } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FiUser, FiHome, FiList, FiCalendar, FiShoppingCart, FiSettings } from "react-icons/fi";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">NaijaMeal</Link>
          <NavLink to="/profile" className="p-2 text-gray-600"><FiUser size={20} /></NavLink>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-screen-sm px-4 py-4">
        {children ?? <Outlet />}
      </main>

      <nav className="sticky bottom-0 z-20 border-t bg-white">
        <div className="mx-auto max-w-screen-sm grid grid-cols-5 text-sm">
          <Tab to="/" icon={<FiHome />} label="Home" />
          <Tab to="/recipes" icon={<FiList />} label="Recipes" />
          <Tab to="/meal-plan" icon={<FiCalendar />} label="Plan" />
          <Tab to="/shopping-list" icon={<FiShoppingCart />} label="Shop" />
          <Tab to="/settings" icon={<FiSettings />} label="Settings" />
        </div>
      </nav>
    </div>
  );
}

function Tab({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center py-2 ${isActive ? "text-black" : "text-gray-500"}`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[11px]">{label}</span>
    </NavLink>
  );
}
