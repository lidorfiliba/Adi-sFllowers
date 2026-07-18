"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ContentMap } from "@/lib/content";

export default function About({ content }: { content: ContentMap }) {
  return (
    <section id="about" className="py-24 px-6" style={{ background: "#FFF8F0" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="absolute -top-4 -right-4 w-full h-full rounded-3xl"
              style={{ background: "rgba(212,175,55,0.15)", zIndex: 0 }}
            />
            <div className="relative rounded-3xl overflow-hidden" style={{ zIndex: 1 }}>
              <Image
                src="https://picsum.photos/seed/aboutshop/700/500"
                alt="פרחי הרצליה — חנות הפרחים שלנו"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Stats badges */}
            <div
              className="absolute bottom-6 left-6 rounded-2xl p-4 text-center"
              style={{ background: "white", boxShadow: "0 8px 30px rgba(27,67,50,0.15)", zIndex: 2 }}
            >
              <p className="text-3xl font-black" style={{ color: "#1B4332" }}>15+</p>
              <p className="text-xs font-semibold" style={{ color: "#6B7280" }}>שנות ניסיון</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: "#D4AF37" }}
            >
              הסיפור שלנו
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "#1B4332" }}>
              {content.about_title}
            </h2>
            <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#D4AF37" }} />
            <p className="text-lg leading-relaxed mb-8 prose-he" style={{ color: "#4B5563" }}>
              {content.about_text}
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "5,000+", label: "זרים נשלחו" },
                { num: "98%", label: "לקוחות מרוצים" },
                { num: "משלוח", label: "עד 3 שעות" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black" style={{ color: "#1B4332" }}>{num}</p>
                  <p className="text-xs font-medium mt-1" style={{ color: "#6B7280" }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
