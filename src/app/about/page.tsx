import type { Metadata } from "next";
import { AboutPage } from "@/components/pages";
export const metadata: Metadata = {
  title: "About SC | ผลิตเอง ดูแลทุกขั้นตอน",
  description:
    "SC Interior — from our factory to your space. งานออกแบบ การผลิตเฟอร์นิเจอร์ และการติดตั้ง พร้อมการรับประกันตามเงื่อนไขบริษัท",
};
export default function Page() {
  return <AboutPage />;
}
