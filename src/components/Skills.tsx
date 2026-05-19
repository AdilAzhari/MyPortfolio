import React, { useState, useEffect } from 'react';
import { Code, Server, Cloud, Database, Settings, Zap, Target, Search } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  yearsExp: number;
  projects: number;
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const skillCategories = [
    { name: 'All', icon: Code, color: 'from-blue-500 to-purple-500' },
    { name: 'Frontend', icon: Code, color: 'from-pink-500 to-rose-500' },
    { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
    { name: 'Cloud', icon: Cloud, color: 'from-blue-500 to-cyan-500' },
    { name: 'Database', icon: Database, color: 'from-orange-500 to-red-500' },
    { name: 'DevOps', icon: Settings, color: 'from-purple-500 to-indigo-500' }
  ];

  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 65, category: 'Frontend', yearsExp: 1.5, projects: 2 },
    { name: 'TypeScript', level: 60, category: 'Frontend', yearsExp: .5, projects: 30 },
    { name: 'JavaScript', level: 70, category: 'Frontend', yearsExp: 1.5, projects: 5 },
    { name: 'Vue.js', level: 80, category: 'Frontend', yearsExp: 3, projects: 7 },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend', yearsExp: 4, projects: 15 },
    // Backend
    { name: 'Php', level: 95, category: 'Backend', yearsExp: 7, projects: 35 },
    { name: 'Laravel', level: 85, category: 'Backend', yearsExp: 3, projects: 15 },
    { name: 'Inertia.js', level: 80, category: 'Backend', yearsExp: 2, projects: 6 },

    // Cloud
    { name: 'AWS', level: 90, category: 'Cloud', yearsExp: 2, projects: 2 },
    
    // Database
    { name: 'MySQL', level: 85, category: 'Database', yearsExp: 5, projects: 22 },
    
    // DevOps
    { name: 'Docker', level: 90, category: 'DevOps', yearsExp: 5, projects: 2 },
    { name: 'CI/CD', level: 90, category: 'DevOps', yearsExp: 1, projects: 4 },
    { name: 'GitHub Actions', level: 85, category: 'DevOps', yearsExp: 1, projects: 4 }

  ];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      filteredSkills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => new Set([...prev, skill.name]));
        }, index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [filteredSkills, selectedCategory]);

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-emerald-500 to-green-400';
    if (level >= 80) return 'from-blue-500 to-cyan-400';
    if (level >= 70) return 'from-yellow-500 to-orange-400';
    return 'from-orange-500 to-red-400';
  };

  const getSkillBadge = (level: number) => {
    if (level >= 90) return { label: 'Expert', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' };
    if (level >= 80) return { label: 'Advanced', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' };
    if (level >= 70) return { label: 'Intermediate', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' };
    return { label: 'Learning', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' };
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Technical Expertise
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Skills Matrix
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive technical proficiency across the full development stack
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => {
                  if (selectedCategory !== category.name) {
                    setSelectedCategory(category.name);
                    setAnimatedSkills(new Set());
                  }
                }}
                className={`group relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'text-white shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
                }`}
              >
                {selectedCategory === category.name && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl`} />
                )}
                <div className="relative flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  {category.name}
                  {selectedCategory === category.name && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const badge = getSkillBadge(skill.level);
            const isAnimated = animatedSkills.has(skill.name);
            
            return (
              <div
                key={skill.name}
                className="group bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-out'
                }}
              >
                {/* Skill Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>{skill.yearsExp}y exp</span>
                      <span>•</span>
                      <span>{skill.projects} projects</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {skill.level}%
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative mb-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out relative`}
                      style={{ 
                        width: isAnimated ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1 + 0.3}s`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Skill Level Indicators */}
                  <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Experience Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {skill.yearsExp}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Years
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {skill.projects}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Projects
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Expert Level', count: skills.filter(s => s.level >= 90).length, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
            { label: 'Advanced', count: skills.filter(s => s.level >= 80 && s.level < 90).length, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { label: 'Total Projects', count: skills.reduce((sum, s) => sum + s.projects, 0), color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { label: 'Avg Experience', count: Math.round(skills.reduce((sum, s) => sum + s.yearsExp, 0) / skills.length), color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' }
          ].map((stat, index) => (
            <div key={index} className={`text-center p-6 ${stat.bg} rounded-xl hover:scale-105 transition-transform duration-300`}>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.count}{stat.label === 'Avg Experience' ? 'y' : ''}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Methodologies */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Engineering Practices
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Agile/Scrum', 'Test-Driven Development', 'Clean Architecture', 'Microservices',
              'Domain-Driven Design', 'SOLID Principles', 'Performance Optimization'
            ].map((methodology, index) => (
              <div
                key={methodology}
                className="group text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {methodology}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;