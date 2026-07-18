import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.testimonial.count();
  if (count > 0) {
    console.log(`Testimonials already exist (${count}), skipping.`);
    return;
  }

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

  console.log("✅ Testimonials seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
