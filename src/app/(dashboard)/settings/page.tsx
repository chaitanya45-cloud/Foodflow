import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { getRestaurant } from "@/lib/data";

export default async function SettingsPage() {
  const restaurant = await getRestaurant();

  return (
    <>
      <Header title="Settings" subtitle="Restaurant profile and preferences" />

      <div className="mx-auto max-w-3xl space-y-6 p-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              Restaurant Profile
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-stone-500">Name</label>
                <input
                  defaultValue={restaurant?.name}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-charcoal outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-500">Tagline</label>
                <input
                  defaultValue={restaurant?.tagline ?? ""}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-charcoal outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              Alert Thresholds
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Low stock warning (%)", value: "70" },
                { label: "Expiry alert (days)", value: "3" },
                { label: "Margin alert (%)", value: "60" },
                { label: "Reorder lead buffer (days)", value: "2" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-sm font-medium text-stone-500">
                    {field.label}
                  </label>
                  <input
                    defaultValue={field.value}
                    type="number"
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-charcoal outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              Team Members
            </h2>
            <div className="mt-4 space-y-3">
              {[
                { name: "Marco Rossi", email: "marco@bellaverde.com", role: "Admin" },
                { name: "Sofia Chen", email: "sofia@bellaverde.com", role: "Chef" },
                { name: "Alex Rivera", email: "alex@bellaverde.com", role: "Staff" },
              ].map((user) => (
                <div
                  key={user.email}
                  className="flex items-center justify-between rounded-xl bg-cream-dark/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage-100 text-sm font-semibold text-sage-700">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">{user.name}</p>
                      <p className="text-xs text-stone-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600 ring-1 ring-stone-100">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
