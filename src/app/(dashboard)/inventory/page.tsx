import { Plus, Upload } from "lucide-react";
import { Header } from "@/components/layout/header";
import { IngredientTable } from "@/components/inventory/ingredient-table";
import { getIngredients } from "@/lib/data";

export default async function InventoryPage() {
  const ingredients = await getIngredients();

  return (
    <>
      <Header
        title="Inventory"
        subtitle={`${ingredients.length} ingredients tracked`}
      />

      <div className="space-y-6 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {["All", "Proteins", "Dairy", "Produce", "Low Stock", "Expiring"].map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition ${
                    filter === "All"
                      ? "bg-sage-600 text-white"
                      : "bg-white text-stone-600 hover:bg-cream-dark"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-sage-200"
            >
              <Upload className="h-4 w-4" />
              Import CSV
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-sage-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-700"
            >
              <Plus className="h-4 w-4" />
              Add Ingredient
            </button>
          </div>
        </div>

        <IngredientTable ingredients={ingredients} />
      </div>
    </>
  );
}
