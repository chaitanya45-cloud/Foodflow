"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function ForecastChart({
  data,
}: {
  data: { day: string; projected: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Reorder Forecast</CardTitle>
        <p className="text-sm text-stone-500">7-day inventory spend projection</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2d6a4f" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#78716c" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#78716c" }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Projected"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e7e5e4",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="projected"
                stroke="#2d6a4f"
                strokeWidth={2}
                fill="url(#forecastGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
