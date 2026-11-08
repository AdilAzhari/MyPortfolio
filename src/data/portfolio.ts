export interface Entry {
  period: string;
  title: string;
  subtitle?: string;
  href?: string;
  description: string;
  tags: string[];
  links?: { label: string; href: string }[];
  thumb?: string;
  /** Screenshot in public/; a 320px-wide `-320.webp` variant must sit next to it. */
  image?: string;
}

export const profile = {
  name: 'Adil Omer',
  title: 'Backend-focused Laravel Engineer',
  pitch: 'I build secure, well-tested Laravel systems that stay correct under real-world load, and contribute fixes upstream to projects like Laravel Horizon.',
  location: 'Shah Alam, Malaysia',
  availability: 'Open to backend Laravel roles · remote or relocation',
  email: 'adilazhariosman@gmail.com',
  github: 'https://github.com/AdilAzhariOmsan',
  linkedin: 'https://linkedin.com/in/adil-azhari-omer',
  resume: '/resume/Adil_Omer_Resume.pdf',
};

export const about: string[] = [
  "I'm a backend-focused PHP/Laravel engineer with 4 years of experience building business-critical applications — REST APIs, transactional workflows, event-driven systems, and multi-tenant SaaS platforms.",
  'I care most about correctness: idempotent endpoints, clean domain boundaries, careful data access, and test suites that catch regressions before users do. Pest, PHPStan, and Rector are part of how I work, not an afterthought.',
  "Currently I'm a Full-Stack Laravel Engineer at Sentients AI, and outside work I maintain open-source Laravel packages and contribute fixes to established projects in the PHP ecosystem, including Laravel Horizon.",
];

export const experience: Entry[] = [
  {
    period: 'Oct 2025 — Present',
    title: 'Full-Stack PHP/Laravel Engineer',
    subtitle: 'Sentients AI',
    description:
      'Driving the Nexo 2.0 multi-vendor marketplace rebuild: assessed the legacy app (surfacing payments never marked paid, cross-tenant vendor routes and staging wired to the production DB), wrote the v2 spec and ADRs, set up a CI quality gate (Pint, Larastan level 6, Pest architecture tests), and built the Vue 3 + Inertia 3 + TypeScript frontend foundation with its own Node 24 CI job. Cleared 11 Composer and Symfony security advisories that were blocking CI. Also build synchronization workflows with third-party REST APIs and tune queries, indexing and Redis caching.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Redis', 'Vue 3', 'TypeScript', 'Pest'],
  },
  {
    period: '2022 — Present',
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
    title: 'Kilat Car Wash — Multi-Branch Booking & Operations',
    subtitle: 'Private repository',
    thumb: 'KW',
    image: '/projects/kilat.webp',
    description:
      'Car wash platform for multi-branch operators, with 46 screens across four roles (customer, washer, supervisor, owner) in English and Malay. QR booking with race and duplicate-booking protection, a washer bay tablet app, and live queue and TV screens over Laravel Reverb. Owners get cost-per-wash and gross-profit reports, CSV exports, payroll and per-wash stock deduction; a plate-camera webhook, WhatsApp reminders, PDPA consent and data requests, and enforced staff 2FA round it out. 232 PHPUnit tests and Larastan in CI, shipped across 20 reviewed PRs.',
    tags: ['Laravel 13', 'React 19', 'TypeScript', 'Inertia.js', 'Reverb', 'PHPUnit'],
  },
  {
    period: '2026',
    title: 'Madarik — School Management SaaS',
    href: 'https://madarik.aljebal-albeedos.com',
    thumb: 'MD',
    image: '/projects/madarik.webp',
    description:
      'Multi-tenant school platform in production at a school of 500 students, covering students, attendance, grades, fees, library and messaging. Tenant isolation via global scopes and resolver middleware, Redis-backed notifications chunked for large schools, React dashboards over Inertia, and 100+ Pest feature tests guarding every API contract.',
    tags: ['Laravel 11', 'React', 'Inertia.js', 'Sanctum', 'Spatie', 'Pest'],
    links: [{ label: 'Live demo', href: 'https://madarik.aljebal-albeedos.com' }],
  },
  {
    period: '2026',
    title: 'Nexo v1 — Modular E-Commerce',
    subtitle: 'Predecessor to Nexo 2.0',
    href: 'https://github.com/AdilAzhariOmsan/nexo-ecommerce',
    thumb: 'EC',
    image: '/projects/store.webp',
    description:
      'Modular Laravel system separating orders, payments, inventory and users with DDD — value objects, domain events and isolated business rules. Multi-tenancy with automatic query scoping and event-driven workflows that decouple business processes. Auditing it surfaced the payment and tenant-isolation gaps that the Nexo 2.0 rebuild now designs out from the start.',
    tags: ['Laravel', 'DDD', 'Domain Events', 'Multi-Tenancy'],
    links: [
      { label: 'Source', href: 'https://github.com/AdilAzhariOmsan/nexo-ecommerce' },
    ],
  },
  {
    period: '2024 — 2025',
    title: 'Enterprise POS & Retail Management',
    thumb: 'POS',
    description:
      'Retail management system with a barcode-driven POS, real-time inventory with low-stock alerts, multi-payment processing, a customer loyalty program, and PDF/Excel/CSV reporting. Redis caching keeps high-volume transactions fast.',
    tags: ['Laravel 11', 'Vue.js 3', 'Inertia.js', 'Redis', 'Stripe'],
  },
  {
    period: '2023 — 2024',
    title: 'BloodConnect — Blood Bank Platform',
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
    subtitle: 'Maintainer · v1.1 on Packagist',
    href: 'https://github.com/AdilAzhariOmsan/laravel-idempotency',
    description:
      'Prevents duplicate execution of HTTP requests and queued jobs with idempotency keys scoped per user, request fingerprinting, response replay, conflict detection and cache-based locking. Extensible storage, locking and scoping contracts; 96% test coverage.',
    tags: ['Pest', 'PHPStan', 'Rector', 'Pint'],
    links: [
      { label: 'Source', href: 'https://github.com/AdilAzhariOmsan/laravel-idempotency' },
      { label: 'Packagist', href: 'https://packagist.org/packages/adilazhari/laravel-idempotency' },
    ],
  },
  {
    period: '2026 — Now',
    title: 'laravel-trace',
    subtitle: 'Maintainer · v0.1.0 on Packagist',
    href: 'https://github.com/AdilAzhariOmsan/laravel-trace',
    description:
      'Application-level tracing for Laravel — request, database-query and queued-job spans, trace context propagated across queues and outbound HTTP, memory and database storage, and a prune command for retention. Tested on PHP 8.3–8.5 and Laravel 12–13 across Ubuntu and Windows.',
    tags: ['Laravel', 'Observability'],
    links: [
      { label: 'Source', href: 'https://github.com/AdilAzhariOmsan/laravel-trace' },
      { label: 'Packagist', href: 'https://packagist.org/packages/adilazhari/laravel-trace' },
    ],
  },
  {
    period: 'Sep 2026',
    title: 'laravel/horizon',
    subtitle: 'Contributor · Merged',
    href: 'https://github.com/laravel/horizon/pull/1819',
    description:
      'Fixed the dashboard showing "Delayed Until" as the same time as "Pushed" for jobs delayed with a DateInterval/CarbonInterval — the idiomatic way to express a delay in Laravel. Merged into the official Laravel queue dashboard (fixes #1668).',
    tags: ['Laravel', 'Queues', 'PHP'],
  },
  {
    period: '2026',
    title: 'Upstream contributions',
    subtitle: 'Contributor',
    description:
      'Merged fixes in laravel-debugbar (validation errors cut off by the dumper depth limit), Grav CMS (env config booleans read as strings), and 16 merged PRs in career-ops covering job-portal scanning, the lead pipeline, CV templates and web onboarding. Under review: Larastan (schema changes on one connection leaking into another) and Collision (artisan test option parsing).',
    tags: ['Open Source', 'PHP', 'Node.js'],
    links: [
      { label: 'laravel-debugbar #2085', href: 'https://github.com/fruitcake/laravel-debugbar/pull/2085' },
      { label: 'grav #4278', href: 'https://github.com/getgrav/grav/pull/4278' },
      { label: 'career-ops PRs', href: 'https://github.com/career-ops-hq/career-ops/pulls?q=is%3Apr+author%3AAdilAzhariOmsan+is%3Amerged' },
      { label: 'larastan #2563', href: 'https://github.com/larastan/larastan/pull/2563' },
      { label: 'collision #379', href: 'https://github.com/nunomaduro/collision/pull/379' },
    ],
  },
];
