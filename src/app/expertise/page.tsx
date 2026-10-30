import type { Metadata } from "next";
import { ExpertisePage } from "@/components/pages";
export const metadata: Metadata = {
  title: "Our Expertise | ออกแบบ บิลท์อิน รีโนเวท",
  description:
    "Interior design, built-in furniture, renovation and custom furniture by SC Interior. ออกแบบ ผลิต และติดตั้งเพื่อพื้นที่ของคุณ",
};
export default function Page() {
  return <ExpertisePage />;
}
