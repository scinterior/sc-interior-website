"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Language } from "@/lib/content";
import type { GalleryCategory, PortfolioImage } from "@/lib/portfolio";
export type CategorizedImage = PortfolioImage & { category: GalleryCategory };
export default function ImageGallery({
  images,
  lang,
}: {
  images: CategorizedImage[];
  lang: Language;
}) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  const filtered =
    category === "all"
      ? images
      : images.filter((image) => image.category === category);
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement as HTMLElement;
    const modal = dialog.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  const move = (direction: number) =>
    setActive((index) =>
      index === null
        ? null
        : (index + direction + filtered.length) % filtered.length,
    );
  const categories: {
    value: GalleryCategory | "all";
    th: string;
    en: string;
  }[] = [
    { value: "all", th: "ภาพทั้งหมด", en: "All images" },
    { value: "3d", th: "ภาพออกแบบ 3D", en: "3D Design" },
    { value: "onsite", th: "ระหว่างดำเนินการ", en: "On-site Progress" },
    { value: "completed", th: "ผลงานติดตั้งจริง", en: "Completed Work" },
    ...(images.some((image) => image.isReference)
      ? [{ value: "reference" as const, th: "ภาพอ้างอิง", en: "References" }]
      : []),
  ];
  return (
    <section
      className="project-image-gallery"
      aria-label={t("แกลเลอรีภาพโครงการ", "Project image gallery")}
    >
      <div
        className="filter-tabs gallery-tabs"
        role="group"
        aria-label={t("หมวดภาพ", "Image category")}
      >
        {categories.map((item) => (
          <button
            key={item.value}
            aria-pressed={category === item.value}
            onClick={() => {
              setActive(null);
              setCategory(item.value);
            }}
          >
            {t(item.th, item.en)}{" "}
            <small>
              {item.value === "all"
                ? images.length
                : images.filter((image) => image.category === item.value)
                    .length}
            </small>
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {filtered.length} {t("ภาพ", "images")}
      </p>
      {filtered.length ? (
        <div className="masonry-gallery">
          {filtered.map((image, index) => (
            <button
              className="masonry-image"
              key={image.id}
              onClick={() => setActive(index)}
              aria-label={t("เปิดภาพที่ ", "Open image ") + (index + 1)}
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={lang === "th" ? image.altTH : image.altEN}
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                loading="lazy"
              />
              {image.isReference && (
                <span>{t("ภาพ AI อ้างอิง", "AI REFERENCE")}</span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="gallery-empty">
          <p>
            {t(
              "ยังไม่มีภาพที่ยืนยันสำหรับหมวดนี้",
              "No verified images are available in this category yet.",
            )}
          </p>
          <button className="text-link" onClick={() => setCategory("all")}>
            {t("ดูภาพทั้งหมด", "View all images")}{" "}
            <span className="direction-arrow" aria-hidden="true" />
          </button>
        </div>
      )}
      {active !== null && filtered[active] && (
        <dialog
          ref={dialog}
          className="fullscreen-gallery"
          aria-label={t("ดูภาพเต็ม", "Full image viewer")}
          onCancel={(event) => {
            event.preventDefault();
            setActive(null);
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
          <div className="fullscreen-top">
            <span>{t("แกลเลอรีภาพ", "IMAGE GALLERY")}</span>
            <button
              autoFocus
              aria-label={t("ปิดภาพ", "Close image")}
              onClick={() => setActive(null)}
            >
              <X size={26} />
            </button>
          </div>
          <div
            className="fullscreen-image"
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
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4)
                move(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <Image
              src={filtered[active].src}
              alt={
                lang === "th" ? filtered[active].altTH : filtered[active].altEN
              }
              fill
              sizes="100vw"
              loading="eager"
            />
          </div>
          <div className="fullscreen-bottom">
            <button
              disabled={filtered.length < 2}
              onClick={() => move(-1)}
              aria-label={t("ภาพก่อนหน้า", "Previous image")}
            >
              <ArrowLeft size={22} />
            </button>
            <div>
              <p className="full-counter" aria-live="polite">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(filtered.length).padStart(2, "0")}
              </p>
              <p className="full-caption">
                {lang === "th"
                  ? filtered[active].altTH
                  : filtered[active].altEN}
              </p>
            </div>
            <button
              disabled={filtered.length < 2}
              onClick={() => move(1)}
              aria-label={t("ภาพถัดไป", "Next image")}
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </dialog>
      )}
    </section>
  );
}
