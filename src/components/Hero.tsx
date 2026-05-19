import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stack = ['Laravel', 'PHP 8.4', 'React', 'Vue.js', 'Inertia.js', 'MySQL', 'AWS', 'Pest'];

  return (
    <section className="min-h-screen flex items-center bg-[#080808] relative overflow-hidden">
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-32 relative z-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left — Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase">Open to opportunities</span>
            </div>

            <h1 className="text-[clamp(4rem,10vw,8rem)] font-black text-white leading-none tracking-tight">
              Adil<br />Omer
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg">
              I build <span className="text-white font-semibold">Laravel SaaS products</span> that don't fall apart at scale.
            </p>

            <p className="text-gray-500 max-w-md leading-relaxed">
              Full-stack developer specializing in multi-tenant architecture, clean API design, and test-driven Laravel applications.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                View My Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-7 py-3.5 border border-white/10 hover:border-white/30 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                Let's Talk
              </button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {[
                { icon: Github, href: 'https://github.com/AdilAzhari', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/adil-omer-8aab21167', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:adilazhariosman@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="text-gray-600 hover:text-white transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Bento Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bento-card p-6 rounded-2xl">
              <div className="text-5xl font-black text-white leading-none">7+</div>
              <div className="text-gray-500 text-sm mt-2">Years of PHP</div>
            </div>

            <div className="bento-card p-6 rounded-2xl">
              <div className="text-5xl font-black text-white leading-none">15+</div>
              <div className="text-gray-500 text-sm mt-2">Projects built</div>
            </div>

            <div className="col-span-2 bento-card p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 font-semibold text-sm">Available now</span>
                  </div>
                  <p className="text-gray-500 text-xs">Open to full-time or freelance</p>
                </div>
                <div className="flex items-center gap-1 text-gray-600 text-xs">
                  <MapPin className="h-3 w-3" />
                  Malaysia (UTC+8)
                </div>
              </div>
            </div>

            <div className="col-span-2 bento-card p-5 rounded-2xl">
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-3 font-mono">Core Stack</p>
              <div className="flex flex-wrap gap-2">
                {stack.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/5 border border-white/[0.08] text-gray-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-2 bento-card rounded-2xl overflow-hidden h-48 relative">
              <img
                src="/adil-profile.png"
                alt="Adil Omer"
                className="w-full h-full object-cover object-top grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-white font-bold text-sm">Adil Omer</p>
                <p className="text-gray-400 text-xs">Shah Alam, Malaysia</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-gray-700 text-[10px] tracking-widest uppercase font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-700 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
