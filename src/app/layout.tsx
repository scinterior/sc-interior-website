import type { Metadata } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/noto-sans-thai/300.css";
import "@fontsource/noto-sans-thai/400.css";
import "@fontsource/noto-sans-thai/500.css";
import "@fontsource/noto-sans-thai/600.css";
import "./globals.css";
import { Site } from "@/components/site";
export const metadata: Metadata = {
  metadataBase: new URL("https://sc-interior-website.vercel.app"),
  title: {
    default: "SC Interior | Interior Design, Built-in & Renovation",
    template: "%s | SC Interior",
  },
  description:
    "SC Interior บริษัท ศักดิ์ชายการช่าง จำกัด ออกแบบตกแต่งภายใน เฟอร์นิเจอร์บิลท์อิน และรีโนเวท จากโรงงานของเรา สู่ทุกพื้นที่ที่คุณไว้วางใจ",
  robots: { index: true, follow: true },
  openGraph: {
    title: "SC Interior — Design • Built-in • Renovation",
    description:
      "Interior design, built-in furniture and renovation. จากโรงงานของเรา สู่ทุกพื้นที่ที่คุณไว้วางใจ",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/images/living.webp",
        width: 1536,
        height: 1024,
        alt: "SC Interior — AI concept placeholder, not a completed project",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <Site>{children}</Site>
      </body>
    </html>
  );
}
