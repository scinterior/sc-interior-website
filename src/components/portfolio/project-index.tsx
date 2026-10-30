"use client";
import { useState } from "react";
import type { Language } from "@/lib/content";
import {
  designStyles,
  projectTypes,
  statuses,
  filterProjects,
  type PortfolioProject,
} from "@/lib/portfolio";
import ProjectCard from "./project-card";
export default function ProjectIndex({
  projects,
  lang,
}: {
  projects: PortfolioProject[];
  lang: Language;
}) {
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [style, setStyle] = useState("all");
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  const results = filterProjects(projects, status, type, style);
  const reset = () => {
    setStatus("all");
    setType("all");
    setStyle("all");
  };
  return (
    <>
      <div className="portfolio-filters">
        <div
          className="filter-tabs"
          role="group"
          aria-label={t("สถานะผลงาน", "Project status")}
        >
          {statuses.map((item) => (
            <button
              key={item.value}
              aria-pressed={status === item.value}
              onClick={() => setStatus(item.value)}
            >
              {item.label[lang]}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label>
            {t("ประเภทพื้นที่", "Project type")}
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="all">{t("ทุกประเภท", "All space types")}</option>
              {projectTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label[lang]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("สไตล์", "Design style")}
            <select
              value={style}
              onChange={(event) => setStyle(event.target.value)}
            >
              <option value="all">{t("ทุกสไตล์", "All styles")}</option>
              {designStyles.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label[lang]}
                </option>
              ))}
            </select>
          </label>
          <button onClick={reset} className="text-link">
            {t("ล้างตัวกรอง", "Reset filters")}{" "}
            <span className="direction-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="result-count" role="status">
        {results.length} {t("รายการ", "items")}
        {results.some((project) => project.status === "reference")
          ? t(
              " · มีภาพตัวอย่างที่ไม่ใช่ผลงานจริง",
              " · Includes reference moodboards, not actual company work",
            )
          : ""}
      </p>
      {results.length ? (
        <div className="editorial-work-grid">
          {results.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="portfolio-empty">
          <p className="eyebrow">A STORY STILL TO COME</p>
          <h2>
            {t(
              "ยังไม่มีผลงานที่ยืนยันในหมวดนี้",
              "No verified projects in this category yet.",
            )}
          </h2>
          <p>
            {t(
              "เราจะแสดงผลงานเมื่อได้รับภาพและรายละเอียดที่ยืนยันแล้ว โดยไม่ใช้ภาพตัวอย่างแทนผลงานจริง",
              "We will publish projects once their photographs and details are verified. References are never passed off as completed work.",
            )}
          </p>
          <button onClick={reset} className="text-link">
            {t("กลับไปดูทั้งหมด", "Show all items")}{" "}
            <span className="direction-arrow" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
