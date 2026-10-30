import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/site-shell";
import { ContactCTA, Process } from "@/components/editorial-sections";
import { services } from "@/lib/content";
import {
  getLanguage,
  localizedHref,
  pageMetadata,
  type LanguageSearch,
} from "@/lib/site";
type Props = { searchParams: LanguageSearch };
export async function generateMetadata({ searchParams }: Props) {
  return pageMetadata(
    "/expertise",
    await getLanguage(searchParams),
    "บริการออกแบบ บิ้วอิน และรีโนเวท",
    "Our Expertise",
    "ออกแบบตกแต่งภายใน เฟอร์นิเจอร์บิ้วอิน รีโนเวท และเฟอร์นิเจอร์สั่งผลิต โดยโรงงานของ SC Interior",
    "Interior design, built-in furniture, renovation and custom furniture, with SC Interior’s own factory.",
  );
}
export default async function Expertise({ searchParams }: Props) {
  const lang = await getLanguage(searchParams);
  const copy = [
    [
      "ออกแบบจากความเข้าใจในการใช้งาน สไตล์ และพื้นที่จริง เพื่อให้ทุกองค์ประกอบอยู่ร่วมกันอย่างลงตัว",
      "Design begins with understanding your needs, style and actual space, bringing every element together.",
    ],
    [
      "ออกแบบและผลิตให้ลงตัวกับขนาดพื้นที่ พร้อมทีมผลิตและทีมติดตั้งที่ดูแลรายละเอียดจนส่งมอบ",
      "Designed and made to fit your actual space, with a production and installation team caring for the final details.",
    ],
    [
      "ทบทวนการใช้งานของพื้นที่เดิม และปรับปรุงให้สอดคล้องกับความต้องการในวันนี้",
      "Reconsider how your existing space works and adapt it to the way you live today.",
    ],
    [
      "เฟอร์นิเจอร์ที่ออกแบบตามความต้องการ ผลิตจากโรงงานของเรา เพื่อการใช้งานที่เหมาะสมกับพื้นที่",
      "Furniture designed around your needs and made in our factory to suit your space.",
    ],
  ];
  return (
    <SiteShell lang={lang}>
      <section className="section page-heading">
        <p className="eyebrow">OUR EXPERTISE</p>
        <h1>
          {lang === "th" ? (
            <>
              ออกแบบพื้นที่
              <br />
              <em>เพื่อชีวิตของคุณ</em>
            </>
          ) : (
            <>
              Thoughtful design.
              <br />
              <em>Complete care.</em>
            </>
          )}
        </h1>
        <p className="page-description">
          {lang === "th"
            ? "ออกแบบ ผลิต และติดตั้ง เชื่อมต่อทุกขั้นตอนด้วยความใส่ใจ"
            : "Design, production and installation, thoughtfully connected."}
        </p>
      </section>
      <div className="section expertise-stories">
        {services.map((service, index) => (
          <section
            id={"service-" + service.number}
            className="expertise-story reveal"
            key={service.number}
          >
            <div className="expertise-photo">
              <Image
                src={service.image}
                alt={
                  lang === "th"
                    ? "ภาพ AI อ้างอิงสำหรับ " + service.title
                    : "AI design reference for " + service.title
                }
                fill
                sizes="(max-width:760px) 100vw, 60vw"
              />
              <span>
                {lang === "th"
                  ? "ภาพอ้างอิง ไม่ใช่ผลงานจริง"
                  : "AI REFERENCE · NOT ACTUAL WORK"}
              </span>
            </div>
            <div>
              <p className="eyebrow">{service.number} / SC INTERIOR</p>
              <h2>{service.title}</h2>
              <p className="service-title-th">
                {lang === "th" ? service.th : service.en}
              </p>
              <p className="body-copy">{copy[index][lang === "th" ? 0 : 1]}</p>
              <Link
                href={localizedHref("/contact", lang)}
                className="text-link"
              >
                {lang === "th"
                  ? "ปรึกษาเรื่องพื้นที่ของคุณ"
                  : "Discuss your space"}{" "}
                <span className="direction-arrow" aria-hidden="true" />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <Process lang={lang} />
      <ContactCTA lang={lang} />
    </SiteShell>
  );
}
