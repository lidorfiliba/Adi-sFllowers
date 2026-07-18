"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import type { ContentMap } from "@/lib/content";

const PETALS = [
  { emoji: "🌸", size: 22, x: "5%",  y: "20%", cls: "petal" },
  { emoji: "🌺", size: 18, x: "91%", y: "16%", cls: "petal-2" },
  { emoji: "🌷", size: 20, x: "80%", y: "68%", cls: "petal-3" },
  { emoji: "🌸", size: 16, x: "3%",  y: "70%", cls: "petal-4" },
];

export default function Hero({ content }: { content: ContentMap }) {
  const whatsappLink = `https://wa.me/${content.contact_whatsapp || content.whatsapp_number}`;

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "72vh",
        background: "linear-gradient(150deg, #FFF8F2 0%, #FFF3F7 60%, #FFF8F2 100%)",
      }}
    >
      {/* Very subtle warm blush border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "#F0DDE7" }} />

      {/* Floating petals — subtle */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`absolute select-none pointer-events-none ${p.cls}`}
          style={{ left: p.x, top: p.y, fontSize: p.size, opacity: 0.35 }}
          aria-hidden
        >
          {p.emoji}
        </span>
      ))}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "#FFF0F5",
              color: "#B5184F",
              border: "1px solid #F0DDE7",
            }}
          >
            🌸 פרחים טריים · משלוח מהיר · הרצליה והסביבה
          </motion.span>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            style={{ color: "#1A0A10" }}
          >
            {content.hero_headline}
          </h1>

          <p
            className="text-base sm:text-lg font-light mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ color: "#6B556A" }}
          >
            {content.hero_subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <motion.a
              href="#order"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold w-full sm:w-auto justify-center"
              style={{
                background: "#B5184F",
                color: "white",
                boxShadow: "0 4px 16px rgba(181,24,79,0.25)",
              }}
            >
              <ShoppingBag size={19} />
              {content.hero_cta_order}
            </motion.a>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold w-full sm:w-auto justify-center"
              style={{
                background: "white",
                color: "#B5184F",
                border: "1.5px solid #F0DDE7",
                boxShadow: "0 2px 8px rgba(181,24,79,0.08)",
              }}
            >
              <MessageCircle size={19} />
              {content.hero_cta_whatsapp}
            </motion.a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
