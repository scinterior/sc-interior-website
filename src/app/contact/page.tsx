import type { Metadata } from "next";
import { ContactPage } from "@/components/pages";
export const metadata: Metadata = {
  title: "Contact | ติดต่อและขอประเมินราคา",
  description:
    "Contact SC Interior: 081-576-0104, Facebook SCinteriorThailand and factory map. เตรียมข้อความขอประเมินราคาสำหรับส่งด้วยตนเอง",
};
export default function Page() {
  return <ContactPage />;
}
