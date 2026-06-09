import { Sparkles, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type RescueItem = {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  expiryDate: Date | null;
  status: string;
  suggestion: string;
};

export function RescuePanel({ items }: { items: RescueItem[] }) {
  return (
    <Card className="overflow-hidden border-coral-100 bg-gradient-to-br from-white to-coral-100/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-coral-500 p-1.5 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <CardTitle>Expiry Rescue Engine</CardTitle>
            <p className="text-sm text-stone-500">Use before spoilage — save margins</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border border-stone-100 bg-white p-4 transition hover:border-coral-200 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-charcoal">{item.name}</p>
                  <Badge status={item.status}>{item.status.toLowerCase()}</Badge>
                </div>
                <p className="mt-1 text-sm text-stone-500">
                  {item.currentStock} {item.unit} · Expires {formatDate(item.expiryDate)}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-sage-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{item.suggestion}</span>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg bg-sage-600 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100"
              >
                Create Special
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-stone-100">
              <div className="freshness-bar h-full w-3/4 rounded-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
