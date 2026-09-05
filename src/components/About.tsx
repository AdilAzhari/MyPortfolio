import React from 'react';
import { Code, Database, Layers, GitBranch, Lightbulb, Rocket, Shield, Zap } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Backend Development',
      description: 'Crafting robust RESTful APIs with Laravel, focused on scalability and performance.',
    },
    {
      icon: Database,
      title: 'Database Design & Optimization',
      description: 'Designing efficient MySQL schemas and optimizing queries with Redis caching.',
    },
    {
      icon: Layers,
      title: 'Frontend Integration',
      description: 'Seamlessly integrating dynamic UIs using Vue.js, Inertia.js, and Tailwind CSS.',
    },
    {
      icon: GitBranch,
      title: 'Software Architecture & DevOps',
      description: 'Applying modular design, Clean Code, SOLID principles, and CI/CD pipelines.',
    }
  ];

  const principles = [
    { icon: Lightbulb, title: 'Problem Solving', description: 'Analytical approach to complex challenges' },
    { icon: Rocket, title: 'Performance Driven', description: 'Optimizing for speed and scalability' },
    { icon: Shield, title: 'Security Minded', description: 'Building with security as a foundation' },
    { icon: Zap, title: 'Efficiency Focused', description: 'Delivering maximum value with minimal complexity' }
  ];

  const stats = [
    { number: '4+', label: 'Years Experience', sublabel: 'Laravel & PHP ecosystem' },
    { number: '15+', label: 'Projects Delivered', sublabel: 'From concept to production' },
    { number: '103+', label: 'Pest Tests Written', sublabel: 'On Madarik SaaS alone' },
    { number: '4', label: 'Industry Domains', sublabel: 'Education, Healthcare, Retail, Transport' },
  ];

  const skills = [
    'Laravel', 'Vue.js', 'React', 'Inertia.js', 'PHP 8+', 'MySQL',
    'Redis', 'REST APIs', 'Filament', 'Spatie', 'Docker', 'AWS',
    'GitHub Actions', 'CI/CD', 'Pest', 'TDD', 'SOLID Principles', 'Clean Architecture',
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Engineering Philosophy
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Crafting digital solutions with
                <span className="text-accent"> purpose</span>
              </h3>

              <div className="space-y-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="relative pl-5">
                  <span className="absolute left-0 top-2.5 w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  I'm a Full-Stack PHP Developer with over <strong className="text-gray-900 dark:text-white">4 years of experience</strong> building scalable web applications, primarily with Laravel. My engineering philosophy centers on writing clean, maintainable code while delivering measurable business value.
                </p>
                <p className="relative pl-5">
                  <span className="absolute left-0 top-2.5 w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  I've focused on delivering robust solutions — from multi-tenant SaaS platforms and enterprise POS systems to healthcare management tools — handling complex data architecture and real-world scale.
                </p>
                <p className="relative pl-5">
                  <span className="absolute left-0 top-2.5 w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  I believe in continuous learning and staying ahead of technology trends. When I'm not coding, you'll find me building <strong className="text-gray-900 dark:text-white">self-initiated projects</strong> and applying industry best practices through test-driven development.
                </p>
              </div>
            </div>

            {/* Core Principles */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Core Engineering Principles</h4>
              <div className="grid grid-cols-2 gap-3">
                {principles.map((principle) => (
                  <div
                    key={principle.title}
                    className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-lg group-hover:bg-accent transition-colors duration-200">
                        <principle.icon className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">{principle.title}</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{principle.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technical Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group relative p-7 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="w-14 h-14 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="h-7 w-7 text-white dark:text-gray-900" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors duration-200">
                  {item.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-600 transition-colors duration-200"
            >
              <div className="text-4xl font-black text-accent mb-1">{stat.number}</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
