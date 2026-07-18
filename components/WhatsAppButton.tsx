"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ number }: { number: string }) {
  return (
    <motion.a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פנו אלינו בוואטסאפ"
      className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ background: "#25D366" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={28} color="white" fill="white" />
    </motion.a>
  );
}
