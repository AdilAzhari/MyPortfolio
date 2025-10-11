import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Terminal, Code2, Sparkles, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  const roles = [
    'Software Engineer',
    'Cloud Architect',
    'Full-Stack Developer',
    'System Designer'
  ];

  useEffect(() => {
    const typeText = async () => {
      const currentText = roles[currentRole];
      
      if (isTyping) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsTyping(false), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setCurrentRole((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }
      }
    };

    const timer = setTimeout(typeText, isTyping ? 100 : 50);
    return () => clearTimeout(timer);
  }, [displayText, isTyping, currentRole, roles]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Orbs Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-32 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-pink-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Side - Floating Terminal Island */}
          <div className="space-y-8 transform-gpu">
            <div className="floating-island">
            <div className="glassmorphism-terminal relative bg-gray-900/90 dark:bg-black/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-700 group">
              {/* Holographic Edge Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              {/* Futuristic Terminal Header */}
              <div className="relative flex items-center gap-2 px-6 py-4 bg-gray-800/90 dark:bg-gray-900/90 border-b border-cyan-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
                <div className="relative flex gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full pulse-red shadow-lg shadow-red-500/50"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full pulse-yellow shadow-lg shadow-yellow-500/50" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full pulse-green shadow-lg shadow-green-500/50" style={{animationDelay: '0.4s'}}></div>
                </div>
                <div className="relative flex items-center gap-3 ml-6">
                  <Terminal className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 text-sm font-mono font-bold tracking-wider">adil@portfolio:~$</span>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping ml-2"></div>
                </div>
              </div>
              
              {/* Quantum Terminal Content */}
              <div className="relative p-8 font-mono text-sm bg-gradient-to-br from-gray-900/50 to-black/50">
                <div className="space-y-3">
                  <div className="text-emerald-400 glow-text">
                    <span className="text-cyan-500 font-bold">⚡</span> whoami
                  </div>
                  <div className="text-white font-bold text-lg tracking-wide holographic-text">Adil Omer</div>
                  
                  <div className="text-emerald-400 glow-text mt-6">
                    <span className="text-cyan-500 font-bold">$</span> cat role.txt
                  </div>
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 h-8 flex items-center text-lg font-bold">
                    <Sparkles className="h-4 w-4 text-blue-400 mr-2 animate-spin" />
                    {displayText}
                    <span className="animate-pulse ml-2 text-cyan-400 text-2xl">|</span>
                  </div>
                  
                  <div className="text-emerald-400 glow-text mt-6">
                    <span className="text-cyan-500 font-bold">$</span> ls skills/
                  </div>
                  <div className="text-white grid grid-cols-2 gap-2 text-xs mt-3">
                    <div className="skill-matrix-item">tailwind.css</div>
                      <div className="skill-matrix-item">vue.js</div>
                      <div className="skill-matrix-item">inertia.js</div>
                      <div className="skill-matrix-item">php.language</div>
                      <div className="skill-matrix-item">laravel.framework</div>
                      <div className="skill-matrix-item">mysql.db</div>
                      <div className="skill-matrix-item">eloquent.orm</div>
                      <div className="skill-matrix-item">git.version</div>
                      <div className="skill-matrix-item">github.repo</div>
                      <div className="skill-matrix-item">docker.container</div>
                      <div className="skill-matrix-item">aws.cloud</div>
                      <div className="skill-matrix-item">rest.api</div>
                      <div className="skill-matrix-item">ci/cd.pipeline</div>
                      <div className="skill-matrix-item">phpunit.test</div>
                      <div className="skill-matrix-item">pest.testing</div>
                  </div>
                  
                  <div className="text-emerald-400 glow-text mt-6">
                    <span className="text-cyan-500 font-bold">$</span> echo $PASSION
                  </div>
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 font-bold">
                    "Building scalable solutions that make a difference"
                  </div>
                  
                  <div className="text-emerald-400 glow-text mt-6">
                    <span className="text-cyan-500 font-bold">$</span> status --availability
                  </div>
                  <div className="text-emerald-400 flex items-center gap-3 font-bold">
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                    <Zap className="h-4 w-4 text-yellow-400 animate-bounce" />
                    Currently available for new opportunities
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Quantum Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Code2 className="relative h-6 w-6 group-hover:rotate-180 transition-transform duration-700" />
                <span className="relative">Explore My Code</span>
                <Sparkles className="h-4 w-4 group-hover:animate-spin" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-10 py-5 border-2 border-cyan-400 text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 backdrop-blur-xl hover:border-transparent overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center gap-2">
                  <Globe className="h-5 w-5 group-hover:animate-spin" />
                  Let's Connect
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - Holographic Profile Island */}
          <div className="text-center lg:text-left space-y-10 floating-profile">
            {/* Quantum Profile Avatar */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group quantum-avatar">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse quantum-glow"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-700 animate-spin-slow"></div>
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400/50 group-hover:border-cyan-300 transition-all duration-700 shadow-2xl shadow-cyan-500/50">
                  <img
                    src="/adil-profile.png"
                    alt="Adil Omer"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 filter group-hover:brightness-110 group-hover:contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-lg shadow-emerald-500/50">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Quantum Identity Matrix */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent holographic-text animate-gradient-x">
                Adil Omer
              </h1>
              <div className="space-y-4">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">
                  Crafting digital experiences with
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Quantum Precision', 'Neural Innovation', 'Infinite Scale'].map((word, index) => (
                    <span
                      key={word}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 text-cyan-300 rounded-2xl text-base font-bold transform hover:scale-110 transition-all duration-500 cursor-default hover:shadow-lg hover:shadow-cyan-500/50 quantum-tag"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 py-10">
              {[
                { number: '2+', label: 'Years', sublabel: 'Experience' },
                { number: '15+', label: 'Projects', sublabel: 'Delivered' },
                { number: '99.9%', label: 'Uptime', sublabel: 'Achieved' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group text-center p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl border border-cyan-400/20 hover:border-cyan-400/50 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 quantum-stat-card"
                >
                  <div className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-500">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6">
              {[
                { icon: Github, href: 'https://github.com/AdilAzhari', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/adil-omer-8aab21167', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:adilazhariosman@gmail.com', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="group relative p-5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 transform hover:scale-125 hover:-translate-y-3 quantum-portal-link overflow-hidden"
                  aria-label={label}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Icon className="relative h-7 w-7 text-cyan-300 group-hover:text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce group quantum-scroll-portal"
      >
        <div className="relative p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-500 transform group-hover:scale-110 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <ChevronDown className="relative h-7 w-7 text-cyan-300 group-hover:text-white transition-all duration-500 group-hover:animate-pulse" />
        </div>
      </button>
    </section>
  );
};

export default Hero;