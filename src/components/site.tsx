"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
type Lang = "th" | "en";
const Language = createContext<{
  lang: Lang;
  t: (th: string, en: string) => string;
}>({ lang: "th", t: (th) => th });
export const useLanguage = () => useContext(Language);
const navigation = [
  ["/", "หน้าแรก", "Home"],
  ["/projects", "ผลงานของเรา", "Our Projects"],
  ["/expertise", "บริการของเรา", "Our Expertise"],
  ["/about", "เกี่ยวกับบริษัท", "About SC"],
  ["/contact", "ติดต่อเรา", "Contact"],
];
export function Site({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("th");
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sc-language");
      if (saved === "en" || saved === "th") setLang(saved);
    } catch {
      /* Language selection still works when browser storage is unavailable. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);
  return (
    <Language.Provider value={{ lang, t }}>
      <a className="skip-link" href="#main">
        {t("ข้ามไปเนื้อหา", "Skip to content")}
      </a>
      <header className="site-header">
        <Link href="/" className="wordmark">
          SC INTERIOR<span>DESIGN · CRAFT · LIVING</span>
        </Link>
        <nav
          aria-label={t("เมนูหลัก", "Main navigation")}
          id="main-nav"
          className={open ? "navigation is-open" : "navigation"}
        >
          {navigation.map(([href, th, en]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (href === "/" ? path === href : path.startsWith(href))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {t(th, en)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="languages" aria-label="Language">
            {(["th", "en"] as const).map((l) => (
              <button
                key={l}
                aria-pressed={lang === l}
                onClick={() => {
                  setLang(l);
                  try {
                    localStorage.setItem("sc-language", l);
                  } catch {
                    /* Session-only choice. */
                  }
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            id="menu-toggle"
            className="menu-toggle icon-button"
            aria-label={t(
              open ? "ปิดเมนู" : "เปิดเมนู",
              open ? "Close menu" : "Open menu",
            )}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div>
          <Link className="wordmark" href="/">
            SC INTERIOR
          </Link>
          <p>
            {t(
              "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ",
              "From our factory to your space.",
            )}
          </p>
        </div>
        <div>
          <a href="tel:+66815760104">
            081-576-0104 <ArrowUpRight size={15} />
          </a>
          <a
            href="https://www.facebook.com/SCinteriorThailand"
            target="_blank"
            rel="noreferrer"
          >
            Facebook · SCinteriorThailand{" "}
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
          <Link href="/contact">
            {t("ติดต่อและขอประเมินราคา", "Contact & quotation")}{" "}
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
        <div className="footer-note">
          © {new Date().getFullYear()} SC INTERIOR
          <br />
          {t(
            "ภาพแนวคิดตัวอย่าง ไม่ใช่ผลงานจริง",
            "Concept imagery · not completed company work",
          )}
        </div>
      </footer>
    </Language.Provider>
  );
}
export function ContactCTA() {
  const { t } = useLanguage();
  return (
    <section className="contact-cta">
      <p className="eyebrow">LET’S CREATE SOMETHING PERSONAL</p>
      <h2>{t("พื้นที่ของคุณ เรื่องราวบทใหม่", "Your space. A new story.")}</h2>
      <Link className="button light" href="/contact">
        {t("เริ่มต้นพูดคุยกับเรา", "Start a conversation")}{" "}
        <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
