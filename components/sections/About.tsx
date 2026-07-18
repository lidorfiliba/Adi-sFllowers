"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ContentMap } from "@/lib/content";

const stats = [
  { num: "5,000+", label: "זרים נשלחו", gradient: "linear-gradient(135deg, #BE185D, #EC4899)" },
  { num: "98%", label: "לקוחות מרוצים", gradient: "linear-gradient(135deg, #15803D, #22C55E)" },
  { num: "3 שעות", label: "זמן משלוח", gradient: "linear-gradient(135deg, #D97706, #FBBF24)" },
];

export default function About({ content }: { content: ContentMap }) {
  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FFF1F8 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative background blob */}
            <div
              className="absolute -top-5 -right-5 w-full h-full rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(190,24,93,0.12), rgba(126,34,206,0.1))", zIndex: 0 }}
            />
            <div className="relative rounded-3xl overflow-hidden" style={{ zIndex: 1, boxShadow: "0 20px 60px rgba(190,24,93,0.15)" }}>
              <Image
                src="https://picsum.photos/seed/aboutshop/700/500"
                alt="פרחי הרצליה — חנות הפרחים שלנו"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Years badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute bottom-6 left-6 rounded-2xl p-4 text-center pulse-glow"
              style={{
                background: "linear-gradient(135deg, #BE185D, #7E22CE)",
                zIndex: 2,
                minWidth: 90,
              }}
            >
              <p className="text-3xl font-black text-white">15+</p>
              <p className="text-xs font-semibold text-white/80">שנות ניסיון</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className="text-sm font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "#BE185D" }}
            >
              🌺 הסיפור שלנו
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "#1F0A14" }}>
              {content.about_title}
            </h2>
            <div
              className="w-16 h-1.5 rounded-full mb-8"
              style={{ background: "linear-gradient(90deg, #BE185D, #7E22CE)" }}
            />
            <p className="text-lg leading-relaxed mb-10 prose-he" style={{ color: "#6B4060" }}>
              {content.about_text}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ num, label, gradient }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded-2xl"
                  style={{ background: "white", boxShadow: "0 4px 20px rgba(190,24,93,0.08)" }}
                >
                  <p
                    className="text-xl font-black mb-1"
                    style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {num}
                  </p>
                  <p className="text-xs font-medium" style={{ color: "#9D4E6E" }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
