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
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <section
      id="testimonials"
      className="py-24 px-6"
      style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "#D4AF37" }}>
            לקוחות מרוצים
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#FFF8F0" }}>
            {content.testimonials_title}
          </h2>
        </motion.div>

        {items.length === 0 ? (
          <p style={{ color: "rgba(255,248,240,0.6)" }}>אין עדיין המלצות</p>
        ) : (
          <>
            <div className="relative overflow-hidden min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-4"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6 justify-center">
                    {Array.from({ length: items[current].rating }).map((_, i) => (
                      <Star key={i} size={20} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                    ))}
                  </div>

                  <blockquote
                    className="text-xl md:text-2xl font-light leading-relaxed mb-6 max-w-2xl"
                    style={{ color: "#FFF8F0" }}
                  >
                    &ldquo;{items[current].text}&rdquo;
                  </blockquote>

                  <footer className="font-bold text-sm" style={{ color: "#D4AF37" }}>
                    — {items[current].author}
                  </footer>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-14">
              <button
                onClick={prev}
                aria-label="המלצה קודמת"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 focus-visible:outline-2"
                style={{ background: "rgba(255,248,240,0.15)", color: "#FFF8F0" }}
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
                      width: i === current ? 24 : 8,
                      height: 8,
                      background: i === current ? "#D4AF37" : "rgba(255,248,240,0.3)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="המלצה הבאה"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 focus-visible:outline-2"
                style={{ background: "rgba(255,248,240,0.15)", color: "#FFF8F0" }}
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
