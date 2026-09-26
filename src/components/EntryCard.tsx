import React from 'react';
import { ArrowUpRight, Link as LinkIcon } from 'lucide-react';
import type { Entry } from '../data/portfolio';

const EntryCard: React.FC<{ entry: Entry }> = ({ entry }) => {
  const { period, title, subtitle, href, description, tags, links, thumb, image } = entry;

  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          width={640}
          height={400}
          className="z-10 order-2 mt-4 w-40 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:mt-1 sm:w-full"
        />
      ) : thumb ? (
        <div
          aria-hidden="true"
          className="z-10 order-2 mt-4 flex aspect-video w-28 items-center justify-center rounded border-2 border-slate-200/10 bg-gradient-to-br from-slate-800 to-slate-900 font-mono text-sm font-bold tracking-widest text-teal-300/80 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:mt-1 sm:w-full"
        >
          {thumb}
        </div>
      ) : (
        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
          {period}
        </header>
      )}

      <div className="z-10 sm:col-span-6 sm:order-2">
        <h3 className="font-medium leading-snug text-slate-200">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${title}${subtitle ? ` — ${subtitle}` : ''} (opens in a new tab)`}
              className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
              <span>
                {title}
                {subtitle && <> · <span className="inline-block">{subtitle}</span></>}
                <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
              </span>
            </a>
          ) : (
            <span className="text-base">
              {title}
              {subtitle && <> · <span className="inline-block">{subtitle}</span></>}
            </span>
          )}
        </h3>
        {(thumb || image) && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{period}</p>}
        <p className="mt-2 text-sm leading-normal">{description}</p>

        {links && (
          <ul className="relative z-10 mt-2 flex flex-wrap" aria-label="Related links">
            {links.map((link) => (
              <li key={link.href} className="mr-4">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300"
                >
                  <LinkIcon className="mr-1 h-3 w-3 shrink-0" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
          {tags.map((tag) => (
            <li key={tag} className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                {tag}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EntryCard;
