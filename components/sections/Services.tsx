"use client";

import { motion } from "framer-motion";
import { Truck, Scissors, Cake, Star, Heart, Flower } from "lucide-react";
import type { ContentMap } from "@/lib/content";

const services = [
  {
    icon: Truck,
    title: "משלוחי פרחים",
    description: "משלוח מהיר ואמין בהרצליה וכל הסביבה — הפרחים שלכם יגיעו טריים ומרהיבים",
    gradient: "linear-gradient(135deg, #BE185D, #EC4899)",
    glow: "rgba(190,24,93,0.25)",
  },
  {
    icon: Scissors,
    title: "שזירה במקום",
    description: "בואו לחנות, בחרו את הפרחים שאהבתם ונשזור את הזר מול עיניכם",
    gradient: "linear-gradient(135deg, #15803D, #22C55E)",
    glow: "rgba(21,128,61,0.25)",
  },
  {
    icon: Cake,
    title: "זרי יום הולדת",
    description: "הפכו כל יום הולדת לבלתי נשכח עם זר מרהיב ומותאם אישית",
    gradient: "linear-gradient(135deg, #D97706, #FBBF24)",
    glow: "rgba(217,119,6,0.25)",
  },
  {
    icon: Star,
    title: "אירועים פרטיים",
    description: "עיצוב פרחוני מלא לכל אירוע — ברית, בר מצווה, מסיבת גן ועוד",
    gradient: "linear-gradient(135deg, #7E22CE, #A855F7)",
    glow: "rgba(126,34,206,0.25)",
  },
  {
    icon: Heart,
    title: "חתונות",
    description: "עיצוב פרחוני שלם לחתונה — חופה, שולחנות, זר כלה ועוד",
    gradient: "linear-gradient(135deg, #F97316, #FB923C)",
    glow: "rgba(249,115,22,0.25)",
  },
  {
    icon: Flower,
    title: "סתם כי בא לכם 🌸",
    description: "אין צורך בסיבה מיוחדת — לפעמים הדבר הכי יפה הוא פרחים בלי סיבה",
    gradient: "linear-gradient(135deg, #0891B2, #22D3EE)",
    glow: "rgba(8,145,178,0.25)",
  },
];

export default function Services({ content }: { content: ContentMap }) {
  return (
    <section
      id="services"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FFF1F8 0%, #F5F3FF 100%)" }}
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
            ✨ מה אנחנו מציעים
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1F0A14" }}>
            {content.services_title}
          </h2>
          <div
            className="w-20 h-1.5 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #BE185D, #7E22CE)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group rounded-3xl p-7 cursor-default transition-all duration-300"
                style={{
                  background: "white",
                  boxShadow: `0 4px 24px rgba(0,0,0,0.06)`,
                  border: "1px solid rgba(190,24,93,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${service.glow}, 0 4px 16px rgba(0,0,0,0.06)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: service.gradient }}
                >
                  <Icon size={26} color="white" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1F0A14" }}>
                  {service.title}
                </h3>
                <p className="leading-relaxed text-sm" style={{ color: "#9D4E6E" }}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
