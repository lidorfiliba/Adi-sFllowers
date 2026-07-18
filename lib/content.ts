import { prisma } from "./db";

export type ContentMap = Record<string, string>;

export async function getSiteContent(): Promise<ContentMap> {
  const rows = await prisma.siteContent.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export const DEFAULT_CONTENT: ContentMap = {
  hero_headline: "פרחים שמספרים את הסיפור שלכם",
  hero_subheadline: "זרי פרחים מרהיבים לכל אירוע — עיצוב אישי, משלוח מהיר בהרצליה והסביבה",
  hero_cta_order: "הזמינו עכשיו",
  hero_cta_whatsapp: "צרו קשר בוואטסאפ",
  services_title: "השירותים שלנו",
  gallery_title: "הגלריה שלנו",
  order_title: "הזמינו זר פרחים",
  testimonials_title: "מה הלקוחות אומרים",
  about_title: "קצת עלינו",
  about_text: "פרחי הרצליה הוא בית לפרחים טריים ויצירתיות בלתי מוגבלת. אנחנו שוזרים חלומות לזרים מרהיבים כבר מעל 15 שנה — עם אהבה, מקצועיות וטביעת אצבע אישית בכל זר.",
  about_image: "",
  contact_title: "צרו קשר",
  contact_phone: "054-000-0000",
  contact_whatsapp: "972540000000",
  contact_address: "רחוב הפרחים 12, הרצליה",
  contact_hours: "ראשון-חמישי: 08:00-19:00 | שישי: 08:00-14:00 | שבת: סגור",
  contact_map_embed: "",
  bit_phone: "0540000000",
  bit_link: "https://www.bitpay.co.il/app/",
  footer_tagline: "פרחים שמביאים שמחה לכל רגע",
  shop_name: "פרחי הרצליה",
  whatsapp_number: "972540000000",
};
