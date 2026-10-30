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
- Bilingual Home copy is in `src/components/home.tsx`; styling is in `src/app/globals.css`; SEO metadata is in `src/app/layout.tsx`.
- `public/images/*.webp` are AI-generated concept illustrations, **not SC Interior projects**. Replace them with approved photography before presenting any work as a company project.
- The header shows the company name as text, not a newly designed logo. Replace it with the approved original logo when available.
- Only the supplied phone number and company facts are used. Verified LINE, Messenger and factory map links are pending. Contact buttons currently show a notice and direct visitors to the phone number; they do not open an unverified account.
- The quotation form validates required fields and prepares a copyable message locally. It does **not** submit, transmit or store customer information. Connect an approved backend/CRM, consent/privacy notice and spam controls before enabling online submission.
- No unverified portfolio, reviews, factory address, Before/After pairs or statistics are included. Before/After and actual project detail pages await approved assets and Home approval.
- Add canonical URLs, language-specific URLs/metadata and sitemap once the production domain and routing are confirmed. Current Home includes bilingual content, semantic headings and Open Graph metadata.
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
