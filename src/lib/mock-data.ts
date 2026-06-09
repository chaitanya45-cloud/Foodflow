import { addDays, subHours } from "date-fns";

function daysFromNow(days: number) {
  return addDays(new Date(), days);
}

const restaurant = {
  id: "rest-1",
  name: "Bella Verde Kitchen",
  tagline: "Farm-to-table Italian inspired dining",
  createdAt: new Date(),
};

const categories = [
  { id: "cat-1", name: "Proteins", icon: "beef" },
  { id: "cat-2", name: "Dairy", icon: "milk" },
  { id: "cat-3", name: "Produce", icon: "carrot" },
  { id: "cat-4", name: "Dry Goods", icon: "wheat" },
  { id: "cat-5", name: "Beverages", icon: "wine" },
  { id: "cat-6", name: "Spices", icon: "leaf" },
];

const suppliers = [
  { id: "sup-1", name: "Fresh Farms Co.", contactEmail: "orders@freshfarms.com", leadTimeDays: 1 },
  { id: "sup-2", name: "Metro Provisions", contactEmail: "sales@metroprov.com", leadTimeDays: 2 },
  { id: "sup-3", name: "Artisan Dairy Direct", contactEmail: "hello@artisandairy.com", leadTimeDays: 1 },
];

const ingredients = [
  { id: "ing-1", name: "Chicken Breast", sku: "PROT-001", categoryId: "cat-1", supplierId: "sup-1", unit: "kg", currentStock: 8.5, parLevel: 15, costPerUnit: 12.5, storageLocation: "Walk-in A", expiryDate: daysFromNow(4), status: "LOW" as const },
  { id: "ing-2", name: "Salmon Fillet", sku: "PROT-002", categoryId: "cat-1", supplierId: "sup-1", unit: "kg", currentStock: 3.2, parLevel: 8, costPerUnit: 28.0, storageLocation: "Walk-in A", expiryDate: daysFromNow(2), status: "EXPIRING" as const },
  { id: "ing-3", name: "Ground Beef", sku: "PROT-003", categoryId: "cat-1", supplierId: "sup-2", unit: "kg", currentStock: 12.0, parLevel: 10, costPerUnit: 14.0, storageLocation: "Walk-in A", expiryDate: daysFromNow(5), status: "HEALTHY" as const },
  { id: "ing-4", name: "Parmigiano Reggiano", sku: "DAIR-001", categoryId: "cat-2", supplierId: "sup-3", unit: "kg", currentStock: 2.1, parLevel: 3, costPerUnit: 32.0, storageLocation: "Cold Prep", expiryDate: daysFromNow(14), status: "LOW" as const },
  { id: "ing-5", name: "Heavy Cream", sku: "DAIR-002", categoryId: "cat-2", supplierId: "sup-3", unit: "L", currentStock: 4.5, parLevel: 6, costPerUnit: 6.5, storageLocation: "Walk-in B", expiryDate: daysFromNow(3), status: "EXPIRING" as const },
  { id: "ing-6", name: "Fresh Mozzarella", sku: "DAIR-003", categoryId: "cat-2", supplierId: "sup-3", unit: "kg", currentStock: 5.0, parLevel: 4, costPerUnit: 18.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(6), status: "HEALTHY" as const },
  { id: "ing-7", name: "San Marzano Tomatoes", sku: "PROD-001", categoryId: "cat-3", supplierId: "sup-1", unit: "kg", currentStock: 18.0, parLevel: 12, costPerUnit: 4.5, storageLocation: "Dry Store", expiryDate: daysFromNow(30), status: "HEALTHY" as const },
  { id: "ing-8", name: "Fresh Basil", sku: "PROD-002", categoryId: "cat-3", supplierId: "sup-1", unit: "bunch", currentStock: 6, parLevel: 10, costPerUnit: 2.5, storageLocation: "Herb Fridge", expiryDate: daysFromNow(1), status: "CRITICAL" as const },
  { id: "ing-9", name: "Arugula", sku: "PROD-003", categoryId: "cat-3", supplierId: "sup-1", unit: "kg", currentStock: 2.8, parLevel: 4, costPerUnit: 8.0, storageLocation: "Herb Fridge", expiryDate: daysFromNow(2), status: "EXPIRING" as const },
  { id: "ing-10", name: "Romaine Lettuce", sku: "PROD-004", categoryId: "cat-3", supplierId: "sup-1", unit: "head", currentStock: 14, parLevel: 12, costPerUnit: 1.8, storageLocation: "Walk-in B", expiryDate: daysFromNow(5), status: "HEALTHY" as const },
  { id: "ing-11", name: "Arborio Rice", sku: "DRY-001", categoryId: "cat-4", supplierId: "sup-2", unit: "kg", currentStock: 22.0, parLevel: 15, costPerUnit: 3.2, storageLocation: "Dry Store", expiryDate: daysFromNow(180), status: "HEALTHY" as const },
  { id: "ing-12", name: "Olive Oil EVOO", sku: "DRY-002", categoryId: "cat-4", supplierId: "sup-2", unit: "L", currentStock: 6.0, parLevel: 8, costPerUnit: 15.0, storageLocation: "Dry Store", expiryDate: daysFromNow(365), status: "LOW" as const },
  { id: "ing-13", name: "00 Flour", sku: "DRY-003", categoryId: "cat-4", supplierId: "sup-2", unit: "kg", currentStock: 25.0, parLevel: 20, costPerUnit: 2.1, storageLocation: "Dry Store", expiryDate: daysFromNow(90), status: "HEALTHY" as const },
  { id: "ing-14", name: "Pasta Penne", sku: "DRY-004", categoryId: "cat-4", supplierId: "sup-2", unit: "kg", currentStock: 10.0, parLevel: 12, costPerUnit: 2.8, storageLocation: "Dry Store", expiryDate: daysFromNow(200), status: "LOW" as const },
  { id: "ing-15", name: "White Wine", sku: "BEV-001", categoryId: "cat-5", supplierId: "sup-2", unit: "bottle", currentStock: 8, parLevel: 6, costPerUnit: 12.0, storageLocation: "Bar", expiryDate: daysFromNow(730), status: "HEALTHY" as const },
  { id: "ing-16", name: "Espresso Beans", sku: "BEV-002", categoryId: "cat-5", supplierId: "sup-2", unit: "kg", currentStock: 3.5, parLevel: 5, costPerUnit: 22.0, storageLocation: "Bar", expiryDate: daysFromNow(60), status: "LOW" as const },
  { id: "ing-17", name: "Black Truffle Oil", sku: "SPC-001", categoryId: "cat-6", supplierId: "sup-2", unit: "ml", currentStock: 250, parLevel: 200, costPerUnit: 0.15, storageLocation: "Spice Rack", expiryDate: daysFromNow(120), status: "HEALTHY" as const },
  { id: "ing-18", name: "Sea Salt", sku: "SPC-002", categoryId: "cat-6", supplierId: "sup-2", unit: "kg", currentStock: 4.0, parLevel: 2, costPerUnit: 3.0, storageLocation: "Spice Rack", expiryDate: daysFromNow(500), status: "HEALTHY" as const },
  { id: "ing-19", name: "Black Pepper", sku: "SPC-003", categoryId: "cat-6", supplierId: "sup-2", unit: "kg", currentStock: 1.2, parLevel: 1, costPerUnit: 18.0, storageLocation: "Spice Rack", expiryDate: daysFromNow(300), status: "HEALTHY" as const },
  { id: "ing-20", name: "Garlic", sku: "PROD-005", categoryId: "cat-3", supplierId: "sup-1", unit: "kg", currentStock: 3.0, parLevel: 2, costPerUnit: 5.5, storageLocation: "Dry Store", expiryDate: daysFromNow(14), status: "HEALTHY" as const },
  { id: "ing-21", name: "Lemons", sku: "PROD-006", categoryId: "cat-3", supplierId: "sup-1", unit: "kg", currentStock: 4.5, parLevel: 3, costPerUnit: 4.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(7), status: "HEALTHY" as const },
  { id: "ing-22", name: "Eggs", sku: "DAIR-004", categoryId: "cat-2", supplierId: "sup-3", unit: "dozen", currentStock: 8, parLevel: 6, costPerUnit: 5.5, storageLocation: "Walk-in B", expiryDate: daysFromNow(10), status: "HEALTHY" as const },
  { id: "ing-23", name: "Mascarpone", sku: "DAIR-005", categoryId: "cat-2", supplierId: "sup-3", unit: "kg", currentStock: 2.5, parLevel: 3, costPerUnit: 14.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(4), status: "LOW" as const },
  { id: "ing-24", name: "Ladyfinger Biscuits", sku: "DRY-005", categoryId: "cat-4", supplierId: "sup-2", unit: "pack", currentStock: 5, parLevel: 4, costPerUnit: 4.5, storageLocation: "Dry Store", expiryDate: daysFromNow(45), status: "HEALTHY" as const },
  { id: "ing-25", name: "Cocoa Powder", sku: "DRY-006", categoryId: "cat-4", supplierId: "sup-2", unit: "kg", currentStock: 1.5, parLevel: 1, costPerUnit: 12.0, storageLocation: "Dry Store", expiryDate: daysFromNow(200), status: "HEALTHY" as const },
  { id: "ing-26", name: "Anchovies", sku: "PROT-004", categoryId: "cat-1", supplierId: "sup-2", unit: "tin", currentStock: 6, parLevel: 4, costPerUnit: 3.5, storageLocation: "Dry Store", expiryDate: daysFromNow(90), status: "HEALTHY" as const },
  { id: "ing-27", name: "Croutons", sku: "DRY-007", categoryId: "cat-4", supplierId: "sup-2", unit: "kg", currentStock: 2.0, parLevel: 2, costPerUnit: 8.0, storageLocation: "Dry Store", expiryDate: daysFromNow(30), status: "LOW" as const },
  { id: "ing-28", name: "Butter", sku: "DAIR-006", categoryId: "cat-2", supplierId: "sup-3", unit: "kg", currentStock: 5.5, parLevel: 4, costPerUnit: 9.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(8), status: "HEALTHY" as const },
  { id: "ing-29", name: "Shallots", sku: "PROD-007", categoryId: "cat-3", supplierId: "sup-1", unit: "kg", currentStock: 1.8, parLevel: 2, costPerUnit: 7.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(5), status: "LOW" as const },
  { id: "ing-30", name: "Mushrooms", sku: "PROD-008", categoryId: "cat-3", supplierId: "sup-1", unit: "kg", currentStock: 4.0, parLevel: 5, costPerUnit: 9.5, storageLocation: "Walk-in B", expiryDate: daysFromNow(2), status: "EXPIRING" as const },
];

const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));
const supMap = Object.fromEntries(suppliers.map((s) => [s.id, s]));
const ingMap = Object.fromEntries(ingredients.map((i) => [i.id, i]));

function withRelations(ing: (typeof ingredients)[0]) {
  return {
    ...ing,
    category: catMap[ing.categoryId],
    supplier: ing.supplierId ? supMap[ing.supplierId] : null,
  };
}

const recipes = [
  {
    id: "rec-1", name: "Truffle Risotto", description: "Creamy arborio rice with truffle oil and parmigiano",
    yield: 4, prepTimeMin: 35, costPerPortion: 8.2, marginPercent: 72,
    menuItem: { id: "menu-1", name: "Truffle Risotto", price: 29.0, category: "Mains", recipeId: "rec-1", isActive: true },
    ingredients: [
      { id: "ri-1", recipeId: "rec-1", ingredientId: "ing-11", quantity: 0.08, ingredient: ingMap["ing-11"] },
      { id: "ri-2", recipeId: "rec-1", ingredientId: "ing-4", quantity: 0.03, ingredient: ingMap["ing-4"] },
      { id: "ri-3", recipeId: "rec-1", ingredientId: "ing-17", quantity: 5, ingredient: ingMap["ing-17"] },
      { id: "ri-4", recipeId: "rec-1", ingredientId: "ing-29", quantity: 0.02, ingredient: ingMap["ing-29"] },
      { id: "ri-5", recipeId: "rec-1", ingredientId: "ing-28", quantity: 0.02, ingredient: ingMap["ing-28"] },
      { id: "ri-6", recipeId: "rec-1", ingredientId: "ing-15", quantity: 0.25, ingredient: ingMap["ing-15"] },
    ],
  },
  {
    id: "rec-2", name: "Margherita Flatbread", description: "Wood-fired flatbread with mozzarella and basil",
    yield: 2, prepTimeMin: 20, costPerPortion: 4.1, marginPercent: 78,
    menuItem: { id: "menu-2", name: "Margherita Flatbread", price: 18.5, category: "Starters", recipeId: "rec-2", isActive: true },
    ingredients: [
      { id: "ri-7", recipeId: "rec-2", ingredientId: "ing-13", quantity: 0.15, ingredient: ingMap["ing-13"] },
      { id: "ri-8", recipeId: "rec-2", ingredientId: "ing-6", quantity: 0.12, ingredient: ingMap["ing-6"] },
      { id: "ri-9", recipeId: "rec-2", ingredientId: "ing-7", quantity: 0.1, ingredient: ingMap["ing-7"] },
      { id: "ri-10", recipeId: "rec-2", ingredientId: "ing-8", quantity: 0.5, ingredient: ingMap["ing-8"] },
      { id: "ri-11", recipeId: "rec-2", ingredientId: "ing-12", quantity: 0.02, ingredient: ingMap["ing-12"] },
    ],
  },
  {
    id: "rec-3", name: "Grilled Salmon", description: "Atlantic salmon with lemon butter",
    yield: 1, prepTimeMin: 25, costPerPortion: 11.5, marginPercent: 65,
    menuItem: { id: "menu-3", name: "Grilled Salmon", price: 32.0, category: "Mains", recipeId: "rec-3", isActive: true },
    ingredients: [
      { id: "ri-12", recipeId: "rec-3", ingredientId: "ing-2", quantity: 0.22, ingredient: ingMap["ing-2"] },
      { id: "ri-13", recipeId: "rec-3", ingredientId: "ing-28", quantity: 0.03, ingredient: ingMap["ing-28"] },
      { id: "ri-14", recipeId: "rec-3", ingredientId: "ing-21", quantity: 0.05, ingredient: ingMap["ing-21"] },
      { id: "ri-15", recipeId: "rec-3", ingredientId: "ing-18", quantity: 0.002, ingredient: ingMap["ing-18"] },
      { id: "ri-16", recipeId: "rec-3", ingredientId: "ing-19", quantity: 0.001, ingredient: ingMap["ing-19"] },
    ],
  },
  {
    id: "rec-4", name: "Caesar Salad", description: "Classic romaine with anchovy dressing",
    yield: 2, prepTimeMin: 15, costPerPortion: 3.8, marginPercent: 81,
    menuItem: { id: "menu-4", name: "Caesar Salad", price: 19.0, category: "Starters", recipeId: "rec-4", isActive: true },
    ingredients: [
      { id: "ri-17", recipeId: "rec-4", ingredientId: "ing-10", quantity: 1, ingredient: ingMap["ing-10"] },
      { id: "ri-18", recipeId: "rec-4", ingredientId: "ing-4", quantity: 0.02, ingredient: ingMap["ing-4"] },
      { id: "ri-19", recipeId: "rec-4", ingredientId: "ing-27", quantity: 0.05, ingredient: ingMap["ing-27"] },
      { id: "ri-20", recipeId: "rec-4", ingredientId: "ing-26", quantity: 0.5, ingredient: ingMap["ing-26"] },
      { id: "ri-21", recipeId: "rec-4", ingredientId: "ing-20", quantity: 0.01, ingredient: ingMap["ing-20"] },
      { id: "ri-22", recipeId: "rec-4", ingredientId: "ing-21", quantity: 0.03, ingredient: ingMap["ing-21"] },
    ],
  },
  {
    id: "rec-5", name: "Tiramisu", description: "Classic Italian dessert with espresso",
    yield: 6, prepTimeMin: 40, costPerPortion: 2.9, marginPercent: 85,
    menuItem: { id: "menu-5", name: "Tiramisu", price: 14.0, category: "Desserts", recipeId: "rec-5", isActive: true },
    ingredients: [
      { id: "ri-23", recipeId: "rec-5", ingredientId: "ing-23", quantity: 0.25, ingredient: ingMap["ing-23"] },
      { id: "ri-24", recipeId: "rec-5", ingredientId: "ing-22", quantity: 0.5, ingredient: ingMap["ing-22"] },
      { id: "ri-25", recipeId: "rec-5", ingredientId: "ing-24", quantity: 1, ingredient: ingMap["ing-24"] },
      { id: "ri-26", recipeId: "rec-5", ingredientId: "ing-16", quantity: 0.02, ingredient: ingMap["ing-16"] },
      { id: "ri-27", recipeId: "rec-5", ingredientId: "ing-25", quantity: 0.01, ingredient: ingMap["ing-25"] },
    ],
  },
];

const purchaseOrders = [
  {
    id: "po-1", orderNumber: "PO-2026-0142", supplierId: "sup-1", status: "DRAFT" as const,
    totalCost: 284.5, createdAt: subHours(new Date(), 2),
    supplier: supMap["sup-1"],
    items: [
      { id: "poi-1", purchaseOrderId: "po-1", ingredientId: "ing-1", quantity: 10, unitCost: 12.5, ingredient: ingMap["ing-1"] },
      { id: "poi-2", purchaseOrderId: "po-1", ingredientId: "ing-2", quantity: 5, unitCost: 28.0, ingredient: ingMap["ing-2"] },
      { id: "poi-3", purchaseOrderId: "po-1", ingredientId: "ing-8", quantity: 15, unitCost: 2.5, ingredient: ingMap["ing-8"] },
    ],
  },
  {
    id: "po-2", orderNumber: "PO-2026-0138", supplierId: "sup-3", status: "SENT" as const,
    totalCost: 156.0, createdAt: subHours(new Date(), 24),
    supplier: supMap["sup-3"],
    items: [
      { id: "poi-4", purchaseOrderId: "po-2", ingredientId: "ing-5", quantity: 8, unitCost: 6.5, ingredient: ingMap["ing-5"] },
      { id: "poi-5", purchaseOrderId: "po-2", ingredientId: "ing-23", quantity: 4, unitCost: 14.0, ingredient: ingMap["ing-23"] },
    ],
  },
  {
    id: "po-3", orderNumber: "PO-2026-0135", supplierId: "sup-2", status: "RECEIVED" as const,
    totalCost: 412.0, createdAt: subHours(new Date(), 72),
    supplier: supMap["sup-2"],
    items: [
      { id: "poi-6", purchaseOrderId: "po-3", ingredientId: "ing-11", quantity: 20, unitCost: 3.2, ingredient: ingMap["ing-11"] },
      { id: "poi-7", purchaseOrderId: "po-3", ingredientId: "ing-12", quantity: 6, unitCost: 15.0, ingredient: ingMap["ing-12"] },
    ],
  },
];

const activities = [
  { id: "act-1", message: "Received shipment from Metro Provisions — 2 items", type: "receive", createdAt: subHours(new Date(), 1) },
  { id: "act-2", message: "Low stock alert: Chicken Breast below par level", type: "alert", createdAt: subHours(new Date(), 3) },
  { id: "act-3", message: "Rescue special created: Salmon & Arugula Bowl", type: "rescue", createdAt: subHours(new Date(), 5) },
  { id: "act-4", message: "Draft PO generated for Fresh Farms Co.", type: "order", createdAt: subHours(new Date(), 8) },
  { id: "act-5", message: "Recipe cost updated: Truffle Risotto (+3.2% margin)", type: "recipe", createdAt: subHours(new Date(), 12) },
  { id: "act-6", message: "Quick count: Fresh Basil adjusted to 6 bunches", type: "count", createdAt: subHours(new Date(), 18) },
];

const rescueSuggestions: Record<string, string> = {
  "Salmon Fillet": "Grilled Salmon Special — pair with arugula",
  "Fresh Basil": "Basil Pesto Flatbread special tonight",
  "Heavy Cream": "Truffle Cream Risotto — limited batch",
  Arugula: "Salmon & Arugula Bowl combo",
  Mushrooms: "Wild Mushroom Bruschetta appetizer",
};

export const mockData = {
  getRestaurant: () => restaurant,

  getDashboardStats: () => {
    const enriched = ingredients.map(withRelations);
    const totalValue = enriched.reduce((sum, i) => sum + i.currentStock * i.costPerUnit, 0);
    const lowStock = enriched.filter((i) => i.currentStock < i.parLevel);
    const expiring = enriched.filter((i) => {
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
  },

  getExpiringItems: () => {
    const now = new Date();
    const threeDays = addDays(now, 3);
    return ingredients
      .filter((i) => i.expiryDate && i.expiryDate <= threeDays && i.expiryDate >= now)
      .sort((a, b) => (a.expiryDate!.getTime() - b.expiryDate!.getTime()))
      .slice(0, 5)
      .map((item) => ({
        ...withRelations(item),
        suggestion: rescueSuggestions[item.name] ?? `Chef's special featuring ${item.name}`,
      }));
  },

  getReorderForecast: () => [
    { day: "Mon", projected: 4200 },
    { day: "Tue", projected: 3800 },
    { day: "Wed", projected: 4100 },
    { day: "Thu", projected: 5200 },
    { day: "Fri", projected: 6800 },
    { day: "Sat", projected: 7200 },
    { day: "Sun", projected: 5400 },
  ],

  getRecentActivity: () => activities,

  getIngredients: () =>
    [...ingredients].map(withRelations).sort((a, b) => a.name.localeCompare(b.name)),

  getRecipes: () =>
    [...recipes].sort((a, b) => a.name.localeCompare(b.name)),

  getSuppliers: () =>
    suppliers.map((s) => ({
      ...s,
      _count: {
        ingredients: ingredients.filter((i) => i.supplierId === s.id).length,
        purchaseOrders: purchaseOrders.filter((p) => p.supplierId === s.id).length,
      },
    })),

  getPurchaseOrders: () => purchaseOrders,

  getAnalytics: () => {
    const enriched = ingredients.map(withRelations);
    const categorySpend = enriched.reduce<Record<string, number>>((acc, ing) => {
      acc[ing.category.name] = (acc[ing.category.name] ?? 0) + ing.currentStock * ing.costPerUnit;
      return acc;
    }, {});
    const wasteTrend = [
      { week: "W1", waste: 8.2 }, { week: "W2", waste: 7.1 }, { week: "W3", waste: 6.4 },
      { week: "W4", waste: 5.8 }, { week: "W5", waste: 4.9 }, { week: "W6", waste: 4.2 },
    ];
    const topCostDrivers = [...enriched]
      .sort((a, b) => b.currentStock * b.costPerUnit - a.currentStock * a.costPerUnit)
      .slice(0, 5)
      .map((i) => ({ name: i.name, value: i.currentStock * i.costPerUnit }));
    const menuMargins = recipes
      .filter((r) => r.menuItem)
      .map((r) => ({
        name: r.menuItem!.name,
        margin: r.marginPercent,
        category: r.menuItem!.category,
      }));
    return { categorySpend, wasteTrend, topCostDrivers, menuMargins };
  },
};
