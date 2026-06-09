import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "sage",
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  accent?: "sage" | "amber" | "coral" | "mint";
}) {
  const accents = {
    sage: "bg-sage-100 text-sage-600",
    amber: "bg-amber-100 text-amber-600",
    coral: "bg-coral-100 text-coral-500",
    mint: "bg-sage-50 text-mint-500",
  };

  return (
    <Card className="animate-fade-up p-5 transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>
          <p className="mt-2 font-display text-3xl font-bold text-charcoal">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-stone-400">{subtitle}</p>
          )}
        </div>
        <div className={cn("rounded-xl p-2.5", accents[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
