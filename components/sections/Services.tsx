"use client";

import { motion } from "framer-motion";
import { Truck, Scissors, Cake, Star, Heart, Flower } from "lucide-react";
import type { ContentMap } from "@/lib/content";

const services = [
  { icon: Truck,    title: "משלוחי פרחים",       description: "משלוח מהיר ואמין בהרצליה וכל הסביבה — הפרחים שלכם יגיעו טריים ומרהיבים" },
  { icon: Scissors, title: "שזירה במקום",         description: "בואו לחנות, בחרו את הפרחים שאהבתם ונשזור את הזר מול עיניכם" },
  { icon: Cake,     title: "זרי יום הולדת",       description: "הפכו כל יום הולדת לבלתי נשכח עם זר מרהיב ומותאם אישית" },
  { icon: Star,     title: "אירועים פרטיים",      description: "עיצוב פרחוני מלא לכל אירוע — ברית, בר מצווה, מסיבת גן ועוד" },
  { icon: Heart,    title: "חתונות",              description: "עיצוב פרחוני שלם לחתונה — חופה, שולחנות, זר כלה ועוד" },
  { icon: Flower,   title: "סתם כי בא לכם 🌸",   description: "אין צורך בסיבה מיוחדת — לפעמים הדבר הכי יפה הוא פרחים בלי סיבה" },
];

export default function Services({ content }: { content: ContentMap }) {
  return (
    <section id="services" className="py-24 px-6" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase mb-3 block" style={{ color: "#B5184F" }}>
            מה אנחנו מציעים
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1A0A10" }}>
            {content.services_title}
          </h2>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#B5184F" }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-2xl p-7"
                style={{
                  background: "#ffffff",
                  border: "1px solid #F0DDE7",
                  boxShadow: "0 2px 16px rgba(181,24,79,0.06)",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(181,24,79,0.12)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(181,24,79,0.06)"; }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "#FFF0F5" }}
                >
                  <Icon size={24} style={{ color: "#B5184F" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#1A0A10" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B556A" }}>{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
