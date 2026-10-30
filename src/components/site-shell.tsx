"use client";
import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { company, type Language } from "@/lib/content";
import { localizedHref } from "@/lib/site";
export default function SiteShell({
  lang,
  children,
}: {
  lang: Language;
  children: ReactNode;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(false);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.04 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path, lang]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const nav = [
    ["/", t("หน้าแรก", "Home")],
    ["/projects", t("ผลงานของเรา", "Our Projects")],
    ["/expertise", t("บริการของเรา", "Our Expertise")],
    ["/about", t("เกี่ยวกับบริษัท", "About SC")],
    ["/contact", t("ติดต่อเรา", "Contact")],
  ];
  return (
    <div className="editorial-site" lang={lang}>
      <a className="skip-link" href="#main-content">
        {t("ข้ามไปเนื้อหา", "Skip to content")}
      </a>
      <header className="header editorial-header">
        <Link
          href={localizedHref("/", lang)}
          className="brand"
          aria-label="SC Interior Home"
        >
          <span>
            SC INTERIOR<span className="brand-dot">.</span>
          </span>
          <small>DESIGN · BUILT-IN · RENOVATION</small>
        </Link>
        <nav
          id="main-navigation"
          className={open ? "navigation open" : "navigation"}
          aria-label={t("เมนูหลัก", "Main navigation")}
        >
          {nav.map(([href, label]) => (
            <Link
              href={localizedHref(href, lang)}
              key={href}
              aria-current={
                path === href ||
                (href === "/projects" && path.startsWith("/projects/"))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="language"
            href={localizedHref(path, lang === "th" ? "en" : "th")}
            hrefLang={lang === "th" ? "en" : "th"}
            aria-label={t("Switch to English", "เปลี่ยนเป็นภาษาไทย")}
          >
            <span className={lang === "th" ? "active" : ""}>TH</span>
            <span className="language-divider">/</span>
            <span className={lang === "en" ? "active" : ""}>EN</span>
          </Link>
          <Link
            className="header-contact"
            href={localizedHref("/contact", lang)}
          >
            {t("เริ่มต้นพื้นที่ของคุณ", "Start your space")}
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-button"
            aria-label={t("เมนูหลัก", "Toggle menu")}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer editorial-footer">
        <div className="footer-top">
          <div>
            <Link className="brand" href={localizedHref("/", lang)}>
              <span>
                SC INTERIOR<span className="brand-dot">.</span>
              </span>
              <small>DESIGN · BUILT-IN · RENOVATION</small>
            </Link>
            <p>
              {t(
                "บริษัท ศักดิ์ชายการช่าง จำกัด",
                "Sakchai Karnchang Co., Ltd.",
              )}
            </p>
            <small className="logo-note">
              {t(
                "ชื่อบริษัทในรูปแบบข้อความ · รอโลโก้ต้นฉบับ",
                "Company name in text · Original logo pending",
              )}
            </small>
          </div>
          <div className="footer-links">
            <a href={"tel:" + company.telephone}>{company.phone}</a>
            <a
              href={company.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook <span className="direction-arrow" aria-hidden="true" />
            </a>
            <a
              href="https://www.sc-interior.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.sc-interior.com{" "}
              <span className="direction-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SC Interior.</span>
          <span>DESIGNED FOR THE WAY YOU LIVE.</span>
        </div>
      </footer>
      <div className="floating-wrap">
        {notice && (
          <div className="contact-popover" role="status">
            <button
              onClick={() => setNotice(false)}
              aria-label={t("ปิด", "Close")}
            >
              <X size={16} />
            </button>
            <p>
              {t(
                "ลิงก์ LINE อยู่ระหว่างรอข้อมูล กรุณาติดต่อทางโทรศัพท์หรือ Facebook",
                "Our LINE link is pending. Please contact us by phone or Facebook.",
              )}
            </p>
            <a href={"tel:" + company.telephone}>
              {company.phone}{" "}
              <span className="direction-arrow" aria-hidden="true" />
            </a>
            <a
              href={company.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook <span className="direction-arrow" aria-hidden="true" />
            </a>
          </div>
        )}
        <button
          className="floating-contact"
          onClick={() =>
            company.lineUrl
              ? window.open(company.lineUrl, "_blank", "noopener,noreferrer")
              : setNotice(!notice)
          }
          aria-expanded={notice}
          aria-label={t("ติดต่อ SC Interior", "Contact SC Interior")}
        >
          <MessageCircle size={22} />
          <span>{t("คุยกับเรา", "Let’s talk")}</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}
