"use client";

import { motion } from "framer-motion";
import type { ContentMap } from "@/lib/content";

export default function About({ content }: { content: ContentMap }) {
  return (
    <section id="about" className="py-24 px-6" style={{ background: "#ffffff" }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-widest uppercase mb-3 block" style={{ color: "#B5184F" }}>
            הסיפור שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: "#1A0A10" }}>
            {content.about_title}
          </h2>
          <div className="w-16 h-1 rounded-full mb-8 mx-auto" style={{ background: "#B5184F" }} />
          <p className="text-lg leading-relaxed" style={{ color: "#6B556A" }}>
            {content.about_text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
