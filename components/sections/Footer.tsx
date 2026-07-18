import { MessageCircle, Phone, Instagram, Facebook } from "lucide-react";
import type { ContentMap } from "@/lib/content";

export default function Footer({ content }: { content: ContentMap }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-6"
      style={{ background: "#1B4332", color: "rgba(255,248,240,0.8)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-3" style={{ color: "#FFF8F0" }}>
              🌸 {content.shop_name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,240,0.65)" }}>
              {content.footer_tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: "#D4AF37" }}>ניווט מהיר</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#services", label: "השירותים שלנו" },
                { href: "#gallery", label: "גלריה" },
                { href: "#order", label: "הזמינו זר" },
                { href: "#about", label: "אודות" },
                { href: "#contact", label: "צרו קשר" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors hover:text-white"
                    style={{ color: "rgba(255,248,240,0.65)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: "#D4AF37" }}>יצירת קשר</h4>
            <div className="space-y-3">
              <a
                href={`tel:${content.contact_phone}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,248,240,0.65)" }}
              >
                <Phone size={16} />
                <span dir="ltr">{content.contact_phone}</span>
              </a>
              <a
                href={`https://wa.me/${content.contact_whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,248,240,0.65)" }}
              >
                <MessageCircle size={16} />
                <span>וואטסאפ</span>
              </a>

              {/* Social */}
              <div className="flex gap-4 pt-3">
                {content.instagram_url && (
                  <a
                    href={content.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="אינסטגרם"
                    className="transition-colors hover:text-white"
                    style={{ color: "rgba(255,248,240,0.65)" }}
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {content.facebook_url && (
                  <a
                    href={content.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="פייסבוק"
                    className="transition-colors hover:text-white"
                    style={{ color: "rgba(255,248,240,0.65)" }}
                  >
                    <Facebook size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,248,240,0.12)", color: "rgba(255,248,240,0.4)" }}
        >
          <p>© {year} {content.shop_name} — כל הזכויות שמורות</p>
          <a href="/admin" className="hover:text-white transition-colors">
            ניהול
          </a>
        </div>
      </div>
    </footer>
  );
}
