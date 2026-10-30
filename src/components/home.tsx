"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";
import { ContactCTA, useLanguage } from "./site";
import { ProjectCard } from "./portfolio";
import { publishedProjects } from "@/lib/projects";
import { services } from "@/lib/content";
const slides = [
  {
    tag: "INTERIOR DESIGN",
    title: "DESIGNING SPACES, DEFINING LIFESTYLES",
    th: "ออกแบบทุกพื้นที่ ให้เป็นตัวคุณ",
    image: "/images/home-slide-01.png.png",
    position: "60% center",
  },
  {
    tag: "BUILT-IN FURNITURE",
    title: "CRAFTED TO PERFECTION",
    th: "ทุกรายละเอียด สร้างสรรค์อย่างตั้งใจ",
    image: "/images/home-slide-02.png.png",
    position: "55% center",
  },
  {
    tag: "MODERN LUXURY",
    title: "WHERE ELEGANCE MEETS FUNCTION",
    th: "ความสวยงามที่มาพร้อมฟังก์ชัน",
    image: "/images/home-slide-03.png.png",
    position: "65% center",
  },
  {
    tag: "OUR FACTORY",
    title: "FROM OUR FACTORY TO YOUR SPACE",
    th: "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ",
    image: "/images/home-slide-04.png.png",
    position: "left center",
  },
];
function Hero() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [hidden, setHidden] = useState(false);
  const touch = useRef<number | null>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const running = !paused && !reduced && !hidden;
  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6500,
    );
    return () => clearInterval(id);
  }, [running, index]);
  const move = (d: number) =>
    setIndex((i) => (i + d + slides.length) % slides.length);
  return (
    <section
      className={`hero ${running ? "is-playing" : "is-paused"} ${index === 3 ? "hero--factory" : ""}`}
      aria-roledescription="carousel"
      aria-label={t("แนวคิดการออกแบบ 4 สไลด์", "Design concepts, 4 slides")}
      onTouchStart={(e) => {
        touch.current = e.changedTouches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touch.current !== null) {
          const delta = touch.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 50) move(delta > 0 ? 1 : -1);
          touch.current = null;
        }
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.tag}
          aria-hidden={i !== index}
          className={`hero-slide ${i === index ? "active" : ""} ${i === 3 ? "hero-slide--factory" : ""}`}
        >
          <Image
            src={s.image}
            alt=""
            fill
            sizes={i === 3 ? "max(100vw, 280vh)" : "max(100vw, 180vh)"}
            priority={i === 0}
            className="hero-image"
            style={{ objectPosition: s.position }}
          />
        </div>
      ))}
      <div className="hero-shade" />
      <div className="hero-copy" key={index}>
        <p className="eyebrow">SC INTERIOR — {slides[index].tag}</p>
        <h1>{slides[index].title}</h1>
        <p className="hero-thai">
          {t(
            slides[index].th,
            "Thoughtful design. Beautifully made. Uniquely yours.",
          )}
        </p>
        <div className="hero-links">
          <Link className="button light" href="/projects">
            VIEW OUR PROJECTS <ArrowUpRight size={17} />
          </Link>
          <Link className="text-link" href="/contact">
            GET A QUOTATION <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="hero-bottom">
        <span className="hero-disclaimer">
          {index === 3
            ? t(
                "ภาพโรงงาน SC Interior · ภาพต้นฉบับที่บริษัทจัดส่ง",
                "SC Interior factory · original image supplied by the company",
              )
            : "AI Interior Concept | ภาพแนวคิดการออกแบบ"}
        </span>
        <div className="slider-controls">
          <span aria-live={running ? "off" : "polite"}>
            {String(index + 1).padStart(2, "0")}{" "}
            <span className="muted">/ 04</span>
          </span>
          <button
            className="icon-button"
            aria-label={t("สไลด์ก่อนหน้า", "Previous slide")}
            onClick={() => move(-1)}
          >
            <ArrowLeft />
          </button>
          <button
            className="icon-button"
            aria-label={t("สไลด์ถัดไป", "Next slide")}
            onClick={() => move(1)}
          >
            <ArrowRight />
          </button>
          <button
            className="icon-button"
            aria-label={t(
              running ? "หยุดสไลด์" : "เล่นสไลด์",
              running ? "Pause slides" : "Play slides",
            )}
            disabled={reduced}
            title={
              reduced
                ? t(
                    "ปิดการเล่นอัตโนมัติตามการตั้งค่าลดการเคลื่อนไหว",
                    "Autoplay disabled by reduced motion preference",
                  )
                : undefined
            }
            onClick={() => setPaused(!paused)}
          >
            {running ? <Pause size={17} /> : <Play size={17} />}
          </button>
        </div>
      </div>
      <div
        key={`progress-${index}-${running}`}
        className={`hero-progress ${running ? "running" : ""}`}
      />
      <a
        href="#selected"
        className="scroll-cue"
        aria-label={t("เลื่อนดูผลงาน", "Scroll to selected works")}
      >
        <ArrowDown size={17} />
      </a>
    </section>
  );
}
export const processSteps = [
  ["Consultation", "พูดคุยความต้องการ", "Share your needs and inspiration."],
  ["Site Survey", "สำรวจและวัดพื้นที่", "Understand your space."],
  ["3D Design", "ออกแบบและสรุปรายละเอียด", "Refine the design together."],
  ["Production", "ผลิตเฟอร์นิเจอร์ที่โรงงาน", "Bring the details to life."],
  [
    "Installation",
    "ติดตั้งและส่งมอบงาน",
    "Carefully installed, ready for living.",
  ],
];
export function Process() {
  const { t } = useLanguage();
  return (
    <section className="section process">
      <div className="section-heading">
        <div>
          <p className="eyebrow">05 / OUR PROCESS</p>
          <h2>{t("จากความคิด สู่พื้นที่จริง", "From vision to living.")}</h2>
        </div>
        <p>
          {t(
            "ดูแลต่อเนื่องในทุกขั้นตอน",
            "A considered journey, at every step.",
          )}
        </p>
      </div>
      <ol className="process-list">
        {processSteps.map(([title, th, en], i) => (
          <li key={title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{t(th, en)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export default function Home() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <Hero />
      <section id="selected" className="section selected">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / SELECTED WORKS</p>
            <h2>{t("พื้นที่ที่มีเรื่องราว", "Spaces with a story.")}</h2>
          </div>
          <Link className="text-link" href="/projects">
            {t("สำรวจผลงานทั้งหมด", "Explore all projects")}{" "}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <p className="sample-note">
          {t(
            "แกลเลอรีตัวอย่าง — รอภาพและข้อมูลโครงการที่บริษัทอนุมัติ ภาพเหล่านี้ไม่ใช่ผลงานจริง",
            "Sample gallery — approved projects are pending. These concepts are not completed company work.",
          )}
        </p>
        <div className="editorial-grid">
          {publishedProjects
            .filter((p) => p.featured)
            .map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
        </div>
      </section>
      <section className="section expertise-home">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / OUR EXPERTISE</p>
            <h2>
              {t("ออกแบบเพื่อชีวิตที่ลงตัว", "Considered in every detail.")}
            </h2>
          </div>
          <Link href="/expertise" className="text-link">
            {t("บริการของเรา", "Discover our expertise")}{" "}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="expertise-list">
          {services.map((s) => (
            <Link href={`/expertise#${s.icon}`} key={s.number}>
              <span>{s.number}</span>
              <h3>{s.title}</h3>
              <p>{t(s.th, s.en)}</p>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <section className="factory-feature">
        <div className="factory-photo">
          <Image
            src="/images/kitchen.webp"
            alt={t(
              "ภาพแนวคิดตัวอย่าง ไม่ใช่ภาพโรงงานจริง",
              "Concept placeholder, not an actual factory photograph",
            )}
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="image-label">
            {t(
              "ภาพแนวคิดตัวอย่าง · รอภาพโรงงานจริง",
              "CONCEPT IMAGE · FACTORY PHOTOGRAPHY PENDING",
            )}
          </span>
        </div>
        <div className="factory-copy">
          <p className="eyebrow">04 / CRAFTED BY SC INTERIOR</p>
          <h2>
            {t("ผลิตเอง\nดูแลทุกขั้นตอน", "Made by us.\nConsidered for you.")}
          </h2>
          <p>
            {t(
              "จากโรงงานของเรา… สู่ทุกพื้นที่ที่คุณไว้วางใจ เชื่อมต่องานออกแบบ การผลิตเฟอร์นิเจอร์ และการติดตั้งให้เป็นเรื่องเดียวกัน",
              "From our factory to your space. Connecting interior design, furniture production and installation in one considered process.",
            )}
          </p>
          <Link href="/about" className="text-link">
            {t("รู้จัก SC Interior", "The story of SC Interior")}{" "}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <Process />
      <ContactCTA />
    </main>
  );
}
