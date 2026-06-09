import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPurchaseOrders, getSuppliers } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function OrdersPage() {
  const [orders, suppliers] = await Promise.all([
    getPurchaseOrders(),
    getSuppliers(),
  ]);

  return (
    <>
      <Header
        title="Orders & Suppliers"
        subtitle="Purchase orders and supplier directory"
      />

      <div className="space-y-8 p-8">
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">
            Suppliers
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="p-5">
                <h3 className="font-medium text-charcoal">{supplier.name}</h3>
                <p className="mt-1 text-sm text-stone-500">
                  {supplier.contactEmail}
                </p>
                <div className="mt-3 flex gap-4 text-xs text-stone-400">
                  <span>{supplier._count.ingredients} ingredients</span>
                  <span>{supplier._count.purchaseOrders} orders</span>
                  <span>{supplier.leadTimeDays}d lead time</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">
            Purchase Orders
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-charcoal">
                          {order.orderNumber}
                        </h3>
                        <Badge status={order.status}>
                          {order.status.toLowerCase()}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">
                        {order.supplier.name} · {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <p className="font-display text-xl font-bold text-charcoal">
                      {formatCurrency(order.totalCost)}
                    </p>
                  </div>

                  <div className="mt-4 divide-y divide-stone-50 rounded-xl bg-cream-dark/30">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between px-4 py-2.5 text-sm"
                      >
                        <span className="text-charcoal">{item.ingredient.name}</span>
                        <span className="text-stone-500">
                          {item.quantity} × {formatCurrency(item.unitCost)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
