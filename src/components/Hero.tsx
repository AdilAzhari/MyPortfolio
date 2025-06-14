import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Terminal, Code2 } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

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
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Terminal-like Interface */}
          <div className="space-y-8">
            <div className="bg-gray-900 dark:bg-black rounded-lg shadow-2xl overflow-hidden border border-gray-700">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Terminal className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm font-mono">adil@portfolio:~$</span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-green-400">
                    <span className="text-gray-500">$</span> whoami
                  </div>
                  <div className="text-white">Adil Omer</div>
                  
                  <div className="text-green-400 mt-4">
                    <span className="text-gray-500">$</span> cat role.txt
                  </div>
                  <div className="text-blue-400 h-6 flex items-center">
                    {displayText}
                    <span className="animate-pulse ml-1">|</span>
                  </div>
                  
                  <div className="text-green-400 mt-4">
                    <span className="text-gray-500">$</span> ls skills/
                  </div>
                  <div className="text-white grid grid-cols-2 gap-1 text-xs">
                    <div>tailwind.css</div>
                      <div>react.js</div>
                      <div>vue.js</div>
                      <div>inertia.js</div>
                      <div>php.language</div>
                      <div>laravel.framework</div>
                      <div>mysql.db</div>
                      <div>eloquent.orm</div>
                      <div>git.version</div>
                      <div>github.repo</div>
                      <div>docker.container</div>
                      <div>aws.cloud</div>
                      <div>rest.api</div>
                      <div>ci/cd.pipeline</div>
                      <div>phpunit.test</div>
                      <div>pest</div>
                  </div>
                  
                  <div className="text-green-400 mt-4">
                    <span className="text-gray-500">$</span> echo $PASSION
                  </div>
                  <div className="text-yellow-400">
                    "Building scalable solutions that make a difference"
                  </div>
                  
                  <div className="text-green-400 mt-4">
                    <span className="text-gray-500">$</span> status --availability
                  </div>
                  <div className="text-emerald-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Currently available for new opportunities
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Code2 className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore My Code
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Let's Connect
              </button>
            </div>
          </div>

          {/* Right Side - Profile & Info */}
          <div className="text-center lg:text-left space-y-8">
            {/* Animated Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                  <img
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                    alt="Adil Omer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Adil Omer
              </h1>
              <div className="space-y-2">
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Crafting digital experiences with
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {['Precision', 'Innovation', 'Scale'].map((word, index) => (
                    <span
                      key={word}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-8">
              {[
                { number: '3+', label: 'Years', sublabel: 'Experience' },
                { number: '15+', label: 'Projects', sublabel: 'Delivered' },
                { number: '99.9%', label: 'Uptime', sublabel: 'Achieved' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
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
                  className="group p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce group"
      >
        <div className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
        </div>
      </button>
    </section>
  );
};

export default Hero;