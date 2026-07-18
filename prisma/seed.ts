import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user — password: pirchei123
  const hash = await bcrypt.hash("pirchei123", 12);
  await prisma.adminUser.upsert({
    where: { id: "admin" },
    update: { passwordHash: hash },
    create: { id: "admin", passwordHash: hash },
  });

  // Site content
  const content = [
    { key: "hero_headline", value: "פרחים שמספרים את הסיפור שלכם" },
    { key: "hero_subheadline", value: "זרי פרחים מרהיבים לכל אירוע — עיצוב אישי, משלוח מהיר בהרצליה והסביבה" },
    { key: "hero_cta_order", value: "הזמינו עכשיו" },
    { key: "hero_cta_whatsapp", value: "צרו קשר בוואטסאפ" },
    { key: "services_title", value: "השירותים שלנו" },
    { key: "gallery_title", value: "הגלריה שלנו" },
    { key: "order_title", value: "הזמינו זר פרחים" },
    { key: "testimonials_title", value: "מה הלקוחות אומרים" },
    { key: "about_title", value: "קצת עלינו" },
    { key: "about_text", value: "פרחי הרצליה הוא בית לפרחים טריים ויצירתיות בלתי מוגבלת. אנחנו שוזרים חלומות לזרים מרהיבים כבר מעל 15 שנה — עם אהבה, מקצועיות וטביעת אצבע אישית בכל זר. הפרחים שלנו מגיעים טריים ישירות מהמגדלים, ואנחנו מבטיחים שכל זר יגיע אליכם באריזה מרהיבה ובחיוך." },
    { key: "contact_title", value: "צרו קשר" },
    { key: "contact_phone", value: "054-123-4567" },
    { key: "contact_whatsapp", value: "972541234567" },
    { key: "contact_address", value: "רחוב סוקולוב 45, הרצליה" },
    { key: "contact_hours", value: "ראשון–חמישי: 08:00–19:00 | שישי: 08:00–14:00 | שבת: סגור" },
    { key: "contact_map_embed", value: "" },
    { key: "bit_phone", value: "0541234567" },
    { key: "bit_link", value: "https://www.bitpay.co.il/app/" },
    { key: "footer_tagline", value: "פרחים שמביאים שמחה לכל רגע" },
    { key: "shop_name", value: "פרחי הרצליה" },
    { key: "whatsapp_number", value: "972541234567" },
    { key: "instagram_url", value: "https://instagram.com" },
    { key: "facebook_url", value: "https://facebook.com" },
  ];

  for (const item of content) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: item,
    });
  }

  // Gallery items
  await prisma.galleryItem.deleteMany();
  const galleryItems = [
    { type: "image", url: "https://picsum.photos/seed/flowers1/800/600", caption: "זר ורדים אדומים רומנטי", sortOrder: 0 },
    { type: "image", url: "https://picsum.photos/seed/flowers2/800/600", caption: "זר פרחי בר קיצי", sortOrder: 1 },
    { type: "image", url: "https://picsum.photos/seed/flowers3/800/600", caption: "עיצוב חתונה מרהיב", sortOrder: 2 },
    { type: "image", url: "https://picsum.photos/seed/flowers4/800/600", caption: "זר יום הולדת צבעוני", sortOrder: 3 },
    { type: "image", url: "https://picsum.photos/seed/flowers5/800/600", caption: "פרחי אביב עדינים", sortOrder: 4 },
    { type: "image", url: "https://picsum.photos/seed/flowers6/800/600", caption: "זר כלה קלאסי לבן", sortOrder: 5 },
    { type: "image", url: "https://picsum.photos/seed/flowers7/800/600", caption: "עיצוב שולחן אירוע", sortOrder: 6 },
    { type: "image", url: "https://picsum.photos/seed/flowers8/800/600", caption: "זר מיקס טרופי", sortOrder: 7 },
  ];
  await prisma.galleryItem.createMany({ data: galleryItems });

  // Bouquet catalog
  await prisma.bouquetCatalog.deleteMany();
  const bouquets = [
    {
      name: "זר ורדים אדומים קלאסי",
      price: 180,
      description: "12 ורדים אדומים טריים באריזה מושלמת — הבחירה האהובה ביום האהבה וליום הנישואין",
      imageUrl: "https://picsum.photos/seed/bouquet1/400/400",
      available: true,
      sortOrder: 0,
    },
    {
      name: "זר פרחי בר צבעוני",
      price: 150,
      description: "שילוב עשיר של פרחי בר עונתיים — כחול, צהוב, סגול ולבן. מביא את ריח הטבע לבית",
      imageUrl: "https://picsum.photos/seed/bouquet2/400/400",
      available: true,
      sortOrder: 1,
    },
    {
      name: "זר יום הולדת פסטל",
      price: 200,
      description: "זר חגיגי בגווני פסטל — ורוד, לילך ולבן. מושלם להפתיע את האהובים ביום המיוחד שלהם",
      imageUrl: "https://picsum.photos/seed/bouquet3/400/400",
      available: true,
      sortOrder: 2,
    },
    {
      name: "זר חתן וכלה",
      price: 350,
      description: "עיצוב פרחוני אלגנטי לחתן ולכלה — ורדים לבנים, גרינרי ואוסטרומריה. יוצרים ביחד רגע שלא ישכח",
      imageUrl: "https://picsum.photos/seed/bouquet4/400/400",
      available: true,
      sortOrder: 3,
    },
    {
      name: "פרחים בקופסה — Premium",
      price: 280,
      description: "פרחים יוקרתיים בקופסת קרטון מעוצבת. מתנה מושלמת שנשארת טרייה לזמן רב יותר",
      imageUrl: "https://picsum.photos/seed/bouquet5/400/400",
      available: true,
      sortOrder: 4,
    },
    {
      name: "זר סנטימנטלי — מיקס ורדים",
      price: 220,
      description: "ורדים בגוונים שונים — אדום, ורוד, לבן ופיץ'. כל ורד הוא סיפור בפני עצמו",
      imageUrl: "https://picsum.photos/seed/bouquet6/400/400",
      available: true,
      sortOrder: 5,
    },
    {
      name: "אגרטל פרחים עם בלון",
      price: 250,
      description: "אגרטל זכוכית עם פרחים טריים ובלון יום הולדת שמח — מתנה שמוסיפה חגיגה לחגיגה",
      imageUrl: "https://picsum.photos/seed/bouquet7/400/400",
      available: true,
      sortOrder: 6,
    },
    {
      name: "זר חמניות ושושנים",
      price: 165,
      description: "שילוב שמח ומפתיע — חמניות זהובות לצד שושנות עדינות. מזמינים את האביב הביתה",
      imageUrl: "https://picsum.photos/seed/bouquet8/400/400",
      available: true,
      sortOrder: 7,
    },
  ];
  await prisma.bouquetCatalog.createMany({ data: bouquets });

  // Testimonials
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        author: "מיכל כהן",
        text: "הזמנתי זר ליום הולדת של אמי והיא לא הפסיקה לחייך כל היום! הפרחים היו טריים ומדהימים, האריזה מושלמת והמשלוח הגיע בדיוק בזמן. ממליצה בחום!",
        rating: 5,
        active: true,
      },
      {
        author: "דני לוי",
        text: "הזמנו עיצוב פרחוני לחתונה שלנו ופשוט לא מאמינים כמה יצא יפה. הצוות הקשיב לכל רצון שלנו ויצא בדיוק כמו שדמיינו. תודה ענקית!",
        rating: 5,
        active: true,
      },
      {
        author: "שרה אברהם",
        text: "סתם בא לי לשלוח לחברה שלי פרחים ולא ידעתי מה להזמין. האיש בחנות עזר לי לבחור ובסוף יצא זר כל כך יפה שגם אני רציתי אחד!",
        rating: 5,
        active: true,
      },
      {
        author: "יוסי מזרחי",
        text: "שירות מהיר ומקצועי. הזמנתי ב-WhatsApp ותוך שעתיים הפרחים כבר היו בבית אשתי. בדיוק מה שצריך לגבר שנזכר בדקה ה-90!",
        rating: 5,
        active: true,
      },
      {
        author: "רחל ברקוביץ",
        text: "פרחים מהממים, מחיר הוגן ושירות עם לב. כבר שנה שאני קונה כאן לכל אירוע. פשוט הכי טוב בהרצליה!",
        rating: 5,
        active: true,
      },
    ],
  });

  console.log("✅ Seed completed!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
