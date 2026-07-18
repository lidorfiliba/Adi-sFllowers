"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import type { ContentMap } from "@/lib/content";

export default function Contact({ content }: { content: ContentMap }) {
  const whatsappLink = `https://wa.me/${content.contact_whatsapp}`;

  const items = [
    {
      icon: Phone,
      label: "טלפון",
      value: content.contact_phone,
      href: `tel:${content.contact_phone}`,
      gradient: "linear-gradient(135deg, #BE185D, #EC4899)",
      glow: "rgba(190,24,93,0.2)",
    },
    {
      icon: MessageCircle,
      label: "וואטסאפ",
      value: "שלחו לנו הודעה",
      href: whatsappLink,
      gradient: "linear-gradient(135deg, #15803D, #22C55E)",
      glow: "rgba(21,128,61,0.2)",
    },
    {
      icon: MapPin,
      label: "כתובת",
      value: content.contact_address,
      href: `https://maps.google.com/?q=${encodeURIComponent(content.contact_address)}`,
      gradient: "linear-gradient(135deg, #F97316, #FB923C)",
      glow: "rgba(249,115,22,0.2)",
    },
    {
      icon: Clock,
      label: "שעות פעילות",
      value: content.contact_hours,
      href: null,
      gradient: "linear-gradient(135deg, #D97706, #FBBF24)",
      glow: "rgba(217,119,6,0.2)",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FCE7F3 0%, #FFF1F8 100%)" }}
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
            className="text-sm font-bold tracking-widest uppercase mb-4 block"
            style={{ color: "#BE185D" }}
          >
            📍 נשמח לשמוע
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1F0A14" }}>
            {content.contact_title}
          </h2>
          <div
            className="w-20 h-1.5 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #BE185D, #7E22CE)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: item.gradient }}
                  >
                    <Icon size={22} color="white" />
                  </div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "#9D4E6E" }}>
                    {item.label}
                  </p>
                  <p className="font-bold leading-snug text-sm" style={{ color: "#1F0A14" }}>
                    {item.value}
                  </p>
                </>
              );

              const cardStyle = {
                background: "white",
                boxShadow: "0 4px 20px rgba(190,24,93,0.07)",
                border: "1px solid rgba(190,24,93,0.08)",
              };

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block p-6 rounded-2xl transition-all hover:-translate-y-1"
                      style={cardStyle}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 32px ${item.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(190,24,93,0.07)";
                      }}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="p-6 rounded-2xl" style={cardStyle}>{inner}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl overflow-hidden h-80"
            style={{ boxShadow: "0 12px 40px rgba(190,24,93,0.15)" }}
          >
            {content.contact_map_embed ? (
              <div dangerouslySetInnerHTML={{ __html: content.contact_map_embed }} className="w-full h-full" />
            ) : (
              <iframe
                title="מיקום החנות"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(content.contact_address)}&output=embed`}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
