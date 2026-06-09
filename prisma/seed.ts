import "dotenv/config";
import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const dbPath = process.env.DATABASE_URL ?? "file:./dev.db";
const url = `file:${path.resolve(process.cwd(), dbPath.replace("file:", ""))}`;
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

async function main() {
  await prisma.activityLog.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Bella Verde Kitchen",
      tagline: "Farm-to-table Italian inspired dining",
    },
  });

  await prisma.user.createMany({
    data: [
      { name: "Marco Rossi", email: "marco@bellaverde.com", role: "ADMIN", restaurantId: restaurant.id },
      { name: "Sofia Chen", email: "sofia@bellaverde.com", role: "CHEF", restaurantId: restaurant.id },
      { name: "Alex Rivera", email: "alex@bellaverde.com", role: "STAFF", restaurantId: restaurant.id },
    ],
  });

  const categories = await Promise.all(
    [
      { name: "Proteins", icon: "beef" },
      { name: "Dairy", icon: "milk" },
      { name: "Produce", icon: "carrot" },
      { name: "Dry Goods", icon: "wheat" },
      { name: "Beverages", icon: "wine" },
      { name: "Spices", icon: "leaf" },
    ].map((c) => prisma.category.create({ data: c }))
  );

  const [proteins, dairy, produce, dryGoods, beverages, spices] = categories;

  const suppliers = await Promise.all([
    prisma.supplier.create({ data: { name: "Fresh Farms Co.", contactEmail: "orders@freshfarms.com", leadTimeDays: 1 } }),
    prisma.supplier.create({ data: { name: "Metro Provisions", contactEmail: "sales@metroprov.com", leadTimeDays: 2 } }),
    prisma.supplier.create({ data: { name: "Artisan Dairy Direct", contactEmail: "hello@artisandairy.com", leadTimeDays: 1 } }),
  ]);

  const [freshFarms, metro, artisanDairy] = suppliers;

  const ingredientData = [
    { name: "Chicken Breast", sku: "PROT-001", categoryId: proteins.id, supplierId: freshFarms.id, unit: "kg", currentStock: 8.5, parLevel: 15, costPerUnit: 12.5, storageLocation: "Walk-in A", expiryDate: daysFromNow(4), status: "LOW" as const },
    { name: "Salmon Fillet", sku: "PROT-002", categoryId: proteins.id, supplierId: freshFarms.id, unit: "kg", currentStock: 3.2, parLevel: 8, costPerUnit: 28.0, storageLocation: "Walk-in A", expiryDate: daysFromNow(2), status: "EXPIRING" as const },
    { name: "Ground Beef", sku: "PROT-003", categoryId: proteins.id, supplierId: metro.id, unit: "kg", currentStock: 12.0, parLevel: 10, costPerUnit: 14.0, storageLocation: "Walk-in A", expiryDate: daysFromNow(5), status: "HEALTHY" as const },
    { name: "Parmigiano Reggiano", sku: "DAIR-001", categoryId: dairy.id, supplierId: artisanDairy.id, unit: "kg", currentStock: 2.1, parLevel: 3, costPerUnit: 32.0, storageLocation: "Cold Prep", expiryDate: daysFromNow(14), status: "LOW" as const },
    { name: "Heavy Cream", sku: "DAIR-002", categoryId: dairy.id, supplierId: artisanDairy.id, unit: "L", currentStock: 4.5, parLevel: 6, costPerUnit: 6.5, storageLocation: "Walk-in B", expiryDate: daysFromNow(3), status: "EXPIRING" as const },
    { name: "Fresh Mozzarella", sku: "DAIR-003", categoryId: dairy.id, supplierId: artisanDairy.id, unit: "kg", currentStock: 5.0, parLevel: 4, costPerUnit: 18.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(6), status: "HEALTHY" as const },
    { name: "San Marzano Tomatoes", sku: "PROD-001", categoryId: produce.id, supplierId: freshFarms.id, unit: "kg", currentStock: 18.0, parLevel: 12, costPerUnit: 4.5, storageLocation: "Dry Store", expiryDate: daysFromNow(30), status: "HEALTHY" as const },
    { name: "Fresh Basil", sku: "PROD-002", categoryId: produce.id, supplierId: freshFarms.id, unit: "bunch", currentStock: 6, parLevel: 10, costPerUnit: 2.5, storageLocation: "Herb Fridge", expiryDate: daysFromNow(1), status: "CRITICAL" as const },
    { name: "Arugula", sku: "PROD-003", categoryId: produce.id, supplierId: freshFarms.id, unit: "kg", currentStock: 2.8, parLevel: 4, costPerUnit: 8.0, storageLocation: "Herb Fridge", expiryDate: daysFromNow(2), status: "EXPIRING" as const },
    { name: "Romaine Lettuce", sku: "PROD-004", categoryId: produce.id, supplierId: freshFarms.id, unit: "head", currentStock: 14, parLevel: 12, costPerUnit: 1.8, storageLocation: "Walk-in B", expiryDate: daysFromNow(5), status: "HEALTHY" as const },
    { name: "Arborio Rice", sku: "DRY-001", categoryId: dryGoods.id, supplierId: metro.id, unit: "kg", currentStock: 22.0, parLevel: 15, costPerUnit: 3.2, storageLocation: "Dry Store", expiryDate: daysFromNow(180), status: "HEALTHY" as const },
    { name: "Olive Oil EVOO", sku: "DRY-002", categoryId: dryGoods.id, supplierId: metro.id, unit: "L", currentStock: 6.0, parLevel: 8, costPerUnit: 15.0, storageLocation: "Dry Store", expiryDate: daysFromNow(365), status: "LOW" as const },
    { name: "00 Flour", sku: "DRY-003", categoryId: dryGoods.id, supplierId: metro.id, unit: "kg", currentStock: 25.0, parLevel: 20, costPerUnit: 2.1, storageLocation: "Dry Store", expiryDate: daysFromNow(90), status: "HEALTHY" as const },
    { name: "Pasta Penne", sku: "DRY-004", categoryId: dryGoods.id, supplierId: metro.id, unit: "kg", currentStock: 10.0, parLevel: 12, costPerUnit: 2.8, storageLocation: "Dry Store", expiryDate: daysFromNow(200), status: "LOW" as const },
    { name: "White Wine", sku: "BEV-001", categoryId: beverages.id, supplierId: metro.id, unit: "bottle", currentStock: 8, parLevel: 6, costPerUnit: 12.0, storageLocation: "Bar", expiryDate: daysFromNow(730), status: "HEALTHY" as const },
    { name: "Espresso Beans", sku: "BEV-002", categoryId: beverages.id, supplierId: metro.id, unit: "kg", currentStock: 3.5, parLevel: 5, costPerUnit: 22.0, storageLocation: "Bar", expiryDate: daysFromNow(60), status: "LOW" as const },
    { name: "Black Truffle Oil", sku: "SPC-001", categoryId: spices.id, supplierId: metro.id, unit: "ml", currentStock: 250, parLevel: 200, costPerUnit: 0.15, storageLocation: "Spice Rack", expiryDate: daysFromNow(120), status: "HEALTHY" as const },
    { name: "Sea Salt", sku: "SPC-002", categoryId: spices.id, supplierId: metro.id, unit: "kg", currentStock: 4.0, parLevel: 2, costPerUnit: 3.0, storageLocation: "Spice Rack", expiryDate: daysFromNow(500), status: "HEALTHY" as const },
    { name: "Black Pepper", sku: "SPC-003", categoryId: spices.id, supplierId: metro.id, unit: "kg", currentStock: 1.2, parLevel: 1, costPerUnit: 18.0, storageLocation: "Spice Rack", expiryDate: daysFromNow(300), status: "HEALTHY" as const },
    { name: "Garlic", sku: "PROD-005", categoryId: produce.id, supplierId: freshFarms.id, unit: "kg", currentStock: 3.0, parLevel: 2, costPerUnit: 5.5, storageLocation: "Dry Store", expiryDate: daysFromNow(14), status: "HEALTHY" as const },
    { name: "Lemons", sku: "PROD-006", categoryId: produce.id, supplierId: freshFarms.id, unit: "kg", currentStock: 4.5, parLevel: 3, costPerUnit: 4.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(7), status: "HEALTHY" as const },
    { name: "Eggs", sku: "DAIR-004", categoryId: dairy.id, supplierId: artisanDairy.id, unit: "dozen", currentStock: 8, parLevel: 6, costPerUnit: 5.5, storageLocation: "Walk-in B", expiryDate: daysFromNow(10), status: "HEALTHY" as const },
    { name: "Mascarpone", sku: "DAIR-005", categoryId: dairy.id, supplierId: artisanDairy.id, unit: "kg", currentStock: 2.5, parLevel: 3, costPerUnit: 14.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(4), status: "LOW" as const },
    { name: "Ladyfinger Biscuits", sku: "DRY-005", categoryId: dryGoods.id, supplierId: metro.id, unit: "pack", currentStock: 5, parLevel: 4, costPerUnit: 4.5, storageLocation: "Dry Store", expiryDate: daysFromNow(45), status: "HEALTHY" as const },
    { name: "Cocoa Powder", sku: "DRY-006", categoryId: dryGoods.id, supplierId: metro.id, unit: "kg", currentStock: 1.5, parLevel: 1, costPerUnit: 12.0, storageLocation: "Dry Store", expiryDate: daysFromNow(200), status: "HEALTHY" as const },
    { name: "Anchovies", sku: "PROT-004", categoryId: proteins.id, supplierId: metro.id, unit: "tin", currentStock: 6, parLevel: 4, costPerUnit: 3.5, storageLocation: "Dry Store", expiryDate: daysFromNow(90), status: "HEALTHY" as const },
    { name: "Croutons", sku: "DRY-007", categoryId: dryGoods.id, supplierId: metro.id, unit: "kg", currentStock: 2.0, parLevel: 2, costPerUnit: 8.0, storageLocation: "Dry Store", expiryDate: daysFromNow(30), status: "LOW" as const },
    { name: "Butter", sku: "DAIR-006", categoryId: dairy.id, supplierId: artisanDairy.id, unit: "kg", currentStock: 5.5, parLevel: 4, costPerUnit: 9.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(8), status: "HEALTHY" as const },
    { name: "Shallots", sku: "PROD-007", categoryId: produce.id, supplierId: freshFarms.id, unit: "kg", currentStock: 1.8, parLevel: 2, costPerUnit: 7.0, storageLocation: "Walk-in B", expiryDate: daysFromNow(5), status: "LOW" as const },
    { name: "Mushrooms", sku: "PROD-008", categoryId: produce.id, supplierId: freshFarms.id, unit: "kg", currentStock: 4.0, parLevel: 5, costPerUnit: 9.5, storageLocation: "Walk-in B", expiryDate: daysFromNow(2), status: "EXPIRING" as const },
  ];

  const ingredients = await Promise.all(
    ingredientData.map((ing) => prisma.ingredient.create({ data: ing }))
  );

  const byName = Object.fromEntries(ingredients.map((i) => [i.name, i]));

  const recipes = [
    {
      name: "Truffle Risotto",
      description: "Creamy arborio rice with truffle oil and parmigiano",
      yield: 4,
      prepTimeMin: 35,
      costPerPortion: 8.2,
      marginPercent: 72,
      items: [
        { name: "Arborio Rice", quantity: 0.08 },
        { name: "Parmigiano Reggiano", quantity: 0.03 },
        { name: "Black Truffle Oil", quantity: 5 },
        { name: "Shallots", quantity: 0.02 },
        { name: "Butter", quantity: 0.02 },
        { name: "White Wine", quantity: 0.25 },
      ],
      menu: { name: "Truffle Risotto", price: 29.0, category: "Mains" },
    },
    {
      name: "Margherita Flatbread",
      description: "Wood-fired flatbread with mozzarella and basil",
      yield: 2,
      prepTimeMin: 20,
      costPerPortion: 4.1,
      marginPercent: 78,
      items: [
        { name: "00 Flour", quantity: 0.15 },
        { name: "Fresh Mozzarella", quantity: 0.12 },
        { name: "San Marzano Tomatoes", quantity: 0.1 },
        { name: "Fresh Basil", quantity: 0.5 },
        { name: "Olive Oil EVOO", quantity: 0.02 },
      ],
      menu: { name: "Margherita Flatbread", price: 18.5, category: "Starters" },
    },
    {
      name: "Grilled Salmon",
      description: "Atlantic salmon with lemon butter",
      yield: 1,
      prepTimeMin: 25,
      costPerPortion: 11.5,
      marginPercent: 65,
      items: [
        { name: "Salmon Fillet", quantity: 0.22 },
        { name: "Butter", quantity: 0.03 },
        { name: "Lemons", quantity: 0.05 },
        { name: "Sea Salt", quantity: 0.002 },
        { name: "Black Pepper", quantity: 0.001 },
      ],
      menu: { name: "Grilled Salmon", price: 32.0, category: "Mains" },
    },
    {
      name: "Caesar Salad",
      description: "Classic romaine with anchovy dressing",
      yield: 2,
      prepTimeMin: 15,
      costPerPortion: 3.8,
      marginPercent: 81,
      items: [
        { name: "Romaine Lettuce", quantity: 1 },
        { name: "Parmigiano Reggiano", quantity: 0.02 },
        { name: "Croutons", quantity: 0.05 },
        { name: "Anchovies", quantity: 0.5 },
        { name: "Garlic", quantity: 0.01 },
        { name: "Lemons", quantity: 0.03 },
      ],
      menu: { name: "Caesar Salad", price: 19.0, category: "Starters" },
    },
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with espresso",
      yield: 6,
      prepTimeMin: 40,
      costPerPortion: 2.9,
      marginPercent: 85,
      items: [
        { name: "Mascarpone", quantity: 0.25 },
        { name: "Eggs", quantity: 0.5 },
        { name: "Ladyfinger Biscuits", quantity: 1 },
        { name: "Espresso Beans", quantity: 0.02 },
        { name: "Cocoa Powder", quantity: 0.01 },
      ],
      menu: { name: "Tiramisu", price: 14.0, category: "Desserts" },
    },
  ];

  for (const r of recipes) {
    const recipe = await prisma.recipe.create({
      data: {
        name: r.name,
        description: r.description,
        yield: r.yield,
        prepTimeMin: r.prepTimeMin,
        costPerPortion: r.costPerPortion,
        marginPercent: r.marginPercent,
        ingredients: {
          create: r.items.map((item) => ({
            ingredientId: byName[item.name].id,
            quantity: item.quantity,
          })),
        },
      },
    });

    await prisma.menuItem.create({
      data: {
        name: r.menu.name,
        price: r.menu.price,
        category: r.menu.category,
        recipeId: recipe.id,
      },
    });
  }

  const po1 = await prisma.purchaseOrder.create({
    data: {
      orderNumber: "PO-2026-0142",
      supplierId: freshFarms.id,
      status: "DRAFT",
      totalCost: 284.5,
      items: {
        create: [
          { ingredientId: byName["Chicken Breast"].id, quantity: 10, unitCost: 12.5 },
          { ingredientId: byName["Salmon Fillet"].id, quantity: 5, unitCost: 28.0 },
          { ingredientId: byName["Fresh Basil"].id, quantity: 15, unitCost: 2.5 },
        ],
      },
    },
  });

  await prisma.purchaseOrder.create({
    data: {
      orderNumber: "PO-2026-0138",
      supplierId: artisanDairy.id,
      status: "SENT",
      totalCost: 156.0,
      items: {
        create: [
          { ingredientId: byName["Heavy Cream"].id, quantity: 8, unitCost: 6.5 },
          { ingredientId: byName["Mascarpone"].id, quantity: 4, unitCost: 14.0 },
        ],
      },
    },
  });

  await prisma.purchaseOrder.create({
    data: {
      orderNumber: "PO-2026-0135",
      supplierId: metro.id,
      status: "RECEIVED",
      totalCost: 412.0,
      items: {
        create: [
          { ingredientId: byName["Arborio Rice"].id, quantity: 20, unitCost: 3.2 },
          { ingredientId: byName["Olive Oil EVOO"].id, quantity: 6, unitCost: 15.0 },
        ],
      },
    },
  });

  await prisma.activityLog.createMany({
    data: [
      { message: "Received shipment from Metro Provisions — 2 items", type: "receive" },
      { message: "Low stock alert: Chicken Breast below par level", type: "alert" },
      { message: "Rescue special created: Salmon & Arugula Bowl", type: "rescue" },
      { message: "Draft PO generated for Fresh Farms Co.", type: "order" },
      { message: "Recipe cost updated: Truffle Risotto (+3.2% margin)", type: "recipe" },
      { message: "Quick count: Fresh Basil adjusted to 6 bunches", type: "count" },
    ],
  });

  console.log(`Seeded Bella Verde Kitchen with ${ingredients.length} ingredients`);
  console.log(`Purchase order draft: ${po1.orderNumber}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
