import Link from "next/link";
import SiteShell from "@/components/site-shell";
export default function NotFound() {
  return (
    <SiteShell lang="th">
      <section className="section page-heading portfolio-empty">
        <p className="eyebrow">404 / SPACE NOT FOUND</p>
        <h1>ไม่พบหน้านี้</h1>
        <p className="page-description">
          หน้าหรือโครงการนี้ยังไม่เปิดเผย หรือไม่มีอยู่ในระบบ
        </p>
        <Link className="button orange" href="/projects">
          กลับไปดูผลงาน <span className="direction-arrow" aria-hidden="true" />
        </Link>
      </section>
    </SiteShell>
  );
}
