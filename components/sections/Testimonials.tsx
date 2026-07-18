"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { ContentMap } from "@/lib/content";

type Testimonial = { id: string; author: string; text: string; rating: number };

export default function Testimonials({
  content,
  items,
}: {
  content: ContentMap;
  items: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <section
      id="testimonials"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #9F1239 0%, #7E22CE 60%, #1E3A8A 100%)" }}
    >
      {/* Glowing orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 10% 50%, rgba(251,191,36,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 30%, rgba(249,115,22,0.1) 0%, transparent 45%)
          `,
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: "#FBBF24" }}>
            💬 לקוחות מרוצים
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "white" }}>
            {content.testimonials_title}
          </h2>
        </motion.div>

        {items.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.6)" }}>אין עדיין המלצות</p>
        ) : (
          <>
            <div className="relative overflow-hidden min-h-[240px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-2"
                >
                  {/* Stars */}
                  <div className="flex gap-1.5 mb-6 justify-center">
                    {Array.from({ length: items[current].rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={22}
                        fill="#FBBF24"
                        style={{ color: "#FBBF24", filter: "drop-shadow(0 0 6px rgba(251,191,36,0.6))" }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div
                    className="rounded-3xl p-6 mb-6 max-w-2xl"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <blockquote
                      className="text-lg md:text-xl font-light leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.95)" }}
                    >
                      &ldquo;{items[current].text}&rdquo;
                    </blockquote>
                  </div>

                  <footer className="font-black text-sm" style={{ color: "#FBBF24" }}>
                    ✨ {items[current].author}
                  </footer>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-14">
              <button
                onClick={prev}
                aria-label="המלצה קודמת"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <ChevronRight size={20} />
              </button>

              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`עבור להמלצה ${i + 1}`}
                    className="rounded-full transition-all"
                    style={{
                      width: i === current ? 28 : 8,
                      height: 8,
                      background: i === current
                        ? "linear-gradient(90deg, #FBBF24, #F97316)"
                        : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="המלצה הבאה"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
