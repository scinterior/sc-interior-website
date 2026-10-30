import type { Metadata } from "next";
import Home from "@/components/home";
import { seo, type Language } from "@/lib/content";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
async function pageLanguage(
  searchParams: PageProps["searchParams"],
): Promise<Language> {
  return (await searchParams).lang === "en" ? "en" : "th";
}
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const lang = await pageLanguage(searchParams);
  return {
    ...seo[lang],
    openGraph: {
      ...seo[lang],
      type: "website",
      locale: lang === "th" ? "th_TH" : "en_US",
      alternateLocale: [lang === "th" ? "en_US" : "th_TH"],
    },
    alternates: { languages: { th: "/", en: "/?lang=en" } },
  };
}
export default async function Page({ searchParams }: PageProps) {
  const lang = await pageLanguage(searchParams);
  return <Home key={lang} lang={lang} />;
}
