"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { images, type Language } from "@/lib/content";
import { localizedHref } from "@/lib/site";
const slides = [
  {
    eyebrow: "INTERIOR DESIGN",
    title: "DESIGNING SPACES, DEFINING LIFESTYLES",
    th: "ออกแบบทุกพื้นที่ ให้เป็นตัวคุณ",
    image: images.hero,
  },
  {
    eyebrow: "BUILT-IN FURNITURE",
    title: "CRAFTED TO PERFECTION",
    th: "ทุกรายละเอียด สร้างสรรค์อย่างตั้งใจ",
    image: images.bedroom,
  },
  {
    eyebrow: "MODERN LUXURY",
    title: "WHERE ELEGANCE MEETS FUNCTION",
    th: "ความสวยงามที่มาพร้อมฟังก์ชัน",
    image: images.kitchen,
  },
  {
    eyebrow: "OUR FACTORY",
    title: "FROM OUR FACTORY TO YOUR SPACE",
    th: "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ",
    image: images.detail,
  },
];
export default function HeroSlider({ lang }: { lang: Language }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const remaining = useRef(6500);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    const visibility = () => setHidden(document.hidden);
    update();
    visibility();
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const running = !paused && !reduced && !hidden && !hover && !focused;
  useEffect(() => {
    remaining.current = 6500;
  }, [index]);
  useEffect(() => {
    if (!running) return;
    const started = performance.now();
    const timer = setTimeout(
      () => setIndex((current) => (current + 1) % slides.length),
      remaining.current,
    );
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (performance.now() - started),
      );
    };
  }, [running, index]);
  const move = (direction: number) => {
    setIndex(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };
  return (
    <section
      className={"cinema-hero " + (running ? "is-playing" : "is-paused")}
      aria-roledescription="carousel"
      aria-label={t("บริการ SC Interior", "SC Interior services")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
      onTouchStart={(event) => {
        touch.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }}
      onTouchEnd={(event) => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4)
          move(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <h1 className="sr-only">SC Interior — Design • Built-in • Renovation</h1>
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={"cinema-slide " + (index === i ? "active" : "")}
          aria-hidden={index !== i}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} / ${slides.length}`}
        >
          <Image
            src={slide.image}
            alt={t(
              "ภาพ AI อ้างอิง ไม่ใช่ผลงานหรือโรงงานจริงของ SC Interior",
              "AI reference, not actual SC Interior work or factory photography",
            )}
            fill
            sizes="100vw"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className="cinema-image"
          />
          <div className="cinema-shade" />
          <div className="cinema-copy">
            <p className="eyebrow light">
              0{i + 1} / {slide.eyebrow}
            </p>
            <h2>{slide.title}</h2>
            <p className="cinema-thai">
              {lang === "th"
                ? slide.th
                : slide.eyebrow === "OUR FACTORY"
                  ? "Carefully made, from our factory to your space."
                  : "Thoughtfully designed. Precisely crafted. Made for you."}
            </p>
            <div className="hero-buttons">
              <Link
                tabIndex={i === index ? 0 : -1}
                href={localizedHref("/projects", lang)}
                className="button orange"
              >
                {t("ดูผลงานของเรา", "View Our Projects")}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                tabIndex={i === index ? 0 : -1}
                href={localizedHref("/contact", lang)}
                className="cinema-quotation"
              >
                {t("ขอประเมินราคา", "Get a Quotation")}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="cinema-bottom">
        <span className="cinema-reference">
          {t(
            "ภาพ AI อ้างอิง · ไม่ใช่ผลงานหรือโรงงานจริง",
            "AI REFERENCES · NOT ACTUAL WORK OR FACTORY",
          )}
        </span>
        <div className="slider-controls">
          <button
            onClick={() => move(-1)}
            aria-label={t("สไลด์ก่อนหน้า", "Previous slide")}
          >
            <ArrowLeft size={18} />
          </button>
          <span
            className="slide-counter"
            aria-live={running ? "off" : "polite"}
          >
            {String(index + 1).padStart(2, "0")} <i>/ 04</i>
          </span>
          <button
            onClick={() => move(1)}
            aria-label={t("สไลด์ถัดไป", "Next slide")}
          >
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => {
              setPaused((value) => !value);
              if (paused) {
                setHover(false);
                setFocused(false);
              }
            }}
            aria-pressed={paused}
            disabled={reduced}
            aria-label={
              reduced
                ? t(
                    "ปิดสไลด์อัตโนมัติตามการตั้งค่าลดการเคลื่อนไหว",
                    "Autoplay disabled by reduced motion preference",
                  )
                : paused
                  ? t("เล่นสไลด์อัตโนมัติ", "Play slideshow")
                  : t("หยุดสไลด์อัตโนมัติ", "Pause slideshow")
            }
          >
            {paused || reduced ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </div>
      <div key={index} className="slide-progress" aria-hidden="true">
        <span style={{ animationPlayState: running ? "running" : "paused" }} />
      </div>
    </section>
  );
}
