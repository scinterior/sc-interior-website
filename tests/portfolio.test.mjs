import test from "node:test";
import assert from "node:assert/strict";
import {
  portfolioProjects,
  publicProjects,
  findProject,
  filterProjects,
  galleryImages,
  validComparisonPairs,
  validateProject,
} from "../src/lib/portfolio.ts";
const base = portfolioProjects[0];
const image = (id) => ({ ...base.coverImage, id, isReference: false });
const verified = () => ({
  ...base,
  id: "fixture",
  slug: "fixture",
  status: "3d-to-reality",
  projectType: "houses",
  galleryReference: [],
  coverImage: image("design"),
  gallery3D: [image("design")],
  galleryOnSite: [],
  galleryCompleted: [image("complete")],
  beforeAfterPairs: [
    {
      id: "pair",
      designImageId: "design",
      completedImageId: "complete",
      cameraAligned: true,
      captionTH: "ข้อมูลทดสอบ",
      captionEN: "Test fixture",
    },
  ],
});
test("all published reference records are valid and clearly segregated", () => {
  assert.equal(
    new Set(portfolioProjects.map((project) => project.slug)).size,
    portfolioProjects.length,
  );
  for (const project of portfolioProjects) {
    assert.deepEqual(validateProject(project), []);
    assert.equal(project.status, "reference");
    assert.deepEqual(validComparisonPairs(project), []);
    assert(
      galleryImages(project).every(
        (image) => image.category === "reference" && image.isReference,
      ),
    );
  }
});
test("gallery has no cap: 75 mixed portrait and landscape images retain original dimensions and formats", () => {
  const project = {
    ...base,
    galleryReference: Array.from({ length: 75 }, (_, index) => ({
      ...base.coverImage,
      id: `image-${index}`,
      src: `/images/test-${index}.${["webp", "jpg", "png"][index % 3]}`,
      width: index % 2 ? 800 : 1600,
      height: index % 2 ? 1200 : 900,
    })),
  };
  assert.deepEqual(validateProject(project), []);
  const images = galleryImages(project);
  assert.equal(images.length, 75);
  assert.equal(images[74].width, 1600);
  assert.equal(images[73].height, 1200);
  assert.equal(images[74].src.endsWith(".png"), true);
});
test("filters combine status, project type and style; references never impersonate completed or 3D work", () => {
  assert.equal(
    filterProjects(portfolioProjects, "completed", "all", "all").length,
    0,
  );
  assert.equal(
    filterProjects(portfolioProjects, "3d-design", "all", "all").length,
    0,
  );
  assert.equal(
    filterProjects(portfolioProjects, "3d-to-reality", "all", "all").length,
    0,
  );
  const project = verified();
  assert.equal(
    filterProjects([project], "3d-to-reality", "houses", project.designStyle)
      .length,
    1,
  );
  assert.equal(
    filterProjects(
      [project],
      "3d-to-reality",
      "commercial",
      project.designStyle,
    ).length,
    0,
  );
});
test("only verified images in the correct stages of the same project can form comparisons", () => {
  const project = verified();
  assert.equal(validComparisonPairs(project).length, 1);
  assert.equal(
    validComparisonPairs({ ...project, galleryCompleted: [] }).length,
    0,
  );
  assert.equal(
    validComparisonPairs({
      ...project,
      galleryCompleted: [{ ...image("complete"), isReference: true }],
    }).length,
    0,
  );
  assert.equal(
    validComparisonPairs({
      ...project,
      beforeAfterPairs: [
        {
          ...project.beforeAfterPairs[0],
          completedImageId: "other-project-photo",
        },
      ],
    }).length,
    0,
  );
  assert(
    validateProject({
      ...project,
      gallery3D: [{ ...image("design"), isReference: true }],
    }).length > 0,
  );
});
test("unpublished and invalid records cannot be found or serialized through public selectors", () => {
  const draft = { ...base, slug: "draft", published: false };
  const invalid = { ...base, slug: "invalid", status: "completed" };
  assert.deepEqual(publicProjects([draft, invalid]), []);
  assert.equal(findProject("draft", [draft]), undefined);
  assert.equal(findProject("invalid", [invalid]), undefined);
});
