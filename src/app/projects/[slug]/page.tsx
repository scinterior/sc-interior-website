import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/portfolio";
import { publishedProjects } from "@/lib/projects";
export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = publishedProjects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.titleTH} | ${p.titleEN}`,
    description: p.descriptionTH,
    robots: p.placeholder ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${p.titleEN} | SC Interior`,
      description: p.descriptionEN,
      images: [
        {
          url: p.coverImage.src,
          width: p.coverImage.width,
          height: p.coverImage.height,
          alt: p.coverImage.alt.en,
        },
      ],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = publishedProjects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  return (
    <ProjectDetail
      project={publishedProjects[index]}
      next={
        publishedProjects.length > 1
          ? publishedProjects[(index + 1) % publishedProjects.length]
          : undefined
      }
    />
  );
}
