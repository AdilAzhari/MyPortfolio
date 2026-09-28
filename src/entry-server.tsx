import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { profile } from './data/portfolio';
import { posts } from './data/posts';
import { formatDate } from './utils/date';

export const SITE = 'https://adilomer.xyz';
export { posts, profile };

export interface PageMeta {
  path: string;
  file: string;
  title: string;
  description: string;
  url: string;
  type: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
  /** Generated social preview; written to dist/<file> and used for og:image. */
  ogImage?: { file: string; url: string; alt: string; title: string; summary: string; project: string; date: string };
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
  {
    path: '/404',
    file: '404.html',
    title: `Page not found · ${profile.name}`,
    description: 'This page does not exist.',
    url: `${SITE}/404`,
    type: 'website',
    noindex: true,
  },
  ...posts.map((post): PageMeta => ({
    path: `/writing/${post.slug}`,
    file: `writing/${post.slug}/index.html`,
    title: `${post.title} · ${profile.name}`,
    description: post.summary,
    url: `${SITE}/writing/${post.slug}`,
    type: 'article',
    ogImage: {
      file: `og/${post.slug}.png`,
      url: `${SITE}/og/${post.slug}.png`,
      alt: post.title,
      title: post.title,
      summary: post.summary,
      project: post.project,
      date: formatDate(post.date),
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      url: `${SITE}/writing/${post.slug}`,
      image: `${SITE}/og/${post.slug}.png`,
      keywords: post.tags.join(', '),
      author: { '@type': 'Person', name: profile.name, url: SITE },
    },
  })),
];
