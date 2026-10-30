import type { Language, LocalizedText } from "./content";

export type ProjectType = "houses" | "condominiums" | "commercial" | "other";
export type DesignStyle =
  "modern-luxury" | "modern-minimal" | "japandi" | "contemporary" | "other";
export type ProjectStatus =
  "3d-design" | "completed" | "3d-to-reality" | "reference";
export type GalleryCategory = "3d" | "onsite" | "completed" | "reference";
export type PortfolioImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  altTH: string;
  altEN: string;
  // Never mark AI or placeholder imagery as approved 3D/on-site/completed work.
  isReference: boolean;
};
export type BeforeAfterPair = {
  id: string;
  designImageId: string;
  completedImageId: string;
  cameraAligned: boolean;
  captionTH: string;
  captionEN: string;
};
export type PortfolioProject = {
  id: string;
  slug: string;
  titleTH: string;
  titleEN: string;
  location: LocalizedText | null;
  projectType: ProjectType | null;
  designStyle: DesignStyle;
  status: ProjectStatus;
  descriptionTH: string;
  descriptionEN: string;
  coverImage: PortfolioImage;
  gallery3D: PortfolioImage[];
  galleryOnSite: PortfolioImage[];
  galleryCompleted: PortfolioImage[];
  // Reference images are separate from all real project stages.
  galleryReference: PortfolioImage[];
  beforeAfterPairs: BeforeAfterPair[];
  featured: boolean;
  published: boolean;
};
export const projectTypes: { value: ProjectType; label: LocalizedText }[] = [
  { value: "houses", label: { th: "บ้าน", en: "Houses" } },
  { value: "condominiums", label: { th: "คอนโดมิเนียม", en: "Condominiums" } },
  {
    value: "commercial",
    label: { th: "พื้นที่เชิงพาณิชย์", en: "Commercial Spaces" },
  },
  {
    value: "other",
    label: { th: "สำนักงานและพื้นที่อื่น ๆ", en: "Offices & Other Spaces" },
  },
];
export const designStyles: { value: DesignStyle; label: LocalizedText }[] = [
  {
    value: "modern-luxury",
    label: { th: "Modern Luxury", en: "Modern Luxury" },
  },
  {
    value: "modern-minimal",
    label: { th: "Modern Minimal", en: "Modern Minimal" },
  },
  { value: "japandi", label: { th: "Japandi", en: "Japandi" } },
  { value: "contemporary", label: { th: "Contemporary", en: "Contemporary" } },
  { value: "other", label: { th: "สไตล์อื่น ๆ", en: "Other Styles" } },
];
export const statuses: {
  value: ProjectStatus | "all";
  label: LocalizedText;
}[] = [
  { value: "all", label: { th: "ผลงานทั้งหมด", en: "All Projects" } },
  { value: "3d-design", label: { th: "ผลงานออกแบบ 3D", en: "3D Designs" } },
  {
    value: "completed",
    label: { th: "ผลงานติดตั้งจริง", en: "Completed Projects" },
  },
  {
    value: "3d-to-reality",
    label: { th: "จากแบบสู่ผลงานจริง", en: "From 3D to Reality" },
  },
];
const reference = (
  id: string,
  src: string,
  th: string,
  en: string,
): PortfolioImage => ({
  id,
  src,
  width: 1536,
  height: 1024,
  altTH: th,
  altEN: en,
  isReference: true,
});
const living = reference(
  "ref-living",
  "/images/living.webp",
  "ภาพ AI อ้างอิงห้องนั่งเล่น ไม่ใช่ผลงาน SC Interior",
  "AI living room reference, not SC Interior work",
);
const bedroom = reference(
  "ref-bedroom",
  "/images/bedroom.webp",
  "ภาพ AI อ้างอิงห้องนอน ไม่ใช่ผลงาน SC Interior",
  "AI bedroom reference, not SC Interior work",
);
const kitchen = reference(
  "ref-kitchen",
  "/images/kitchen.webp",
  "ภาพ AI อ้างอิงห้องครัว ไม่ใช่ผลงาน SC Interior",
  "AI kitchen reference, not SC Interior work",
);
const referenceProject = (
  id: string,
  titleTH: string,
  titleEN: string,
  coverImage: PortfolioImage,
  galleryReference: PortfolioImage[],
  designStyle: DesignStyle,
): PortfolioProject => ({
  id,
  slug: id,
  titleTH,
  titleEN,
  location: null,
  projectType: null,
  designStyle,
  status: "reference",
  descriptionTH:
    "ชุดภาพตัวอย่างสร้างด้วย AI เพื่อแสดงแนวทางการจัดวางและวัสดุเท่านั้น ไม่ใช่ชื่อโครงการ ลูกค้า สถานที่ หรือผลงานจริงของ SC Interior ภาพในชุดนี้ไม่ใช่ภาพจากโครงการเดียวกัน ข้อมูลผลงานจริงจะเพิ่มเมื่อได้รับการยืนยัน",
  descriptionEN:
    "An AI-generated reference moodboard illustrating space and material ideas only. This is not a named project, client, location or actual SC Interior work. These images do not document a single real project. Verified company projects will be added when provided.",
  coverImage,
  gallery3D: [],
  galleryOnSite: [],
  galleryCompleted: [],
  galleryReference,
  beforeAfterPairs: [],
  featured: true,
  published: true,
});
export const portfolioProjects: PortfolioProject[] = [
  referenceProject(
    "reference-living",
    "แนวทางพื้นที่นั่งเล่น",
    "The living space — reference",
    living,
    [living, kitchen],
    "modern-luxury",
  ),
  referenceProject(
    "reference-bedroom",
    "แนวทางห้องนอน",
    "A quiet retreat — reference",
    bedroom,
    [bedroom],
    "modern-minimal",
  ),
  referenceProject(
    "reference-kitchen",
    "แนวทางห้องครัว",
    "Everyday rituals — reference",
    kitchen,
    [kitchen],
    "modern-luxury",
  ),
  referenceProject(
    "reference-materials",
    "แนวทางวัสดุและเฟอร์นิเจอร์",
    "Material expressions — reference",
    living,
    [living, bedroom, kitchen],
    "modern-luxury",
  ),
];
export const publicProjects = (
  projects: PortfolioProject[] = portfolioProjects,
) =>
  projects.filter(
    (project) => project.published && validateProject(project).length === 0,
  );
export const findProject = (
  slug: string,
  projects: PortfolioProject[] = portfolioProjects,
) => publicProjects(projects).find((project) => project.slug === slug);
export const projectTitle = (project: PortfolioProject, lang: Language) =>
  lang === "th" ? project.titleTH : project.titleEN;
export const projectStatusLabel = (
  project: PortfolioProject,
  lang: Language,
) =>
  project.status === "reference"
    ? lang === "th"
      ? "ภาพตัวอย่าง · ไม่ใช่ผลงานจริง"
      : "REFERENCE · NOT COMPANY WORK"
    : (statuses.find((status) => status.value === project.status)?.label[
        lang
      ] ?? "");
export const galleryImages = (
  project: PortfolioProject,
): (PortfolioImage & { category: GalleryCategory })[] => [
  ...project.gallery3D
    .filter((image) => !image.isReference)
    .map((image) => ({ ...image, category: "3d" as const })),
  ...project.galleryOnSite
    .filter((image) => !image.isReference)
    .map((image) => ({ ...image, category: "onsite" as const })),
  ...project.galleryCompleted
    .filter((image) => !image.isReference)
    .map((image) => ({ ...image, category: "completed" as const })),
  ...project.galleryReference.map((image) => ({
    ...image,
    isReference: true,
    category: "reference" as const,
  })),
];
// References cannot be paired. Both images must belong to the same project and stage.
export const validComparisonPairs = (project: PortfolioProject) =>
  project.status === "reference"
    ? []
    : project.beforeAfterPairs.flatMap((pair) => {
        const design = project.gallery3D.find(
          (image) => image.id === pair.designImageId && !image.isReference,
        );
        const completed = project.galleryCompleted.find(
          (image) => image.id === pair.completedImageId && !image.isReference,
        );
        return design && completed ? [{ ...pair, design, completed }] : [];
      });
export function filterProjects(
  projects: PortfolioProject[],
  status: string,
  type: string,
  style: string,
) {
  return projects.filter(
    (project) =>
      project.published &&
      (status === "all" ||
        (status === "3d-to-reality"
          ? project.status === status &&
            validComparisonPairs(project).length > 0
          : project.status === status)) &&
      (type === "all" || project.projectType === type) &&
      (style === "all" || project.designStyle === style),
  );
}

/** Structural validation has no gallery-size ceiling. Run before publishing new data. */
export function validateProject(project: PortfolioProject): string[] {
  const errors: string[] = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug))
    errors.push("Use a unique URL-safe slug.");
  const staged = [
    ...project.gallery3D,
    ...project.galleryOnSite,
    ...project.galleryCompleted,
  ];
  const all = [...staged, ...project.galleryReference];
  if (new Set(all.map((image) => image.id)).size !== all.length)
    errors.push("Gallery image ids must be unique within a project.");
  for (const image of [project.coverImage, ...all]) {
    if (
      image.width <= 0 ||
      image.height <= 0 ||
      !image.src ||
      !image.altTH ||
      !image.altEN
    )
      errors.push(
        "Every image needs a source, positive dimensions and bilingual alt text.",
      );
  }
  if (staged.some((image) => image.isReference))
    errors.push("References cannot appear in verified project stages.");
  if (
    project.status === "reference" &&
    (!project.coverImage.isReference ||
      staged.length ||
      project.beforeAfterPairs.length)
  )
    errors.push(
      "Reference moodboards cannot contain verified stages or comparisons.",
    );
  if (
    project.status !== "reference" &&
    (project.coverImage.isReference || project.galleryReference.length)
  )
    errors.push("Verified projects cannot use AI/reference imagery.");
  if (project.status === "3d-design" && !project.gallery3D.length)
    errors.push("3D designs require approved 3D images.");
  if (project.status === "completed" && !project.galleryCompleted.length)
    errors.push("Completed projects require approved installation photos.");
  if (project.beforeAfterPairs.length !== validComparisonPairs(project).length)
    errors.push(
      "Each comparison must resolve to non-reference images from this same project's correct stages.",
    );
  if (
    project.status === "3d-to-reality" &&
    !validComparisonPairs(project).length
  )
    errors.push("3D-to-Reality projects require an approved comparison pair.");
  return errors;
}
