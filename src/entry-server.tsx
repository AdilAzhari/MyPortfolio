// Build-time entry for scripts/prerender.mjs; never hot-reloaded, so the fast-refresh rule does not apply.
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { profile } from './data/portfolio';
import { posts } from './data/posts';

const SITE = 'https://adilomer.xyz';

export interface PageMeta {
  path: string;
  file: string;
  title: string;
  description: string;
  url: string;
  type: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

export const render = (path: string) =>
  renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );

// Pages with their own head tags. The home page keeps the tags already in index.html.
export const pages: PageMeta[] = [
  {
    path: '/',
    file: 'index.html',
    title: '',
    description: '',
    url: `${SITE}/`,
    type: 'website',
  },
  ...posts.map((post): PageMeta => ({
    path: `/writing/${post.slug}`,
    file: `writing/${post.slug}/index.html`,
    title: `${post.title} · ${profile.name}`,
    description: post.summary,
    url: `${SITE}/writing/${post.slug}`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      url: `${SITE}/writing/${post.slug}`,
      image: `${SITE}/og-image.png`,
      keywords: post.tags.join(', '),
      author: { '@type': 'Person', name: profile.name, url: SITE },
    },
  })),
];
