import React from 'react';
import { FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'writing', label: 'Writing' },
];

const sectionIds = sections.map((s) => s.id);

const socials = [
  { icon: Github, href: profile.github, label: 'GitHub' },
  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  { icon: FileText, href: profile.resume, label: 'Résumé' },
];

const Sidebar: React.FC = () => {
  const active = useActiveSection(sectionIds);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <a href="/">{profile.name}</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">{profile.title}</h2>
        <p className="mt-4 max-w-xs leading-normal">{profile.pitch}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </p>

        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {sections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a className="group flex items-center py-3" href={`#${id}`} aria-current={isActive ? 'location' : undefined}>
                    <span
                      className={`mr-4 h-px transition-all motion-reduce:transition-none group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 ${
                        isActive ? 'w-16 bg-slate-200' : 'w-8 bg-slate-600'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${
                        isActive ? 'text-slate-200' : 'text-slate-500'
                      }`}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
        {socials.map(({ icon: Icon, href, label }) => {
          const external = href.startsWith('http');
          return (
            <li key={label} className="mr-5 shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href={href}
                target={external || href.endsWith('.pdf') ? '_blank' : undefined}
                rel={external ? 'noreferrer noopener' : undefined}
                aria-label={`${label}${external ? ' (opens in a new tab)' : ''}`}
                title={label}
              >
                <Icon className="h-6 w-6" />
              </a>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Sidebar;
