import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { posts } from '../src/data/posts';

// Apply the same headers Vercel sends (vercel.json) so a CSP regression fails here.
// upgrade-insecure-requests is dropped because the preview server is plain http.
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const csp: string = vercel.headers[0].headers
  .find((h: { key: string }) => h.key === 'Content-Security-Policy')
  .value.replace(/;\s*upgrade-insecure-requests/, '');

// Collects uncaught errors, console errors and CSP violations for the page.
const watch = async (page: Page) => {
  const problems: string[] = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));

  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) =>
      console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`),
    );
  });
  // Vercel serves its analytics scripts only in production.
  await page.route('**/_vercel/**', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }));
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.fallback();
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': csp } });
  });

  return problems;
};

test('home page is prerendered, hydrates and reacts to scrolling', async ({ page, request }) => {
  const raw = await (await request.get('/')).text();
  expect(raw).toContain('<div id="root"><');

  const problems = await watch(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Adil Omer');
  for (const section of ['about', 'experience', 'projects', 'open-source', 'writing']) {
    await expect(page.locator(`#${section}`)).toBeAttached();
  }

  // The nav highlight is set by an effect, so it only changes once React has hydrated.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator('nav a[aria-current="location"]')).toHaveText('Writing');

  expect(problems).toEqual([]);
});

for (const post of posts) {
  test(`post "${post.slug}" is prerendered with its own meta`, async ({ page, request }) => {
    const raw = await (await request.get(`/writing/${post.slug}/`)).text();
    expect(raw).toContain('<div id="root"><');
    expect(raw).toContain(`<meta property="og:url" content="https://adilomer.xyz/writing/${post.slug}"`);
    expect(raw).toContain('"@type":"BlogPosting"');

    const problems = await watch(page);
    await page.goto(`/writing/${post.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(post.title);
    await expect(page).toHaveTitle(`${post.title} · Adil Omer`);
    await expect(page.getByRole('link', { name: 'Read the pull request' })).toHaveAttribute('href', post.pr);

    expect(problems).toEqual([]);
  });
}

test('404 page renders and is not indexed', async ({ page, request }) => {
  const raw = await (await request.get('/404.html')).text();
  expect(raw).toContain('<meta name="robots" content="noindex"');

  const problems = await watch(page);
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');

  expect(problems).toEqual([]);
});

test('rss feed lists every post', async ({ request }) => {
  const rss = await (await request.get('/rss.xml')).text();
  for (const post of posts) expect(rss).toContain(`https://adilomer.xyz/writing/${post.slug}</link>`);
});
