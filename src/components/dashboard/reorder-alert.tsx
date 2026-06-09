import { TrendingDown, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReorderAlert() {
  const alerts = [
    { item: "Chicken Breast", message: "Run out by Friday dinner rush", days: 3 },
    { item: "Fresh Basil", message: "Critical — reorder today", days: 1 },
    { item: "Olive Oil EVOO", message: "Below par level", days: 5 },
  ];

  return (
    <Card className="border-amber-100 bg-gradient-to-br from-white to-amber-100/40">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-amber-600" />
          <h3 className="font-display text-lg font-semibold text-charcoal">
            Smart Reorder Alerts
          </h3>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.item}
              className="flex items-center justify-between rounded-xl bg-white/80 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-charcoal">{alert.item}</p>
                <p className="text-xs text-stone-500">{alert.message}</p>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                {alert.days}d
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sage-600 py-2.5 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          <Truck className="h-4 w-4" />
          Generate Draft PO
        </button>
      </CardContent>
    </Card>
  );
}
