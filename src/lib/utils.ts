import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date | string | null) {
  if (!date) return "—";
  return format(new Date(date), "MMM d, yyyy");
}

export function formatRelative(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function stockPercent(current: number, par: number) {
  return Math.min(100, Math.round((current / par) * 100));
}

export function marginColor(margin: number) {
  if (margin >= 75) return "text-sage-600";
  if (margin >= 60) return "text-amber-600";
  return "text-coral-500";
}

export function statusBadge(status: string) {
  const map: Record<string, string> = {
    HEALTHY: "bg-sage-100 text-sage-700",
    LOW: "bg-amber-100 text-amber-700",
    CRITICAL: "bg-coral-100 text-coral-700",
    EXPIRING: "bg-coral-100 text-coral-700",
    DRAFT: "bg-stone-100 text-stone-600",
    SENT: "bg-blue-100 text-blue-700",
    RECEIVED: "bg-sage-100 text-sage-700",
  };
  return map[status] ?? "bg-stone-100 text-stone-600";
}
