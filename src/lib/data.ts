import { prisma } from "./prisma";
import { addDays } from "date-fns";

export async function getRestaurant() {
  return prisma.restaurant.findFirst();
}

export async function getDashboardStats() {
  const ingredients = await prisma.ingredient.findMany({
    include: { category: true, supplier: true },
  });

  const totalValue = ingredients.reduce(
    (sum, i) => sum + i.currentStock * i.costPerUnit,
    0
  );

  const lowStock = ingredients.filter((i) => i.currentStock < i.parLevel);
  const expiring = ingredients.filter((i) => {
    if (!i.expiryDate) return false;
    const days = (i.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days <= 3 && days >= 0;
  });

  const wasteSavedKg = 12.4;
  const wasteSavedUsd = 186.5;

  return {
    totalValue,
    lowStockCount: lowStock.length,
    expiringCount: expiring.length,
    wasteSavedKg,
    wasteSavedUsd,
    sustainabilityScore: 87,
  };
}

export async function getExpiringItems() {
  const now = new Date();
  const threeDays = addDays(now, 3);

  const items = await prisma.ingredient.findMany({
    where: {
      expiryDate: { lte: threeDays, gte: now },
    },
    include: { category: true },
    orderBy: { expiryDate: "asc" },
    take: 5,
  });

  const rescueSuggestions: Record<string, string> = {
    "Salmon Fillet": "Grilled Salmon Special — pair with arugula",
    "Fresh Basil": "Basil Pesto Flatbread special tonight",
    "Heavy Cream": "Truffle Cream Risotto — limited batch",
    Arugula: "Salmon & Arugula Bowl combo",
    Mushrooms: "Wild Mushroom Bruschetta appetizer",
  };

  return items.map((item) => ({
    ...item,
    suggestion: rescueSuggestions[item.name] ?? `Chef's special featuring ${item.name}`,
  }));
}

export async function getReorderForecast() {
  return [
    { day: "Mon", projected: 4200 },
    { day: "Tue", projected: 3800 },
    { day: "Wed", projected: 4100 },
    { day: "Thu", projected: 5200 },
    { day: "Fri", projected: 6800 },
    { day: "Sat", projected: 7200 },
    { day: "Sun", projected: 5400 },
  ];
}

export async function getRecentActivity() {
  return prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function getIngredients() {
  return prisma.ingredient.findMany({
    include: { category: true, supplier: true },
    orderBy: { name: "asc" },
  });
}

export async function getRecipes() {
  return prisma.recipe.findMany({
    include: {
      ingredients: { include: { ingredient: true } },
      menuItem: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getSuppliers() {
  return prisma.supplier.findMany({
    include: {
      _count: { select: { ingredients: true, purchaseOrders: true } },
    },
  });
}

export async function getPurchaseOrders() {
  return prisma.purchaseOrder.findMany({
    include: {
      supplier: true,
      items: { include: { ingredient: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAnalytics() {
  const ingredients = await prisma.ingredient.findMany({
    include: { category: true },
  });

  const categorySpend = ingredients.reduce<Record<string, number>>((acc, ing) => {
    const key = ing.category.name;
    acc[key] = (acc[key] ?? 0) + ing.currentStock * ing.costPerUnit;
    return acc;
  }, {});

  const wasteTrend = [
    { week: "W1", waste: 8.2 },
    { week: "W2", waste: 7.1 },
    { week: "W3", waste: 6.4 },
    { week: "W4", waste: 5.8 },
    { week: "W5", waste: 4.9 },
    { week: "W6", waste: 4.2 },
  ];

  const topCostDrivers = [...ingredients]
    .sort((a, b) => b.currentStock * b.costPerUnit - a.currentStock * a.costPerUnit)
    .slice(0, 5)
    .map((i) => ({
      name: i.name,
      value: i.currentStock * i.costPerUnit,
    }));

  const recipes = await prisma.recipe.findMany({ include: { menuItem: true } });
  const menuMargins = recipes
    .filter((r) => r.menuItem)
    .map((r) => ({
      name: r.menuItem!.name,
      margin: r.marginPercent,
      category: r.menuItem!.category,
    }));

  return { categorySpend, wasteTrend, topCostDrivers, menuMargins };
}
