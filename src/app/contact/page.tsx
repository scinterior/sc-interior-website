import SiteShell from "@/components/site-shell";
import Quotation from "@/components/quotation";
import { company } from "@/lib/content";
import { getLanguage, pageMetadata, type LanguageSearch } from "@/lib/site";
type Props = { searchParams: LanguageSearch };
export async function generateMetadata({ searchParams }: Props) {
  return pageMetadata(
    "/contact",
    await getLanguage(searchParams),
    "ติดต่อและขอประเมินราคา",
    "Contact & Quotation",
    "ติดต่อ SC Interior โทร 081-576-0104 Facebook SCinteriorThailand พร้อมแผนที่โรงงานและแบบเตรียมข้อความขอประเมินราคา",
    "Contact SC Interior at 081-576-0104 or Facebook SCinteriorThailand. Factory map and quotation message preparation.",
  );
}
export default async function Contact({ searchParams }: Props) {
  const lang = await getLanguage(searchParams);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  return (
    <SiteShell lang={lang}>
      <section className="section page-heading contact-page-heading">
        <p className="eyebrow">CONTACT SC INTERIOR</p>
        <h1>
          LET’S CREATE
          <br />
          <em>YOUR SPACE</em>
        </h1>
        <p className="page-description">
          {t(
            "กำลังมองหาทีมออกแบบและบิ้วอินที่เข้าใจความต้องการของคุณ? ให้ SC Interior ช่วยดูแลพื้นที่ของคุณ",
            "Looking for a design and built-in team that understands your needs? Let SC Interior help you create your space.",
          )}
        </p>
      </section>
      <section className="section editorial-contact">
        <div className="contact-details">
          <p className="eyebrow">A CONVERSATION STARTS HERE</p>
          <a className="contact-phone" href={"tel:" + company.telephone}>
            {company.phone}{" "}
            <span className="direction-arrow" aria-hidden="true" />
          </a>
          <div className="contact-destinations">
            <a
              href={company.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>FACEBOOK</span>SCinteriorThailand{" "}
              <span className="direction-arrow" aria-hidden="true" />
            </a>
            <a href={company.mapUrl} target="_blank" rel="noopener noreferrer">
              <span>{t("แผนที่โรงงาน", "FACTORY MAP")}</span>
              {t(
                "เปิดแผนที่โรงงาน SC Interior",
                "Open the SC Interior factory map",
              )}{" "}
              <span className="direction-arrow" aria-hidden="true" />
            </a>
            <a
              href="https://www.sc-interior.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>WEBSITE</span>www.sc-interior.com{" "}
              <span className="direction-arrow" aria-hidden="true" />
            </a>
            {company.lineUrl ? (
              <a
                href={company.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LINE OFFICIAL</span>
                {t("ติดต่อผ่าน LINE", "Contact on LINE")}{" "}
                <span className="direction-arrow" aria-hidden="true" />
              </a>
            ) : (
              <div>
                <span>LINE OFFICIAL</span>
                <p>
                  {t(
                    "อยู่ระหว่างรอลิงก์จริง กรุณาติดต่อทางโทรศัพท์หรือ Facebook",
                    "Verified link pending. Please contact us by phone or Facebook.",
                  )}
                </p>
              </div>
            )}
          </div>
          <p className="body-copy">
            {t("บริษัท ศักดิ์ชายการช่าง จำกัด", "Sakchai Karnchang Co., Ltd.")}
          </p>
        </div>
        <Quotation lang={lang} />
      </section>
    </SiteShell>
  );
}
