import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Language } from "@/lib/content";
import {
  designStyles,
  projectTypes,
  projectTitle,
  projectStatusLabel,
  type PortfolioProject,
} from "@/lib/portfolio";
import { localizedHref } from "@/lib/site";
export default function ProjectCard({
  project,
  lang,
  index = 0,
}: {
  project: PortfolioProject;
  lang: Language;
  index?: number;
}) {
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  return (
    <Link
      className="work-card"
      href={localizedHref("/projects/" + project.slug, lang)}
    >
      <div className="work-cover">
        <Image
          src={project.coverImage.src}
          alt={
            lang === "th" ? project.coverImage.altTH : project.coverImage.altEN
          }
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <span className="work-status">{projectStatusLabel(project, lang)}</span>
        <span className="work-open">
          <ArrowUpRight size={23} />
        </span>
      </div>
      <div className="work-caption">
        <div>
          <p className="work-kicker">
            {String(index + 1).padStart(2, "0")} /{" "}
            {
              designStyles.find((style) => style.value === project.designStyle)
                ?.label[lang]
            }
          </p>
          <h3>{projectTitle(project, lang)}</h3>
          <p>
            {project.location?.[lang] ??
              t(
                "สถานที่: รอข้อมูลยืนยัน",
                "Location: awaiting verified details",
              )}
          </p>
          <p>
            {projectTypes.find((type) => type.value === project.projectType)
              ?.label[lang] ??
              t(
                "ภาพอ้างอิง ไม่ระบุประเภทโครงการจริง",
                "Reference only, no actual project type",
              )}
          </p>
        </div>
        <span className="work-view">
          {t("ดูรายละเอียด", "View project")}{" "}
          <span className="direction-arrow" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
