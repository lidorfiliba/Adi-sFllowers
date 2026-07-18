"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import type { ContentMap } from "@/lib/content";

export default function Contact({ content }: { content: ContentMap }) {
  const whatsappLink = `https://wa.me/${content.contact_whatsapp}`;

  const items = [
    { icon: Phone,         label: "טלפון",         value: content.contact_phone,   href: `tel:${content.contact_phone}` },
    { icon: MessageCircle, label: "וואטסאפ",        value: "שלחו לנו הודעה",        href: whatsappLink },
    { icon: MapPin,        label: "כתובת",          value: content.contact_address, href: `https://maps.google.com/?q=${encodeURIComponent(content.contact_address)}` },
    { icon: Clock,         label: "שעות פעילות",   value: content.contact_hours,   href: null },
  ];

  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#FFF7F9" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase mb-3 block" style={{ color: "#B5184F" }}>
            נשמח לשמוע
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1A0A10" }}>
            {content.contact_title}
          </h2>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#B5184F" }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => {
              const Icon = item.icon;
              const cardStyle = {
                background: "white",
                border: "1px solid #F0DDE7",
                boxShadow: "0 2px 12px rgba(181,24,79,0.05)",
              };
              const inner = (
                <>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "#FFF0F5" }}>
                    <Icon size={20} style={{ color: "#B5184F" }} />
                  </div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "#9C8090" }}>{item.label}</p>
                  <p className="font-bold text-sm leading-snug" style={{ color: "#1A0A10" }}>{item.value}</p>
                </>
              );
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block p-5 rounded-2xl transition-all hover:-translate-y-1"
                      style={cardStyle}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(181,24,79,0.1)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(181,24,79,0.05)"; }}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="p-5 rounded-2xl" style={cardStyle}>{inner}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden h-80"
            style={{ boxShadow: "0 4px 24px rgba(181,24,79,0.1)", border: "1px solid #F0DDE7" }}
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
