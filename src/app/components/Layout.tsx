import { Outlet, Link, useLocation } from "react-router";
import { Home, Image, BookHeart, User } from "lucide-react";
import { SoulPulse } from "./SoulPulse";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/album", icon: Image, label: "Album" },
    { path: "/notes", icon: BookHeart, label: "Notes" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#f2f2f7] dark:bg-[#000000] transition-colors">
      <SoulPulse />
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>

      <nav className="sticky bottom-0 z-50" style={{ backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }}>
        <div className="bg-white/72 dark:bg-[#1c1c1e]/82 border-t border-[#3c3c43]/12 dark:border-[#545458]/24">
          <div className="max-w-lg mx-auto px-6 pt-2 flex items-center justify-around" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="flex flex-col items-center gap-0.5 min-w-[48px] relative">
                  <Icon
                    className={`w-[22px] h-[22px] transition-colors duration-200 ${isActive ? "text-rose-500" : "text-[#999] dark:text-[#636366]"}`}
                    strokeWidth={isActive ? 2.2 : 1.6}
                  />
                  <span
                    className={`text-[10px] transition-colors duration-200 ${isActive ? "text-rose-500" : "text-[#999] dark:text-[#636366]"}`}
                    style={{ fontWeight: isActive ? 600 : 400, letterSpacing: '-0.01em' }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
