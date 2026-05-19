import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Heart, ArrowUp, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const stack = ['Laravel', 'PHP 8.4', 'React', 'Vue.js', 'Inertia.js', 'MySQL', 'AWS', 'Pest'];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Code2 className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-xl font-bold text-white">Adil Omer</h3>
                <p className="text-gray-500 text-xs">Full-Stack Developer · Laravel & Vue.js</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building scalable Laravel SaaS products with clean architecture, test-driven development, and a focus on real-world impact.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">Available for opportunities</span>
            </div>
            <div className="flex gap-3">
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
                  className="p-2.5 bg-white/5 border border-white/[0.08] rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Stack */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-5">Contact</h4>
              <div className="space-y-3">
                {[
                  { icon: Mail, text: 'adilazhariosman@gmail.com', href: 'mailto:adilazhariosman@gmail.com' },
                  { icon: Phone, text: '+60 13-903 4997', href: 'tel:+60139034997' },
                  { icon: MapPin, text: 'Shah Alam, Malaysia', href: undefined },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-3 text-gray-400 text-sm">
                    <Icon className="h-4 w-4 text-gray-600 flex-shrink-0" />
                    {href ? (
                      <a href={href} className="hover:text-white transition-colors duration-200">{text}</a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {stack.map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-white/5 border border-white/[0.08] text-gray-400 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>© {currentYear} Adil Omer · Built with</span>
            <Heart className="h-3.5 w-3.5 text-red-500" />
            <span>React, TypeScript & Tailwind</span>
          </div>
          <a href="/sitemap.xml" className="text-gray-600 hover:text-gray-400 text-sm transition-colors duration-200">
            Sitemap
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 bg-white/5 border border-white/[0.08] rounded-lg text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
