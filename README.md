# sc-interior-website

Official website for SC Interior - Interior Design, Built-in Furniture &amp; Renovation

## Development

The existing Next.js App Router, TypeScript and Tailwind CSS application now includes an editorial Home, a portfolio system and company/contact pages. The original assets, company name treatment and repository foundation are retained; this does not modify www.sc-interior.com.

Use Node.js 24 (the data tests use Node's built-in TypeScript support) and npm:

```sh
npm ci
npm run dev
npm run test:portfolio
npm run typecheck
npm run build
npm start
```

Local commands listen on `0.0.0.0:3000`. `localhost` in your own browser does **not** point to Codex Cloud. Use a platform-provided preview if available, or a Vercel Preview Deployment; do not treat a cloud localhost address as a public preview URL.

## Pages and languages

- `/`: four-slide cinematic hero, selected references/projects, expertise, factory, process and contact CTA.
- `/projects`: combined status, project-type and style filters, with an honest empty state when verified work is unavailable.
- `/projects/[slug]`: individual project/reference cover, facts, description, categorized image gallery, verified comparisons, next project and quotation CTA.
- `/expertise`: Interior Design, Built-in Furniture, Renovation and Custom Furniture.
- `/about`: company story, design approach, factory, production and installation, and the supplied 1-year installation warranty subject to company terms.
- `/contact`: supplied phone, Facebook, factory map, existing company website and local quotation-message preparation.
- Append `?lang=en` to any page for English server-rendered content and metadata. Language switching retains the current page. Thai is the default.
- Unknown or unpublished project slugs return 404. Reference pages are `noindex` and labeled throughout.

Metadata uses the supplied new-site URL `https://sc-interior-website.vercel.app` as its base. Update it only when the confirmed public site URL changes. No DNS or domain change is required by this application.

## Content and assets

- `src/lib/content.ts`: company contact details, services and existing image paths. The older Home reference records remain there for compatibility; the new portfolio reads **`src/lib/portfolio.ts`**.
- `src/lib/portfolio.ts`: typed portfolio data, categories, status/style/type labels, public selectors, data validation and comparison resolution.
- `src/lib/site.ts`: language links and shared SEO metadata.
- `src/components/site-shell.tsx`: shared navigation, language switch, footer, floating contact and gentle reveal behavior.
- `src/components/hero-slider.tsx`: 6.5-second slideshow, crossfade, slow zoom, text reveal, counter, progress, arrows, pause/play, touch gestures and reduced-motion support. It also pauses when the document is hidden, on hover and on focus. Explicit Play resumes after a user pause; reduced-motion preference disables autoplay.
- `src/components/portfolio/`: project cards, filtering, original-aspect-ratio image masonry, fullscreen lightbox and comparison UI.
- `src/app/editorial.css`: new editorial layer over the existing foundation in `globals.css`.
- `public/images/*.webp`: existing AI-generated reference images. They are **not SC Interior projects, clients, 3D deliverables or completed installations**.
- `public/images/factory-placeholder.svg`: labeled illustration, not a photograph of company facilities.

The four published sample entries are **reference moodboards only**. They have no invented location or actual project type. Their images may illustrate different hypothetical spaces, and are never presented as photographs of one real completed project. Status filters for actual 3D/completed/3D-to-Reality work intentionally return no records until approved work is provided.

The company name remains text, not a new logo. Replace it with the original logo when supplied. No fabricated testimonials, project statistics, years of experience or team biographies are included.

## Adding a verified project

1. Obtain company-approved facts and original photographs/renders. Copy approved WebP, JPEG or PNG files into a project-specific directory under `public/projects/`. Preserve the originals; do not retouch, fabricate or label AI images as completed work.
2. Read each image's actual width and height. Use those dimensions to prevent layout shift and preserve portrait/landscape proportions.
3. Add a record to `portfolioProjects` in `src/lib/portfolio.ts`. Use a unique `id`, URL-safe `slug`, bilingual title/description/alt text and factual location. Keep `published: false` until the record and images are approved.
4. Use the appropriate `projectType`, `designStyle` and `status`. Reference imagery belongs only in `galleryReference`, never `gallery3D`, `galleryOnSite` or `galleryCompleted`.
5. Run the validation tests and build before setting `published: true`. `publicProjects()` and `findProject()` exclude unpublished and structurally invalid records, so drafts are not serialized to public components or detail routes.

Template only — replace every field and path with verified information:

```ts
const approvedImage: PortfolioImage = {
  id: "unique-image-id",
  src: "/projects/approved-slug/replace-with-approved-file.jpg",
  width: 1600, // replace with the original file's actual dimensions
  height: 1067,
  altTH: "คำบรรยายภาพที่ตรงกับไฟล์จริง",
  altEN: "An accurate description of the approved image",
  isReference: false, // only for approved, non-AI company imagery
};
const project: PortfolioProject = {
  id: "unique-project-id",
  slug: "approved-slug",
  titleTH: "ชื่อโครงการที่ยืนยันแล้ว",
  titleEN: "Verified project title",
  location: {
    th: "สถานที่ที่อนุญาตให้เผยแพร่",
    en: "Approved public location",
  },
  projectType: "houses", // houses | condominiums | commercial | other
  designStyle: "modern-luxury", // modern-luxury | modern-minimal | japandi | contemporary | other
  status: "completed", // 3d-design | completed | 3d-to-reality | reference
  descriptionTH: "รายละเอียดที่ยืนยันแล้ว",
  descriptionEN: "Approved factual description",
  coverImage: approvedImage,
  gallery3D: [],
  galleryOnSite: [],
  galleryCompleted: [approvedImage],
  galleryReference: [],
  beforeAfterPairs: [],
  featured: false,
  published: false,
};
validateProject(project); // must return [] before publication
```

### Gallery and 3D-to-Reality

Gallery arrays have **no image-count ceiling**. Data tests exercise 75 images and mixed portrait/landscape dimensions; images are lazy-loaded in masonry without changing their source files. The lightbox uses `object-fit: contain`, keeps the complete image visible, supports keyboard arrows, Escape, touch swipes, counters and native dialog focus containment/return.

Each image needs a unique `id` within the project. `gallery3D`, `galleryOnSite` and `galleryCompleted` are separate verified stages. Cover imagery must also match the record's reference/verified status.

To enable a comparison, add a pair referencing one approved 3D image and one approved completed photograph **in this same record**:

```ts
beforeAfterPairs: [
  {
    id: "living-comparison",
    designImageId: "id-from-this-project-gallery3D",
    completedImageId: "id-from-this-project-galleryCompleted",
    cameraAligned: true, // only after human confirmation of matching views
    captionTH: "คำอธิบายคู่ภาพที่ตรวจสอบแล้ว",
    captionEN: "Approved comparison caption",
  },
];
```

`validComparisonPairs()` rejects unresolved IDs, wrong stages and AI/reference images. Matching views and aspect ratios render an accessible draggable/keyboard range comparison; mismatched camera views or aspect ratios render side-by-side original-aspect-ratio images. When no valid pair exists, a factual pending state is shown. Current reference records contain **no comparisons**.

## Quotation and contact behavior

The form collects seven fields: contact name, phone, installation location, work type, approximate area, budget and additional details. It validates required fields and prepares a copyable message **locally**. It does not submit or store customer information with the company and never reports a request as sent. Changing an input clears stale prepared details. Without JavaScript, its submit button remains disabled and the company phone/Facebook remain available.

Facebook `SCinteriorThailand`, phone `081-576-0104`, the existing company website and the supplied factory-map link are used as provided. LINE remains blank until its actual link is confirmed; the floating button gives working phone/Facebook alternatives. Connect an approved receiving backend, consent/privacy terms and spam controls separately before offering online submissions.

## Validation and review deployment

`npm run test:portfolio` covers reference separation, 75-image galleries, combined filters, comparison ownership/stage checks and unpublished/invalid project exclusion. Browser verification also covers routes, responsive layouts, lightbox interactions, slider controls/autoplay and the quotation flow. Temporary synthetic local QA fixtures are removed before delivery; they are not company projects.

The implementation is developed on a separate branch for review. It must not be merged into `main` or deployed to Production automatically.

For Vercel preview: connect this GitHub repository to Vercel with framework **Next.js**, repository root `./`, install `npm ci`, build `npm run build`, Node 24 and the default output directory. No environment variables are required for the current prototype. After a non-production branch push or PR, use the **Preview** deployment URL actually shown by Vercel/GitHub checks. Do not select a production promotion or alter the company's real domain. GitHub/API restrictions in a cloud session may prevent automatic PR creation or retrieving its preview URL; a successful local build is not a public deployment.
