import Image from "next/image";
import SiteShell from "@/components/site-shell";
import { ContactCTA, FactorySection } from "@/components/editorial-sections";
import { images } from "@/lib/content";
import { getLanguage, pageMetadata, type LanguageSearch } from "@/lib/site";
type Props = { searchParams: LanguageSearch };
export async function generateMetadata({ searchParams }: Props) {
  return pageMetadata(
    "/about",
    await getLanguage(searchParams),
    "เกี่ยวกับ SC Interior และโรงงาน",
    "About SC Interior & Our Factory",
    "SC Interior บริษัท ศักดิ์ชายการช่าง จำกัด ผลิตเอง ดูแลทุกขั้นตอน ตั้งแต่ออกแบบ ผลิต จนติดตั้ง",
    "SC Interior (Sakchai Karnchang Co., Ltd.): our own factory, production and installation teams, from design to handover.",
  );
}
export default async function About({ searchParams }: Props) {
  const lang = await getLanguage(searchParams);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  return (
    <SiteShell lang={lang}>
      <section className="section page-heading">
        <p className="eyebrow">ABOUT SC INTERIOR</p>
        <h1>
          {t("พื้นที่ที่คุณไว้วางใจ", "Spaces you trust.")}
          <br />
          <em>{t("ความใส่ใจที่สัมผัสได้", "Care you can feel.")}</em>
        </h1>
        <p className="page-description">
          {t(
            "บริษัท ศักดิ์ชายการช่าง จำกัด — Design • Built-in • Renovation",
            "Sakchai Karnchang Co., Ltd. — Design • Built-in • Renovation",
          )}
        </p>
      </section>
      <div className="about-editorial-image">
        <Image
          src={images.hero}
          alt={t(
            "ภาพ AI อ้างอิงแนวทางตกแต่งภายใน ไม่ใช่ผลงานจริง",
            "AI interior reference, not an actual company project",
          )}
          fill
          sizes="100vw"
          loading="eager"
        />
        <span>{t("ภาพตัวอย่างสร้างด้วย AI", "AI REFERENCE IMAGE")}</span>
      </div>
      <section className="section about-narrative reveal">
        <p className="eyebrow">THE SC INTERIOR APPROACH</p>
        <div>
          <h2>{t("ผลิตเอง ดูแลทุกขั้นตอน", "Made by us. Cared for by us.")}</h2>
          <p className="body-copy">
            {t(
              "SC Interior ให้บริการออกแบบตกแต่งภายใน ผลิตเฟอร์นิเจอร์บิ้วอิน รีโนเวท และเฟอร์นิเจอร์สั่งผลิต เราเริ่มจากความเข้าใจในพื้นที่และความต้องการจริงของคุณ เพื่อให้ความสวยงามและการใช้งานอยู่ร่วมกันอย่างลงตัว",
              "SC Interior offers interior design, built-in furniture, renovation and custom furniture. We start by understanding your actual space and needs, balancing beautiful design with everyday function.",
            )}
          </p>
          <p className="body-copy">
            {t(
              "ด้วยโรงงานของเราเอง พร้อมทีมผลิตและทีมติดตั้ง เราดูแลตั้งแต่การออกแบบ การเลือกวัสดุ การผลิตด้วยเครื่องจักร งานประกอบ ไปจนถึงการติดตั้งและส่งมอบ",
              "With our own factory, production team and installation team, we care for design, materials, machine production, assembly, installation and handover.",
            )}
          </p>
        </div>
      </section>
      <FactorySection lang={lang} />
      <section className="section about-values reveal">
        <p className="eyebrow">DESIGNED. CRAFTED. INSTALLED.</p>
        <h2>
          {t(
            "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ",
            "From our factory… to every space you trust us with.",
          )}
        </h2>
        <div className="values-grid">
          {[
            [
              t("เข้าใจพื้นที่จริง", "Understand the space"),
              t(
                "ออกแบบตามขนาดและความต้องการใช้งาน",
                "Designed around actual dimensions and needs.",
              ),
            ],
            [
              t("ทีมผลิตและติดตั้ง", "Production & installation"),
              t(
                "ดูแลชิ้นงานและรายละเอียดจนถึงวันส่งมอบ",
                "Care for the furniture and details through handover.",
              ),
            ],
            [
              t("รับประกันงานติดตั้ง 1 ปี", "1-year installation warranty"),
              t(
                "สอบถามเงื่อนไขและรายละเอียดกับทีมงานก่อนเริ่มโครงการ",
                "Please confirm warranty details and terms with our team before your project begins.",
              ),
            ],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
        <p className="reference-disclaimer">
          {t(
            "ภาพโรงงาน เครื่องจักร และทีมงานจริงอยู่ระหว่างรอไฟล์ที่ได้รับการยืนยัน",
            "Actual factory, machinery and team photographs are pending approved assets.",
          )}
        </p>
      </section>
      <ContactCTA lang={lang} />
    </SiteShell>
  );
}
