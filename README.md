# sc-interior-website

Official website for SC Interior - Interior Design, Built-in Furniture &amp; Renovation

## SC Interior — Home

Next.js App Router, TypeScript and Tailwind CSS. This iteration implements only the Home page, with Thai/English copy, responsive navigation, reference image gallery, services, process, FAQ and quotation-message preparation.

## Run locally

Requires Node.js 20.9+ (tested with Node 24) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 in your local browser. For production: `npm run build` then `npm start`. Run `npm run typecheck` to check TypeScript.

## Content and publication

- Edit image paths, services and verified contact information in `src/lib/content.ts`.
- Bilingual Home copy is in `src/components/home.tsx`; gallery and form are in `src/components/project-gallery.tsx` and `src/components/quotation.tsx`; styling is in `src/app/globals.css`; SEO metadata is in `src/app/layout.tsx`.
- `public/images/*.webp` are AI-generated concept illustrations, **not SC Interior projects**. Replace them with approved photography before presenting any work as a company project.
- The header shows the company name as text, not a newly designed logo. Replace it with the approved original logo when available.
- Only the supplied phone number and company facts are used. Facebook SCinteriorThailand and the supplied factory map are linked. The LINE link is pending; LINE buttons show a notice with the available contact options.
- The quotation form collects contact name, phone, installation location, work type, approximate area, budget and additional details. It validates required fields and prepares a copyable message locally. It does **not** submit, transmit or store customer information. Connect an approved backend/CRM, consent/privacy notice and spam controls before enabling online submission.
- No unverified portfolio, reviews, factory address, Before/After pairs or statistics are included. Before/After and actual project detail pages await approved assets and Home approval.
- Thai Home is at `/`; English Home is at `/?lang=en`, with server-rendered localized titles, descriptions, Open Graph metadata and language alternate links. Add canonical URLs and a sitemap once the production domain is confirmed.
- No other website pages have been created in this iteration.

## Validation

Production build, TypeScript and Chromium checks cover language switching, gallery open/close, quotation preparation, responsive menu and mobile horizontal overflow. Browser checks are temporary development checks, not an installed project test suite.

## Preview from Codex Cloud

`localhost` in your browser refers to your own computer, not the Codex cloud machine. A Next.js process listening on `0.0.0.0:3000` in cloud does not by itself provide a public URL. This session does not expose a public-preview or port-publication tool.

### Test deployment on Vercel without a custom domain

1. Commit the complete application, including `package.json`, `package-lock.json`, `src/`, `public/`, TypeScript/PostCSS/Next configuration and generated Next agent guidance, to a development branch and push it to `scinterior/sc-interior-website`. Uncommitted files in Codex Cloud are not visible to Vercel. Do not commit `node_modules/`, `.next/` or secrets.
2. Sign in at https://vercel.com/new and import that GitHub repository. Authorize access to the repository if requested.
3. Select the branch containing the application. Use framework **Next.js**, root directory **./** (the repository root, not the cloud parent directory), install command `npm ci`, build command `npm run build`, and the default output directory. Use Node.js 24.x if available; otherwise use a supported Node.js version meeting Next.js requirements (20.9+).
4. No environment variables or secrets are required for the current Home prototype. Deploy and open the URL Vercel actually returns, ending in `.vercel.app`. No custom-domain or DNS setup is necessary.
5. Subsequent pull requests or pushes to non-production branches receive Preview Deployments once the Git integration is configured. Open their deployment links from Vercel or the PR checks. Access may require signing in if deployment protection is enabled.

A new project's first deployment may be called Production by Vercel; it can still be reviewed on the provided `.vercel.app` URL without connecting the company's real domain. Deployment is not performed automatically by these instructions.

## Home refinements

The existing Home design and hero image are preserved. Navigation includes six working section anchors with a sticky cream header. Service cards use the existing reference images. The factory section uses `public/images/factory-placeholder.svg`, explicitly labeled as an illustration, not a photograph of company facilities.

### Adding approved projects

Edit `projects` in `src/lib/content.ts`. Each record has a stable `id`, Thai/English `title`, `workType`, `style`, `isReference` and an `images` array of local asset paths with bilingual alt text. The gallery supports one or multiple images, thumbnails, arrow keys, Escape and focus return. Set `isReference: false` only after project details and photographs have been verified. Current records are AI reference moodboards and make no claim to be actual company work or images of a single completed project.

### Quotation behavior

There is no submission backend. The form never reports that a request has been sent. It prepares a copyable message and links to the supplied Facebook account and telephone number. Editing an input clears stale prepared details. The submit button is disabled until JavaScript initializes, preventing a native form submission without JavaScript. An approved receiving system must be connected separately before online submissions are offered.

This refinement does not change any domain, deploy to production, or replace www.sc-interior.com.
