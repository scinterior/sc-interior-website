# SC Interior

Bilingual luxury editorial website, developed in the existing Next.js App Router / TypeScript / Tailwind repository. Uses Node.js 24 (Next.js requires 20.9+) and npm. No database or secrets are required for the current local quotation workflow.

## Development

```sh
npm ci
npm run dev
```

`npm run build` builds all pages and published project routes. `npm run typecheck` checks TypeScript. `npm start` serves a production build. Run one development server per checkout; Next.js uses a development lock. Do not build while a fixture test is creating its temporary route.

Routes: `/`, `/projects`, `/projects/[slug]`, `/expertise`, `/about`, `/contact`. TH / EN selection persists on the device. The header is a text company name pending the original approved logo; it is not a replacement logo design.

## Content integrity

All current images in `public/images` are existing **AI concept placeholders, not SC Interior projects, completed installations, or factory photographs**. Four explicitly named concept samples demonstrate the portfolio layout. Sample type/style labels demonstrate filtering, not verified project classifications. No client identities or locations have been invented. Sample detail pages have `noindex` metadata.

Completed and on-site galleries, and 3D-to-reality pairs, are intentionally empty until approved same-project assets arrive. No fabricated before/after images are published. Factory, machinery, production and team photography is pending. Warranty copy refers to company terms without inventing a duration or coverage. Company information uses the supplied brief; the original website could not be read from this environment (HTTP 403).

Verified contact information supplied in the brief is in `src/lib/content.ts`: phone, Facebook SCinteriorThailand and factory Google Maps link. LINE remains visibly pending. The quotation form validates inputs and prepares a copyable message locally. **It does not submit or store customer data, and never reports a successful submission.** Visitors open Facebook and paste/send the message themselves, or call. A backend requires a separate integration, privacy notice and spam controls.

## Add a project

Data is separate from UI in `src/lib/projects.ts`. Add a record to `projects`. All galleries are normal arrays with **no item limit**; the gallery has been designed for 50+ images. Supply actual intrinsic width/height to avoid layout shift and preserve image proportions. Local WebP, JPEG and PNG files under `public/images/projects/<slug>/` work without configuration. Remote assets require an explicit approved `images.remotePatterns` entry in `next.config.ts`.

Example structure (template only; do not publish invented details):

```ts
const project: Project = {
  id: "<unique-id>",
  slug: "<unique-url-slug>",
  titleTH: "<approved Thai title>",
  titleEN: "<approved English title>",
  location: { th: "<approved location>", en: "<approved location>" },
  projectType: "house", // house | condominium | commercial | office
  designStyle: "modern-luxury", // modern-luxury | modern-minimal | japandi | contemporary | other
  status: "3d", // 3d | completed | reality
  descriptionTH: "<approved description>",
  descriptionEN: "<approved description>",
  coverImage: {
    src: "/images/projects/<slug>/cover.webp",
    width: 2400,
    height: 1600,
    alt: {
      th: "<accurate Thai description>",
      en: "<accurate English description>",
    },
  },
  gallery3D: [],
  galleryOnSite: [],
  galleryCompleted: [],
  beforeAfterPairs: [],
  featured: false,
  published: false,
  placeholder: false,
};
```

1. Obtain approved project information, usage permission and original imagery. Copy images without altering their details. Read actual dimensions; do not assume the template dimensions.
2. Add any number of `ProjectImage` records to the appropriate gallery. Never label a 3D render as completed work. Images retain their natural aspect ratio in the masonry gallery; the full-view lightbox uses `contain` without cropping. Editorial covers intentionally use `cover`.
3. Add `beforeAfterPairs: [{ design: <ProjectImage>, completed: <ProjectImage>, sameAngle: true }]` only for approved images **of the same project**. Verify both image identities and viewpoints editorially; the UI cannot determine provenance. Matching viewpoints and aspect ratios use a draggable/keyboard range comparison. Set `sameAngle: false` for different viewpoints; different ratios also fall back to side-by-side originals.
4. Set `featured: true` for the Home selection (curate 4–6), `published: true` only after review. Unpublished records are excluded from listings, generated routes, metadata and detail lookup. Rebuild to generate newly published pages. Replace/remove concept samples when real projects are ready.
5. Check both languages, category filters, every image and the next-project link. Commit to a branch and open a PR. Do not merge to main or deploy production without approval.

The cinematic hero configuration is in `src/components/home.tsx`. Four slides reuse the existing concepts, with explicit placeholder labels. Autoplay is 6.5 seconds, with pause/play, arrows, touch swipe, a counter and progress bar. Reduced motion disables automatic movement and animations. The gallery uses native modal focus containment, restores focus on close, supports Escape, arrows and touch swipe, and lazily loads thumbnails through Next Image.

## Browser regression checks

Playwright is a test-tool prerequisite, not an application dependency. In Codex it is supplied by the runtime. On another machine install Playwright in an external test tools directory and expose it via `NODE_PATH` (or install it locally without changing the application manifest/lockfile). Set `SC_CHROMIUM_PATH` to an installed Chromium binary; these checks default to `/usr/bin/chromium`.

Start the production server in one terminal:

```sh
npm run build
npm start -- --port 3001
```

Then:

```sh
node tests/browser.cjs
# Stop other development servers before this isolated fixture check:
node tests/gallery-fixture.cjs
```

`SC_TEST_URL` overrides the production test URL. Browser checks cover slider controls/autoplay, combined filters and empty states, project details/lightbox, form preparation without POST, main-page metadata and 404s, responsive widths, language persistence, reduced motion and browser errors. The fixture check creates a clearly labelled **temporary local test route**, exercises 60 gallery items, category switching, item 50 navigation, swipe, comparison keyboard input and paired-image fallback, and deletes the route/restores generated declaration files in `finally`. Its repeated test images are never portfolio data. Do not deploy while running the fixture check. Image provenance and real production photography still require human review.

## Review / preview deployment

Work belongs on `feat/luxury-portfolio`, not main. A Git push may trigger the repository's existing Vercel preview integration; use only the deployment URL actually returned by Vercel/GitHub. No production deployment, DNS change or old-website change is part of this work. `metadataBase` uses the supplied new website address; update it only when the approved production URL changes.

## Validated delivery

On the final local production build: `npm run build`, `npm run typecheck` and Chromium regression passed, including 20 internal links/anchor targets, phone validation, hard-navigation language persistence, 375/768/1440 px layouts and reduced motion. The isolated 60-image fixture check passed twice. Lighthouse mobile lab results for Home: **Performance 96 / Accessibility 100 / SEO 100**, LCP 2.8 s, CLS 0, TBT 40 ms. These are local lab observations, not deployed-site or field measurements.
