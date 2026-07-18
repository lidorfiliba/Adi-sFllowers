"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { ContentMap } from "@/lib/content";

type Testimonial = { id: string; author: string; text: string; rating: number };

export default function Testimonials({ content, items }: { content: ContentMap; items: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <section id="testimonials" className="py-24 px-6" style={{ background: "#FFF7F9" }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase mb-3 block" style={{ color: "#B5184F" }}>
            לקוחות מרוצים
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1A0A10" }}>
            {content.testimonials_title}
          </h2>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#B5184F" }} />
        </motion.div>

        {items.length === 0 ? (
          <p style={{ color: "#9C8090" }}>אין עדיין המלצות</p>
        ) : (
          <>
            <div className="relative overflow-hidden min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-4"
                >
                  <div className="flex gap-1 mb-5 justify-center">
                    {Array.from({ length: items[current].rating }).map((_, i) => (
                      <Star key={i} size={20} fill="#C8892A" style={{ color: "#C8892A" }} />
                    ))}
                  </div>

                  <div
                    className="rounded-2xl px-8 py-6 mb-5 max-w-2xl"
                    style={{ background: "white", border: "1px solid #F0DDE7", boxShadow: "0 2px 16px rgba(181,24,79,0.06)" }}
                  >
                    <blockquote className="text-lg font-light leading-relaxed" style={{ color: "#1A0A10" }}>
                      &ldquo;{items[current].text}&rdquo;
                    </blockquote>
                  </div>

                  <footer className="font-bold text-sm" style={{ color: "#B5184F" }}>
                    — {items[current].author}
                  </footer>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-5 mt-14">
              <button
                onClick={prev}
                aria-label="המלצה קודמת"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "white", border: "1px solid #F0DDE7", color: "#B5184F", boxShadow: "0 2px 8px rgba(181,24,79,0.08)" }}
              >
                <ChevronRight size={18} />
              </button>

              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`עבור להמלצה ${i + 1}`}
                    className="rounded-full transition-all"
                    style={{ width: i === current ? 24 : 8, height: 8, background: i === current ? "#B5184F" : "#F0DDE7" }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="המלצה הבאה"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "white", border: "1px solid #F0DDE7", color: "#B5184F", boxShadow: "0 2px 8px rgba(181,24,79,0.08)" }}
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
