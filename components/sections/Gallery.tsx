"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { ContentMap } from "@/lib/content";

type GalleryItem = {
  id: string;
  type: string;
  url: string;
  caption: string;
};

export default function Gallery({
  content,
  items,
}: {
  content: ContentMap;
  items: GalleryItem[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = items.map((item) => ({ src: item.url, alt: item.caption }));

  return (
    <section
      id="gallery"
      className="py-24 px-6"
      style={{ background: "#FFF7F9" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: "#B5184F" }}
          >
            עבודות שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1A0A10" }}>
            {content.gallery_title}
          </h2>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ background: "#B5184F" }} />
        </motion.div>

        {items.length === 0 ? (
          <p className="text-center" style={{ color: "#6B7280" }}>
            הגלריה ריקה — הוסיפו תמונות מלוח הניהול
          </p>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => { setIndex(i); setOpen(true); }}
                  className="group relative w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
                  aria-label={`פתח תמונה: ${item.caption || "תמונה מהגלריה"}`}
                >
                  <Image
                    src={item.url}
                    alt={item.caption || "תמונה מהגלריה"}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.caption && (
                    <div
                      className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top, rgba(26,10,16,0.78) 0%, transparent 60%)" }}
                    >
                      <p className="p-4 text-sm font-medium" style={{ color: "white" }}>
                        {item.caption}
                      </p>
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
      />
    </section>
  );
}
