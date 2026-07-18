"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import OrderForm from "@/components/sections/OrderForm";
import BitPayment from "@/components/sections/BitPayment";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { DEFAULT_CONTENT, type ContentMap } from "@/lib/content";

type Bouquet = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
};

type GalleryItem = { id: string; type: string; url: string; caption: string };
type Testimonial = { id: string; author: string; text: string; rating: number };

export default function HomePage() {
  const [content, setContent] = useState<ContentMap>(DEFAULT_CONTENT);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [orderState, setOrderState] = useState<{
    amount: number;
    showPayment: boolean;
  }>({ amount: 0, showPayment: false });

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent).catch(() => {});
    fetch("/api/catalog").then((r) => r.json()).then(setBouquets).catch(() => {});
    fetch("/api/gallery").then((r) => r.json()).then(setGallery).catch(() => {});
    fetch("/api/testimonials").then((r) => r.json()).then(setTestimonials).catch(() => {});
  }, []);

  if (orderState.showPayment) {
    return (
      <main>
        <BitPayment
          content={content}
          amount={orderState.amount}
          onBack={() => setOrderState({ amount: 0, showPayment: false })}
        />
      </main>
    );
  }

  return (
    <main>
      <Hero content={content} />
      <Services content={content} />
      <Gallery content={content} items={gallery} />
      <OrderForm
        content={content}
        bouquets={bouquets}
        onComplete={(_id, amount) => {
          setOrderState({ amount, showPayment: true });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <Testimonials content={content} items={testimonials} />
      <About content={content} />
      <Contact content={content} />
      <Footer content={content} />
      <WhatsAppButton number={content.whatsapp_number || content.contact_whatsapp} />
    </main>
  );
}
