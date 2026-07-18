import { prisma } from "@/lib/db";
import { ShoppingBag, ClipboardList, Image, Star } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [bouquets, orders, gallery, testimonials, pendingOrders] = await Promise.all([
    prisma.bouquetCatalog.count(),
    prisma.order.count(),
    prisma.galleryItem.count(),
    prisma.testimonial.count(),
    prisma.order.count({ where: { status: "PENDING_PAYMENT" } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const statusLabels: Record<string, string> = {
    PENDING_PAYMENT: "ממתין לתשלום",
    PAID: "שולם",
    SHIPPED: "נשלח",
    COMPLETED: "הושלם",
  };

  const statusColors: Record<string, string> = {
    PENDING_PAYMENT: "#D97706",
    PAID: "#1B4332",
    SHIPPED: "#2563EB",
    COMPLETED: "#059669",
  };

  const stats = [
    { label: "זרים בקטלוג", value: bouquets, icon: ShoppingBag, href: "/admin/dashboard/catalog", color: "#1B4332" },
    { label: "סה״כ הזמנות", value: orders, icon: ClipboardList, href: "/admin/dashboard/orders", color: "#D97706" },
    { label: "תמונות בגלריה", value: gallery, icon: Image, href: "/admin/dashboard/gallery", color: "#2563EB" },
    { label: "המלצות", value: testimonials, icon: Star, href: "/admin/dashboard/testimonials", color: "#7C3AED" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black" style={{ color: "#1B4332" }}>
          שלום! 👋
        </h1>
        <p style={{ color: "#6B7280" }}>סקירת מצב הנוכחי של האתר</p>
        {pendingOrders > 0 && (
          <div
            className="mt-4 inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "#FEF3C7", color: "#92400E" }}
          >
            ⚠️ {pendingOrders} הזמנות ממתינות לאישור תשלום
            <Link href="/admin/dashboard/orders" className="underline">
              צפייה
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl p-6 transition-all hover:-translate-y-1"
            style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${color}15` }}
            >
              <Icon size={22} style={{ color }} />
            </div>
            <p className="text-3xl font-black" style={{ color: "#1A1A1A" }}>{value}</p>
            <p className="text-sm mt-1" style={{ color: "#6B7280" }}>{label}</p>
          </Link>
        ))}
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
      >
        <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: "#F3F4F6" }}>
          <h2 className="font-bold text-lg" style={{ color: "#1B4332" }}>הזמנות אחרונות</h2>
          <Link href="/admin/dashboard/orders" className="text-sm font-medium" style={{ color: "#1B4332" }}>
            כל ההזמנות
          </Link>
        </div>
        <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
          {recentOrders.length === 0 ? (
            <p className="p-6 text-center" style={{ color: "#6B7280" }}>אין הזמנות עדיין</p>
          ) : (
            recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{order.customerName}</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {(() => { try { const items = JSON.parse(order.items) as {name:string;quantity:number}[]; return items.map(i => `${i.name} ×${i.quantity}`).join(", "); } catch { return ""; } })()} · ₪{order.totalAmount}
                  </p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: `${statusColors[order.status] || "#6B7280"}18`,
                    color: statusColors[order.status] || "#6B7280",
                  }}
                >
                  {statusLabels[order.status] || order.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
