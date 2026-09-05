import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Users, Cpu, Zap, Shield, TrendingUp, ImageIcon } from 'lucide-react';

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
  // Real screenshots aren't ready yet — swap in e.g. '/projects/madarik.png' here
  // once available and reintroduce LazyImage for it.
  category: string;
}

const projects: Project[] = [
  {
    id: '4',
    title: 'Madarik — School Management SaaS',
    duration: 'Jan 2025 - Present',
    domain: 'Education / Multi-Tenant SaaS',
    problem: 'Schools needed an all-in-one management platform covering students, teachers, attendance, grades, fees, library, conduct, messaging, and more — with full data isolation between tenants and role-based access for admins, principals, teachers, parents, and students.',
    solution: 'Built a multi-tenant SaaS on Laravel 11 + Inertia.js (React 18) using a global scope tenant isolation pattern, Sanctum-based API, Spatie permissions, and a rich developer portal for real-time auditing and job health monitoring.',
    role: 'Full-Stack Developer',
    contributions: [
      'Architected multi-tenancy using a BelongsToSchool global scope and ResolveSchool middleware binding school_id per authenticated user',
      'Built a comprehensive REST API (students, attendance, grades, assignments, fees, announcements, parent & teacher portals, principal dashboard)',
      'Implemented CheckSchoolStatus middleware for web and API groups to block suspended schools with correct JSON/redirect responses',
      'Delivered chunked notification dispatch via chunkById(200) to handle large user bases without memory exhaustion',
      'Designed InvoicePolicy with school_id guard to prevent cross-tenant data access, and rate-limited login to 6 attempts/minute',
      'Wrote 103+ Pest v2 feature tests covering every API endpoint and business rule'
    ],
    technologies: ['Laravel 11', 'React 18', 'Inertia.js v1', 'Pest v2', 'Spatie Permissions', 'Laravel Sanctum', 'MySQL', 'Ziggy v2', 'PHP 8.4'],
    features: [
      'Multi-tenant isolation with per-school global scoping and super-admin override via X-School-Id header',
      'Full school operations: students, attendance, grades, exams, assignments, fees, library, conduct, calendar',
      'Role-based access for admin, principal, teacher, parent, student, and developer roles',
      'Developer portal with real-time audit logs, failed job monitoring, and tenant/subscription management'
    ],
    outcomes: [
      'Zero cross-tenant data leaks through layered policy and scope enforcement',
      '103 Pest tests providing full coverage of API contracts and security rules',
      'Chunked notification pipeline supporting schools with thousands of users',
      'Modular architecture enabling rapid addition of new school modules without regression'
    ],
    githubUrl: 'https://github.com/AdilAzhari/madarik',
    category: 'Full-Stack',
  },
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
    category: 'Full-Stack',
  },
  {
    id: '2',
    title: 'Enterprise POS & Retail Management',
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
    category: 'Full-Stack',
  },
  {
    id: '3',
    title: 'BloodConnect — Healthcare Platform',
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
    category: 'Full-Stack',
  }
];

const ProjectImagePlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`hero-grid relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}>
    <ImageIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
  </div>
);

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Engineering Portfolio</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
            Project Deep Dives
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Complex engineering challenges, architectural decisions, and measurable outcomes.
          </p>
        </div>

        {/* Uniform Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-700 transition-colors duration-300 flex flex-col"
            >
              <ProjectImagePlaceholder className="h-44" />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-2">
                    <Calendar className="h-3 w-3" />{project.duration}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-accent text-xs font-medium mb-3">{project.domain}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.solution}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 rounded text-xs">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2 text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Deep Dive
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                    >
                      <Github className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
    <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{project.title}</h3>
            <p className="text-accent font-medium">{project.domain} · {project.duration}</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm flex items-center gap-1 mt-2">
              <Users className="h-3 w-3" />{project.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 text-2xl text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-gray-300 dark:border-gray-600">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Challenge</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-accent">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Solution</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-accent" /> Technical Contributions
              </h4>
              <div className="space-y-3">
                {project.contributions.map((c, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-5 h-5 bg-gray-900 dark:bg-white rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-white dark:text-gray-900 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" /> Key Features
              </h4>
              <div className="space-y-3">
                {project.features.map((f, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" /> Full Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" /> Measurable Impact
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {project.outcomes.map((o, i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-300">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Projects;
