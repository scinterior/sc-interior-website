import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { images, services, type Language } from "@/lib/content";
import { localizedHref } from "@/lib/site";
export function Process({ lang }: { lang: Language }) {
  const steps = [
    ["Consultation", "พูดคุยความต้องการ", "A conversation about your needs."],
    ["Site Survey", "สำรวจและวัดพื้นที่", "Survey and measure your space."],
    ["3D Design", "ออกแบบและสรุปรายละเอียด", "Design and refine the details."],
    [
      "Production",
      "ผลิตเฟอร์นิเจอร์ที่โรงงาน",
      "Craft furniture in our factory.",
    ],
    [
      "Installation",
      "ติดตั้งและส่งมอบงาน",
      "Install and hand over your space.",
    ],
  ];
  return (
    <section className="section editorial-process reveal" id="process">
      <div className="editorial-heading">
        <p className="eyebrow">OUR PROCESS</p>
        <h2>
          {lang === "th" ? "ใส่ใจในทุกขั้นตอน" : "Every step. Every detail."}
        </h2>
      </div>
      <ol className="process-grid">
        {steps.map(([title, th, en], index) => (
          <li className="process-item" key={title}>
            <span className="process-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{lang === "th" ? th : en}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function ContactCTA({ lang }: { lang: Language }) {
  return (
    <section className="editorial-cta">
      <div className="section reveal">
        <p className="eyebrow">LET’S CREATE YOUR SPACE</p>
        <h2>
          {lang === "th" ? (
            <>
              พื้นที่ที่ดี
              <br />
              <em>เริ่มจากการพูดคุย</em>
            </>
          ) : (
            <>
              Good spaces.
              <br />
              <em>Great conversations.</em>
            </>
          )}
        </h2>
        <Link className="button orange" href={localizedHref("/contact", lang)}>
          {lang === "th" ? "เริ่มต้นพื้นที่ของคุณ" : "Start your space"}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function FactorySection({ lang }: { lang: Language }) {
  return (
    <section className="editorial-factory">
      <div className="section factory-grid reveal">
        <div className="factory-photo">
          <Image
            src={images.factory}
            alt={
              lang === "th"
                ? "ภาพวาด placeholder ไม่ใช่ภาพโรงงานจริง"
                : "Placeholder illustration, not actual factory photography"
            }
            fill
            sizes="(max-width:760px) 100vw, 50vw"
          />
          <span>
            {lang === "th" ? "รอภาพโรงงานจริง" : "FACTORY PHOTOGRAPH PENDING"}
          </span>
        </div>
        <div>
          <p className="eyebrow light">CRAFTED BY SC INTERIOR</p>
          <h2>
            {lang === "th" ? (
              <>
                ผลิตเอง
                <br />
                <em>ดูแลทุกขั้นตอน</em>
              </>
            ) : (
              <>
                From our factory.
                <br />
                <em>To your space.</em>
              </>
            )}
          </h2>
          <p className="factory-description">
            {lang === "th"
              ? "จากการเลือกวัสดุ การผลิต และงานประกอบ สู่การติดตั้งที่เหมาะกับพื้นที่จริง ด้วยโรงงาน ทีมผลิต และทีมติดตั้งของเราเอง"
              : "From selecting materials and production to assembly and installation. Our own factory, production team and installation team care for the details of your space."}
          </p>
          <Link
            className="text-link light-link"
            href={localizedHref("/about", lang)}
          >
            {lang === "th"
              ? "เรื่องราวของ SC Interior"
              : "The SC Interior story"}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function ExpertiseSection({ lang }: { lang: Language }) {
  return (
    <section className="section editorial-expertise reveal">
      <div className="editorial-heading">
        <p className="eyebrow">OUR EXPERTISE</p>
        <div>
          <h2>
            {lang === "th"
              ? "ออกแบบให้ลงตัวกับชีวิต"
              : "Designed around your life."}
          </h2>
          <Link className="text-link" href={localizedHref("/expertise", lang)}>
            {lang === "th" ? "บริการของเรา" : "Explore our expertise"}{" "}
            <span className="direction-arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="expertise-list">
        {services.map((service) => (
          <Link
            href={
              localizedHref("/expertise", lang) + "#service-" + service.number
            }
            key={service.number}
          >
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{lang === "th" ? service.th : service.en}</p>
            <ArrowUpRight size={24} />
          </Link>
        ))}
      </div>
    </section>
  );
}
