"use client";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useState } from "react";
import type { Language } from "@/lib/content";
import type { PortfolioImage } from "@/lib/portfolio";
type ComparisonProps = {
  design: PortfolioImage;
  completed: PortfolioImage;
  cameraAligned: boolean;
  caption: string;
  lang: Language;
};
export default function Comparison({
  design,
  completed,
  cameraAligned,
  caption,
  lang,
}: ComparisonProps) {
  const [position, setPosition] = useState(50);
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  // A cropped comparison would distort the source. Use pairs for mismatched ratios too.
  const aligned =
    cameraAligned &&
    Math.abs(
      design.width / design.height - completed.width / completed.height,
    ) < 0.02;
  if (design.isReference || completed.isReference) return null;
  if (!aligned)
    return (
      <figure className="comparison-pair">
        <div>
          <div>
            <Image
              src={design.src}
              width={design.width}
              height={design.height}
              alt={lang === "th" ? design.altTH : design.altEN}
              sizes="(max-width:760px) 100vw, 50vw"
            />
            <span>3D DESIGN</span>
          </div>
          <div>
            <Image
              src={completed.src}
              width={completed.width}
              height={completed.height}
              alt={lang === "th" ? completed.altTH : completed.altEN}
              sizes="(max-width:760px) 100vw, 50vw"
            />
            <span>COMPLETED WORK</span>
          </div>
        </div>
        <figcaption>
          {caption}
          <br />
          {t(
            "แสดงภาพคู่เพื่อรักษามุมมองและสัดส่วนต้นฉบับ",
            "Paired views preserve the original perspective and proportions.",
          )}
        </figcaption>
      </figure>
    );
  return (
    <figure className="comparison">
      <div
        className="comparison-stage"
        style={{ aspectRatio: `${design.width}/${design.height}` }}
      >
        <Image
          src={completed.src}
          alt={lang === "th" ? completed.altTH : completed.altEN}
          fill
          sizes="(max-width:760px) 100vw, 1100px"
        />
        <div
          className="comparison-design"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={design.src}
            alt={lang === "th" ? design.altTH : design.altEN}
            fill
            sizes="(max-width:760px) 100vw, 1100px"
          />
        </div>
        <span className="compare-label design-label">3D DESIGN</span>
        <span className="compare-label complete-label">COMPLETED WORK</span>
        <span
          className="compare-handle"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <i>
            <MoveHorizontal size={20} />
          </i>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={t(
            "ลากเพื่อเปรียบเทียบภาพ 3D กับผลงานจริง",
            "Compare 3D design and completed work",
          )}
          aria-valuetext={`${position}% 3D DESIGN, ${100 - position}% COMPLETED WORK`}
        />
      </div>
      <figcaption>
        {caption}
        <br />
        {t(
          "ลากแถบ หรือใช้ปุ่มลูกศรบนแป้นพิมพ์เพื่อเปรียบเทียบ",
          "Drag the divider or use the keyboard arrow keys to compare.",
        )}
      </figcaption>
    </figure>
  );
}
