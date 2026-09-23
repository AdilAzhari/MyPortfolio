export interface Entry {
  period: string;
  title: string;
  subtitle?: string;
  href?: string;
  description: string;
  tags: string[];
  links?: { label: string; href: string }[];
  thumb?: string;
}

export const profile = {
  name: 'Adil Omer',
  title: 'Backend-focused Laravel Engineer',
  pitch: 'I build secure, well-tested Laravel systems that stay correct under real-world load.',
  location: 'Shah Alam, Malaysia · Open to relocation',
  email: 'adilazhariosman@gmail.com',
  github: 'https://github.com/AdilAzhari',
  linkedin: 'https://linkedin.com/in/adil-omer-8aab21167',
  resume: '/resume/Adil_Omer_Resume.pdf',
};

export const about: string[] = [
  "I'm a backend-focused PHP/Laravel engineer with 4+ years of experience building business-critical applications — REST APIs, transactional workflows, event-driven systems, and multi-tenant SaaS platforms.",
  'I care most about correctness: idempotent endpoints, clean domain boundaries, careful data access, and test suites that catch regressions before users do. Pest, PHPStan, and Rector are part of how I work, not an afterthought.',
  "Currently I'm a Full-Stack Laravel Engineer at Sentients AI, and outside work I maintain open-source Laravel packages and contribute fixes to established projects in the PHP ecosystem.",
];

export const experience: Entry[] = [
  {
    period: 'Oct 2024 — Present',
    title: 'Full-Stack PHP/Laravel Engineer',
    subtitle: 'Sentients AI',
    description:
      'Design and maintain Laravel applications with an emphasis on reliability and scalable backend architecture. Build synchronization workflows with third-party REST APIs, tune queries, indexing and Redis caching, and implement secure transactions and RBAC — reducing potential vulnerability surfaces by 45%. Write Pest/PHPUnit tests and take part in code review.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Redis', 'Vue.js', 'Pest', 'REST APIs'],
  },
  {
    period: '2024 — Present',
    title: 'PHP/Laravel Developer',
    subtitle: 'Freelance · Client Projects',
    description:
      'Deliver Laravel applications and RESTful APIs end-to-end: schemas, transactional workflows, authentication and authorization. Integrate payment gateways, webhooks and external APIs with proper handling of failure and synchronization scenarios.',
    tags: ['Laravel', 'Payments', 'Webhooks', 'Sanctum', 'PHPUnit'],
  },
];

export const projects: Entry[] = [
  {
    period: '2026',
    title: 'Madarik — School Management SaaS',
    href: 'https://github.com/AdilAzhari/madarik',
    thumb: 'MD',
    description:
      'Multi-tenant school platform covering students, attendance, grades, fees, library and messaging. Tenant isolation via global scopes and resolver middleware, Redis-backed notifications chunked for large schools, React dashboards over Inertia, and 100+ Pest feature tests guarding every API contract.',
    tags: ['Laravel 11', 'React', 'Inertia.js', 'Sanctum', 'Spatie', 'Pest'],
  },
  {
    period: '2026',
    title: 'Modular E-Commerce System',
    thumb: 'EC',
    description:
      'Modular Laravel system separating orders, payments, inventory and users with DDD — value objects, domain events and isolated business rules. Multi-tenancy with automatic query scoping and event-driven workflows that decouple business processes.',
    tags: ['Laravel', 'DDD', 'Domain Events', 'Multi-Tenancy'],
  },
  {
    period: '2024 — 2025',
    title: 'Enterprise POS & Retail Management',
    href: 'https://github.com/AdilAzhari/POS-SuperMarket',
    thumb: 'POS',
    description:
      'Retail management system with a barcode-driven POS, real-time inventory with low-stock alerts, multi-payment processing, a customer loyalty program, and PDF/Excel/CSV reporting. Redis caching keeps high-volume transactions fast.',
    tags: ['Laravel 11', 'Vue.js 3', 'Inertia.js', 'Redis', 'Stripe'],
  },
  {
    period: '2023 — 2024',
    title: 'BloodConnect — Blood Bank Platform',
    href: 'https://github.com/AdilAzhari/blood-bank',
    thumb: 'BC',
    description:
      'Healthcare platform for blood bank operations: donor–patient compatibility matching, automated alerts for critical requests, role-based workflows, and audit trails for regulatory compliance.',
    tags: ['Laravel 11', 'Spatie Permissions', 'MySQL', 'Pest'],
  },
];

export const openSource: Entry[] = [
  {
    period: '2026',
    title: 'laravel-idempotency',
    subtitle: 'Maintainer',
    href: 'https://github.com/AdilAzhari/laravel-idempotency',
    description:
      'Prevents duplicate request execution with idempotency keys, request fingerprinting, response replay, conflict detection and cache-based locking. Extensible storage, locking and fingerprinting contracts; 93% test coverage.',
    tags: ['Pest', 'PHPStan', 'Rector', 'Pint'],
  },
  {
    period: '2026 — Now',
    title: 'laravel-trace',
    subtitle: 'Maintainer · In progress',
    href: 'https://github.com/AdilAzhari/laravel-trace',
    description:
      'Application-level tracing for Laravel — request, query, event and execution-context spans with pluggable storage and framework integration.',
    tags: ['Laravel', 'Observability'],
  },
  {
    period: '2026',
    title: 'Upstream contributions',
    subtitle: 'Contributor',
    description:
      'Merged fixes across CLI validation, content filtering, CV generation and scan history in career-ops, plus bug fixes in laravel-debugbar and Grav — working through issues, reviews and CI in established codebases.',
    tags: ['Open Source', 'PHP', 'Node.js'],
    links: [
      { label: 'career-ops', href: 'https://github.com/career-ops-hq/career-ops' },
      { label: 'laravel-debugbar #2083', href: 'https://github.com/barryvdh/laravel-debugbar/pull/2083' },
      { label: 'grav #4278', href: 'https://github.com/getgrav/grav/pull/4278' },
    ],
  },
];
