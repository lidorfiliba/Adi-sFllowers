"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Plus, Pencil, Trash2, Check, X, ToggleLeft, ToggleRight } from "lucide-react";

type Bouquet = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
};

const EMPTY: Omit<Bouquet, "id"> = {
  name: "",
  price: 0,
  description: "",
  imageUrl: "",
  available: true,
};

export default function CatalogPage() {
  const [items, setItems] = useState<Bouquet[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/catalog").then((r) => r.json()).then(setItems);
  }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      setForm((f) => ({ ...f, imageUrl: url }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!form.name || !form.price) return toast.error("נא למלא שם ומחיר");
    if (editing) {
      const res = await fetch(`/api/catalog/${editing}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === editing ? updated : i)));
      toast.success("עודכן");
    } else {
      const res = await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      toast.success("נוסף");
    }
    setEditing(null);
    setAdding(false);
    setForm(EMPTY);
  }

  async function handleDelete(id: string) {
    if (!confirm("למחוק את הזר?")) return;
    await fetch(`/api/catalog/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("נמחק");
  }

  async function toggleAvailable(item: Bouquet) {
    const res = await fetch(`/api/catalog/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !item.available }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
  }

  const isFormOpen = adding || editing !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: "#1B4332" }}>קטלוג זרים</h1>
          <p style={{ color: "#6B7280" }}>נהלו את הזרים שמוצגים בטופס ההזמנה</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditing(null); setForm(EMPTY); }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
          style={{ background: "#1B4332", color: "#FFF8F0" }}
        >
          <Plus size={18} />
          הוסף זר
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "2px solid #1B4332" }}
        >
          <h2 className="font-bold mb-5" style={{ color: "#1B4332" }}>
            {editing ? "עריכת זר" : "הוספת זר חדש"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: "#374151" }}>שם הזר *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                style={{ borderColor: "#E5E7EB" }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: "#374151" }}>מחיר (₪) *</label>
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                style={{ borderColor: "#E5E7EB", direction: "ltr" }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block" style={{ color: "#374151" }}>תיאור</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 resize-none focus:outline-none"
              style={{ borderColor: "#E5E7EB" }}
            />
          </div>
          <div className="mb-6">
            <label className="text-sm font-semibold mb-1 block" style={{ color: "#374151" }}>תמונה</label>
            <div className="flex gap-3 items-center">
              <input
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="URL של תמונה"
                className="flex-1 px-4 py-3 rounded-xl border-2 text-sm focus:outline-none"
                style={{ borderColor: "#E5E7EB", direction: "ltr" }}
              />
              <label
                className="px-4 py-3 rounded-xl font-semibold text-sm cursor-pointer whitespace-nowrap"
                style={{ background: "#F3F4F6", color: "#374151" }}
              >
                {uploading ? "מעלה..." : "העלה"}
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                />
              </label>
              {form.imageUrl && (
                <Image
                  src={form.imageUrl}
                  alt="תצוגה מקדימה"
                  width={48}
                  height={48}
                  className="rounded-lg object-cover flex-shrink-0"
                />
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              style={{ background: "#1B4332", color: "#FFF8F0" }}
            >
              <Check size={18} />
              שמור
            </button>
            <button
              onClick={() => { setAdding(false); setEditing(null); setForm(EMPTY); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              style={{ background: "#F3F4F6", color: "#374151" }}
            >
              <X size={18} />
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-5 flex gap-5 items-start"
            style={{
              background: "white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              opacity: item.available ? 1 : 0.6,
            }}
          >
            <Image
              src={item.imageUrl || "https://picsum.photos/seed/bouquet/80/80"}
              alt={item.name}
              width={72}
              height={72}
              className="rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold" style={{ color: "#1B4332" }}>{item.name}</h3>
                  <p className="text-lg font-black" style={{ color: "#D4AF37" }}>₪{item.price}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleAvailable(item)}
                    title={item.available ? "סמן כלא זמין" : "סמן כזמין"}
                    style={{ color: item.available ? "#1B4332" : "#9CA3AF" }}
                  >
                    {item.available ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                  <button
                    onClick={() => { setEditing(item.id); setAdding(false); setForm(item); }}
                    className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                    aria-label="ערוך"
                    style={{ color: "#6B7280" }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg transition-colors hover:bg-red-50"
                    aria-label="מחק"
                    style={{ color: "#DC2626" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm mt-1 line-clamp-2" style={{ color: "#6B7280" }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
