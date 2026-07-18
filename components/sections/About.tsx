"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ContentMap } from "@/lib/content";

export default function About({ content }: { content: ContentMap }) {
  const imgSrc = content.about_image || "https://picsum.photos/seed/aboutshop/700/500";

  return (
    <section id="about" className="py-24 px-6" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="absolute -top-4 -right-4 w-full h-full rounded-3xl hidden sm:block"
              style={{ background: "#FFF0F5", zIndex: 0 }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ zIndex: 1, boxShadow: "0 8px 40px rgba(181,24,79,0.12)" }}
            >
              <Image
                src={imgSrc}
                alt="פרחי הרצליה — חנות הפרחים שלנו"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase mb-3 block" style={{ color: "#B5184F" }}>
              הסיפור שלנו
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: "#1A0A10" }}>
              {content.about_title}
            </h2>
            <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#B5184F" }} />
            <p className="text-lg leading-relaxed mb-10 prose-he" style={{ color: "#6B556A" }}>
              {content.about_text}
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
