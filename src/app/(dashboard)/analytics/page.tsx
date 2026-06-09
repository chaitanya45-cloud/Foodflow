import { Header } from "@/components/layout/header";
import {
  CategorySpendChart,
  WasteTrendChart,
  CostDriversChart,
  MarginRadar,
} from "@/components/analytics/charts";
import { getAnalytics } from "@/lib/data";

export default async function AnalyticsPage() {
  const { categorySpend, wasteTrend, topCostDrivers, menuMargins } =
    await getAnalytics();

  const categoryData = Object.entries(categorySpend).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <>
      <Header
        title="Analytics"
        subtitle="Waste trends, spend breakdown, and margin insights"
      />

      <div className="grid gap-6 p-8 lg:grid-cols-2">
        <CategorySpendChart data={categoryData} />
        <WasteTrendChart data={wasteTrend} />
        <CostDriversChart data={topCostDrivers} />
        <MarginRadar data={menuMargins} />
      </div>
    </>
  );
}
