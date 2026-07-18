import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "פרחי הרצליה | משלוחי פרחים בהרצליה והסביבה",
  description: "זרי פרחים מרהיבים לכל אירוע — יום הולדת, חתונה, אירועים פרטיים ומשלוחים לכל הרצליה. הזמינו עכשיו!",
  openGraph: {
    title: "פרחי הרצליה",
    description: "זרי פרחים מרהיבים לכל אירוע בהרצליה והסביבה",
    locale: "he_IL",
    type: "website",
  },
  keywords: ["פרחים", "הרצליה", "זרים", "משלוח פרחים", "חנות פרחים", "זרי כלה"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body style={{ fontFamily: "var(--font-heebo), 'Arial Hebrew', sans-serif" }}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
