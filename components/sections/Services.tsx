"use client";

import { motion } from "framer-motion";
import { Truck, Scissors, Cake, Star, Heart, Flower } from "lucide-react";
import type { ContentMap } from "@/lib/content";

const services = [
  {
    icon: Truck,
    title: "משלוחי פרחים",
    description: "משלוח מהיר ואמין בהרצליה וכל הסביבה — הפרחים שלכם יגיעו טריים ומרהיבים",
    color: "#1B4332",
  },
  {
    icon: Scissors,
    title: "שזירה במקום",
    description: "בואו לחנות, בחרו את הפרחים שאהבתם ונשזור את הזר מול עיניכם",
    color: "#2D6A4F",
  },
  {
    icon: Cake,
    title: "זרי יום הולדת",
    description: "הפכו כל יום הולדת לבלתי נשכח עם זר מרהיב ומותאם אישית",
    color: "#D4AF37",
  },
  {
    icon: Star,
    title: "אירועים פרטיים",
    description: "עיצוב פרחוני מלא לכל אירוע — ברית, בר מצווה, מסיבת גן ועוד",
    color: "#E07A5F",
  },
  {
    icon: Heart,
    title: "חתונות",
    description: "עיצוב פרחוני שלם לחתונה — חופה, שולחנות, זר כלה ועוד",
    color: "#F4A5A5",
  },
  {
    icon: Flower,
    title: "סתם כי בא לכם 🌸",
    description: "אין צורך בסיבה מיוחדת — לפעמים הדבר הכי יפה הוא פרחים בלי סיבה",
    color: "#52B788",
  },
];

export default function Services({ content }: { content: ContentMap }) {
  return (
    <section id="services" className="py-24 px-6" style={{ background: "#FFF8F0" }}>
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
            style={{ color: "#D4AF37" }}
          >
            מה אנחנו מציעים
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1B4332" }}>
            {content.services_title}
          </h2>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ background: "#D4AF37" }} />
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
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group rounded-3xl p-8 cursor-default"
                style={{
                  background: "white",
                  boxShadow: "0 4px 24px rgba(27,67,50,0.08)",
                  border: "1px solid rgba(27,67,50,0.08)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `${service.color}18` }}
                >
                  <Icon size={26} style={{ color: service.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1B4332" }}>
                  {service.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "#6B7280" }}>
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
