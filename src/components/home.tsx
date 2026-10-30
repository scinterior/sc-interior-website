"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectGallery from "./project-gallery";
import Quotation from "./quotation";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  MessageCircle,
  Ruler,
  PanelsTopLeft,
  Armchair,
  House,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { images, company, services, type Language } from "@/lib/content";
export default function Home({ lang = "th" }: { lang?: Language }) {
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [faq, setFaq] = useState<number | null>(0);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menu]);
  const nav = [
    ["home", t("หน้าแรก", "Home")],
    ["about", t("เกี่ยวกับเรา", "About Us")],
    ["services", t("บริการของเรา", "Services")],
    ["projects", t("ผลงานของเรา", "Our Projects")],
    ["process", t("ขั้นตอนการทำงาน", "Our Process")],
    ["contact", t("ติดต่อเรา", "Contact Us")],
  ];
  const socialContact = (url: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else contact();
  };
  const contact = () => {
    setNotice(
      t(
        "ลิงก์ LINE Official อยู่ระหว่างรอข้อมูล กรุณาโทร 081-576-0104 หรือติดต่อ Facebook SCinteriorThailand",
        "Our LINE Official link is pending. Please call 081-576-0104 or contact Facebook SCinteriorThailand.",
      ),
    );
    document.getElementById("contact")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("ข้ามไปเนื้อหา", "Skip to content")}
      </a>
      <header className="header">
        <a href="#home" className="brand" aria-label="SC Interior Home">
          <span>
            SC INTERIOR<span className="brand-dot">.</span>
          </span>
          <small>DESIGN · BUILT-IN · RENOVATION</small>
        </a>
        <nav
          id="main-navigation"
          className={menu ? "navigation open" : "navigation"}
          aria-label={t("เมนูหลัก", "Main navigation")}
        >
          {nav.map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="language"
            href={lang === "th" ? "/?lang=en" : "/"}
            hrefLang={lang === "th" ? "en" : "th"}
            aria-label={t("Switch to English", "เปลี่ยนเป็นภาษาไทย")}
          >
            <span className={lang === "th" ? "active" : ""}>TH</span>
            <span className="language-divider">/</span>
            <span className={lang === "en" ? "active" : ""}>EN</span>
          </Link>
          <a href="#contact" className="header-contact">
            {t("พูดคุยกับเรา", "Let’s talk")} <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            aria-label="Toggle menu"
            aria-expanded={menu}
            aria-controls="main-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content" className="min-w-0" lang={lang}>
        <section className="hero" id="home">
          <Image
            fill
            sizes="100vw"
            className="hero-image"
            src={images.hero}
            alt={t(
              "ภาพตัวอย่างห้องนั่งเล่นโทนธรรมชาติ ตกแต่งด้วยไม้และเฟอร์นิเจอร์เรียบหรู",
              "Reference interior with natural wood and warm neutral furniture",
            )}
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow light">
              <span /> DESIGN • BUILT-IN • RENOVATION
            </div>
            <h1 className={lang === "en" ? "hero-title-en" : undefined}>
              {lang === "th" ? (
                <>
                  ออกแบบทุกพื้นที่
                  <br />
                  <em>ให้เป็นตัวคุณ</em>
                </>
              ) : (
                <>
                  DESIGN • BUILT-IN
                  <br />
                  <em>• RENOVATION</em>
                </>
              )}
            </h1>
            <p>
              {t(
                "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ",
                "From our factory… to every space you trust us with.",
              )}
            </p>
            <div className="hero-buttons">
              <a className="button orange" href="#projects">
                {t("ดูผลงานของเรา", "View Our Projects")}{" "}
                <ArrowUpRight size={18} />
              </a>
              <a href="#contact" className="hero-secondary">
                {t("ขอประเมินราคา", "Get a quotation")} <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>DESIGN • BUILT-IN • RENOVATION</span>
            <span className="hero-image-note">
              {t("ภาพตัวอย่างสร้างด้วย AI", "AI CONCEPT IMAGE")}
            </span>
            <a href="#about">
              SCROLL TO DISCOVER <span>↓</span>
            </a>
          </div>
          <div className="hero-index">
            <span>SC</span> / INTERIOR
          </div>
        </section>
        <div className="intro-strip">
          <span>THOUGHTFULLY DESIGNED.</span>
          <i>✳</i>
          <span>PRECISELY CRAFTED.</span>
          <i>✳</i>
          <span>MADE FOR YOUR LIFE.</span>
          <i>✳</i>
          <span>SC INTERIOR</span>
        </div>
        <section id="about" className="section about reveal">
          <div className="about-photo">
            <Image
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              src={images.detail}
              alt={t(
                "ภาพตัวอย่างรายละเอียดวัสดุไม้และเฟอร์นิเจอร์ภายใน",
                "Reference of natural materials and interior furniture",
              )}
              loading="lazy"
            />
            <div className="photo-tag">
              <span>THE ART OF</span>
              <strong>Thoughtful living.</strong>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">01 / ABOUT SC INTERIOR</p>
            <h2 className="about-heading">
              SC INTERIOR
              <br />
              <span>DESIGN &amp; BUILT-IN SPECIALIST</span>
            </h2>
            <p className="body-copy">
              {t(
                "SC Interior ให้บริการออกแบบตกแต่งภายใน ผลิตเฟอร์นิเจอร์บิ้วอิน และรีโนเวท พร้อมโรงงานผลิตของเราเอง ดูแลทุกขั้นตอนตั้งแต่การออกแบบ การผลิต ไปจนถึงการติดตั้ง เพื่อให้ทุกพื้นที่ตอบโจทย์การใช้งานและสไตล์ของลูกค้า",
                "SC Interior provides interior design, built-in furniture and renovation with our own factory. We care for every step, from design and production to installation, creating spaces that suit your needs and style.",
              )}
            </p>
            <a className="text-link" href="#process">
              {t("ทำความรู้จักวิธีทำงานของเรา", "Discover how we work")}
              <ArrowUpRight size={19} />
            </a>
            <div className="about-facts">
              {[
                t("โรงงานผลิตของเราเอง", "Our own factory"),
                t(
                  "ออกแบบตามพื้นที่และความต้องการจริง",
                  "Designed for your space and needs",
                ),
                t(
                  "ดูแลตั้งแต่เริ่มต้นจนส่งมอบงาน",
                  "Care from the first idea to handover",
                ),
              ].map((fact) => (
                <div key={fact}>
                  <Check size={20} />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
            <p className="warranty-note">
              {t("รับประกันงานติดตั้ง 1 ปี", "1-year installation warranty")}
            </p>
          </div>
        </section>
        <section id="services" className="services-section">
          <div className="section services-inner reveal">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / OUR EXPERTISE</p>
                <h2>
                  {t("ครบทุกเรื่อง", "Considered design.")}
                  <br />
                  <span>{t("เพื่อพื้นที่ของคุณ", "Complete care.")}</span>
                </h2>
              </div>
              <p className="heading-description">
                {t(
                  "จากแนวคิด สู่ชิ้นงานจริง ดูแลครบทุกขั้นตอน",
                  "From your first idea to the final detail.",
                )}
                <br />
                {t(
                  "ด้วยการออกแบบ ผลิต และติดตั้งที่ใส่ใจ",
                  "Design, production and installation, thoughtfully connected.",
                )}
              </p>
            </div>
            <div className="service-grid">
              {services.map((s, i) => {
                const Icon = [Ruler, PanelsTopLeft, House, Armchair][i];
                return (
                  <a className="service-card" key={s.number} href="#contact">
                    <div className="service-photo">
                      <Image
                        src={s.image}
                        alt={
                          t(
                            "ภาพ AI ตัวอย่างแนวทาง ",
                            "AI design reference for ",
                          ) + s.title
                        }
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 300px"
                      />
                      <span>{t("ภาพตัวอย่าง", "REFERENCE")}</span>
                    </div>
                    <div className="service-content">
                      <div className="service-top">
                        <Icon size={32} strokeWidth={1} />
                        <span>{s.number}</span>
                      </div>
                      <h3>{s.title}</h3>
                      <p>{lang === "th" ? s.th : s.en}</p>
                      <span className="service-arrow">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
            <p className="service-foot">
              FACTORY PRODUCTION & INSTALLATION{" "}
              <span>
                —{" "}
                {t(
                  "จากโรงงานของเรา สู่พื้นที่ของคุณ",
                  "From our factory to your space",
                )}
              </span>
            </p>
          </div>
        </section>
        <section id="projects" className="section projects reveal">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / OUR PROJECTS</p>
              <h2>
                {t("ทุกพื้นที่", "Every space")}
                <br />
                <span>{t("มีเรื่องราวของตัวเอง", "has its own story.")}</span>
              </h2>
            </div>
            <a className="text-link" href="#contact">
              {t("ปรึกษาเรื่องพื้นที่ของคุณ", "Tell us about your space")}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <p className="sample-disclaimer">
            {t(
              "ภาพต่อไปนี้สร้างด้วย AI เพื่อสื่อถึงแนวทางการออกแบบ ไม่ใช่ผลงานของ SC Interior ผลงานจริงจะเพิ่มหลังได้รับการยืนยัน",
              "The following AI-generated images illustrate design inspiration and are not SC Interior projects. Verified company projects will be added when available.",
            )}
          </p>
          <ProjectGallery lang={lang} />
        </section>
        <section id="factory" className="promise reveal">
          <div className="promise-inner factory-grid">
            <div className="factory-photo">
              <Image
                src={images.factory}
                alt={t(
                  "ภาพวาดพื้นที่สำรองสำหรับภาพโรงงาน ไม่ใช่ภาพโรงงานจริงของ SC Interior",
                  "Factory photo placeholder illustration, not an image of SC Interior facilities",
                )}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <span>
                {t(
                  "พื้นที่สำหรับภาพโรงงานจริง",
                  "SPACE FOR OUR FACTORY PHOTOGRAPH",
                )}
              </span>
            </div>
            <div className="factory-copy">
              <p className="eyebrow light">FACTORY &amp; CRAFTSMANSHIP</p>
              <h2>
                FROM OUR FACTORY
                <br />
                <em>TO YOUR SPACE</em>
              </h2>
              <p className="factory-description">
                {t(
                  "เราให้ความสำคัญกับทุกขั้นตอน ตั้งแต่การเลือกวัสดุ การผลิตด้วยเครื่องจักร ไปจนถึงงานประกอบและติดตั้ง เพื่อให้ได้เฟอร์นิเจอร์ที่สวยงามและเหมาะสมกับการใช้งานจริง",
                  "We care about every step, from selecting materials and machine production to assembly and installation, creating furniture that is beautiful and suited to everyday use.",
                )}
              </p>
              <div className="promise-features">
                {[
                  t("เลือกวัสดุ", "Materials"),
                  t("ผลิตและประกอบ", "Production"),
                  t("ติดตั้งและส่งมอบ", "Installation"),
                ].map((feature, index) => (
                  <div key={feature}>
                    <span>0{index + 1}</span>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <a href="#contact" className="button cream">
                {t("เริ่มต้นพื้นที่ใหม่ไปด้วยกัน", "Let’s create your space")}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section id="process" className="section process reveal">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / HOW WE WORK</p>
              <h2>
                {t("ทุกขั้นตอน", "Every step.")}{" "}
                <span>{t("เราใส่ใจ", "Every detail.")}</span>
              </h2>
            </div>
            <p className="heading-description">
              {t(
                "ดูแลคุณตั้งแต่เริ่มต้น จนพร้อมเข้าอยู่",
                "With you from the first conversation to handover.",
              )}
            </p>
          </div>
          <div className="process-grid">
            {[
              [
                "Consultation",
                "พูดคุยรายละเอียดและความต้องการ",
                "We listen to your ideas and needs.",
              ],
              [
                "Site Survey",
                "สำรวจและวัดพื้นที่หน้างาน",
                "We survey and measure your space.",
              ],
              [
                "3D Design",
                "ออกแบบและสรุปรายละเอียด",
                "We bring your space to life in 3D.",
              ],
              [
                "Production",
                "ผลิตเฟอร์นิเจอร์จากโรงงาน",
                "We craft your furniture in our factory.",
              ],
              [
                "Installation",
                "ติดตั้งและส่งมอบงาน",
                "We install, inspect and hand over.",
              ],
            ].map((s, i) => (
              <div className="process-item" key={s[0]}>
                <div className="process-number">
                  0{i + 1}
                  <ArrowRight size={16} />
                </div>
                <h3>{s[0]}</h3>
                <p>{lang === "th" ? s[1] : s[2]}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section faq-section reveal">
          <div>
            <p className="eyebrow">A LITTLE MORE TO KNOW</p>
            <h2>{t("ก่อนเริ่มต้น", "Before we begin.")}</h2>
          </div>
          <div className="faq-list">
            {[
              [
                t(
                  "SC Interior ดูแลส่วนไหนบ้าง?",
                  "What does SC Interior provide?",
                ),
                t(
                  "เราดูแลตั้งแต่ออกแบบตกแต่งภายใน เฟอร์นิเจอร์บิลท์อิน รีโนเวท และเฟอร์นิเจอร์สั่งทำ ไปจนถึงการผลิตในโรงงานและติดตั้ง",
                  "We provide interior design, built-in and custom furniture, renovation, factory production and installation.",
                ),
              ],
              [
                t(
                  "มีการรับประกันงานหรือไม่?",
                  "Is installation covered by a warranty?",
                ),
                t(
                  "บริษัทรับประกันงานติดตั้ง 1 ปี สามารถสอบถามรายละเอียดและเงื่อนไขกับทีมงานก่อนเริ่มโครงการ",
                  "We provide a 1-year installation warranty. Please ask our team about the details and terms before your project begins.",
                ),
              ],
              [
                t(
                  "เริ่มขอประเมินราคาอย่างไร?",
                  "How can I request a quotation?",
                ),
                t(
                  "เตรียมประเภทพื้นที่ ขนาดโดยประมาณ และความต้องการเบื้องต้น แล้วโทรหาเรา หรือใช้แบบฟอร์มด้านล่างเพื่อเตรียมข้อความสำหรับติดต่อทีมงาน",
                  "Prepare your space type, approximate size and initial requirements. Call us or use the form below to prepare a message for our team.",
                ),
              ],
            ].map(([q, a], i) => (
              <div className="faq-item" key={q}>
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  aria-expanded={faq === i}
                >
                  {q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {faq === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="section contact-inner reveal">
            <div className="contact-copy">
              <p className="eyebrow">05 / CONTACT &amp; QUOTATION</p>
              <h2>
                LET’S CREATE
                <br />
                <span>YOUR SPACE</span>
              </h2>
              <p>
                {t(
                  "กำลังมองหาทีมออกแบบและบิ้วอินที่เข้าใจความต้องการของคุณ? ให้ SC Interior ช่วยดูแลพื้นที่ของคุณ",
                  "Looking for a design and built-in team that understands your needs? Let SC Interior help you create your space.",
                )}
              </p>
              <a className="contact-phone" href={"tel:" + company.telephone}>
                081-576-0104 <ArrowUpRight size={26} />
              </a>
              <div className="contact-socials">
                <button onClick={() => socialContact(company.lineUrl)}>
                  LINE Official <ArrowUpRight size={15} />
                </button>
                <a
                  href={company.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook: SCinteriorThailand <ArrowUpRight size={15} />
                </a>
                <a
                  href={company.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("แผนที่โรงงาน", "Factory map")}
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="contact-note">
                {t(
                  "ลิงก์ LINE Official อยู่ระหว่างรอข้อมูล สามารถติดต่อทางโทรศัพท์หรือ Facebook และเปิดแผนที่โรงงานด้านบน",
                  "Our LINE Official link is pending. Contact us by phone or Facebook, or open the factory map above.",
                )}
              </p>
              {notice && (
                <p role="status" className="notice">
                  {notice}
                </p>
              )}
            </div>
            <Quotation lang={lang} />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <a href="#home" className="brand">
              <span>
                SC INTERIOR<span className="brand-dot">.</span>
              </span>
              <small>DESIGN · BUILT-IN · RENOVATION</small>
            </a>
            <p>
              {t(
                "บริษัท ศักดิ์ชายการช่าง จำกัด",
                "Sakchai Karnchang Co., Ltd.",
              )}
            </p>
            <small className="logo-note">
              {t(
                "พื้นที่สำหรับโลโก้ต้นฉบับ · ปัจจุบันแสดงชื่อบริษัทเป็นข้อความ",
                "Original logo pending · Company name shown as text",
              )}
            </small>
          </div>
          <a href="#home" className="back-top">
            BACK TO TOP ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} SC Interior. All rights reserved.
          </span>
          <span>DESIGNED FOR THE WAY YOU LIVE.</span>
        </div>
      </footer>
      <button
        className="floating-contact"
        onClick={() => socialContact(company.lineUrl)}
        aria-label={t(
          "ติดต่อ SC Interior — ลิงก์ LINE อยู่ระหว่างรอข้อมูล",
          "Contact SC Interior — LINE link pending",
        )}
      >
        <MessageCircle size={24} />
        <span>{t("คุยกับเรา", "Let’s talk")}</span>
        <ArrowUpRight size={14} />
      </button>
    </>
  );
}
