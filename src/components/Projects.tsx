import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Calendar, Users, TrendingUp, Zap, Shield, Cpu, Layers, Search } from 'lucide-react';
import LazyImage from './LazyImage';

interface Project {
  id: string;
  title: string;
  duration: string;
  domain: string;
  problem: string;
  solution: string;
  role: string;
  contributions: string[];
  technologies: string[];
  features: string[];
  outcomes: string[];
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  category: string;
  complexity: 'High' | 'Medium' | 'Low';
  impact: 'Critical' | 'High' | 'Medium';
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const projects: Project[] = [
    {
      id: '1',
      title: 'Vehicle Rental System',
      duration: 'Sep 2025 - Present',
      domain: 'Transportation / Rental Services',
      problem: 'Need for comprehensive rental platform handling multi-language support, real-time booking management, and seamless payment processing for growing vehicle rental business.',
      solution: 'Developing full-stack rental platform using Laravel 12 and Vue.js 3 with Inertia.js, implementing multi-language support (Arabic/English RTL), real-time notifications, and integrated payment processing.',
      role: 'Full-Stack Developer',
      contributions: [
        'Architected scalable backend APIs with extensive migrations and relationship mapping',
        'Built comprehensive Filament-based admin dashboard with analytics and reporting',
        'Implemented SPA with Vue.js for intuitive booking workflow and user management',
        'Integrated business logic for deposit calculations, booking validation, and availability tracking'
      ],
      technologies: ['Laravel 12', 'Vue.js 3', 'Inertia.js', 'MySQL', 'Filament v4', 'Livewire v3', 'Pest', 'PHP 8.2+'],
      features: [
        'Multi-language support with Arabic/English RTL functionality',
        'Real-time booking system with availability management',
        'Comprehensive admin dashboard with revenue reporting',
        'Activity logging and vehicle utilization tracking'
      ],
      outcomes: [
        'Streamlined vehicle rental operations with automated workflows',
        'Enhanced user experience with multi-language support',
        'Improved booking efficiency with real-time availability',
        'Established comprehensive testing infrastructure for reliability'
      ],
      githubUrl: 'https://github.com/AdilAzhari/car-rental-system',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Full-Stack',
      complexity: 'High',
      impact: 'High'
    },
    {
      id: '2',
      title: 'Enterprise POS & Retail Management System',
      duration: 'Jul 2024 - Aug 2025',
      domain: 'Retail / Point of Sale',
      problem: 'Retail businesses needed comprehensive management system with real-time inventory tracking, multi-store support, and advanced analytics for efficient operations.',
      solution: 'Developed enterprise-grade retail management system using Laravel 11 and Vue.js 3, implementing real-time inventory tracking, multi-payment processing, and comprehensive reporting.',
      role: 'Full-Stack Developer',
      contributions: [
        'Built interactive POS interface with barcode scanning and receipt generation',
        'Implemented advanced inventory management with supplier integration',
        'Created customer loyalty program with analytics and personalized promotions',
        'Optimized database performance with Redis caching for high-volume transactions'
      ],
      technologies: ['Laravel 11', 'Vue.js 3', 'Inertia.js', 'Redis', 'MySQL', 'PHP 8.2+', 'Pest', 'Stripe'],
      features: [
        'Real-time inventory tracking with low-stock alerts',
        'Multi-payment processing with receipt generation',
        'Customer loyalty program with purchase history analytics',
        'Comprehensive reporting with PDF, Excel, CSV export capabilities'
      ],
      outcomes: [
        'Improved retail operations efficiency with automated inventory management',
        'Enhanced customer engagement through loyalty program features',
        'Streamlined multi-store operations with centralized management',
        'Achieved high-performance transaction processing with Redis optimization'
      ],
      githubUrl: 'https://github.com/AdilAzhari/POS-SuperMarket',
      image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Full-Stack',
      complexity: 'High',
      impact: 'Critical'
    },
    {
      id: '3',
      title: 'BloodConnect - Healthcare Management Platform',
      duration: 'Dec 2023 - Aug 2024',
      domain: 'Healthcare / Blood Bank Management',
      problem: 'Healthcare facilities needed comprehensive blood bank management system with donor-patient matching, inventory tracking, and regulatory compliance features.',
      solution: 'Built comprehensive healthcare platform using Laravel 11 with sophisticated role-based access control, automated notification system, and compliance-ready audit trails.',
      role: 'Full-Stack Developer',
      contributions: [
        'Implemented sophisticated donor-patient matching algorithms',
        'Built automated notification system for critical blood requests',
        'Designed audit trail system for medical compliance and regulatory reporting',
        'Created role-based access control using Spatie permissions for multi-user workflows'
      ],
      technologies: ['Laravel 11', 'Spatie Permissions', 'AdminLTE', 'MySQL', 'PHP 8.2+', 'Pest', 'JavaScript'],
      features: [
        'Comprehensive blood bank inventory management',
        'Donor-patient matching with compatibility algorithms',
        'Automated notifications for critical requests and inventory alerts',
        'File management system for donor documentation and medical certificates'
      ],
      outcomes: [
        'Streamlined blood bank operations with automated matching',
        'Improved response time for critical blood requests',
        'Enhanced regulatory compliance with comprehensive audit trails',
        'Reduced administrative overhead through automation'
      ],
      githubUrl: 'https://github.com/AdilAzhari/blood-bank',
      image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Full-Stack',
      complexity: 'High',
      impact: 'Critical'
    }
  ];

  const categories = ['All', 'Full-Stack', 'Data Engineering', 'Cloud Architecture', 'Mobile'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'High': return <Cpu className="h-4 w-4 text-red-500" />;
      case 'Medium': return <Zap className="h-4 w-4 text-yellow-500" />;
      default: return <Shield className="h-4 w-4 text-green-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'High': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            {/* <Code2 className="h-4 w-4" /> */}
            Engineering Portfolio
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Project Deep Dives
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complex engineering challenges, architectural decisions, and measurable outcomes
          </p>
        </div>

        {/* Project Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, technologies, or domains..."
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
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md'
              }`}
            >
              <span className="relative flex items-center gap-2">
                <Layers className="h-4 w-4 group-hover:animate-spin" />
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <div className="flex items-center gap-1 px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                        {getComplexityIcon(project.complexity)}
                        {project.complexity} Complexity
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(project.impact)}`}>
                        {project.impact} Impact
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 lg:p-12 space-y-6">
                    {/* Header */}
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.role}
                        </div>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {project.domain}
                      </p>
                    </div>

                    {/* Problem & Solution */}
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                          🎯 Challenge
                        </h4>
                        <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
                          ⚡ Solution
                        </h4>
                        <p className="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Key Outcomes */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                        Impact Metrics
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.outcomes.slice(0, 4).map((outcome, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                              {outcome}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Preview */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                            +{project.technologies.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        Deep Dive Analysis
                      </button>
                      <div className="flex gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
                          >
                            <ExternalLink className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
                          >
                            <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Deep Dive Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {project.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                {project.domain} • {project.duration}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
            >
              <span className="text-3xl text-gray-500 dark:text-gray-400">×</span>
            </button>
          </div>

          <div className="space-y-10">
            {/* Architecture Overview */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Cpu className="h-6 w-6 text-blue-600" />
                  Technical Contributions
                </h4>
                <div className="space-y-4">
                  {project.contributions.map((contribution, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {contribution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="h-6 w-6 text-emerald-600" />
                  Key Features
                </h4>
                <div className="space-y-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Tech Stack */}
            <div>
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-600" />
                Technology Architecture
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Frontend', 'Backend', 'Database', 'Infrastructure'].map((category, index) => (
                  <div key={category} className="space-y-3">
                    <h5 className="font-semibold text-gray-700 dark:text-gray-300 text-lg border-b border-gray-200 dark:border-gray-700 pb-2">
                      {category}
                    </h5>
                    <div className="space-y-2">
                      {project.technologies.slice(index * 3, (index + 1) * 3).map((tech) => (
                        <div key={tech} className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-200">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes & Impact */}
            <div>
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
                Measurable Impact
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {project.outcomes.map((outcome, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-emerald-800 dark:text-emerald-300 font-semibold">
                        {outcome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these CSS classes to your index.css for the enhanced effects
/*
.neural-network-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 60px 60px, 80px 80px, 100px 100px;
  animation: neural-pulse 10s ease-in-out infinite;
}

@keyframes neural-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.quantum-energy-line {
  animation: energy-flow 2s ease-in-out infinite;
}

@keyframes energy-flow {
  0%, 100% { opacity: 0; transform: scaleX(0); }
  50% { opacity: 1; transform: scaleX(1); }
}
*/

export default Projects;