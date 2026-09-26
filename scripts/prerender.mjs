// Renders every page in src/entry-server.tsx to static HTML in dist/, so crawlers and
// link previews get real content and per-page meta tags. Runs after both Vite builds.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render, pages } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const template = await readFile(resolve(dist, 'index.html'), 'utf8');

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

await rm(ssrDir, { recursive: true, force: true });
