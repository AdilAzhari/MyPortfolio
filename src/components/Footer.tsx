import React from 'react';
import { Code2, Heart, Github, Linkedin, Mail, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AdilAzhari', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/Adil-Omer-8aab21167', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:adilazhariosman@gmail.com', label: 'Email' }
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Code2 className="h-10 w-10 text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Adil Omer
                  </h3>
                  <p className="text-gray-400 text-sm">Software Engineer - Software Developer</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed max-w-md">
                Passionate about building scalable solutions and mentoring the next generation of developers. 
                Always exploring new technologies and pushing the boundaries of what's possible.
              </p>

              <div className="flex items-center gap-2 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Currently available for new opportunities</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors duration-200"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Let's Connect</h4>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-200">
                      <social.icon className="h-4 w-4" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {currentYear} Adil Omer. Crafted with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>using React & TypeScript</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  All systems operational
                </span>
                <span>•</span>
                <span>Response time: &lt;24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;