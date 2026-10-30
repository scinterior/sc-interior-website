import type { Metadata } from "next";
import type { Language } from "./content";
export type LanguageSearch = Promise<{ lang?: string | string[] }>;
export const getLanguage = async (search: LanguageSearch): Promise<Language> =>
  (await search).lang === "en" ? "en" : "th";
export const localizedHref = (path: string, lang: Language) =>
  lang === "en" ? `${path}?lang=en` : path;
export function pageMetadata(
  path: string,
  lang: Language,
  titleTH: string,
  titleEN: string,
  descriptionTH: string,
  descriptionEN: string,
): Metadata {
  const title = `${lang === "th" ? titleTH : titleEN} | SC Interior`;
  const description = lang === "th" ? descriptionTH : descriptionEN;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang === "th" ? "th_TH" : "en_US",
      alternateLocale: [lang === "th" ? "en_US" : "th_TH"],
    },
    alternates: {
      canonical: localizedHref(path, lang),
      languages: { th: path, en: `${path}?lang=en` },
    },
  };
}
