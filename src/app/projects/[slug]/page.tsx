import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/site-shell";
import ImageGallery from "@/components/portfolio/image-gallery";
import Comparison from "@/components/portfolio/comparison";
import { ContactCTA } from "@/components/editorial-sections";
import {
  designStyles,
  findProject,
  galleryImages,
  projectStatusLabel,
  projectTitle,
  projectTypes,
  publicProjects,
  validComparisonPairs,
} from "@/lib/portfolio";
import {
  getLanguage,
  localizedHref,
  pageMetadata,
  type LanguageSearch,
} from "@/lib/site";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: LanguageSearch;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project)
    return {
      title: "Project not found | SC Interior",
      robots: { index: false },
    };
  const lang = await getLanguage(searchParams);
  return {
    ...pageMetadata(
      "/projects/" + slug,
      lang,
      project.titleTH,
      project.titleEN,
      project.descriptionTH,
      project.descriptionEN,
    ),
    robots: { index: project.status !== "reference", follow: true },
  };
}
export default async function ProjectPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const lang = await getLanguage(searchParams);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  const all = publicProjects();
  const next =
    all.length > 1
      ? all[(all.findIndex((item) => item.id === project.id) + 1) % all.length]
      : null;
  const pairs = validComparisonPairs(project);
  return (
    <SiteShell lang={lang}>
      <section className="section project-story-heading">
        <Link href={localizedHref("/projects", lang)} className="back-link">
          ← {t("ผลงานทั้งหมด", "All projects")}
        </Link>
        <p className="eyebrow">{projectStatusLabel(project, lang)}</p>
        <h1>{projectTitle(project, lang)}</h1>
        <div className="story-facts">
          <div>
            <span>{t("สถานที่", "Location")}</span>
            <p>
              {project.location?.[lang] ??
                t("รอข้อมูลยืนยัน", "Awaiting verified details")}
            </p>
          </div>
          <div>
            <span>{t("ประเภทพื้นที่", "Project type")}</span>
            <p>
              {projectTypes.find((type) => type.value === project.projectType)
                ?.label[lang] ??
                t(
                  "ภาพอ้างอิง ไม่ใช่โครงการจริง",
                  "Reference only, not an actual project",
                )}
            </p>
          </div>
          <div>
            <span>{t("สไตล์", "Design style")}</span>
            <p>
              {
                designStyles.find(
                  (style) => style.value === project.designStyle,
                )?.label[lang]
              }
            </p>
          </div>
          <div>
            <span>{t("ประเภทงาน / สถานะ", "Work / status")}</span>
            <p>{projectStatusLabel(project, lang)}</p>
          </div>
        </div>
      </section>
      <div className="project-story-cover">
        <Image
          src={project.coverImage.src}
          alt={
            lang === "th" ? project.coverImage.altTH : project.coverImage.altEN
          }
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
        {project.status === "reference" && (
          <span>
            {t(
              "ภาพ AI อ้างอิง ไม่ใช่ผลงานจริง",
              "AI REFERENCE · NOT COMPANY WORK",
            )}
          </span>
        )}
      </div>
      <section className="section project-description">
        <p className="eyebrow">THE SPACE / THE DETAILS</p>
        <p>{lang === "th" ? project.descriptionTH : project.descriptionEN}</p>
      </section>
      <div className="section gallery-section">
        <div className="editorial-heading">
          <p className="eyebrow">EXPLORE EVERY DETAIL</p>
          <h2>{t("ทุกมุมมองของพื้นที่", "Every perspective.")}</h2>
        </div>
        <ImageGallery images={galleryImages(project)} lang={lang} />
      </div>
      <section className="section reality-section">
        <p className="eyebrow">FROM 3D TO REALITY</p>
        <h2>{t("จากแนวคิดสู่พื้นที่จริง", "From vision to reality.")}</h2>
        {pairs.length ? (
          pairs.map((pair) => (
            <Comparison
              key={pair.id}
              design={pair.design}
              completed={pair.completed}
              cameraAligned={pair.cameraAligned}
              caption={lang === "th" ? pair.captionTH : pair.captionEN}
              lang={lang}
            />
          ))
        ) : (
          <p className="reality-pending">
            {t(
              "ยังไม่มีคู่ภาพ 3D และภาพติดตั้งจริงที่ยืนยันจากโครงการเดียวกัน จึงยังไม่แสดงภาพเปรียบเทียบ เราไม่ใช้ภาพ AI หรือภาพต่างโครงการแทนงานจริง",
              "No verified 3D and completed-image pair from this same project is available yet. We do not use AI images or unrelated projects as completed work.",
            )}
          </p>
        )}
      </section>
      {next && (
        <section className="next-project">
          <Link href={localizedHref("/projects/" + next.slug, lang)}>
            <p className="eyebrow">
              {t("รายการถัดไป", "NEXT PROJECT / REFERENCE")}
            </p>
            <h2>
              {projectTitle(next, lang)}{" "}
              <span>
                <span className="direction-arrow" aria-hidden="true" />
              </span>
            </h2>
          </Link>
        </section>
      )}
      <ContactCTA lang={lang} />
    </SiteShell>
  );
}
