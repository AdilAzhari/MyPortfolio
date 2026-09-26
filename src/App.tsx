import React from 'react';
import { ArrowRight } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import Spotlight from './components/Spotlight';
import Section from './components/Section';
import EntryCard from './components/EntryCard';
import { about, experience, openSource, profile, projects, type Entry } from './data/portfolio';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { posts } from './data/posts';
import PostPage from './components/PostPage';
import NotFound from './components/NotFound';
import { formatDate } from './utils/date';


const WritingList: React.FC = () => (
  <ol className="group/list">
    {posts.map((post) => (
      <li key={post.slug} className="mb-12">
        <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
          <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
          <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2">
            {formatDate(post.date)}
          </header>
          <div className="z-10 sm:col-span-6">
            <h3>
              <a
                href={`/writing/${post.slug}`}
                className="inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                {post.title}
              </a>
            </h3>
            <p className="mt-2 text-sm leading-normal">{post.summary}</p>
            <p className="mt-2 text-xs font-medium text-teal-300">{post.project}</p>
          </div>
        </div>
      </li>
    ))}
  </ol>
);

const EntryList: React.FC<{ entries: Entry[] }> = ({ entries }) => (
  <ol className="group/list">
    {entries.map((entry) => (
      <li key={entry.title} className="mb-12">
        <EntryCard entry={entry} />
      </li>
    ))}
  </ol>
);

const MoreLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <div className="mt-12">
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex items-baseline font-semibold leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
    >
      <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
        {children}
      </span>
      <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-0.5 transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
    </a>
  </div>
);

function App({ path }: { path: string }) {
  const postSlug = path.match(/^\/writing\/([\w-]+)\/?$/)?.[1];
  const currentPost = posts.find((p) => p.slug === postSlug);

  const isHome = path === '/' || path === '/index.html';

  if (currentPost || !isHome) {
    return (
      <ErrorBoundary>
        <div className="relative">
          <Spotlight />
          {currentPost ? <PostPage post={currentPost} /> : <NotFound />}
        </div>
        <Analytics />
        <SpeedInsights />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="relative">
        <Spotlight />
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            <Sidebar />

            <main id="main-content" className="pt-24 lg:w-1/2 lg:py-24">
              <Section id="about" label="About">
                {about.map((paragraph) => (
                  <p key={paragraph} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </Section>

              <Section id="experience" label="Experience">
                <EntryList entries={experience} />
                <MoreLink href={profile.resume}>View Full Résumé</MoreLink>
              </Section>

              <Section id="projects" label="Projects">
                <EntryList entries={projects} />
                <MoreLink href={profile.github}>View All Projects on GitHub</MoreLink>
              </Section>

              <Section id="open-source" label="Open Source">
                <EntryList entries={openSource} />
              </Section>

              <Section id="writing" label="Writing">
                <WritingList />
              </Section>

              <footer className="max-w-md pb-16 text-sm text-slate-400 sm:pb-0">
                <p>
                  Built with React and Tailwind CSS, deployed on Vercel. Layout inspired by{' '}
                  <a
                    href="https://brittanychiang.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                  >
                    Brittany Chiang
                  </a>
                  . Say hi at{' '}
                  <a href={`mailto:${profile.email}`} className="font-medium text-slate-400 hover:text-teal-300">
                    {profile.email}
                  </a>
                  .
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  );
}

export default App;
