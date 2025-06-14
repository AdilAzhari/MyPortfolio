import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Calendar, Users, TrendingUp, Zap, Shield, Cpu } from 'lucide-react';

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

  const projects: Project[] = [
    {
      id: '1',
      title: 'Quantum-Scale E-Commerce Engine',
      duration: 'Jan 2023 - Aug 2023',
      domain: 'E-Commerce / Retail',
      problem: 'Legacy monolithic e-commerce platform experiencing performance bottlenecks, handling 50k+ daily active users with 3-5 second page load times and frequent downtime during peak traffic.',
      solution: 'Architected and implemented a microservices-based solution using event-driven architecture, implementing CQRS pattern for order processing and implementing Redis caching layer.',
      role: 'Lead Backend Engineer',
      contributions: [
        'Designed microservices architecture reducing system coupling by 70%',
        'Implemented event-driven order processing system handling 10k+ orders/day',
        'Optimized database queries reducing average response time from 800ms to 120ms',
        'Built robust CI/CD pipeline with automated testing and zero-downtime deployments'
      ],
      technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS ECS', 'RabbitMQ', 'Jest'],
      features: [
        'Real-time inventory management across multiple warehouses',
        'Advanced product recommendation engine using collaborative filtering',
        'Secure payment processing with multiple gateway integrations',
        'Admin dashboard with real-time analytics and reporting'
      ],
      outcomes: [
        'Reduced page load times by 65% (from 3-5s to 1-1.5s)',
        'Increased system uptime to 99.9% during peak traffic',
        'Improved order processing speed by 40%',
        'Reduced infrastructure costs by 30% through optimization'
      ],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/adilomer/ecommerce-platform',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Full-Stack',
      complexity: 'High',
      impact: 'Critical'
    },
    {
      id: '2',
      title: 'Neural Fraud Detection Pipeline',
      duration: 'Sep 2022 - Dec 2022',
      domain: 'FinTech / Analytics',
      problem: 'Financial services company needed real-time fraud detection and risk analysis for processing 1M+ transactions daily with sub-100ms latency requirements.',
      solution: 'Built scalable stream processing pipeline using Apache Kafka and Apache Flink, implementing machine learning models for real-time anomaly detection.',
      role: 'Data Platform Engineer',
      contributions: [
        'Architected Kafka-based streaming platform processing 50k events/second',
        'Implemented real-time ML inference pipeline with 99.5% accuracy',
        'Built monitoring dashboard with custom alerts for anomaly detection',
        'Optimized data storage reducing costs by 45% using data partitioning'
      ],
      technologies: ['Python', 'Apache Kafka', 'Apache Flink', 'TensorFlow', 'PostgreSQL', 'InfluxDB', 'Grafana', 'Docker'],
      features: [
        'Real-time fraud detection with ML-powered risk scoring',
        'Scalable event streaming architecture',
        'Interactive analytics dashboard with drill-down capabilities',
        'Automated alerting system for suspicious activities'
      ],
      outcomes: [
        'Reduced fraud detection time from 24 hours to <100ms',
        'Achieved 99.5% accuracy in anomaly detection',
        'Prevented $2.3M in potential fraudulent transactions',
        'Improved customer trust and regulatory compliance'
      ],
      githubUrl: 'https://github.com/adilomer/realtime-analytics',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Data Engineering',
      complexity: 'High',
      impact: 'Critical'
    },
    {
      id: '3',
      title: 'Serverless Collaboration Matrix',
      duration: 'Mar 2022 - Aug 2022',
      domain: 'SaaS / Project Management',
      problem: 'Startup needed to rapidly build and scale a project management platform for remote teams, requiring multi-tenancy, real-time collaboration, and global deployment.',
      solution: 'Developed cloud-native architecture using serverless technologies, implementing GraphQL federation for API management and WebSocket connections for real-time features.',
      role: 'Full-Stack Architect',
      contributions: [
        'Designed serverless architecture reducing operational overhead by 80%',
        'Implemented GraphQL federation connecting 5+ microservices',
        'Built real-time collaboration features supporting 1000+ concurrent users',
        'Created automated deployment pipeline with multi-region support'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS Lambda', 'DynamoDB', 'WebSocket', 'CDK'],
      features: [
        'Real-time collaborative document editing',
        'Multi-tenant architecture with data isolation',
        'Advanced project analytics and reporting',
        'Integration marketplace with 20+ third-party tools'
      ],
      outcomes: [
        'Achieved 0-100k users scaling in 6 months',
        'Maintained 99.9% uptime across multiple regions',
        'Reduced development time for new features by 50%',
        'Generated $500k ARR within first year'
      ],
      demoUrl: 'https://saas-demo.example.com',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Cloud Architecture',
      complexity: 'High',
      impact: 'High'
    }
  ];

  const categories = ['All', 'Full-Stack', 'Data Engineering', 'Cloud Architecture', 'Mobile'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
              {category}
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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
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

export default Projects;