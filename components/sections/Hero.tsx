"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import type { ContentMap } from "@/lib/content";

export default function Hero({ content }: { content: ContentMap }) {
  const whatsappLink = `https://wa.me/${content.contact_whatsapp || content.whatsapp_number}`;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 40%, #52B788 100%)" }}
    >
      {/* Decorative circles */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, #D4AF37 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #F4A5A5 0%, transparent 50%)`,
        }}
      />

      {/* Floating petals SVG decoration */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={100 + i * 120}
            cy={100 + (i % 3) * 150}
            r={60 + i * 10}
            fill="#D4AF37"
          />
        ))}
      </svg>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(212,175,55,0.25)", color: "#F0D060", border: "1px solid rgba(212,175,55,0.4)" }}
          >
            🌸 פרחים טריים · משלוח מהיר · הרצליה והסביבה
          </motion.span>

          <h1
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
            style={{ color: "#FFF8F0", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            {content.hero_headline}
          </h1>

          <p
            className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,248,240,0.85)" }}
          >
            {content.hero_subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#order"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all"
              style={{ background: "#D4AF37", color: "#1B4332" }}
            >
              <ShoppingBag size={22} />
              {content.hero_cta_order}
            </motion.a>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold border-2 transition-all"
              style={{ borderColor: "rgba(255,248,240,0.5)", color: "#FFF8F0", background: "rgba(255,255,255,0.1)" }}
            >
              <MessageCircle size={22} />
              {content.hero_cta_whatsapp}
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
