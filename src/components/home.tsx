"use client";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  MoveUpRight,
  Ruler,
  PanelsTopLeft,
  Armchair,
  House,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { images, company, services } from "@/lib/content";
export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const [menu, setMenu] = useState(false);
  const [gallery, setGallery] = useState<number | null>(null);
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
    if (gallery === null) return;
    const focused = document.activeElement as HTMLElement | null;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGallery(null);
      if (e.key === "ArrowRight")
        setGallery((n) => (n === null ? null : (n + 1) % 3));
      if (e.key === "ArrowLeft")
        setGallery((n) => (n === null ? null : (n + 2) % 3));
      if (e.key === "Tab") {
        const buttons =
          document.querySelectorAll<HTMLButtonElement>(".lightbox button");
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = previous;
      focused?.focus();
    };
  }, [gallery]);
  const nav = [
    ["about", t("เกี่ยวกับเรา", "Our story")],
    ["services", t("บริการของเรา", "Services")],
    ["projects", t("แรงบันดาลใจ", "Inspiration")],
    ["process", t("ขั้นตอนการทำงาน", "Our process")],
  ];
  const samples = [
    {
      image: images.hero,
      title: "The Warm Living",
      type: t(
        "พื้นที่นั่งเล่น · ภาพตัวอย่าง",
        "Living space · Reference image",
      ),
    },
    {
      image: images.bedroom,
      title: "A Quiet Retreat",
      type: t("ห้องนอน · ภาพตัวอย่าง", "Bedroom · Reference image"),
    },
    {
      image: images.kitchen,
      title: "Everyday Harmony",
      type: t("ห้องครัว · ภาพตัวอย่าง", "Kitchen · Reference image"),
    },
  ];
  const socialContact = (url: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else contact();
  };
  const contact = () => {
    setNotice(
      t(
        "กรุณาโทร 081-576-0104 ขณะนี้ยังไม่ได้ระบุบัญชี LINE Official และ Messenger ที่ยืนยันแล้ว",
        "Please call 081-576-0104. Verified LINE Official and Messenger accounts have not been provided yet.",
      ),
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <header className="header">
        <a href="#home" className="brand" aria-label="SC Interior Home">
          <span>
            SC INTERIOR<span className="brand-dot">.</span>
          </span>
          <small>DESIGN · BUILT-IN · RENOVATION</small>
        </a>
        <nav
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
          <button
            className="language"
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            aria-label="Switch language"
          >
            <span className={lang === "th" ? "active" : ""}>TH</span>
            <span className="language-divider">/</span>
            <span className={lang === "en" ? "active" : ""}>EN</span>
          </button>
          <a href="#contact" className="header-contact">
            {t("พูดคุยกับเรา", "Let’s talk")} <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            aria-label="Toggle menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main className="min-w-0">
        <section className="hero" id="home">
          <img
            className="hero-image"
            src={images.hero}
            alt={t(
              "ภาพตัวอย่างห้องนั่งเล่นโทนธรรมชาติ ตกแต่งด้วยไม้และเฟอร์นิเจอร์เรียบหรู",
              "Reference interior with natural wood and warm neutral furniture",
            )}
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow light">
              <span /> SPACES THAT FEEL LIKE YOU
            </div>
            <h1>
              {t("พื้นที่ที่ใช่", "Thoughtful spaces.")}
              <br />
              <em>{t("ในแบบที่เป็นคุณ", "Beautifully yours.")}</em>
            </h1>
            <p>
              {t(
                "ออกแบบอย่างเข้าใจ ใส่ใจในทุกรายละเอียด",
                "Designed with understanding. Crafted with care.",
              )}
              <br />
              {t(
                "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ",
                "From our factory… to every space you trust us with.",
              )}
            </p>
            <div className="hero-buttons">
              <a className="button orange" href="#projects">
                {t("ค้นหาแรงบันดาลใจ", "Explore inspiration")}{" "}
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
            <img
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
            <p className="eyebrow">01 / OUR STORY</p>
            <h2>
              {t("มากกว่าพื้นที่สวยงาม", "More than a beautiful space.")}
              <br />
              <span>{t("คือความใส่ใจที่สัมผัสได้", "Care you can feel.")}</span>
            </h2>
            <p className="body-copy">
              {t(
                "เราเชื่อว่าพื้นที่ที่ดี เริ่มต้นจากความเข้าใจในตัวคุณ SC Interior (บริษัท ศักดิ์ชายการช่าง จำกัด) ดูแลการออกแบบตกแต่งภายใน ผลิตเฟอร์นิเจอร์บิลท์อิน และรีโนเวท ให้ทุกพื้นที่ตอบโจทย์การใช้ชีวิตจริง",
                "We believe a great space starts with understanding you. SC Interior (Sakchai Karnchang Co., Ltd.) brings interior design, built-in furniture and renovation together around the way you live.",
              )}
            </p>
            <p className="body-copy">
              {t(
                "ด้วยโรงงานผลิตของเราเอง พร้อมทีมผลิตและทีมติดตั้ง เราดูแลตั้งแต่แนวคิดแรกจนถึงวันที่ส่งมอบ เพื่อให้ทุกรายละเอียดลงตัวกับพื้นที่ของคุณ",
                "With our own factory, production team and installation team, we care for every detail, from the first idea to the final handover.",
              )}
            </p>
            <a className="text-link" href="#process">
              {t("ทำความรู้จักวิธีทำงานของเรา", "Discover how we work")}
              <ArrowUpRight size={19} />
            </a>
            <div className="about-facts">
              <div>
                <House size={23} />
                <span>{t("โรงงานผลิตของเราเอง", "Our own factory")}</span>
              </div>
              <div>
                <Check size={23} />
                <span>
                  {t(
                    "รับประกันงานติดตั้ง 1 ปี",
                    "1-year installation warranty",
                  )}
                </span>
              </div>
            </div>
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
                    <div className="service-top">
                      <Icon size={32} strokeWidth={1} />
                      <span>{s.number}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{lang === "th" ? s.th : s.en}</p>
                    <span className="service-arrow">
                      <ArrowUpRight size={20} />
                    </span>
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
              <p className="eyebrow">03 / SPACE INSPIRATION</p>
              <h2>
                {t("จินตนาการถึง", "Imagine your")}{" "}
                <span>{t("พื้นที่ของคุณ", "own space.")}</span>
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
          <div className="project-grid">
            {samples.map((s, i) => (
              <button
                className={"project-card project-" + i}
                key={s.title}
                onClick={() => setGallery(i)}
                aria-label={
                  t("เปิดภาพตัวอย่าง ", "Open reference image ") + s.title
                }
              >
                <div className="project-image">
                  <img src={s.image} alt={s.type} loading="lazy" />
                  <span className="image-label">REFERENCE / 0{i + 1}</span>
                  <span className="project-expand">
                    <MoveUpRight size={22} />
                  </span>
                </div>
                <div className="project-caption">
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.type}</p>
                  </div>
                  <span>0{i + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="promise reveal">
          <div className="promise-inner">
            <p className="eyebrow light">
              CRAFTED WITH CARE, FROM START TO FINISH
            </p>
            <h2>
              {t("จากโรงงานของเรา…", "From our factory…")}
              <br />
              <em>
                {t(
                  "สู่ทุกพื้นที่ที่คุณไว้วางใจ",
                  "to the spaces you trust us with.",
                )}
              </em>
            </h2>
            <div className="promise-features">
              {[
                t("ผลิตเองในโรงงานของเรา", "Made in our own factory"),
                t("ออกแบบตามพื้นที่จริง", "Designed for your actual space"),
                t(
                  "ทีมผลิตและติดตั้งดูแลครบ",
                  "Dedicated production & installation",
                ),
              ].map((x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <p>{x}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="button cream">
              {t("เริ่มต้นพื้นที่ใหม่ไปด้วยกัน", "Let’s create your space")}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <span className="promise-watermark" aria-hidden="true">
            SC
          </span>
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
                "พูดคุยและรับฟังความต้องการ",
                "We listen to your ideas and needs.",
              ],
              [
                "Site Survey",
                "สำรวจและวัดพื้นที่จริง",
                "We survey and measure your space.",
              ],
              [
                "3D Design",
                "ออกแบบภาพ 3 มิติให้เห็นภาพ",
                "We bring your space to life in 3D.",
              ],
              [
                "Factory Production",
                "ผลิตชิ้นงานในโรงงานของเรา",
                "We craft your furniture in our factory.",
              ],
              [
                "Installation & Handover",
                "ติดตั้ง ตรวจสอบ และส่งมอบ",
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
              <p className="eyebrow">05 / LET’S CREATE SOMETHING TOGETHER</p>
              <h2>
                {t("ทุกพื้นที่ดี ๆ", "Every beautiful space")}
                <br />
                <span>
                  {t("เริ่มจากการพูดคุย", "starts with a conversation.")}
                </span>
              </h2>
              <p>
                {t(
                  "เล่าไอเดียของคุณให้เราฟัง แล้วมาสร้างพื้นที่",
                  "Tell us what you have in mind. Let’s create a space",
                )}
                <br />
                {t(
                  "ที่ตอบโจทย์การใช้ชีวิตไปด้วยกัน",
                  "that feels right for the way you live.",
                )}
              </p>
              <a className="contact-phone" href={"tel:" + company.telephone}>
                081-576-0104 <ArrowUpRight size={26} />
              </a>
              <div className="contact-socials">
                <button onClick={() => socialContact(company.lineUrl)}>
                  LINE Official <ArrowUpRight size={15} />
                </button>
                <button onClick={() => socialContact(company.messengerUrl)}>
                  Messenger <ArrowUpRight size={15} />
                </button>
              </div>
              <p className="contact-note">
                {t(
                  "ช่องทางโซเชียลและแผนที่โรงงานอยู่ระหว่างรอข้อมูลที่ยืนยันแล้ว กรุณาติดต่อทางโทรศัพท์",
                  "Verified social links and factory map are pending. Please contact us by phone.",
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
          "ติดต่อ SC Interior ผ่าน LINE",
          "Contact SC Interior via LINE",
        )}
      >
        <MessageCircle size={24} />
        <span>{t("คุยกับเรา", "Let’s talk")}</span>
        <span className="online-dot" />
      </button>
      {gallery !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={samples[gallery].title}
          onClick={() => setGallery(null)}
        >
          <button
            autoFocus
            className="lightbox-close"
            onClick={() => setGallery(null)}
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <img src={samples[gallery].image} alt={samples[gallery].type} />
            <p>
              {samples[gallery].title} — {samples[gallery].type}
            </p>
            <div className="gallery-controls">
              <button onClick={() => setGallery((gallery + 2) % 3)}>
                ← {t("ก่อนหน้า", "Previous")}
              </button>
              <span>{gallery + 1} / 3</span>
              <button onClick={() => setGallery((gallery + 1) % 3)}>
                {t("ถัดไป", "Next")} →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function Quotation({ lang }: { lang: "th" | "en" }) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const t = (a: string, b: string) => (lang === "th" ? a : b);
  return (
    <form
      className="quotation"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setMessage(
          `${t("ขอประเมินราคา SC Interior", "SC Interior quotation request")}\n${t("ชื่อ", "Name")}: ${data.get("name")}\n${t("โทร", "Phone")}: ${data.get("phone")}\n${t("ประเภทพื้นที่", "Space")}: ${data.get("space")}\n${t("รายละเอียด", "Details")}: ${data.get("details")}`,
        );
        setCopied(false);
      }}
    >
      <h3>{t("เริ่มต้นโปรเจกต์ของคุณ", "Start your project")}</h3>
      <p className="form-intro">
        {t(
          "เตรียมรายละเอียดสำหรับขอประเมินราคาเบื้องต้น",
          "Prepare your details for an initial quotation.",
        )}
      </p>
      <div className="form-row">
        <label>
          {t("ชื่อของคุณ", "Your name")} *
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={t("ชื่อ – นามสกุล", "Full name")}
          />
        </label>
        <label>
          {t("เบอร์โทรศัพท์", "Phone number")} *
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            pattern="[0-9+() -]{8,20}"
            maxLength={20}
            placeholder="08X-XXX-XXXX"
          />
        </label>
      </div>
      <label>
        {t("ประเภทพื้นที่", "Space type")} *
        <select name="space" required defaultValue="">
          <option value="" disabled>
            {t("เลือกประเภทพื้นที่", "Select your space")}
          </option>
          <option>{t("บ้าน", "House")}</option>
          <option>{t("คอนโด", "Condominium")}</option>
          <option>{t("พื้นที่เชิงพาณิชย์", "Commercial space")}</option>
          <option>{t("อื่น ๆ", "Other")}</option>
        </select>
      </label>
      <label>
        {t("เล่าให้เราฟังเกี่ยวกับโปรเจกต์", "Tell us about your project")}
        <textarea
          name="details"
          rows={3}
          maxLength={2000}
          placeholder={t(
            "ขนาดพื้นที่ บริการที่สนใจ และงบประมาณเบื้องต้น…",
            "Approximate size, services and budget…",
          )}
        />
      </label>
      <p className="form-disclosure">
        {t(
          "แบบฟอร์มนี้เตรียมข้อความบนอุปกรณ์ของคุณเท่านั้น ยังไม่ส่งหรือบันทึกข้อมูลถึงบริษัท กรุณาคัดลอกข้อความแล้วติดต่อทีมงานทางโทรศัพท์",
          "This form prepares a message on your device. It does not send or store your information with the company. Copy the details and contact our team by phone.",
        )}
      </p>
      <button className="button orange" type="submit">
        {t("เตรียมข้อความขอประเมินราคา", "Prepare quotation request")}
        <ArrowUpRight size={18} />
      </button>
      {message && (
        <div className="form-result" role="status">
          <label>
            {t("ข้อความพร้อมสำหรับติดต่อทีมงาน", "Your message is ready")}
            <textarea readOnly value={message} rows={6} />
          </label>
          <button
            type="button"
            className="text-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied
              ? t("คัดลอกแล้ว", "Copied")
              : t("คัดลอกข้อความ", "Copy message")}{" "}
            <ArrowUpRight size={16} />
          </button>
          <a href={"tel:" + company.telephone} className="text-link">
            {t("โทรติดต่อทีมงาน", "Call our team")} <Phone size={16} />
          </a>
        </div>
      )}
    </form>
  );
}
