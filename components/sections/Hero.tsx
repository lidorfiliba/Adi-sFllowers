"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import type { ContentMap } from "@/lib/content";

const PETALS = [
  { emoji: "🌸", size: 26, x: "7%",  y: "18%", cls: "petal" },
  { emoji: "🌺", size: 20, x: "90%", y: "14%", cls: "petal-2" },
  { emoji: "🌹", size: 24, x: "78%", y: "70%", cls: "petal-3" },
  { emoji: "💐", size: 28, x: "4%",  y: "72%", cls: "petal-2" },
  { emoji: "🌷", size: 18, x: "50%", y: "7%",  cls: "petal-4" },
  { emoji: "🌸", size: 16, x: "20%", y: "82%", cls: "petal-3" },
];

export default function Hero({ content }: { content: ContentMap }) {
  const whatsappLink = `https://wa.me/${content.contact_whatsapp || content.whatsapp_number}`;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(150deg, #7A1035 0%, #B5184F 50%, #D4366E 100%)" }}
    >
      {/* Subtle overlay texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at 25% 60%, rgba(244,185,66,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 25%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
        }}
      />

      {/* Floating petals */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`absolute select-none pointer-events-none ${p.cls}`}
          style={{ left: p.x, top: p.y, fontSize: p.size, opacity: 0.55 }}
          aria-hidden
        >
          {p.emoji}
        </span>
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            🌸 פרחים טריים · משלוח מהיר · הרצליה והסביבה
          </motion.span>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6"
            style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
          >
            {content.hero_headline}
          </h1>

          <p
            className="text-lg sm:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {content.hero_subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#order"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold w-full sm:w-auto justify-center"
              style={{
                background: "white",
                color: "#B5184F",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              }}
            >
              <ShoppingBag size={21} />
              {content.hero_cta_order}
            </motion.a>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold w-full sm:w-auto justify-center"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "white",
                border: "2px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(6px)",
              }}
            >
              <MessageCircle size={21} />
              {content.hero_cta_whatsapp}
            </motion.a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-14 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}
          >
            {[
              { num: "15+", label: "שנות ניסיון" },
              { num: "5,000+", label: "זרים נשלחו" },
              { num: "98%", label: "לקוחות מרוצים" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black" style={{ color: "#F4B942" }}>{num}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "2px solid rgba(255,255,255,0.35)" }}
        >
          <div className="w-1.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.65)" }} />
        </div>
      </motion.div>
    </section>
  );
}
