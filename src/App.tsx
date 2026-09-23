import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import Spotlight from './components/Spotlight';
import Section from './components/Section';
import EntryCard from './components/EntryCard';
import { about, experience, openSource, profile, projects, type Entry } from './data/portfolio';
import { initAnalytics } from './utils/analytics';
import { initPWA } from './utils/pwa';

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

function App() {
  useEffect(() => {
    initAnalytics();
    initPWA();
  }, []);

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

              <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
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
    </ErrorBoundary>
  );
}

export default App;
