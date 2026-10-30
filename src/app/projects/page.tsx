import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/portfolio";
export const metadata: Metadata = {
  title: "Our Projects | ผลงานและแนวคิดการออกแบบ",
  description:
    "Explore SC Interior’s portfolio categories: 3D design, completed work and from 3D to reality. Current concepts are clearly labelled samples.",
};
export default function Page() {
  return <ProjectsIndex />;
}
