"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import { projects, type Language, type Project } from "@/lib/content";

export default function ProjectGallery({ lang }: { lang: Language }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    const focused = document.activeElement as HTMLElement | null;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previous;
      focused?.focus({ preventScroll: true });
    };
  }, [selected]);
  const close = () => setSelected(null);
  const move = (direction: number) => {
    if (selected)
      setImageIndex(
        (index) =>
          (index + direction + selected.images.length) % selected.images.length,
      );
  };
  return (
    <>
      <div className="project-grid">
        {projects
          .filter((project) => project.images.length > 0)
          .map((project, index) => (
            <button
              className={"project-card project-" + index}
              key={project.id}
              onClick={() => {
                setImageIndex(0);
                setSelected(project);
              }}
              aria-label={
                t("ดูรายละเอียด ", "View project: ") + project.title[lang]
              }
            >
              <div className="project-image">
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt[lang]}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 40vw, 440px"
                />
                {project.isReference && (
                  <span className="image-label">
                    {t(
                      "ภาพตัวอย่าง · ไม่ใช่ผลงานจริง",
                      "REFERENCE · NOT COMPANY WORK",
                    )}
                  </span>
                )}
                <span className="project-expand">
                  <ArrowUpRight size={22} />
                </span>
              </div>
              <div className="project-caption">
                <div>
                  <h3>{project.title[lang]}</h3>
                  <p>{project.workType[lang]}</p>
                  <p>{project.style[lang]}</p>
                </div>
                <span>0{index + 1}</span>
              </div>
              <span className="project-view">
                {t("ดูรายละเอียด", "View Project")} <ArrowUpRight size={16} />
              </span>
            </button>
          ))}
      </div>
      {selected && (
        <dialog
          ref={dialog}
          className="project-dialog"
          aria-labelledby="project-title"
          aria-describedby="project-reference-note"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="project-dialog-content">
            <div className="project-dialog-heading">
              <div>
                <p className="eyebrow">
                  {t("รายละเอียดภาพ", "PROJECT GALLERY")}
                </p>
                <h2 id="project-title">{selected.title[lang]}</h2>
              </div>
              <button
                autoFocus
                className="dialog-close"
                onClick={close}
                aria-label={t("ปิดแกลเลอรี", "Close gallery")}
              >
                <X />
              </button>
            </div>
            <p id="project-reference-note" className="project-reference-note">
              {selected.isReference
                ? t(
                    "ภาพอ้างอิงสร้างด้วย AI ไม่ใช่ผลงานจริงของ SC Interior และไม่ใช่ภาพจากโครงการเดียวกัน",
                    "AI-generated reference moodboard. Not SC Interior work or photographs of one actual project.",
                  )
                : t("ภาพผลงานที่ได้รับการยืนยัน", "Verified project imagery")}
            </p>
            <div className="dialog-image">
              <Image
                src={selected.images[imageIndex].src}
                alt={selected.images[imageIndex].alt[lang]}
                fill
                sizes="(max-width: 760px) 90vw, 1000px"
              />
            </div>
            <div className="gallery-controls">
              <button
                onClick={() => move(-1)}
                disabled={selected.images.length < 2}
                aria-label={t("ภาพก่อนหน้า", "Previous image")}
              >
                <ArrowLeft size={18} />
                {t("ก่อนหน้า", "Previous")}
              </button>
              <span aria-live="polite">
                {imageIndex + 1} / {selected.images.length}
              </span>
              <button
                onClick={() => move(1)}
                disabled={selected.images.length < 2}
                aria-label={t("ภาพถัดไป", "Next image")}
              >
                {t("ถัดไป", "Next")}
                <ArrowRight size={18} />
              </button>
            </div>
            {selected.images.length > 1 && (
              <div className="gallery-thumbnails">
                {selected.images.map((photo, index) => (
                  <button
                    key={photo.src + index}
                    onClick={() => setImageIndex(index)}
                    aria-label={t("ดูภาพที่ ", "View image ") + (index + 1)}
                    aria-pressed={imageIndex === index}
                  >
                    <Image src={photo.src} alt="" fill sizes="80px" />
                  </button>
                ))}
              </div>
            )}
            <dl className="project-details">
              <div>
                <dt>{t("ประเภทงาน", "Work type")}</dt>
                <dd>{selected.workType[lang]}</dd>
              </div>
              <div>
                <dt>{t("สไตล์", "Style")}</dt>
                <dd>{selected.style[lang]}</dd>
              </div>
            </dl>
            <a href="#contact" className="button orange" onClick={close}>
              {t("ปรึกษาพื้นที่ของคุณ", "Discuss your space")}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </dialog>
      )}
    </>
  );
}
