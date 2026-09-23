import React from 'react';

interface SectionProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, label, children }) => (
  <section id={id} aria-label={label} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
    <div className="sticky top-0 z-20 -mx-6 mb-4 bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{label}</h2>
    </div>
    {children}
  </section>
);

export default Section;
