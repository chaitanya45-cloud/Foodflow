"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#2d6a4f", "#40916c", "#52b788", "#f4a261", "#e76f51", "#1b4332"];

export function CategorySpendChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="text-stone-600">{d.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WasteTrendChart({
  data,
}: {
  data: { week: string; waste: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Reduction Trend</CardTitle>
        <p className="text-sm text-stone-500">Weekly waste % — trending down</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#78716c" }} />
              <YAxis tick={{ fontSize: 12, fill: "#78716c" }} unit="%" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="waste"
                stroke="#52b788"
                strokeWidth={2}
                dot={{ fill: "#52b788" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function CostDriversChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Cost Drivers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis type="number" tickFormatter={(v) => `$${v}`} />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fontSize: 11, fill: "#78716c" }}
              />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="value" fill="#2d6a4f" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function MarginRadar({
  data,
}: {
  data: { name: string; margin: number; category: string }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Food Cost % by Menu Item</CardTitle>
        <p className="text-sm text-stone-500">Margin radar — higher is healthier</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-charcoal">{item.name}</span>
                <span
                  className={
                    item.margin >= 75
                      ? "text-sage-600"
                      : item.margin >= 60
                        ? "text-amber-600"
                        : "text-coral-500"
                  }
                >
                  {item.margin}% margin
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-full rounded-full ${
                    item.margin >= 75
                      ? "bg-mint-500"
                      : item.margin >= 60
                        ? "bg-amber-500"
                        : "bg-coral-500"
                  }`}
                  style={{ width: `${item.margin}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
