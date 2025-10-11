import React from 'react';
import { 
  Code, 
  Database, 
  Users, 
  Lightbulb, 
  Rocket, 
  Shield, 
  Zap, 
  GitBranch,
  Layers,
  Cpu
} from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code,
      title: "Backend Development",
      description: "Crafting robust RESTful APIs with Laravel, focused on scalability and performance.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database, // Changed icon to better reflect database focus
      title: "Database Design & Optimization",
      description: "Designing efficient MySQL schemas and optimizing queries with Redis caching.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Layers, // Represents modularity/architecture
      title: "Frontend Integration", // Combined for full stack
      description: "Seamlessly integrating dynamic UIs using Vue.js, Inertia.js, and Tailwind CSS.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: GitBranch, // Represents DevOps/CI/CD
      title: "Software Architecture & DevOps",
      description: "Applying modular design, Clean Code, SOLID principles, and CI/CD basics.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const principles = [
    { icon: Lightbulb, title: "Problem Solving", description: "Analytical approach to complex challenges" },
    { icon: Rocket, title: "Performance Driven", description: "Optimizing for speed and scalability" },
    { icon: Shield, title: "Security Minded", description: "Building with security as a foundation" },
    { icon: Zap, title: "Efficiency Focused", description: "Delivering maximum value with minimal complexity" }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            About Me
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Engineering Philosophy
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Crafting Digital Solutions with
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Purpose</span>
              </h3>
              
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                  I'm a dedicated Full-Stack PHP Developer with over <strong className="text-blue-600 dark:text-blue-400">2 years of experience</strong> building 
                  scalable web applications, primarily with Laravel. My engineering philosophy 
                  centers on writing clean, maintainable code while delivering measurable 
                  business value.
                </p>
                <p className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-purple-600 rounded-full"></span>
                  Throughout my experience, I've focused on delivering robust solutions, from 
                  designing efficient database schemas to integrating dynamic front-ends, often 
                  handling data-intensive processes.
                </p>
                <p className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-emerald-600 rounded-full"></span>
                  I believe in continuous learning and staying ahead of technology trends. 
                  When I'm not coding, you'll find me contributing to <strong className="text-emerald-600 dark:text-emerald-400">self-initiated projects</strong>, 
                  and applying industry best practices.
                </p>
              </div>
            </div>

            {/* Core Principles */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Core Engineering Principles
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {principles.map((principle, index) => (
                  <div
                    key={index}
                    className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                        <principle.icon className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {principle.title}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Tags */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Technical Specializations
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Laravel', 'Vue.js', 'MySQL', 'REST APIs', 'Redis', 'Inertia.js', 'Filament', 'SOLID Principles', 'Clean Code', 'Test-Driven Development', 'Git',
                'CI/CD', 'PHP 8+', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Docker', 'Agile Methodologies', 'Problem Solving', 'Performance Optimization', 'Security Best Practices'
                , 'Modular Architecture', 'Code Reviews', 'Documentation', 'Cross-Functional Collaboration', 'Continuous Learning'
                ].map((skill, index) => (
                  <span 
                    key={skill}
                    className="group px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="group relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
          <div className="relative p-12 rounded-3xl">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Impact by the Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '3+', label: 'Years Experience', sublabel: 'Building scalable web apps', icon: '🚀' },
                { number: '3+', label: 'Key Projects', sublabel: 'From concept to production', icon: '💻' },
                { number: '10+', label: 'Technologies', sublabel: 'Across the PHP ecosystem', icon: '⚡' },
                { number: '5+', label: 'Languages', sublabel: 'PHP, JavaScript, TypeScript, and more', icon: <Cpu className="h-6 w-6" /> },
                { number: '2+', label: 'Years with Laravel', sublabel: 'Building robust APIs', icon: <Code className="h-6 w-6" /> },
                { number: '5+', label: 'Frameworks', sublabel: 'Laravel, Vue.js, and more', icon: <Code className="h-6 w-6" /> },
                { number: '50+', label: 'APIs Developed', sublabel: 'RESTful services for diverse needs', icon: <Database className="h-6 w-6" /> },
                { number: '100%', label: 'Commitment to Quality', sublabel: 'Clean code and best practices', icon: <GitBranch className="h-6 w-6" /> }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="group text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;