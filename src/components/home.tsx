import Link from "next/link";
import SiteShell from "./site-shell";
import HeroSlider from "./hero-slider";
import ProjectCard from "./portfolio/project-card";
import {
  ContactCTA,
  ExpertiseSection,
  FactorySection,
  Process,
} from "./editorial-sections";
import { publicProjects } from "@/lib/portfolio";
import { localizedHref } from "@/lib/site";
import type { Language } from "@/lib/content";
export default function Home({ lang = "th" }: { lang?: Language }) {
  const featured = publicProjects()
    .filter((project) => project.featured)
    .slice(0, 6);
  return (
    <SiteShell lang={lang}>
      <HeroSlider lang={lang} />
      <section className="section selected-works reveal">
        <div className="editorial-heading">
          <p className="eyebrow">01 / SELECTED WORKS</p>
          <div>
            <h2>
              {lang === "th" ? (
                <>
                  พื้นที่ที่เล่าเรื่อง
                  <br />
                  <em>ในแบบของคุณ</em>
                </>
              ) : (
                <>
                  Spaces with a story.
                  <br />
                  <em>Uniquely yours.</em>
                </>
              )}
            </h2>
            <Link href={localizedHref("/projects", lang)} className="text-link">
              {lang === "th" ? "ดูผลงานทั้งหมด" : "Explore all projects"} ↗
            </Link>
          </div>
        </div>
        <p className="reference-disclaimer">
          {lang === "th"
            ? "ภาพด้านล่างเป็นภาพอ้างอิง AI ไม่ใช่ผลงานจริงของ SC Interior ผลงานจริงจะเพิ่มเมื่อได้รับภาพและข้อมูลที่ยืนยันแล้ว"
            : "The following AI reference moodboards are not SC Interior projects. Verified projects will be added when approved images and details are available."}
        </p>
        <div className="editorial-work-grid selected-grid">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      </section>
      <ExpertiseSection lang={lang} />
      <FactorySection lang={lang} />
      <Process lang={lang} />
      <ContactCTA lang={lang} />
    </SiteShell>
  );
}
