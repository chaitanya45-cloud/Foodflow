"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ChefHat,
  ShoppingCart,
  BarChart3,
  Settings,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/recipes", label: "Recipes", icon: ChefHat },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-stone-200/80 bg-white">
      <div className="flex items-center gap-3 border-b border-stone-200/80 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-600 text-white shadow-md">
          <Leaf className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-lg font-bold tracking-tight text-charcoal">
            FoodFlow
          </p>
          <p className="text-xs text-stone-500">Smart Inventory</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-sage-600 text-white shadow-sm"
                  : "text-stone-600 hover:bg-cream-dark hover:text-charcoal"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stone-200/80 p-4">
        <div className="rounded-xl bg-sage-50 p-3">
          <p className="text-xs font-medium text-sage-700">Sustainability Score</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-2xl font-bold text-sage-600">87</span>
            <span className="mb-1 text-xs text-sage-600">/ 100</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-100">
            <div className="h-full w-[87%] rounded-full bg-mint-500" />
          </div>
        </div>
      </div>
    </aside>
  );
}
