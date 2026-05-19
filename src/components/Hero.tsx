import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stack = ['Laravel', 'PHP 8.4', 'React', 'Vue.js', 'Inertia.js', 'MySQL', 'AWS', 'Pest'];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#080808] relative overflow-hidden px-6 lg:px-8 py-28">
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">

        {/* ── Profile photo ── */}
        <div className="relative mb-7">
          {/* Animated gradient halo */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/30 via-emerald-400/20 to-purple-500/30 animate-spin-slow blur-sm" />
          {/* Static crisp ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400/50 to-emerald-400/50" />
          {/* Photo */}
          <div className="relative w-36 h-36 rounded-full overflow-hidden ring-[3px] ring-gray-50 dark:ring-[#080808]">
            <img
              src="/adil-profile.png"
              alt="Adil Omer"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Online dot */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-gray-50 dark:ring-[#080808] animate-pulse" />
        </div>

        {/* ── Status pill ── */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 font-mono text-xs tracking-widest uppercase rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Open to opportunities
          </span>
        </div>

        {/* ── Name ── */}
        <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-black text-gray-900 dark:text-white leading-none tracking-tight mb-5">
          Adil<br />Omer
        </h1>

        {/* ── Tagline ── */}
        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mb-3">
          I build{' '}
          <span className="text-gray-900 dark:text-white font-semibold">
            Laravel SaaS products
          </span>{' '}
          that don't fall apart at scale.
        </p>

        <p className="text-gray-500 max-w-md leading-relaxed mb-9">
          Full-stack developer specializing in multi-tenant architecture, clean API
          design, and test-driven Laravel applications.
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-wrap justify-center gap-4 mb-7">
          <button
            onClick={() => scrollToSection('projects')}
            className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            View My Work
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-7 py-3.5 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            Let's Talk
          </button>
        </div>

        {/* ── Social links ── */}
        <div className="flex items-center gap-7 mb-16">
          {[
            { icon: Github,   href: 'https://github.com/AdilAzhari',                   label: 'GitHub'   },
            { icon: Linkedin, href: 'https://linkedin.com/in/adil-omer-8aab21167',     label: 'LinkedIn' },
            { icon: Mail,     href: 'mailto:adilazhariosman@gmail.com',                label: 'Email'    },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* ── Stat bento row ── */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bento-card p-5 rounded-2xl text-center">
            <div className="text-4xl font-black text-gray-900 dark:text-white leading-none">7+</div>
            <div className="text-gray-500 text-xs mt-2">Years of PHP</div>
          </div>

          <div className="bento-card p-5 rounded-2xl text-center">
            <div className="text-4xl font-black text-gray-900 dark:text-white leading-none">15+</div>
            <div className="text-gray-500 text-xs mt-2">Projects built</div>
          </div>

          <div className="col-span-2 lg:col-span-1 bento-card p-5 rounded-2xl text-left">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">Available now</span>
            </div>
            <p className="text-gray-500 text-xs mb-1">Open to full-time or freelance</p>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-600 text-xs">
              <MapPin className="h-3 w-3" />
              Malaysia (UTC+8)
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 bento-card p-5 rounded-2xl text-left">
            <p className="text-gray-500 dark:text-gray-600 text-xs uppercase tracking-widest mb-3 font-mono">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map(tech => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-300 rounded-full text-[10px] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-gray-400 dark:text-gray-700 text-[10px] tracking-widest uppercase font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-400 dark:from-gray-700 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
