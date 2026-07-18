"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MessageCircle, ChevronDown, Package, Shuffle } from "lucide-react";

type OrderItem = {
  bouquetId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: string;
  bouquetType: string;
  deliveryType: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  greetingMessage: string;
  status: string;
  totalAmount: number;
  createdAt: string;
};

const STATUS_OPTIONS = [
  { value: "PENDING_PAYMENT", label: "ממתין לתשלום", color: "#D97706", bg: "#FEF3C7" },
  { value: "PAID", label: "שולם", color: "#1B4332", bg: "#D1FAE5" },
  { value: "SHIPPED", label: "נשלח", color: "#2563EB", bg: "#DBEAFE" },
  { value: "COMPLETED", label: "הושלם", color: "#059669", bg: "#D1FAE5" },
];

function statusInfo(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) || { label: status, color: "#6B7280", bg: "#F3F4F6" };
}

const DELIVERY_LABELS: Record<string, string> = { delivery: "משלוח", pickup: "איסוף עצמי" };
const BOUQUET_TYPE_LABELS: Record<string, string> = { full_set: "סט מלא", mix: "מיקס משולב" };

function parseItems(itemsJson: string): OrderItem[] {
  try {
    return JSON.parse(itemsJson) as OrderItem[];
  } catch {
    return [];
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then(setOrders).catch(() => {});
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("סטטוס עודכן");
    }
  }

  const filtered = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black" style={{ color: "#1B4332" }}>הזמנות</h1>
        <p style={{ color: "#6B7280" }}>
          {orders.length} הזמנות · {orders.filter((o) => o.status === "PENDING_PAYMENT").length} ממתינות
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setFilter("ALL")}
          className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{ background: filter === "ALL" ? "#1B4332" : "#F3F4F6", color: filter === "ALL" ? "#FFF8F0" : "#374151" }}
        >
          הכל ({orders.length})
        </button>
        {STATUS_OPTIONS.map(({ value, label }) => {
          const count = orders.filter((o) => o.status === value).length;
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: filter === value ? "#1B4332" : "#F3F4F6",
                color: filter === value ? "#FFF8F0" : "#374151",
              }}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "#6B7280" }}>אין הזמנות</div>
        )}
        {filtered.map((order) => {
          const info = statusInfo(order.status);
          const items = parseItems(order.items);
          const isMix = order.bouquetType === "mix";
          return (
            <div
              key={order.id}
              className="rounded-2xl p-6"
              style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-black text-lg" style={{ color: "#1B4332" }}>{order.customerName}</p>
                  <p className="text-sm" dir="ltr" style={{ color: "#6B7280" }}>{order.customerPhone}</p>
                  {order.customerEmail && (
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>{order.customerEmail}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm font-semibold px-3 py-1 rounded-full"
                    style={{ background: info.bg, color: info.color }}
                  >
                    {info.label}
                  </span>
                  <a
                    href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: "#25D366", color: "white" }}
                  >
                    <MessageCircle size={15} />
                    וואטסאפ
                  </a>
                </div>
              </div>

              {/* Items list */}
              {items.length > 0 && (
                <div className="mb-4 rounded-xl overflow-hidden" style={{ border: "1px solid #F3F4F6" }}>
                  <div
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold"
                    style={{ background: "#F9FAFB", color: "#374151" }}
                  >
                    {isMix ? (
                      <><Shuffle size={14} style={{ color: "#D4AF37" }} /> מיקס משולב</>
                    ) : (
                      <><Package size={14} style={{ color: "#1B4332" }} /> סט מלא</>
                    )}
                    <span style={{ color: "#9CA3AF", fontWeight: 400 }}>
                      · {BOUQUET_TYPE_LABELS[order.bouquetType] || order.bouquetType}
                    </span>
                  </div>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{ borderTop: idx > 0 ? "1px solid #F3F4F6" : "none" }}
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          width={48}
                          height={48}
                          style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{item.name}</p>
                        <p className="text-xs" style={{ color: "#9CA3AF" }}>₪{item.price} × {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm" style={{ color: "#D4AF37" }}>
                        ₪{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="font-semibold mb-1" style={{ color: "#9CA3AF" }}>סה״כ לתשלום</p>
                  <p className="font-black text-lg" style={{ color: "#D4AF37" }}>₪{order.totalAmount}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "#9CA3AF" }}>אופן מסירה</p>
                  <p style={{ color: "#1A1A1A" }}>{DELIVERY_LABELS[order.deliveryType] || order.deliveryType}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "#9CA3AF" }}>תאריך</p>
                  <p style={{ color: "#1A1A1A" }}>{order.deliveryDate} {order.deliveryTime}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "#9CA3AF" }}>פריטים</p>
                  <p style={{ color: "#1A1A1A" }}>
                    {items.reduce((s, i) => s + i.quantity, 0)} זרים ({items.length} סוגים)
                  </p>
                </div>
              </div>

              {order.deliveryAddress && (
                <p className="text-sm mb-3" style={{ color: "#4B5563" }}>
                  <span className="font-semibold">כתובת: </span>{order.deliveryAddress}
                </p>
              )}
              {order.greetingMessage && (
                <p className="text-sm mb-4 italic" style={{ color: "#4B5563" }}>
                  &ldquo;{order.greetingMessage}&rdquo;
                </p>
              )}

              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#F3F4F6" }}>
                <span className="text-sm font-semibold" style={{ color: "#374151" }}>עדכון סטטוס:</span>
                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="appearance-none pl-8 pr-4 py-2 rounded-xl text-sm font-semibold border-2 focus:outline-none cursor-pointer"
                    style={{ borderColor: "#E5E7EB", color: "#1B4332" }}
                  >
                    {STATUS_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#6B7280" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
