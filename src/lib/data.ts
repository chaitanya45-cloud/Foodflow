import { addDays } from "date-fns";
import { mockData } from "./mock-data";

/**
 * Use embedded demo data everywhere except explicit local dev with USE_DATABASE=true.
 * SQLite cannot run on Vercel/serverless (no persistent filesystem, no migrations).
 */
export function shouldUseMockData(): boolean {
  if (process.env.USE_MOCK_DATA === "true") return true;
  if (process.env.USE_DATABASE === "true" && process.env.NODE_ENV === "development") {
    return false;
  }
  return true;
}

async function getPrisma() {
  const { prisma } = await import("./prisma");
  return prisma;
}

async function withDb<T>(fn: (prisma: Awaited<ReturnType<typeof getPrisma>>) => Promise<T>, fallback: () => T): Promise<T> {
  if (shouldUseMockData()) return fallback() as T;
  try {
    return await fn(await getPrisma());
  } catch {
    return fallback() as T;
  }
}

export async function getRestaurant() {
  return withDb((prisma) => prisma.restaurant.findFirst(), mockData.getRestaurant);
}

export async function getDashboardStats() {
  if (shouldUseMockData()) return mockData.getDashboardStats();

  return withDb(async (prisma) => {
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

    return {
      totalValue,
      lowStockCount: lowStock.length,
      expiringCount: expiring.length,
      wasteSavedKg: 12.4,
      wasteSavedUsd: 186.5,
      sustainabilityScore: 87,
    };
  }, mockData.getDashboardStats);
}

export async function getExpiringItems() {
  if (shouldUseMockData()) return mockData.getExpiringItems();

  return withDb(async (prisma) => {
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
  }, mockData.getExpiringItems);
}

export async function getReorderForecast() {
  return mockData.getReorderForecast();
}

export async function getRecentActivity() {
  return withDb(
    (prisma) => prisma.activityLog.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    mockData.getRecentActivity
  );
}

export async function getIngredients() {
  return withDb(
    (prisma) =>
      prisma.ingredient.findMany({
        include: { category: true, supplier: true },
        orderBy: { name: "asc" },
      }),
    mockData.getIngredients
  );
}

export async function getRecipes() {
  return withDb(
    (prisma) =>
      prisma.recipe.findMany({
        include: {
          ingredients: { include: { ingredient: true } },
          menuItem: true,
        },
        orderBy: { name: "asc" },
      }),
    mockData.getRecipes
  );
}

export async function getSuppliers() {
  return withDb(
    (prisma) =>
      prisma.supplier.findMany({
        include: {
          _count: { select: { ingredients: true, purchaseOrders: true } },
        },
      }),
    mockData.getSuppliers
  );
}

export async function getPurchaseOrders() {
  return withDb(
    (prisma) =>
      prisma.purchaseOrder.findMany({
        include: {
          supplier: true,
          items: { include: { ingredient: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
    mockData.getPurchaseOrders
  );
}

export async function getAnalytics() {
  if (shouldUseMockData()) return mockData.getAnalytics();

  return withDb(async (prisma) => {
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
  }, mockData.getAnalytics);
}
