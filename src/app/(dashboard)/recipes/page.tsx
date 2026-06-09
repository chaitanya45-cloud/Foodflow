import { Clock, Users } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRecipes } from "@/lib/data";
import { formatCurrency, marginColor } from "@/lib/utils";

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <>
      <Header
        title="Recipes & Menu"
        subtitle="Recipe-to-stock cascade — costs update live"
      />

      <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden transition hover:shadow-md"
          >
            <div className="h-2 bg-gradient-to-r from-sage-600 to-mint-500" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-charcoal">
                    {recipe.name}
                  </h3>
                  {recipe.menuItem && (
                    <p className="text-sm text-stone-500">
                      Menu: {recipe.menuItem.name} ·{" "}
                      {formatCurrency(recipe.menuItem.price)}
                    </p>
                  )}
                </div>
                <Badge>{recipe.menuItem?.category ?? "Recipe"}</Badge>
              </div>

              {recipe.description && (
                <p className="mt-2 text-sm text-stone-500">{recipe.description}</p>
              )}

              <div className="mt-4 flex gap-4 text-sm text-stone-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {recipe.yield} portions
                </span>
                {recipe.prepTimeMin && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {recipe.prepTimeMin} min
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-cream-dark/50 p-3">
                <div>
                  <p className="text-xs text-stone-400">Cost / portion</p>
                  <p className="font-display text-lg font-bold text-charcoal">
                    {formatCurrency(recipe.costPerPortion)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Margin</p>
                  <p
                    className={`font-display text-lg font-bold ${marginColor(recipe.marginPercent)}`}
                  >
                    {recipe.marginPercent}%
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-400">
                  Ingredients ({recipe.ingredients.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {recipe.ingredients.slice(0, 5).map((ri) => (
                    <span
                      key={ri.id}
                      className="rounded-lg bg-white px-2 py-1 text-xs text-stone-600 ring-1 ring-stone-100"
                    >
                      {ri.ingredient.name}
                    </span>
                  ))}
                  {recipe.ingredients.length > 5 && (
                    <span className="rounded-lg bg-sage-50 px-2 py-1 text-xs text-sage-600">
                      +{recipe.ingredients.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
