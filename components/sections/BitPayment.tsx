"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import type { ContentMap } from "@/lib/content";

export default function BitPayment({
  content,
  amount,
  onBack,
}: {
  content: ContentMap;
  amount: number;
  onBack: () => void;
}) {
  const bitUrl = content.bit_link || "https://www.bitpay.co.il/app/";

  return (
    <section className="py-24 px-6" style={{ background: "#FFF8F0" }}>
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-10 text-center"
          style={{ background: "white", boxShadow: "0 8px 40px rgba(27,67,50,0.12)" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(27,67,50,0.08)" }}
          >
            <CheckCircle size={40} style={{ color: "#1B4332" }} />
          </div>

          <h2 className="text-3xl font-black mb-2" style={{ color: "#1B4332" }}>
            ההזמנה נקלטה!
          </h2>
          <p className="mb-8" style={{ color: "#6B7280" }}>
            כעת נדרש אישור התשלום כדי לאשר את הזמנתכם
          </p>

          <div
            className="rounded-2xl p-6 mb-8"
            style={{ background: "rgba(212,175,55,0.08)", border: "2px solid rgba(212,175,55,0.3)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "#6B7280" }}>
              סכום לתשלום
            </p>
            <p className="text-5xl font-black" style={{ color: "#1B4332" }}>
              ₪{amount}
            </p>
          </div>

          <a
            href={bitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-xl font-black mb-4 transition-all active:scale-95"
            style={{ background: "#1976D2", color: "white" }}
          >
            שלמו בביט
            <ExternalLink size={20} />
          </a>

          <p className="text-sm mb-8 leading-relaxed" style={{ color: "#6B7280" }}>
            לאחר התשלום נאשר את הזמנתכם בוואטסאפ 🌸
          </p>

          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            מספר Bit לתשלום: <span className="font-bold" dir="ltr">{content.bit_phone}</span>
          </p>

          <button
            onClick={onBack}
            className="mt-6 text-sm underline transition-opacity hover:opacity-70"
            style={{ color: "#6B7280" }}
          >
            חזרה לדף הבית
          </button>
        </motion.div>
      </div>
    </section>
  );
}
