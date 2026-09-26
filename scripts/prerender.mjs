// Renders every page in src/entry-server.tsx to static HTML in dist/, so crawlers and
// link previews get real content and per-page meta tags. Runs after both Vite builds.
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render, pages, posts, profile, SITE } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
let template = await readFile(resolve(dist, 'index.html'), 'utf8');

// Preload the Latin Inter subset so text renders in the right font on first paint.
const latinFont = (await readdir(resolve(dist, 'assets'))).find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f));
if (latinFont) {
  template = template.replace(
    '</head>',
    `  <link rel="preload" href="/assets/${latinFont}" as="font" type="font/woff2" crossorigin />\n  </head>`,
  );
}

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replaces the content="" of an existing tag; fails loudly if the template changes shape.
const setContent = (html, selector, value) => {
  const pattern = new RegExp(`(<meta ${selector} content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`prerender: <meta ${selector}> not found in index.html`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
};

const applyMeta = (html, page) => {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(page.title)}</title>`);
  out = setContent(out, 'name="description"', page.description);
  out = setContent(out, 'property="og:type"', page.type);
  out = setContent(out, 'property="og:title"', page.title);
  out = setContent(out, 'property="og:description"', page.description);
  out = setContent(out, 'property="og:url"', page.url);
  out = setContent(out, 'name="twitter:title"', page.title);
  out = setContent(out, 'name="twitter:description"', page.description);
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${page.url}$2`);
  if (page.noindex) out = setContent(out, 'name="robots"', 'noindex');
  if (page.jsonLd) {
    // Only the "<" needs escaping inside a JSON script block.
    const json = JSON.stringify(page.jsonLd).replace(/</g, '\\u003c');
    out = out.replace('</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return out;
};

for (const page of pages) {
  const appHtml = render(page.path);
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  if (html === template) throw new Error('prerender: <div id="root"></div> not found in index.html');
  if (page.title) html = applyMeta(html, page);

  const target = resolve(dist, page.file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`prerendered ${page.path} -> dist/${page.file}`);
}

// RSS feed for the Writing section, newest first.
const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
const items = sorted
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE}/writing/${post.slug}</link>
      <guid isPermaLink="true">${SITE}/writing/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`,
  )
  .join('\n');
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(profile.name)} — Writing</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Write-ups of bugs I tracked down and fixed in open-source PHP and Laravel projects.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${sorted[0].date}T00:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
await writeFile(resolve(dist, 'rss.xml'), rss);
console.log('wrote dist/rss.xml');

await rm(ssrDir, { recursive: true, force: true });
