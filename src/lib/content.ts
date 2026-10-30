export type Language = "th" | "en";
export type LocalizedText = Record<Language, string>;

// Keep the existing hero. Replace these paths with approved company assets later.
export const images = {
  hero: "/images/living.webp",
  detail: "/images/living.webp",
  bedroom: "/images/bedroom.webp",
  kitchen: "/images/kitchen.webp",
  factory: "/images/factory-placeholder.svg",
};
// Only company-supplied contact destinations belong here. Leave LINE blank until confirmed.
export const company = {
  phone: "081-576-0104",
  telephone: "+66815760104",
  lineUrl: "",
  facebookUrl: "https://www.facebook.com/SCinteriorThailand",
  mapUrl: "https://maps.app.goo.gl/QtDNo1nXT9BoJaCT6",
};
export const services = [
  {
    number: "01",
    title: "Interior Design",
    th: "ออกแบบตกแต่งภายใน",
    en: "Interior design for the way you live.",
    image: images.hero,
  },
  {
    number: "02",
    title: "Built-in Furniture",
    th: "เฟอร์นิเจอร์บิ้วอิน",
    en: "Built-in furniture made for your space.",
    image: images.bedroom,
  },
  {
    number: "03",
    title: "Renovation",
    th: "งานรีโนเวท",
    en: "A fresh chapter for your space.",
    image: images.kitchen,
  },
  {
    number: "04",
    title: "Custom Furniture",
    th: "เฟอร์นิเจอร์สั่งผลิต",
    en: "Furniture crafted around your needs.",
    image: images.detail,
  },
];

export type ProjectImage = { src: string; alt: LocalizedText };
export type Project = {
  id: string;
  title: LocalizedText;
  workType: LocalizedText;
  style: LocalizedText;
  isReference: boolean;
  images: ProjectImage[];
};
// These are reference moodboards, NOT named or verified company projects.
// Add approved projects as new records, with their actual title, facts and photos.
export const projects: Project[] = [
  {
    id: "reference-living",
    title: { th: "แนวทางพื้นที่นั่งเล่น", en: "Living space inspiration" },
    workType: {
      th: "ตัวอย่างแนวทางออกแบบภายใน",
      en: "Interior design reference",
    },
    style: { th: "โทนไม้ธรรมชาติและสีครีม", en: "Natural wood & cream" },
    isReference: true,
    images: [
      {
        src: images.hero,
        alt: {
          th: "ภาพ AI ตัวอย่างห้องนั่งเล่นโทนไม้ธรรมชาติ",
          en: "AI reference of a natural wood living room",
        },
      },
      {
        src: images.kitchen,
        alt: {
          th: "ภาพ AI ห้องครัวประกอบแนวทางโทนไม้ ไม่ใช่โครงการจริง",
          en: "AI kitchen reference for this wood palette, not an actual project",
        },
      },
    ],
  },
  {
    id: "reference-bedroom",
    title: { th: "แนวทางห้องนอน", en: "Bedroom inspiration" },
    workType: { th: "ตัวอย่างแนวทางบิ้วอิน", en: "Built-in design reference" },
    style: { th: "อบอุ่น เรียบง่าย", en: "Warm minimal" },
    isReference: true,
    images: [
      {
        src: images.bedroom,
        alt: {
          th: "ภาพ AI ตัวอย่างห้องนอนและตู้บิ้วอิน",
          en: "AI reference of a bedroom with built-in furniture",
        },
      },
    ],
  },
  {
    id: "reference-kitchen",
    title: { th: "แนวทางห้องครัว", en: "Kitchen inspiration" },
    workType: {
      th: "ตัวอย่างแนวทางเฟอร์นิเจอร์สั่งผลิต",
      en: "Custom furniture reference",
    },
    style: { th: "Modern Luxury Minimal", en: "Modern Luxury Minimal" },
    isReference: true,
    images: [
      {
        src: images.kitchen,
        alt: {
          th: "ภาพ AI ตัวอย่างห้องครัวโทนไม้และหินสีอ่อน",
          en: "AI reference of a kitchen with warm wood and light stone",
        },
      },
    ],
  },
];

export const seo: Record<Language, { title: string; description: string }> = {
  th: {
    title: "SC Interior | ออกแบบตกแต่งภายใน บิ้วอิน และรีโนเวท",
    description:
      "SC Interior บริษัท ศักดิ์ชายการช่าง จำกัด ออกแบบตกแต่งภายใน ผลิตเฟอร์นิเจอร์บิ้วอินและรีโนเวท พร้อมโรงงานของเราเอง ดูแลตั้งแต่ออกแบบจนติดตั้ง โทร 081-576-0104",
  },
  en: {
    title: "SC Interior | Interior Design, Built-in Furniture & Renovation",
    description:
      "SC Interior (Sakchai Karnchang Co., Ltd.) offers interior design, built-in furniture and renovation, with our own factory and installation team. Call 081-576-0104.",
  },
};
