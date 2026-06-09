import {
  DollarSign,
  AlertTriangle,
  Clock,
  Leaf,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RescuePanel } from "@/components/dashboard/rescue-panel";
import { ForecastChart } from "@/components/dashboard/forecast-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ReorderAlert } from "@/components/dashboard/reorder-alert";
import {
  getRestaurant,
  getDashboardStats,
  getExpiringItems,
  getReorderForecast,
  getRecentActivity,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const [restaurant, stats, expiring, forecast, activity] = await Promise.all([
    getRestaurant(),
    getDashboardStats(),
    getExpiringItems(),
    getReorderForecast(),
    getRecentActivity(),
  ]);

  return (
    <>
      <Header
        title="Dashboard"
        subtitle={restaurant?.name ?? "Bella Verde Kitchen"}
      />

      <div className="space-y-6 p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Inventory Value"
            value={formatCurrency(stats.totalValue)}
            subtitle="Across all categories"
            icon={DollarSign}
            accent="sage"
          />
          <KpiCard
            title="Low Stock Items"
            value={String(stats.lowStockCount)}
            subtitle="Below par level"
            icon={AlertTriangle}
            accent="amber"
          />
          <KpiCard
            title="Expiring Soon"
            value={String(stats.expiringCount)}
            subtitle="Within 72 hours"
            icon={Clock}
            accent="coral"
          />
          <KpiCard
            title="Waste Prevented"
            value={`${stats.wasteSavedKg} kg`}
            subtitle={`${formatCurrency(stats.wasteSavedUsd)} saved this week`}
            icon={Leaf}
            accent="mint"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RescuePanel items={expiring} />
          </div>
          <ReorderAlert />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ForecastChart data={forecast} />
          </div>
          <ActivityFeed activities={activity} />
        </div>
      </div>
    </>
  );
}
