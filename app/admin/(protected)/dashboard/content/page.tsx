"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

type ContentEntry = { key: string; label: string; multiline?: boolean };

const sections: { title: string; entries: ContentEntry[] }[] = [
  {
    title: "קטע גיבור (Hero)",
    entries: [
      { key: "hero_headline", label: "כותרת ראשית" },
      { key: "hero_subheadline", label: "כותרת משנה", multiline: true },
      { key: "hero_cta_order", label: "כפתור הזמנה" },
      { key: "hero_cta_whatsapp", label: "כפתור וואטסאפ" },
    ],
  },
  {
    title: "אודות",
    entries: [
      { key: "about_title", label: "כותרת" },
      { key: "about_text", label: "טקסט", multiline: true },
    ],
  },
  {
    title: "צרו קשר",
    entries: [
      { key: "contact_phone", label: "טלפון" },
      { key: "contact_whatsapp", label: "מספר וואטסאפ (ללא +)" },
      { key: "contact_address", label: "כתובת" },
      { key: "contact_hours", label: "שעות פעילות", multiline: true },
      { key: "contact_map_embed", label: "קוד הטמעה של מפה (אופציונלי)", multiline: true },
    ],
  },
  {
    title: "תשלום Bit",
    entries: [
      { key: "bit_phone", label: "מספר טלפון ל-Bit" },
      { key: "bit_link", label: "קישור לתשלום Bit" },
    ],
  },
  {
    title: "כללי",
    entries: [
      { key: "shop_name", label: "שם החנות" },
      { key: "footer_tagline", label: "מוטו (footer)" },
      { key: "instagram_url", label: "אינסטגרם URL" },
      { key: "facebook_url", label: "פייסבוק URL" },
    ],
  },
];

export default function ContentPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setValues);
  }, []);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) toast.success("התוכן נשמר בהצלחה");
      else toast.error("שגיאה בשמירה");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: "#1B4332" }}>עריכת תוכן</h1>
          <p style={{ color: "#6B7280" }}>כל שינוי ישתקף מיד באתר</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
          style={{ background: "#1B4332", color: "#FFF8F0" }}
        >
          <Save size={18} />
          {saving ? "שומר..." : "שמור הכל"}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl overflow-hidden"
            style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: "#F3F4F6" }}>
              <h2 className="font-bold" style={{ color: "#1B4332" }}>{section.title}</h2>
            </div>
            <div className="p-6 space-y-5">
              {section.entries.map(({ key, label, multiline }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    {label}
                  </label>
                  {multiline ? (
                    <textarea
                      value={values[key] || ""}
                      onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 text-base resize-none focus:outline-none focus:border-green-700"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  ) : (
                    <input
                      value={values[key] || ""}
                      onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-green-700"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
