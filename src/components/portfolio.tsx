"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import {
  ComparisonPair,
  Project,
  ProjectImage,
  publishedProjects,
  statusLabels,
  styleLabels,
  typeLabels,
} from "@/lib/projects";
import { ContactCTA, useLanguage } from "./site";
export function ProjectCard({ project: p }: { project: Project }) {
  const { lang, t } = useLanguage();
  return (
    <Link href={`/projects/${p.slug}`} className="project-card">
      <div className="project-photo">
        <Image
          src={p.coverImage.src}
          alt={p.coverImage.alt[lang]}
          width={p.coverImage.width}
          height={p.coverImage.height}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        {p.placeholder && (
          <span className="image-label">
            {t("ภาพแนวคิด AI · ตัวอย่างเท่านั้น", "AI CONCEPT · SAMPLE ONLY")}
          </span>
        )}
        <span className="project-open">
          <ArrowUpRight />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <p className="eyebrow">
            {styleLabels[p.designStyle]} / {typeLabels[p.projectType][lang]}
          </p>
          <h3>{lang === "th" ? p.titleTH : p.titleEN}</h3>
          <p>{p.location[lang]}</p>
        </div>
        <span className="project-status">
          {p.placeholder
            ? t("ตัวอย่างการจัดหมวด 3D", "3D CATEGORY SAMPLE")
            : statusLabels[p.status][lang]}
        </span>
      </div>
    </Link>
  );
}
export function ProjectsIndex() {
  const { lang, t } = useLanguage();
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [style, setStyle] = useState("all");
  const visible = publishedProjects.filter(
    (p) =>
      (status === "all" || p.status === status) &&
      (type === "all" || p.projectType === type) &&
      (style === "all" || p.designStyle === style),
  );
  const reset = () => {
    setStatus("all");
    setType("all");
    setStyle("all");
  };
  return (
    <main id="main">
      <section className="page-intro section">
        <p className="eyebrow">THE SC INTERIOR PORTFOLIO</p>
        <h1>{t("พื้นที่ที่สะท้อนตัวตน", "An expression of living.")}</h1>
        <p>
          {t(
            "สำรวจแนวคิดการออกแบบ จากภาพฝันสู่รายละเอียดของพื้นที่",
            "Explore a considered approach to space, material and everyday life.",
          )}
        </p>
      </section>
      <section className="section portfolio-section">
        <p className="sample-note">
          {t(
            "ขณะนี้เป็นแกลเลอรีตัวอย่าง ภาพแนวคิด AI ไม่ใช่ผลงานโครงการจริง หมวดงานติดตั้งจริงรอภาพที่อนุมัติ",
            "Sample portfolio: AI concepts are not actual projects. Completed work awaits approved photography.",
          )}
        </p>
        <div
          className="filter-tabs"
          aria-label={t("สถานะผลงาน", "Project status")}
        >
          {[
            ["all", t("ผลงานทั้งหมด", "All Projects")],
            ...Object.entries(statusLabels).map(([k, v]) => [k, v[lang]]),
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setStatus(key)}
              aria-pressed={status === key}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label>
            {t("ประเภทโครงการ", "Project type")}
            <select
              aria-label={t("ประเภทโครงการ", "Project type")}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">{t("ทุกประเภท", "All types")}</option>
              {Object.entries(typeLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v[lang]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("สไตล์การออกแบบ", "Design style")}
            <select
              aria-label={t("สไตล์การออกแบบ", "Design style")}
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="all">{t("ทุกสไตล์", "All styles")}</option>
              {Object.entries(styleLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <p role="status">
            {visible.length} {t("รายการ", "projects")}
          </p>
          <button className="text-link" onClick={reset}>
            {t("ล้างตัวกรอง", "Reset filters")}
          </button>
        </div>
        {visible.length ? (
          <div className="editorial-grid">
            {visible.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>{t("ยังไม่มีผลงานในหมวดนี้", "A new story is on its way.")}</h2>
            <p>
              {t(
                "รอข้อมูลโครงการและภาพที่บริษัทอนุมัติ หรือลองเปลี่ยนตัวกรอง",
                "Approved project details and photography are pending. You can also try another filter.",
              )}
            </p>
            <button className="button" onClick={reset}>
              {t("ดูตัวอย่างทั้งหมด", "View all samples")}
            </button>
          </div>
        )}
      </section>
      <ContactCTA />
    </main>
  );
}
const categories = ["all", "3d", "onsite", "completed"] as const;
export function Gallery({ project }: { project: Project }) {
  const { lang, t } = useLanguage();
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const all = [
    ...project.gallery3D,
    ...project.galleryOnSite,
    ...project.galleryCompleted,
  ];
  const images =
    category === "3d"
      ? project.gallery3D
      : category === "onsite"
        ? project.galleryOnSite
        : category === "completed"
          ? project.galleryCompleted
          : all;
  const close = () => {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus();
  };
  const move = (delta: number) =>
    setSelected((n) =>
      n === null || !images.length
        ? null
        : (n + delta + images.length) % images.length,
    );
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const el = dialog.current;
    el?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = old;
    };
  }, [isOpen]);
  return (
    <section className="section project-gallery">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE GALLERY</p>
          <h2>{t("ทุกมุม ทุกความใส่ใจ", "A closer look.")}</h2>
        </div>
        <span>{t("คลิกภาพเพื่อดูเต็มจอ", "Select an image to explore")}</span>
      </div>
      <div
        className="filter-tabs"
        aria-label={t("หมวดภาพ", "Gallery categories")}
      >
        {categories.map((key, i) => (
          <button
            key={key}
            aria-pressed={category === key}
            onClick={() => setCategory(key)}
          >
            {
              [
                t("ภาพทั้งหมด", "All images"),
                t("ภาพออกแบบ 3D", "3D Design"),
                t("ระหว่างดำเนินการ", "On-site Progress"),
                t("ผลงานจริง", "Completed Work"),
              ][i]
            }
          </button>
        ))}
      </div>
      {images.length ? (
        <div className="masonry">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              className="gallery-image"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setSelected(i);
              }}
              aria-label={`${t("เปิดภาพ", "Open image")} ${i + 1}: ${img.alt[lang]}`}
            >
              <Image
                src={img.src}
                alt={img.alt[lang]}
                width={img.width}
                height={img.height}
                sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                loading="lazy"
              />
              {project.placeholder && (
                <span className="image-label">
                  {t("ภาพแนวคิดตัวอย่าง", "CONCEPT PLACEHOLDER")}
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-state">
          {t(
            "รอภาพที่บริษัทอนุมัติในหมวดนี้",
            "Approved images for this category are pending.",
          )}
        </p>
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={t("แกลเลอรีภาพเต็มจอ", "Fullscreen image gallery")}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
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
        <div className="lightbox-top">
          <span role="status">
            {selected !== null ? String(selected + 1).padStart(2, "0") : "00"} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
          <button
            autoFocus
            className="icon-button"
            onClick={close}
            aria-label={t("ปิดภาพ", "Close gallery")}
          >
            <X />
          </button>
        </div>
        {selected !== null && images[selected] && (
          <>
            <div className="lightbox-image">
              <Image
                key={selected}
                src={images[selected].src}
                alt={images[selected].alt[lang]}
                fill
                sizes="100vw"
                quality={90}
              />
            </div>
            <p className="lightbox-caption">{images[selected].alt[lang]}</p>
          </>
        )}
        <div className="lightbox-controls">
          <button
            className="icon-button"
            onClick={() => move(-1)}
            aria-label={t("ภาพก่อนหน้า", "Previous image")}
          >
            <ArrowLeft />
          </button>
          <button
            className="icon-button"
            onClick={() => move(1)}
            aria-label={t("ภาพถัดไป", "Next image")}
          >
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </section>
  );
}
function PairImage({
  image,
  lang,
}: {
  image: ProjectImage;
  lang: "th" | "en";
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt[lang]}
      width={image.width}
      height={image.height}
      sizes="(max-width: 700px) 100vw, 80vw"
    />
  );
}
export function Comparison({ pair }: { pair: ComparisonPair }) {
  const { lang, t } = useLanguage();
  const [position, setPosition] = useState(50);
  const matched =
    pair.sameAngle &&
    Math.abs(
      pair.design.width / pair.design.height -
        pair.completed.width / pair.completed.height,
    ) < 0.01;
  return matched ? (
    <div className="comparison">
      <div
        className="comparison-frame"
        style={{ aspectRatio: `${pair.design.width}/${pair.design.height}` }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          const r = e.currentTarget.getBoundingClientRect();
          setPosition(
            Math.max(
              0,
              Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 100)),
            ),
          );
        }}
        onPointerMove={(e) => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
          const r = e.currentTarget.getBoundingClientRect();
          setPosition(
            Math.max(
              0,
              Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 100)),
            ),
          );
        }}
      >
        <PairImage image={pair.completed} lang={lang} />
        <div
          className="comparison-design"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <PairImage image={pair.design} lang={lang} />
        </div>
        <div className="comparison-line" style={{ left: `${position}%` }}>
          <span>
            <ArrowLeft size={14} />
            <ArrowRight size={14} />
          </span>
        </div>
        <span className="compare-label design-label">3D DESIGN</span>
        <span className="compare-label completed-label">COMPLETED WORK</span>
      </div>
      <label className="comparison-input">
        {t(
          "ลากเพื่อเปรียบเทียบ 3D กับผลงานจริง",
          "Drag to compare 3D and completed work",
        )}
        <input
          aria-label={t("ตำแหน่งแถบเปรียบเทียบ", "Comparison position")}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
        />
      </label>
    </div>
  ) : (
    <div>
      <p className="sample-note">
        {t(
          "มุมกล้องต่างกัน แสดงภาพคู่เพื่อรักษารายละเอียดต้นฉบับ",
          "Different viewpoints — shown side by side to preserve the original images.",
        )}
      </p>
      <div className="comparison-pair">
        <figure>
          <PairImage image={pair.design} lang={lang} />
          <figcaption>3D DESIGN</figcaption>
        </figure>
        <figure>
          <PairImage image={pair.completed} lang={lang} />
          <figcaption>COMPLETED WORK</figcaption>
        </figure>
      </div>
    </div>
  );
}
export function ProjectDetail({
  project: p,
  next,
}: {
  project: Project;
  next?: Project;
}) {
  const { lang, t } = useLanguage();
  return (
    <main id="main">
      <section className="project-cover">
        <Image
          src={p.coverImage.src}
          alt={p.coverImage.alt[lang]}
          fill
          sizes="100vw"
          priority
        />
        <div className="project-cover-copy">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" size={16} />{" "}
            {t("ผลงานทั้งหมด", "All projects")}
          </Link>
          <h1>{lang === "th" ? p.titleTH : p.titleEN}</h1>
          {p.placeholder && (
            <p>
              {t(
                "ภาพแนวคิด AI · ไม่ใช่โครงการจริงของ SC Interior",
                "AI concept placeholder · not an actual SC Interior project",
              )}
            </p>
          )}
        </div>
      </section>
      <section className="section project-overview">
        <div>
          <p className="eyebrow">PROJECT NOTES</p>
          <h2>
            {t(
              "รายละเอียดที่ทำให้พื้นที่แตกต่าง",
              "Designed around the details.",
            )}
          </h2>
          <p>{lang === "th" ? p.descriptionTH : p.descriptionEN}</p>
        </div>
        <dl>
          {[
            [t("สถานที่", "Location"), p.location[lang]],
            [t("ประเภท", "Project type"), typeLabels[p.projectType][lang]],
            [t("สไตล์", "Design style"), styleLabels[p.designStyle]],
            [
              t("สถานะ", "Status"),
              p.placeholder
                ? t("ตัวอย่างแนวคิดเท่านั้น", "Concept sample only")
                : statusLabels[p.status][lang],
            ],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <Gallery project={p} />
      <section className="section reality">
        <p className="eyebrow">FROM 3D TO REALITY</p>
        <h2>{t("จากแบบ สู่พื้นที่จริง", "The vision. The reality.")}</h2>
        {p.beforeAfterPairs.length ? (
          p.beforeAfterPairs.map((pair, i) => (
            <Comparison key={i} pair={pair} />
          ))
        ) : (
          <p className="sample-note">
            {t(
              "รอภาพออกแบบและภาพติดตั้งจริงจากโครงการเดียวกันที่บริษัทอนุมัติ จึงยังไม่มีภาพเปรียบเทียบ",
              "Comparison awaits approved 3D and completed photographs from the same project.",
            )}
          </p>
        )}
      </section>
      {next && (
        <section className="section next-project">
          <p className="eyebrow">NEXT PROJECT</p>
          <Link href={`/projects/${next.slug}`}>
            <h2>{lang === "th" ? next.titleTH : next.titleEN}</h2>
            <ArrowRight size={32} />
          </Link>
        </section>
      )}
      <ContactCTA />
    </main>
  );
}
