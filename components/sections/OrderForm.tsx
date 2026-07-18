"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ChevronLeft, ChevronRight, Check, Minus, Plus, Layers, Shuffle } from "lucide-react";
import type { ContentMap } from "@/lib/content";

type Bouquet = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
};

type ArrangementType = "full_set" | "mix";

const schema = z.object({
  customerName: z.string().min(2, "נא להזין שם מלא"),
  customerPhone: z.string().min(9, "נא להזין מספר טלפון תקין"),
  customerEmail: z.string().email("נא להזין כתובת אימייל תקינה").or(z.literal("")),
  deliveryType: z.enum(["delivery", "pickup"]),
  deliveryAddress: z.string().optional(),
  deliveryDate: z.string().min(1, "נא לבחור תאריך"),
  deliveryTime: z.string().min(1, "נא לבחור שעה"),
  greetingMessage: z.string().optional(),
}).refine(
  (d) => d.deliveryType !== "delivery" || (d.deliveryAddress && d.deliveryAddress.length > 3),
  { message: "נא להזין כתובת למשלוח", path: ["deliveryAddress"] }
);

type FormData = z.infer<typeof schema>;

/* ─── Quantity Selector ─────────────────────────────── */
function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl overflow-hidden"
      style={{ background: "rgba(190,24,93,0.06)", border: "1.5px solid rgba(190,24,93,0.2)" }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        aria-label="הפחת כמות"
        className="w-9 h-9 flex items-center justify-center transition-all active:scale-90"
        style={{ color: value === 0 ? "#CBD5E1" : "#B5184F" }}
        disabled={value === 0}
      >
        <Minus size={15} />
      </button>
      <input
        type="number"
        min={0}
        max={99}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          onChange(isNaN(n) ? 0 : Math.max(0, Math.min(99, n)));
        }}
        className="w-10 text-center text-base font-black bg-transparent border-none outline-none"
        style={{ color: "#B5184F" }}
        aria-label="כמות"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="הוסף כמות"
        className="w-9 h-9 flex items-center justify-center transition-all active:scale-90"
        style={{ color: "#B5184F" }}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}

/* ─── Flower Card ───────────────────────────────────── */
function FlowerCard({
  bouquet,
  quantity,
  onQuantityChange,
  onPhotoClick,
}: {
  bouquet: Bouquet;
  quantity: number;
  onQuantityChange: (n: number) => void;
  onPhotoClick: () => void;
}) {
  const selected = quantity > 0;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: "white",
        boxShadow: selected
          ? "0 0 0 2.5px #B5184F, 0 8px 32px rgba(190,24,93,0.22)"
          : "0 4px 20px rgba(190,24,93,0.07)",
        border: `1px solid ${selected ? "rgba(190,24,93,0.3)" : "rgba(190,24,93,0.06)"}`,
      }}
    >
      {/* Photo — clickable for zoom */}
      <button
        type="button"
        onClick={onPhotoClick}
        className="relative w-full overflow-hidden focus-visible:outline-2 group"
        aria-label={`הגדל תמונה של ${bouquet.name}`}
        style={{ height: 180 }}
      >
        <Image
          src={bouquet.imageUrl || "https://picsum.photos/seed/default/400/300"}
          alt={bouquet.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Zoom hint overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(190,24,93,0.4)" }}
        >
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.95)", color: "#B5184F" }}
          >
            לחץ להגדלה
          </span>
        </div>
        {/* Selected badge */}
        {selected && (
          <div
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
            style={{ background: "#B5184F" }}
          >
            <Check size={14} color="white" strokeWidth={3} />
          </div>
        )}
      </button>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-sm leading-snug flex-1" style={{ color: "#1A0A10" }}>
            {bouquet.name}
          </h3>
          <span className="font-black text-base whitespace-nowrap" style={{ color: "#B5184F" }}>
            ₪{bouquet.price}
          </span>
        </div>
        <p className="text-xs leading-relaxed flex-1" style={{ color: "#6B7280" }}>
          {bouquet.description}
        </p>

        {/* Quantity selector */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>כמות</span>
          <QuantitySelector value={quantity} onChange={onQuantityChange} />
        </div>

        {selected && (
          <p className="text-xs font-black text-center px-2 py-1 rounded-lg" style={{ background: "rgba(190,24,93,0.08)", color: "#B5184F" }}>
            סה"כ: ₪{(bouquet.price * quantity).toLocaleString("he-IL")}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────── */
export default function OrderForm({
  content,
  bouquets,
  onComplete,
}: {
  content: ContentMap;
  bouquets: Bouquet[];
  onComplete: (orderId: string, amount: number) => void;
}) {
  const [step, setStep] = useState<"select" | "details">("select");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [arrangementType, setArrangementType] = useState<ArrangementType>("full_set");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const available = bouquets.filter((b) => b.available);

  const selectedItems = available.filter((b) => (quantities[b.id] || 0) > 0);
  const totalAmount = selectedItems.reduce((sum, b) => sum + b.price * (quantities[b.id] || 0), 0);
  const totalCount = selectedItems.reduce((sum, b) => sum + (quantities[b.id] || 0), 0);
  const hasSelection = selectedItems.length > 0;

  const slides = available.map((b) => ({
    src: b.imageUrl || "https://picsum.photos/seed/default/800/600",
    alt: b.name,
  }));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { deliveryType: "delivery", customerEmail: "" },
  });

  const deliveryType = watch("deliveryType");

  function setQty(id: string, n: number) {
    setQuantities((prev) => ({ ...prev, [id]: n }));
  }

  async function onSubmit(data: FormData) {
    if (!hasSelection) return;
    setLoading(true);
    try {
      const items = selectedItems.map((b) => ({
        bouquetId: b.id,
        name: b.name,
        price: b.price,
        imageUrl: b.imageUrl,
        quantity: quantities[b.id] || 0,
      }));
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items, bouquetType: arrangementType }),
      });
      const order = await res.json();
      if (res.ok) onComplete(order.id, totalAmount);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="order"
      className="py-24 px-6"
      style={{ background: "#FFF7F9" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: "#B5184F" }}>
            🛍️ הזמנה קלה ומהירה
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#1A0A10" }}>
            {content.order_title}
          </h2>
          <div className="w-20 h-1.5 mx-auto rounded-full" style={{ background: "#B5184F" }} />
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {["בחרו פרחים", "פרטי הזמנה"].map((label, i) => {
            const active = (i === 0 && step === "select") || (i === 1 && step === "details");
            const done = i === 0 && step === "details";
            return (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: active || done ? "#B5184F" : "#FFF0F5",
                    color: active || done ? "white" : "#6B556A",
                  }}
                >
                  {done ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#1A0A10" }}>{label}</span>
                {i < 1 && <div className="w-12 h-0.5 rounded-full" style={{ background: "#B5184F" }} />}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Select flowers ── */}
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {/* Flower grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
                {available.map((bouquet, i) => (
                  <FlowerCard
                    key={bouquet.id}
                    bouquet={bouquet}
                    quantity={quantities[bouquet.id] || 0}
                    onQuantityChange={(n) => setQty(bouquet.id, n)}
                    onPhotoClick={() => {
                      setLightboxIndex(i);
                      setLightboxOpen(true);
                    }}
                  />
                ))}
              </div>

              {/* Selection summary */}
              <AnimatePresence>
                {hasSelection && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    className="rounded-2xl p-5 mb-6"
                    style={{ background: "rgba(190,24,93,0.05)", border: "1.5px solid rgba(190,24,93,0.18)" }}
                  >
                    <p className="font-bold mb-3" style={{ color: "#1A0A10" }}>
                      הבחירה שלכם ({totalCount} פרחים):
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedItems.map((b) => (
                        <span
                          key={b.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
                          style={{ background: "#B5184F", color: "white" }}
                        >
                          {b.name}
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                            style={{ background: "#F4B942", color: "#1A0A10" }}
                          >
                            {quantities[b.id]}
                          </span>
                        </span>
                      ))}
                    </div>
                    <p className="font-black text-xl" style={{ color: "#B5184F" }}>
                      סה"כ: ₪{totalAmount.toLocaleString("he-IL")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mix / Full Set toggle */}
              <AnimatePresence>
                {hasSelection && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    className="rounded-2xl p-5 mb-8"
                    style={{ background: "white", boxShadow: "0 4px 20px rgba(27,67,50,0.08)" }}
                  >
                    <p className="font-bold mb-4" style={{ color: "#1B4332" }}>
                      איך תרצו לקבל את הפרחים?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          value: "full_set" as const,
                          icon: Layers,
                          title: "זר מלא",
                          desc: "כל פרח בזר נפרד — כל סוג שהזמנתם מגיע בסידור אלגנטי עצמאי",
                        },
                        {
                          value: "mix" as const,
                          icon: Shuffle,
                          title: "מיקס משולב",
                          desc: "כל הסוגים יחד בזר אחד צבעוני ומגוון — שמחה בצבעים!",
                        },
                      ].map(({ value, icon: Icon, title, desc }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setArrangementType(value)}
                          className="text-right p-4 rounded-2xl transition-all"
                          style={{
                            background: arrangementType === value ? "rgba(190,24,93,0.06)" : "white",
                            border: `2px solid ${arrangementType === value ? "#B5184F" : "#FFF0F5"}`,
                            boxShadow: arrangementType === value ? "0 4px 16px rgba(190,24,93,0.15)" : "none",
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: arrangementType === value ? "#B5184F" : "#FFF0F5" }}
                            >
                              <Icon size={18} color={arrangementType === value ? "#F4B942" : "#6B556A"} />
                            </div>
                            <div>
                              <p className="font-bold text-sm mb-1" style={{ color: "#1A0A10" }}>{title}</p>
                              <p className="text-xs leading-relaxed" style={{ color: "#6B556A" }}>{desc}</p>
                            </div>
                            {arrangementType === value && (
                              <Check size={16} className="flex-shrink-0 mt-1" style={{ color: "#B5184F" }} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center">
                <button
                  onClick={() => hasSelection && setStep("details")}
                  disabled={!hasSelection}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ background: "#B5184F", color: "white" }}
                >
                  המשך לפרטים
                  <ChevronLeft size={20} />
                </button>
              </div>

              {!hasSelection && (
                <p className="text-center mt-4 text-sm" style={{ color: "#9CA3AF" }}>
                  בחרו לפחות פרח אחד כדי להמשיך
                </p>
              )}
            </motion.div>
          )}

          {/* ── STEP 2: Customer details ── */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {/* Order summary */}
              <div
                className="rounded-2xl p-5 mb-8"
                style={{ background: "rgba(27,67,50,0.05)", border: "1.5px solid rgba(27,67,50,0.12)" }}
              >
                <p className="font-bold mb-3 text-sm" style={{ color: "#1B4332" }}>סיכום ההזמנה</p>
                <div className="space-y-2 mb-3">
                  {selectedItems.map((b) => (
                    <div key={b.id} className="flex items-center gap-3">
                      <Image
                        src={b.imageUrl || "https://picsum.photos/seed/default/40/40"}
                        alt={b.name}
                        width={36}
                        height={36}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="flex-1 text-sm font-medium" style={{ color: "#1B4332" }}>
                        {b.name} × {quantities[b.id]}
                      </span>
                      <span className="text-sm font-bold" style={{ color: "#D4AF37" }}>
                        ₪{(b.price * (quantities[b.id] || 0)).toLocaleString("he-IL")}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(27,67,50,0.1)" }}>
                  <span className="text-sm font-semibold" style={{ color: "#6B7280" }}>
                    {arrangementType === "mix" ? "🌺 מיקס משולב" : "🌹 זרים נפרדים"} · {totalCount} פרחים
                  </span>
                  <span className="font-black text-lg" style={{ color: "#1B4332" }}>
                    ₪{totalAmount.toLocaleString("he-IL")}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="שם מלא *" error={errors.customerName?.message}>
                    <input {...register("customerName")} placeholder="ישראל ישראלי" className={inputClass} />
                  </Field>
                  <Field label="טלפון *" error={errors.customerPhone?.message}>
                    <input {...register("customerPhone")} placeholder="050-000-0000" type="tel" className={inputClass} dir="ltr" />
                  </Field>
                </div>
                <Field label="אימייל (אופציונלי)" error={errors.customerEmail?.message}>
                  <input {...register("customerEmail")} placeholder="email@example.com" type="email" className={inputClass} dir="ltr" />
                </Field>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: "#1B4332" }}>אופן קבלת הפרחים *</label>
                  <div className="flex gap-4">
                    {[{ value: "delivery", label: "משלוח לכתובת" }, { value: "pickup", label: "איסוף עצמי" }].map(({ value, label }) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 flex-1 p-4 rounded-2xl cursor-pointer transition-all"
                        style={{
                          background: deliveryType === value ? "rgba(27,67,50,0.08)" : "white",
                          border: `2px solid ${deliveryType === value ? "#1B4332" : "#E5E7EB"}`,
                        }}
                      >
                        <input {...register("deliveryType")} type="radio" value={value} className="sr-only" />
                        <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: deliveryType === value ? "#1B4332" : "#D1D5DB" }}>
                          {deliveryType === value && <div className="w-2 h-2 rounded-full" style={{ background: "#1B4332" }} />}
                        </div>
                        <span className="font-medium text-sm" style={{ color: "#1B4332" }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {deliveryType === "delivery" && (
                  <Field label="כתובת משלוח *" error={errors.deliveryAddress?.message}>
                    <input {...register("deliveryAddress")} placeholder="רחוב, מספר בית, עיר" className={inputClass} />
                  </Field>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="תאריך *" error={errors.deliveryDate?.message}>
                    <input {...register("deliveryDate")} type="date" className={inputClass} dir="ltr"
                      min={new Date().toISOString().split("T")[0]} />
                  </Field>
                  <Field label="שעה מועדפת *" error={errors.deliveryTime?.message}>
                    <input {...register("deliveryTime")} type="time" className={inputClass} dir="ltr" />
                  </Field>
                </div>

                <Field label="הודעה לכרטיס ברכה (אופציונלי)">
                  <textarea
                    {...register("greetingMessage")}
                    placeholder="כתבו כאן את ברכתכם האישית..."
                    rows={3}
                    className={inputClass + " resize-none"}
                  />
                </Field>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep("select")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold border-2 transition-all"
                    style={{ borderColor: "#B5184F", color: "#B5184F", background: "white" }}
                  >
                    <ChevronRight size={18} />
                    שינוי בחירה
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 rounded-2xl text-lg font-black transition-all disabled:opacity-60 disabled:shadow-none"
                    style={{ background: "#B5184F", color: "white", flex: 2 }}
                  >
                    {loading ? "שולח..." : `המשך לתשלום — ₪${totalAmount.toLocaleString("he-IL")}`}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </section>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border-2 bg-white text-base font-medium transition-all focus:outline-none focus:border-pink-600";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: "#1A0A10" }}>{label}</label>
      {children}
      {error && <p className="mt-1 text-sm font-medium" style={{ color: "#DC2626" }}>{error}</p>}
    </div>
  );
}
