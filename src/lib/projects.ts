export type Localized = { th: string; en: string };
export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
};
export type ProjectType = "house" | "condominium" | "commercial" | "office";
export type DesignStyle =
  "modern-luxury" | "modern-minimal" | "japandi" | "contemporary" | "other";
export type ProjectStatus = "3d" | "completed" | "reality";
export type ComparisonPair = {
  design: ProjectImage;
  completed: ProjectImage;
  sameAngle: boolean;
};
export type Project = {
  id: string;
  slug: string;
  titleTH: string;
  titleEN: string;
  location: Localized;
  projectType: ProjectType;
  designStyle: DesignStyle;
  status: ProjectStatus;
  descriptionTH: string;
  descriptionEN: string;
  coverImage: ProjectImage;
  gallery3D: ProjectImage[];
  galleryOnSite: ProjectImage[];
  galleryCompleted: ProjectImage[];
  beforeAfterPairs: ComparisonPair[];
  featured: boolean;
  published: boolean;
  placeholder: boolean;
};
export const typeLabels: Record<ProjectType, Localized> = {
  house: { th: "บ้านพักอาศัย", en: "Houses" },
  condominium: { th: "คอนโดมิเนียม", en: "Condominiums" },
  commercial: { th: "พื้นที่เชิงพาณิชย์", en: "Commercial Spaces" },
  office: { th: "สำนักงานและพื้นที่อื่น ๆ", en: "Offices & Other Spaces" },
};
export const styleLabels: Record<DesignStyle, string> = {
  "modern-luxury": "Modern Luxury",
  "modern-minimal": "Modern Minimal",
  japandi: "Japandi",
  contemporary: "Contemporary",
  other: "Other Styles",
};
export const statusLabels: Record<ProjectStatus, Localized> = {
  "3d": { th: "ผลงานออกแบบ 3D", en: "3D Designs" },
  completed: { th: "ผลงานติดตั้งจริง", en: "Completed Projects" },
  reality: { th: "จากแบบสู่ผลงานจริง", en: "From 3D to Reality" },
};
const sample = (file: string, th: string, en: string): ProjectImage => ({
  src: `/images/${file}.webp`,
  width: 1536,
  height: 1024,
  alt: {
    th: `ภาพแนวคิด AI ตัวอย่าง — ${th} ไม่ใช่ผลงานจริง`,
    en: `AI concept placeholder — ${en}, not a real SC Interior project`,
  },
});
const covers = [
  sample("living", "ห้องนั่งเล่น", "living space"),
  sample("bedroom", "ห้องนอน", "bedroom"),
  sample("kitchen", "ห้องครัว", "kitchen"),
  sample("living", "พื้นที่พักผ่อน", "interior study"),
];
// Explicit sample records, not fabricated client projects. Never populate completed
// galleries or comparison pairs with AI concepts. Replace with approved same-project assets.
export const projects: Project[] = covers.map((coverImage, i) => ({
  id: `sample-${i + 1}`,
  slug: `concept-example-${i + 1}`,
  titleTH: `ตัวอย่างแนวคิด ${String(i + 1).padStart(2, "0")}`,
  titleEN: `Concept study ${String(i + 1).padStart(2, "0")}`,
  location: {
    th: "ตัวอย่าง — ไม่มีสถานที่จริง",
    en: "Sample — no actual location",
  },
  projectType: (
    ["house", "condominium", "commercial", "office"] as ProjectType[]
  )[i],
  designStyle: (
    [
      "modern-luxury",
      "modern-minimal",
      "japandi",
      "contemporary",
    ] as DesignStyle[]
  )[i],
  status: "3d",
  descriptionTH:
    "ตัวอย่างการนำเสนอแกลเลอรีเท่านั้น ภาพแนวคิดสร้างด้วย AI ไม่ใช่โครงการ ลูกค้า หรือผลงานติดตั้งจริงของ SC Interior ประเภทและสไตล์เป็นตัวอย่างการจัดหมวดหมู่ รอภาพและข้อมูลที่บริษัทอนุมัติ",
  descriptionEN:
    "A portfolio layout demonstration only. These AI concept images are not client projects or completed SC Interior work. Type and style demonstrate the filters. Approved company photography and project details are pending.",
  coverImage,
  gallery3D: [coverImage],
  galleryOnSite: [],
  galleryCompleted: [],
  beforeAfterPairs: [],
  featured: true,
  published: true,
  placeholder: true,
}));
export const publishedProjects = projects.filter((p) => p.published);
