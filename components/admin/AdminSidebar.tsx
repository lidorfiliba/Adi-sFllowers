"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Image, ShoppingBag, ClipboardList, Star, LogOut } from "lucide-react";

const nav = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "סקירה כללית" },
  { href: "/admin/dashboard/content", icon: FileText, label: "עריכת תוכן" },
  { href: "/admin/dashboard/gallery", icon: Image, label: "גלריה" },
  { href: "/admin/dashboard/catalog", icon: ShoppingBag, label: "קטלוג זרים" },
  { href: "/admin/dashboard/orders", icon: ClipboardList, label: "הזמנות" },
  { href: "/admin/dashboard/testimonials", icon: Star, label: "המלצות" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside
      className="w-64 flex-shrink-0 min-h-screen flex flex-col"
      style={{ background: "#1A0A10", color: "#FFF8F0" }}
    >
      <div className="p-6 border-b" style={{ borderColor: "rgba(255,248,240,0.1)" }}>
        <h2 className="text-lg font-black">🌸 פרחי הרצליה</h2>
        <p className="text-xs mt-1" style={{ color: "rgba(255,248,240,0.5)" }}>לוח ניהול</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active ? "rgba(255,248,240,0.12)" : "transparent",
                color: active ? "#F4B942" : "rgba(255,248,240,0.75)",
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: "rgba(255,248,240,0.1)" }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-red-900/40"
          style={{ color: "rgba(255,248,240,0.7)" }}
        >
          <LogOut size={18} />
          יציאה
        </button>
      </div>
    </aside>
  );
}
