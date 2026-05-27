"use client";

import Link from "next/link";
import { House, Utensils, Dumbbell, ChartColumn } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Inicio",
      icon: House,
    },
    {
      href: "/comidas",
      label: "Comidas",
      icon: Utensils,
    },
    {
      href: "/actividad",
      label: "Actividad",
      icon: Dumbbell,
    },
    {
      href: "/progreso",
      label: "Progreso",
      icon: ChartColumn,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs ${
                isActive
                  ? "text-pink-500"
                  : "text-gray-500"
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}