# adilomer.xyz

[![CI](https://github.com/AdilAzhari/MyPortfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AdilAzhari/MyPortfolio/actions/workflows/ci.yml)

Personal site of Adil Omer, a backend-focused Laravel engineer: experience, projects, open-source work and write-ups of bugs fixed upstream.

**Live:** https://adilomer.xyz

## Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS, Inter (self-hosted variable font)
- Static HTML prerendered at build time, hydrated on the client
- Hosted on Vercel, with Web Analytics and Speed Insights

## Commands

```bash
npm install
npm run dev        # dev server (client-rendered, no prerendering)
npm run build      # client build + SSR build + prerender into dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run test:e2e   # Playwright smoke tests against the built site (run build first)
npm run lint
```

## How the build works

`npm run build` runs three steps:

1. `vite build`: the client bundle in `dist/`.
2. `vite build --ssr src/entry-server.tsx`: a Node bundle that can render the app to a string.
3. `scripts/prerender.mjs`: renders every page listed in `entry-server.tsx` to static HTML with its own `<title>`, description, Open Graph/Twitter tags, canonical URL and JSON-LD. It also writes `dist/404.html` and `dist/rss.xml`, and preloads the Latin font subset.

The browser then hydrates that HTML (`src/main.tsx`). Anything that depends on `window` must live in an effect, so the server and client render identical markup.

## Project layout

```
src/
  data/portfolio.ts    profile, experience, projects, open source
  data/posts.ts        Writing posts (structured blocks, not Markdown)
  components/          Sidebar, EntryCard, PostPage, NotFound, ...
  entry-server.tsx     render() and the list of pages to prerender
scripts/prerender.mjs  writes the static HTML, 404 page and RSS feed
resume/                LaTeX source of public/resume/Adil_Omer_Resume.pdf
tests/smoke.spec.ts    Playwright smoke tests
vercel.json            security headers (CSP) and asset caching
```

## Common changes

**Update content:** edit `src/data/portfolio.ts`.

**Add a post:** add an entry to `src/data/posts.ts`. It is prerendered at `/writing/<slug>`, listed on the home page, included in the RSS feed and covered by the smoke tests automatically. Also add its URL to `public/sitemap.xml`.

**Update the resume:** edit `resume/Adil_Omer_Resume.tex`, then build it with [Tectonic](https://tectonic-typesetting.github.io/):

```bash
tectonic resume/Adil_Omer_Resume.tex --outdir public/resume
```

**Add a third-party script, style, font or embed:** also allow its origin in the `Content-Security-Policy` header in `vercel.json`. The policy only allows `'self'`, so the browser blocks anything else, and the smoke tests fail on CSP violations.

## Checks

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and pull request: type check, lint, build and prerender, an output sanity check, and the Playwright smoke tests. The smoke tests serve the build with the production CSP applied and fail on any page error, console error, CSP violation or hydration mismatch. Dependabot opens weekly npm updates and monthly GitHub Actions updates.

## Deploying

Deploys go through the Vercel CLI:

```bash
npx vercel --prod
```
