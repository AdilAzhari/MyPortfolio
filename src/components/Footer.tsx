import React from 'react';
import { 
  Code2, 
  Heart, 
  Github, 
  Linkedin, 
  Mail, 
  Zap, 
  MapPin, 
  Phone, 
  Calendar,
  Award,
  BookOpen,
  Globe,
  Server,
  Database,
  Cloud,
  GitBranch
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 2022; // Started in 2022

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AdilAzhari', label: 'GitHub', description: 'View my code' },
    { icon: Linkedin, href: 'https://linkedin.com/in/Adil-Omer-8aab21167', label: 'LinkedIn', description: 'Professional network' },
    { icon: Mail, href: 'mailto:adilazhariosman@gmail.com', label: 'Email', description: 'Get in touch' }
  ];

  const navigationLinks = [
    { label: 'About', href: '#about', icon: Code2 },
    { label: 'Projects', href: '#projects', icon: Server },
    { label: 'Testimonials', href: '#testimonials', icon: Award },
    { label: 'Blog', href: '#blog', icon: BookOpen },
    { label: 'Skills', href: '#skills', icon: Zap },
    { label: 'Contact', href: '#contact', icon: Mail }
  ];

  const techStack = [
    { name: 'Laravel', category: 'Backend', icon: Server },
    { name: 'Inertia.js', category: 'Full-Stack', icon: GitBranch },
    { name: 'Vue.js', category: 'Frontend', icon: Code2 },
    { name: 'Livewire', category: 'Full-Stack', icon: Zap },
    { name: 'PHP', category: 'Backend', icon: Server },
    { name: 'MySQL', category: 'Database', icon: Database },
    { name: 'AWS', category: 'Cloud', icon: Cloud },
    { name: 'GitHub Actions', category: 'CI/CD', icon: GitBranch }
  ];

  const contactInfo = [
    { icon: Mail, label: 'adilazhariosman@gmail.com', href: 'mailto:adilazhariosman@gmail.com' },
    { icon: Phone, label: '+60 13-903 4997', href: 'tel:+60139034997' },
    { icon: MapPin, label: 'Shah Alam, Selangor, Malaysia', href: 'https://www.google.com/maps/place/Shah+Alam,+Selangor,+Malaysia' },
    { icon: Calendar, label: 'Response within 24 hours', href: '#contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Sitemap', href: '/sitemap.xml' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Brand & Bio Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Code2 className="h-12 w-12 text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Adil Omer
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">Software Developer (Laravel & Vue.js)</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Full-stack developer with <span className="text-blue-400 font-semibold">{experienceYears}+ years</span> of experience 
                  building scalable web applications. Specialized in Laravel ecosystem with modern PHP, Vue.js, and cloud infrastructure.
                </p>
                
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for freelance & full-time opportunities</span>
                </div>

                {/* Experience Highlight */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-400">Experience Highlights</span>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• {experienceYears}+ years in Laravel & PHP development</li>
                    <li>• Expert in Vue.js, Inertia.js, and Livewire</li>
                    <li>• AWS infrastructure and CI/CD with GitHub Actions</li>
                    <li>• MySQL optimization and database design</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                Site Navigation
              </h4>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <link.icon className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Server className="h-5 w-5 text-blue-400" />
                Tech Stack
              </h4>
              <div className="space-y-4">
                {techStack.map((tech) => (
                  <div key={tech.name} className="flex items-center gap-3 group">
                    <div className="p-1.5 bg-gray-800 rounded-md group-hover:bg-blue-600 transition-colors duration-200">
                      <tech.icon className="h-3 w-3 text-gray-400 group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
                      <div className="text-xs text-gray-500">{tech.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-400" />
                Get In Touch
              </h4>
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-3 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-200 mt-0.5">
                      <contact.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-200 block">
                        {contact.label}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media & Resources */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold mb-6">Connect & Follow</h4>
              
              {/* Social Links */}
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-200">
                      <social.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-200 block">
                        {social.label}
                      </span>
                      <span className="text-xs text-gray-500">{social.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              
              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {currentYear} Adil Omer. Crafted with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>using React, TypeScript & Tailwind CSS</span>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-4">
                {legalLinks.map((link, index) => (
                  <React.Fragment key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className="text-gray-600">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  All systems operational
                </span>
                <span className="hidden sm:block">•</span>
                <span className="hidden sm:block">Built with performance in mind</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 group"
          aria-label="Back to top"
        >
          <svg
            className="h-5 w-5 text-white group-hover:-translate-y-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;