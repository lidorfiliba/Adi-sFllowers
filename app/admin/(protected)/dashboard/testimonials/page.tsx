"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X, Star } from "lucide-react";

type Testimonial = { id: string; author: string; text: string; rating: number; active: boolean };
const EMPTY = { author: "", text: "", rating: 5, active: true };

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials").then((r) => r.json()).then(setItems);
  }, []);

  async function handleSave() {
    if (!form.author || !form.text) return toast.error("נא למלא שם וטקסט");
    if (editing) {
      const res = await fetch(`/api/testimonials/${editing}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === editing ? updated : i)));
      toast.success("עודכן");
    } else {
      const res = await fetch("/api/testimonials", {
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
    if (!confirm("למחוק את ההמלצה?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("נמחק");
  }

  const isFormOpen = adding || editing !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: "#B5184F" }}>המלצות לקוחות</h1>
          <p style={{ color: "#6B7280" }}>נהלו את ההמלצות שמוצגות באתר</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditing(null); setForm(EMPTY); }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
          style={{ background: "#B5184F", color: "white" }}
        >
          <Plus size={18} />
          הוסף המלצה
        </button>
      </div>

      {isFormOpen && (
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "white", boxShadow: "0 4px 16px rgba(181,24,79,0.1)", border: "2px solid #F0DDE7" }}
        >
          <h2 className="font-bold mb-5" style={{ color: "#B5184F" }}>
            {editing ? "עריכת המלצה" : "המלצה חדשה"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: "#374151" }}>שם הלקוח *</label>
              <input
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                style={{ borderColor: "#E5E7EB" }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: "#374151" }}>טקסט ההמלצה *</label>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 resize-none focus:outline-none"
                style={{ borderColor: "#E5E7EB" }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#374151" }}>דירוג</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: star }))}
                    aria-label={`${star} כוכבים`}
                  >
                    <Star
                      size={24}
                      fill={star <= form.rating ? "#D4AF37" : "none"}
                      style={{ color: "#D4AF37" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              style={{ background: "#B5184F", color: "white" }}
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

      <div className="space-y-4">
        {items.length === 0 && (
          <div className="text-center py-16" style={{ color: "#6B7280" }}>אין המלצות עדיין</div>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-6 flex gap-4 items-start"
            style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold" style={{ color: "#B5184F" }}>{item.author}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{item.text}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => { setEditing(item.id); setAdding(false); setForm(item); }}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="ערוך"
                style={{ color: "#6B7280" }}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg hover:bg-red-50"
                aria-label="מחק"
                style={{ color: "#DC2626" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
