import SiteShell from "@/components/site-shell";
import ProjectIndex from "@/components/portfolio/project-index";
import { ContactCTA } from "@/components/editorial-sections";
import { publicProjects } from "@/lib/portfolio";
import { getLanguage, pageMetadata, type LanguageSearch } from "@/lib/site";
type Props = { searchParams: LanguageSearch };
export async function generateMetadata({ searchParams }: Props) {
  const lang = await getLanguage(searchParams);
  return pageMetadata(
    "/projects",
    lang,
    "ผลงานและแนวทางการออกแบบ",
    "Our Projects & Design References",
    "สำรวจผลงานที่ยืนยันแล้วและภาพอ้างอิงซึ่งระบุสถานะชัดเจน พร้อมตัวกรองประเภทและสไตล์",
    "Explore verified projects and clearly labeled design references with category, space type and style filters.",
  );
}
export default async function Projects({ searchParams }: Props) {
  const lang = await getLanguage(searchParams);
  return (
    <SiteShell lang={lang}>
      <section className="section portfolio-intro">
        <p className="eyebrow">OUR PROJECTS</p>
        <h1>
          {lang === "th" ? (
            <>
              ทุกพื้นที่
              <br />
              <em>มีเรื่องราวของตัวเอง</em>
            </>
          ) : (
            <>
              Every space.
              <br />
              <em>Its own story.</em>
            </>
          )}
        </h1>
        <p className="page-description">
          {lang === "th"
            ? "แนวคิด วัสดุ และรายละเอียดที่ทำให้พื้นที่มีความหมาย"
            : "Ideas, materials and details that give a space its meaning."}
        </p>
        <p className="reference-disclaimer">
          {lang === "th"
            ? "ขณะนี้แสดงเฉพาะภาพอ้างอิง AI ไม่ใช่ผลงานจริง ไม่มีการใช้ภาพอ้างอิงเป็นผลงาน 3D หรืองานติดตั้งจริง"
            : "Currently showing AI reference moodboards only, not actual company projects. These images are never classified as verified 3D designs or completed installations."}
        </p>
        <ProjectIndex projects={publicProjects()} lang={lang} />
      </section>
      <ContactCTA lang={lang} />
    </SiteShell>
  );
}
