import React, { useState } from 'react';
import { Code, Server, Cloud, Database, Settings, Zap, Target, Search } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  yearsExp: number;
}

const skillCategories = [
  { name: 'All', icon: Target },
  { name: 'Frontend', icon: Code },
  { name: 'Backend', icon: Server },
  { name: 'Cloud', icon: Cloud },
  { name: 'Database', icon: Database },
  { name: 'DevOps', icon: Settings },
];

const skills: Skill[] = [
  { name: 'React', category: 'Frontend', yearsExp: 1.5 },
  { name: 'TypeScript', category: 'Frontend', yearsExp: 0.5 },
  { name: 'JavaScript', category: 'Frontend', yearsExp: 1.5 },
  { name: 'Vue.js', category: 'Frontend', yearsExp: 3 },
  { name: 'Tailwind CSS', category: 'Frontend', yearsExp: 4 },
  { name: 'PHP', category: 'Backend', yearsExp: 7 },
  { name: 'Laravel', category: 'Backend', yearsExp: 3 },
  { name: 'Inertia.js', category: 'Backend', yearsExp: 2 },
  { name: 'AWS', category: 'Cloud', yearsExp: 2 },
  { name: 'MySQL', category: 'Database', yearsExp: 5 },
  { name: 'Docker', category: 'DevOps', yearsExp: 5 },
  { name: 'CI/CD', category: 'DevOps', yearsExp: 1 },
  { name: 'GitHub Actions', category: 'DevOps', yearsExp: 1 },
];

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoriesToRender = selectedCategory === 'All'
    ? skillCategories.slice(1).map(c => c.name)
    : [selectedCategory];

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Technical Expertise</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Skills
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies I reach for across the full development stack.
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
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400"
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
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors duration-200 ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Grouped Skill Tags */}
        <div className="space-y-8 max-w-3xl mx-auto">
          {filteredSkills.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">No skills match "{searchTerm}".</p>
          )}
          {categoriesToRender.map(category => {
            const categorySkills = filteredSkills.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {categorySkills.map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {skill.name}
                      <span className="text-gray-400 dark:text-gray-500 ml-2 font-normal">{skill.yearsExp}y</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Methodologies */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Engineering Practices
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Agile/Scrum', 'Test-Driven Development', 'Clean Architecture',
              'Domain-Driven Design', 'SOLID Principles', 'Performance Optimization'
            ].map((methodology) => (
              <div
                key={methodology}
                className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-5 w-5 text-white dark:text-gray-900" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
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
