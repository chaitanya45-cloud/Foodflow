import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate, stockPercent } from "@/lib/utils";

type Ingredient = {
  id: string;
  name: string;
  sku: string | null;
  unit: string;
  currentStock: number;
  parLevel: number;
  costPerUnit: number;
  storageLocation: string | null;
  expiryDate: Date | null;
  status: string;
  category: { name: string };
  supplier: { name: string } | null;
};

export function IngredientTable({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-cream-dark/50 text-left text-xs font-medium uppercase tracking-wide text-stone-500">
                <th className="px-5 py-3">Ingredient</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Par Level</th>
                <th className="px-5 py-3">Value</th>
                <th className="px-5 py-3">Expiry</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ing) => {
                const pct = stockPercent(ing.currentStock, ing.parLevel);
                const barColor =
                  pct < 40 ? "bg-coral-500" : pct < 70 ? "bg-amber-500" : "bg-mint-500";
                return (
                  <tr
                    key={ing.id}
                    className="border-b border-stone-50 transition hover:bg-cream-dark/30"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-charcoal">{ing.name}</p>
                      <p className="text-xs text-stone-400">
                        {ing.sku} · {ing.supplier?.name}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-stone-600">{ing.category.name}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {ing.currentStock} {ing.unit}
                        </span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-stone-600">
                      {ing.parLevel} {ing.unit}
                    </td>
                    <td className="px-5 py-3.5 font-medium">
                      {formatCurrency(ing.currentStock * ing.costPerUnit)}
                    </td>
                    <td className="px-5 py-3.5 text-stone-600">
                      {formatDate(ing.expiryDate)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={ing.status}>{ing.status.toLowerCase()}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
