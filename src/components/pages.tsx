"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactCTA, useLanguage } from "./site";
import { Process } from "./home";
import { company, services } from "@/lib/content";
export function ExpertisePage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <section className="section page-intro">
        <p className="eyebrow">OUR EXPERTISE</p>
        <h1>
          {t(
            "คิดอย่างใส่ใจ\nสร้างอย่างเข้าใจ",
            "Thoughtfully designed.\nPurposefully made.",
          )}
        </h1>
        <p>
          {t(
            "ออกแบบ ตกแต่ง ผลิต และติดตั้ง เพื่อพื้นที่ที่ตอบโจทย์ชีวิตจริง",
            "Design, renovation, furniture production and installation, shaped around real life.",
          )}
        </p>
      </section>
      <div className="section service-stories">
        {services.map((s, i) => (
          <section id={s.icon} className="service-story" key={s.number}>
            <div className="story-photo">
              <Image
                src={i % 2 ? "/images/kitchen.webp" : "/images/living.webp"}
                alt={t(
                  "ภาพแนวคิด AI ตัวอย่าง ไม่ใช่ผลงานจริง",
                  "AI concept placeholder, not a completed project",
                )}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <span className="image-label">
                {t("ภาพแนวคิดตัวอย่าง", "CONCEPT PLACEHOLDER")}
              </span>
            </div>
            <div>
              <p className="eyebrow">{s.number} / SC INTERIOR</p>
              <h2>{s.title}</h2>
              <h3>{t(s.th, s.en)}</h3>
              <p>
                {t(
                  [
                    "เริ่มต้นจากความต้องการและสัดส่วนของพื้นที่ พัฒนาแบบ 3D เพื่อสื่อสารแนวคิด วัสดุ และฟังก์ชันก่อนเข้าสู่การผลิต",
                    "เฟอร์นิเจอร์บิลท์อินที่ออกแบบให้เหมาะกับพื้นที่ การจัดเก็บ และการใช้งาน ผลิตโดยโรงงานของ SC Interior พร้อมดูแลการติดตั้ง",
                    "ปรับปรุงพื้นที่เดิมให้ตอบรับรูปแบบชีวิตใหม่ ประเมินขอบเขตงานและสภาพพื้นที่ก่อนสรุปรายละเอียดร่วมกัน",
                    "ออกแบบเฟอร์นิเจอร์เฉพาะพื้นที่ เลือกขนาด วัสดุ และรายละเอียดร่วมกัน เพื่อความสวยงามและการใช้งานที่สอดคล้องกัน",
                  ][i],
                  [
                    "Begin with your needs and the proportions of the space. Develop a 3D design to explore materials, ideas and function before production.",
                    "Built-in furniture tailored to your layout, storage and daily routines. Produced by SC Interior’s factory with installation care.",
                    "Adapt a familiar space to a new way of living. Review existing conditions and agree the scope of work together.",
                    "Furniture designed for your space. Consider dimensions, materials and details together to connect form with everyday function.",
                  ][i],
                )}
              </p>
              <Link className="text-link" href="/contact">
                {t("ปรึกษางานนี้กับเรา", "Discuss your project")}{" "}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <Process />
      <ContactCTA />
    </main>
  );
}
export function AboutPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <section className="section page-intro">
        <p className="eyebrow">ABOUT SC INTERIOR</p>
        <h1>
          {t(
            "ผลิตเอง\nดูแลทุกขั้นตอน",
            "Crafted with care.\nConnected at every step.",
          )}
        </h1>
        <p>
          {t(
            "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ",
            "From our factory to your space.",
          )}
        </p>
      </section>
      <section className="about-banner">
        <Image
          src="/images/kitchen.webp"
          alt={t(
            "ภาพแนวคิดตัวอย่าง รอภาพโรงงานจริง",
            "Concept placeholder, actual factory photography pending",
          )}
          fill
          sizes="100vw"
          priority
        />
        <span className="image-label">
          {t(
            "ภาพแนวคิด AI ตัวอย่าง · ไม่ใช่ภาพโรงงานจริง",
            "AI CONCEPT · NOT AN ACTUAL FACTORY PHOTOGRAPH",
          )}
        </span>
      </section>
      <section className="section about-story">
        <p className="eyebrow">DESIGN / PRODUCTION / INSTALLATION</p>
        <div>
          <h2>
            {t(
              "พื้นที่ที่ดี เริ่มจากความเข้าใจ",
              "Good spaces begin with understanding.",
            )}
          </h2>
          <p>
            {t(
              "SC Interior ให้บริการออกแบบตกแต่งภายใน เฟอร์นิเจอร์บิลท์อิน รีโนเวท และเฟอร์นิเจอร์สั่งทำ โดยเชื่อมงานออกแบบกับการผลิตและติดตั้ง ให้รายละเอียดของพื้นที่และความต้องการของผู้ใช้งานเดินไปด้วยกัน",
              "SC Interior brings together interior design, built-in furniture, renovation and custom furniture. Design, production and installation connect the details of a space with the needs of the people who use it.",
            )}
          </p>
          <h3>{t("โรงงานและกระบวนการผลิต", "Our factory & production")}</h3>
          <p>
            {t(
              "ผลิตเฟอร์นิเจอร์โดยโรงงานของ SC Interior ตั้งแต่การสรุปแบบ วัสดุ และรายละเอียด ไปจนถึงการเตรียมผลิตและติดตั้ง ภาพโรงงาน เครื่องจักร และขั้นตอนการทำงานจริงจะเพิ่มเติมเมื่อได้รับข้อมูลที่บริษัทอนุมัติ",
              "Furniture is produced by SC Interior’s factory, connecting design and material decisions with production and installation. Approved factory, machinery and workshop photography will be added when supplied.",
            )}
          </p>
          <h3>{t("ทีมงานและการติดตั้ง", "People & installation")}</h3>
          <p>
            {t(
              "ประสานรายละเอียดก่อนผลิตและติดตั้ง พร้อมตรวจสอบงานก่อนส่งมอบ รายละเอียดทีมงานจะนำเสนอเมื่อได้รับข้อมูลที่ยืนยันแล้ว",
              "Coordinate the details before production and installation, and review the work before handover. Verified team information will be added when available.",
            )}
          </p>
          <h3>
            {t(
              "การรับประกันและดูแลหลังติดตั้ง",
              "Warranty & after-installation care",
            )}
          </h3>
          <p>
            {t(
              "การรับประกันงานติดตั้งเป็นไปตามเงื่อนไขของบริษัท กรุณาสอบถามขอบเขต ระยะเวลา และข้อยกเว้นที่ใช้กับงานของคุณก่อนตกลงว่าจ้าง",
              "Installation warranty is subject to company terms. Please confirm the applicable scope, duration and exclusions for your project before commissioning work.",
            )}
          </p>
          <a
            className="text-link"
            href={company.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("แผนที่โรงงาน", "Factory location")} <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
export function ContactPage() {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  function prepare(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fields = [
      ["name", t("ชื่อ", "Name")],
      ["phone", t("โทรศัพท์", "Phone")],
      ["location", t("สถานที่ติดตั้ง", "Location")],
      ["type", t("ประเภทงาน", "Work type")],
      ["area", t("ขนาดพื้นที่", "Area")],
      ["budget", t("งบประมาณ", "Budget")],
      ["details", t("รายละเอียดงาน", "Details")],
    ];
    setMessage(
      `${t("ขอประเมินราคา — SC Interior", "Quotation enquiry — SC Interior")}\n\n${fields.map(([k, label]) => `${label}: ${String(data.get(k) || "—").trim()}`).join("\n")}`,
    );
    setNotice(
      t(
        "เตรียมข้อความแล้ว ยังไม่มีการส่งข้อมูล กรุณาคัดลอกแล้วส่งด้วยตนเอง",
        "Message prepared. Nothing has been sent. Please copy and send it yourself.",
      ),
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setNotice(
        t(
          "คัดลอกข้อความแล้ว กรุณาส่งผ่านช่องทางติดต่อด้วยตนเอง",
          "Copied. Please send the message through your chosen contact channel.",
        ),
      );
    } catch {
      setNotice(
        t(
          "คัดลอกอัตโนมัติไม่ได้ กรุณาเลือกและคัดลอกจากช่องข้อความ",
          "Automatic copy is unavailable. Select and copy the text below.",
        ),
      );
    }
  }
  return (
    <main id="main">
      <section className="section page-intro">
        <p className="eyebrow">CONTACT / START YOUR PROJECT</p>
        <h1>
          {t(
            "ให้เราเป็นส่วนหนึ่ง\nของพื้นที่ที่คุณรัก",
            "Let’s create a space\nyou’ll love.",
          )}
        </h1>
        <p>
          {t(
            "เล่าความต้องการของคุณ แล้วเริ่มต้นวางแผนร่วมกัน",
            "Tell us what you have in mind. We’ll begin with a conversation.",
          )}
        </p>
      </section>
      <section className="section contact-layout">
        <div className="contact-details">
          <p className="eyebrow">A CONVERSATION STARTS HERE</p>
          <a className="contact-phone" href={`tel:${company.telephone}`}>
            {company.phone} <ArrowUpRight aria-hidden="true" size={15} />
          </a>
          <dl>
            <div>
              <dt>FACEBOOK</dt>
              <dd>
                <a href={company.facebookUrl} target="_blank" rel="noreferrer">
                  SCinteriorThailand{" "}
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </dd>
            </div>
            <div>
              <dt>FACTORY MAP</dt>
              <dd>
                <a href={company.mapUrl} target="_blank" rel="noreferrer">
                  {t("ดูแผนที่โรงงาน", "View factory location")}{" "}
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </dd>
            </div>
            <div>
              <dt>WEBSITE</dt>
              <dd>
                <a
                  href="https://www.sc-interior.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.sc-interior.com{" "}
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </dd>
            </div>
            <div>
              <dt>LINE OFFICIAL</dt>
              <dd>
                {company.lineUrl ? (
                  <a href={company.lineUrl} target="_blank" rel="noreferrer">
                    LINE <ArrowUpRight aria-hidden="true" size={15} />
                  </a>
                ) : (
                  t(
                    "รอลิงก์บัญชีทางการที่ยืนยันแล้ว",
                    "Verified official link pending",
                  )
                )}
              </dd>
            </div>
          </dl>
          <p className="sample-note">
            {t(
              "ฟอร์มนี้เตรียมข้อความในอุปกรณ์ของคุณเท่านั้น ไม่ส่งและไม่บันทึกข้อมูลบนเซิร์ฟเวอร์ กรุณาส่งข้อความผ่าน Facebook ด้วยตนเอง หรือโทรติดต่อบริษัท",
              "This form only prepares a message on your device. It does not transmit or store your details on a server. Send it through Facebook yourself, or call us.",
            )}
          </p>
        </div>
        <div className="quotation">
          <h2>{t("ขอประเมินราคา", "Tell us about your project.")}</h2>
          <form onSubmit={prepare}>
            <div className="form-grid">
              <label>
                {t("ชื่อ", "Name")} *
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                {t("เบอร์โทรศัพท์", "Phone number")} *
                <input
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  required
                  pattern={"[+0-9\\(\\) .\\-]{8,20}"}
                  maxLength={20}
                  title={t(
                    "กรอกหมายเลขโทรศัพท์ 8–20 ตัวอักษร",
                    "Enter a phone number, 8–20 characters",
                  )}
                />
              </label>
              <label className="full-field">
                {t("สถานที่ติดตั้ง", "Installation location")} *
                <input name="location" required maxLength={250} />
              </label>
              <label>
                {t("ประเภทงาน", "Work type")} *
                <select
                  aria-label={t("ประเภทงาน *", "Work type *")}
                  name="type"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("เลือกประเภทงาน", "Choose work type")}
                  </option>
                  {services.map((s) => (
                    <option key={s.icon}>{s.title}</option>
                  ))}
                </select>
              </label>
              <label>
                {t("ขนาดพื้นที่ (ตร.ม.)", "Area (m²)")}
                <input name="area" type="number" min="1" max="1000000" />
              </label>
              <label className="full-field">
                {t("งบประมาณโดยประมาณ (บาท)", "Estimated budget (THB)")}
                <input
                  name="budget"
                  type="number"
                  min="0"
                  step="1000"
                  max="10000000000"
                />
              </label>
              <label className="full-field">
                {t("รายละเอียดงาน", "Project details")} *
                <textarea name="details" required rows={4} maxLength={4000} />
              </label>
            </div>
            <button className="button" type="submit">
              {t("เตรียมข้อความขอประเมินราคา", "Prepare quotation message")}{" "}
              <ArrowUpRight size={18} />
            </button>
          </form>
          <p role="status" className="form-notice">
            {notice}
          </p>
          {message && (
            <div className="prepared-message">
              <label htmlFor="prepared">
                {t(
                  "ข้อความที่เตรียมไว้ — ยังไม่ได้ส่ง",
                  "Prepared message — not sent",
                )}
              </label>
              <textarea id="prepared" value={message} readOnly rows={12} />
              <div className="message-actions">
                <button className="button" onClick={copy}>
                  {t("คัดลอกข้อความ", "Copy message")}
                </button>
                <a
                  className="text-link"
                  href={company.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("เปิด Facebook เพื่อส่งเอง", "Open Facebook to send")}{" "}
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
