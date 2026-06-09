import { Package, AlertTriangle, Sparkles, ShoppingCart, ChefHat, ClipboardList } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatRelative } from "@/lib/utils";

const typeIcons: Record<string, typeof Package> = {
  receive: Package,
  alert: AlertTriangle,
  rescue: Sparkles,
  order: ShoppingCart,
  recipe: ChefHat,
  count: ClipboardList,
};

export function ActivityFeed({
  activities,
}: {
  activities: { id: string; message: string; type: string; createdAt: Date }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = typeIcons[activity.type] ?? Package;
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream-dark">
                  <Icon className="h-4 w-4 text-sage-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-charcoal">{activity.message}</p>
                  <p className="text-xs text-stone-400">{formatRelative(activity.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
