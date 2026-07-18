"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Save, Upload, Image } from "lucide-react";

type ContentEntry = { key: string; label: string; multiline?: boolean; image?: boolean };

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
      { key: "about_image", label: "תמונה", image: true },
    ],
  },
  {
    title: "כפתור WhatsApp",
    entries: [
      { key: "whatsapp_number", label: "מספר WhatsApp לכפתור הצף (ללא + — לדוגמה: 972541234567)" },
    ],
  },
  {
    title: "צרו קשר",
    entries: [
      { key: "contact_phone", label: "טלפון" },
      { key: "contact_whatsapp", label: "מספר וואטסאפ בסקשן יצירת קשר (ללא +)" },
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

function ImageField({ value, onChange, onSave }: { value: string; onChange: (url: string) => void; onSave?: (url: string) => Promise<void> }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        if (onSave) await onSave(data.url);
        else toast.success("התמונה הועלתה");
      } else {
        toast.error("שגיאה בהעלאה");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {value && (
        <img src={value} alt="תמונת אודות" className="w-full max-h-48 object-cover rounded-xl" style={{ border: "1px solid #F0DDE7" }} />
      )}
      <div className="flex gap-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="הדבק קישור לתמונה..."
          className="flex-1 px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-pink-600"
          style={{ borderColor: "#E5E7EB" }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
          style={{ background: "#B5184F", color: "white" }}
        >
          {uploading ? <><Upload size={16} className="animate-spin" /> מעלה...</> : <><Upload size={16} /> העלה תמונה</>}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

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
          <h1 className="text-3xl font-black" style={{ color: "#1A0A10" }}>עריכת תוכן</h1>
          <p style={{ color: "#6B7280" }}>כל שינוי ישתקף מיד באתר</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
          style={{ background: "#B5184F", color: "white" }}
        >
          <Save size={18} />
          {saving ? "שומר..." : "שמור הכל"}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 2px 16px rgba(181,24,79,0.06)", border: "1px solid #F0DDE7" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#F0DDE7" }}>
              <h2 className="font-bold" style={{ color: "#1A0A10" }}>{section.title}</h2>
            </div>
            <div className="p-6 space-y-5">
              {section.entries.map(({ key, label, multiline, image }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#1A0A10" }}>{label}</label>
                  {image ? (
                    <ImageField
                      value={values[key] || ""}
                      onChange={(url) => setValues((v) => ({ ...v, [key]: url }))}
                      onSave={async (url) => {
                        const updated = { ...values, [key]: url };
                        const res = await fetch("/api/content", {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(updated),
                        });
                        if (res.ok) toast.success("התמונה הועלתה ונשמרה");
                        else toast.error("שגיאה בשמירה");
                      }}
                    />
                  ) : multiline ? (
                    <textarea
                      value={values[key] || ""}
                      onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 text-base resize-none focus:outline-none focus:border-pink-600"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  ) : (
                    <input
                      value={values[key] || ""}
                      onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-pink-600"
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
