"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import type { ContentMap } from "@/lib/content";

const PETALS = [
  { emoji: "🌸", size: 28, x: "8%", y: "15%", cls: "float-1" },
  { emoji: "🌺", size: 22, x: "88%", y: "12%", cls: "float-2" },
  { emoji: "🌹", size: 26, x: "75%", y: "72%", cls: "float-3" },
  { emoji: "💐", size: 32, x: "5%", y: "75%", cls: "float-2" },
  { emoji: "🌷", size: 20, x: "50%", y: "8%", cls: "float-4" },
  { emoji: "✨", size: 18, x: "92%", y: "48%", cls: "float-5" },
  { emoji: "🌸", size: 16, x: "18%", y: "55%", cls: "float-3" },
  { emoji: "💫", size: 20, x: "62%", y: "85%", cls: "float-1" },
];

export default function Hero({ content }: { content: ContentMap }) {
  const whatsappLink = `https://wa.me/${content.contact_whatsapp || content.whatsapp_number}`;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #BE185D 0%, #9333EA 55%, #1D4ED8 100%)",
      }}
    >
      {/* Radial glow blobs */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(251,191,36,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 85%, rgba(34,197,94,0.12) 0%, transparent 45%)
          `,
        }}
      />

      {/* Floating emoji petals */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`absolute select-none pointer-events-none ${p.cls}`}
          style={{ left: p.x, top: p.y, fontSize: p.size, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
          aria-hidden
        >
          {p.emoji}
        </span>
      ))}

      {/* Glass overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.08)" }} />

      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-8"
            style={{
              background: "rgba(255,255,255,0.18)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            🌸 פרחים טריים · משלוח מהיר · הרצליה והסביבה
          </motion.span>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6"
            style={{
              color: "white",
              textShadow: "0 2px 30px rgba(0,0,0,0.3), 0 0 60px rgba(251,191,36,0.2)",
            }}
          >
            {content.hero_headline}
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
          >
            {content.hero_subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#order"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-glow-gold inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-black transition-all w-full sm:w-auto justify-center"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
                color: "#1F0A14",
              }}
            >
              <ShoppingBag size={22} />
              {content.hero_cta_order}
            </motion.a>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold transition-all w-full sm:w-auto justify-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "2px solid rgba(255,255,255,0.45)",
                backdropFilter: "blur(6px)",
              }}
            >
              <MessageCircle size={22} />
              {content.hero_cta_whatsapp}
            </motion.a>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            {[
              { num: "15+", label: "שנות ניסיון" },
              { num: "5,000+", label: "זרים נשלחו" },
              { num: "98%", label: "לקוחות מרוצים" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black" style={{ color: "#FBBF24" }}>{num}</p>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
          <div className="w-1.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
        </div>
      </motion.div>
    </section>
  );
}
