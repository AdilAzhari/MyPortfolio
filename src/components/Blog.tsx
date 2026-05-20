import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, ArrowRight, Tag, Eye, Heart, Share2, Filter, Search, ExternalLink, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import LazyImage from './LazyImage';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  featured: boolean;
  external?: {
    url: string;
    platform: string;
  };
}

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: '1',
      title: 'Multi-Tenant SaaS Architecture in Laravel: Lessons from Building Madarik',
      slug: 'multi-tenant-saas-laravel-madarik',
      excerpt: 'A practical walkthrough of the tenant-isolation patterns, global scope strategy, and security middleware I used to build a production multi-tenant school management SaaS on Laravel 11.',
      publishedAt: '2025-04-10',
      readingTime: 14,
      category: 'Laravel',
      tags: ['Laravel', 'Multi-Tenancy', 'SaaS', 'Architecture', 'Inertia.js'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=400',
      views: 4100,
      likes: 312,
      featured: true
    },
    {
      id: '2',
      title: 'Chunked Notification Dispatch in Laravel: Avoid Memory Explosions at Scale',
      slug: 'chunked-notifications-laravel',
      excerpt: 'When your user base grows, sending notifications with a simple ->get() will eventually crash your server. Here is how chunkById solves it and why it matters in multi-tenant apps.',
      publishedAt: '2025-03-22',
      readingTime: 8,
      category: 'Laravel',
      tags: ['Laravel', 'Notifications', 'Performance', 'Queues'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=400',
      views: 3200,
      likes: 241,
      featured: true
    },
    {
      id: '3',
      title: 'Advanced Laravel Service Pattern Implementation',
      slug: 'advanced-laravel-service-pattern',
      excerpt: 'Master clean architecture in Laravel using advanced service patterns, DTOs, and action classes for maintainable enterprise applications.',
      publishedAt: '2025-02-14',
      readingTime: 12,
      category: 'Laravel',
      tags: ['Laravel', 'Service Pattern', 'Clean Architecture', 'DTOs'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=400',
      views: 3200,
      likes: 245,
      featured: false
    },
    {
      id: '4',
      title: 'Laravel Event-Driven Architecture: Best Practices',
      slug: 'laravel-event-driven-architecture',
      excerpt: 'Implement scalable event-driven systems in Laravel with proper event handling, queuing, and asynchronous processing patterns.',
      publishedAt: '2025-01-18',
      readingTime: 10,
      category: 'Laravel',
      tags: ['Laravel', 'Events', 'Queues', 'Architecture'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=400',
      views: 2800,
      likes: 198,
      featured: false
    },
    {
      id: '5',
      title: 'Laravel Performance Optimization: Advanced Techniques',
      slug: 'laravel-performance-optimization-advanced',
      excerpt: 'Deep dive into Laravel performance optimization using Redis caching, database query optimization, and proper indexing strategies.',
      publishedAt: '2025-01-05',
      readingTime: 14,
      category: 'Laravel',
      tags: ['Laravel', 'Performance', 'Redis', 'Database Optimization'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=400',
      views: 2400,
      likes: 189,
      featured: false,
      external: {
        url: 'https://medium.com/@adilazhari/laravel-performance-optimization',
        platform: 'Medium'
      }
    },
    {
      id: '6',
      title: 'Building Multi-Tenant SaaS Applications with Laravel',
      slug: 'multi-tenant-saas-laravel',
      excerpt: 'Complete guide to building scalable multi-tenant SaaS applications using Laravel with proper data isolation and tenant management.',
      publishedAt: '2024-12-28',
      readingTime: 16,
      category: 'Laravel',
      tags: ['Laravel', 'Multi-Tenancy', 'SaaS', 'Architecture'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400',
      views: 3100,
      likes: 234,
      featured: false
    },
    {
      id: '7',
      title: 'Laravel API Development with Advanced Testing Strategies',
      slug: 'laravel-api-testing-strategies',
      excerpt: 'Master API development in Laravel with comprehensive testing using Pest, feature tests, and test-driven development practices.',
      publishedAt: '2024-12-15',
      readingTime: 11,
      category: 'Laravel',
      tags: ['Laravel', 'API', 'Testing', 'Pest', 'TDD'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=400',
      views: 2200,
      likes: 167,
      featured: false
    }
  ];

  const categories = ['All', 'Architecture', 'Data Engineering', 'Laravel', 'Database', 'API Design'];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Architecture': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'Data Engineering': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
      'Laravel': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      'Database': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
      'API Design': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Technical Blog
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Articles & Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sharing knowledge about software engineering, architecture patterns, and emerging technologies
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <Tag className="h-6 w-6 text-blue-600" />
              Featured Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-yellow-500 text-yellow-900 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>

                    {/* External Link Icon */}
                    {article.external && (
                      <div className="absolute top-4 right-4">
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readingTime} min read
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {article.likes}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                          +{article.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>

                      {article.external && (
                        <a
                          href={article.external.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          <Share2 className="h-4 w-4" />
                          {article.external.platform}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.filter(article => !article.featured).map((article) => (
            <div key={article.id} className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <div className="relative overflow-hidden">
                <LazyImage
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>

                {/* External Link Icon */}
                {article.external && (
                  <div className="absolute top-3 right-3">
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {article.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readingTime} min
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>

                  {article.external && (
                    <a
                      href={article.external.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <Share2 className="h-3 w-3" />
                      {article.external.platform}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </section>
  );
};

const CB: React.FC<{ children: string; language?: string }> = ({ children, language = 'php' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: '0.75rem', padding: '1.25rem', fontSize: '0.875rem', lineHeight: '1.625' }}
      >
        {children}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        {copied ? <><Check className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
      </button>
    </div>
  );
};

const IC: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-gray-100 dark:bg-gray-800 text-red-500 dark:text-red-400 px-1.5 py-0.5 rounded font-mono" style={{ fontSize: '0.85em' }}>
    {children}
  </code>
);

const H2: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 scroll-mt-4">
    {children}
  </h2>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-7 mb-3">
    {children}
  </h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
    {children}
  </p>
);

const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="list-disc list-outside ml-6 space-y-2 mb-5 text-gray-700 dark:text-gray-300 leading-7">
    {children}
  </ul>
);

interface TocItem { id: string; title: string; }

const TableOfContents: React.FC<{ items: TocItem[] }> = ({ items }) => (
  <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700">
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
      Table of Contents
    </p>
    <ol className="space-y-1.5">
      {items.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
          >
            <span className="shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600 w-5">
              {String(i + 1).padStart(2, '0')}
            </span>
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  </div>
);

const ChunkedNotificationsArticle: React.FC = () => (
  <div>
    <H2 id="problem">The Problem Nobody Talks About Until It Hits Production</H2>
    <P>
      You have just shipped your notification system. In staging, with 200 test users, everything works perfectly.
      Then production comes. Six months later you have 50,000 users across hundreds of tenants. An admin triggers
      a broadcast announcement. Your server hits 512 MB of RAM, PHP throws a fatal memory error, and some users
      receive the notification while others receive nothing — with no error surfaced to the caller.
    </P>
    <P>
      This is the memory explosion problem, and it is more common than most Laravel developers admit.
      The fix is mechanical — effectively a two-word change — but understanding <em className="text-gray-900 dark:text-white not-italic font-medium">why</em> it matters
      will save you from rebuilding your notification pipeline under production pressure rather than before it.
    </P>

    <H2 id="why-get">Why <IC>{'->get()'}</IC> Will Eventually Kill Your Server</H2>
    <P>Most developers start with something like this:</P>
    <CB>{`// The naive approach — works fine until it doesn't
public function handle(Announcement $announcement): void
{
    $users = User::where('school_id', $announcement->school_id)->get();

    Notification::send($users, new AnnouncementNotification($announcement));
}`}</CB>
    <P>
      This looks clean and idiomatic. Eloquent is expressive, the code is readable, and it passes every staging test.
      But consider what PHP is actually doing here.
    </P>
    <P>
      When you call <IC>{'->get()'}</IC>, Laravel hydrates <strong className="font-semibold text-gray-900 dark:text-white">every matching row</strong> into
      a full Eloquent model object and holds the entire collection in memory simultaneously. Each <IC>User</IC> model
      carries its attribute array, its cast definitions, its timestamps, its relationship stubs, plus the overhead
      of the PHP object wrapper itself.
    </P>
    <P>At 50,000 users, the math is sobering:</P>
    <UL>
      <li>50,000 × ~2–4 KB per hydrated Eloquent model = <strong className="font-semibold text-gray-900 dark:text-white">100–200 MB for the collection alone</strong></li>
      <li><IC>Notification::send()</IC> then iterates and allocates a notification object for all 50,000 records in one pass</li>
      <li>Add the original job payload and the queue worker's base memory already consuming RAM</li>
      <li>You are routinely pushing a single worker past 512 MB — the default <IC>memory_limit</IC> for many PHP setups</li>
    </UL>
    <P>
      The server does not warn you gracefully. PHP throws a fatal error mid-dispatch: some users receive the notification,
      others do not, and the job silently dies. At 100,000 users you hit the limit reliably. At 200,000 you hit it fast.
    </P>

    <H2 id="chunk-vs-chunkbyid">The <IC>chunk()</IC> vs <IC>chunkById()</IC> Distinction</H2>
    <P>
      Laravel ships two chunking methods and the difference matters more than most developers realize.
    </P>

    <H3><IC>chunk()</IC> — The Offset Trap</H3>
    <CB>{`User::where('school_id', $schoolId)->chunk(500, function ($users) use ($announcement) {
    Notification::send($users, new AnnouncementNotification($announcement));
});`}</CB>
    <P>
      <IC>chunk()</IC> uses SQL <IC>LIMIT x OFFSET y</IC> internally. It processes 500 rows, advances the offset
      by 500, fetches the next page. Memory is bounded — only 500 records live in PHP at any time — but there
      is a subtle performance trap that compounds as your data grows.
    </P>
    <P>
      As the offset increases, the database must scan and discard all preceding rows to find the start of the next page.
      Fetching chunk 200 at a page size of 500 requires the database to internally visit 100,000 rows before
      returning any data. On a table with millions of rows, the last chunk can be 10–100× slower than the first.
      This is the <em className="text-gray-900 dark:text-white not-italic font-medium">late offset problem</em>, and it is
      why offset-based pagination degrades predictably at scale.
    </P>

    <H3><IC>chunkById()</IC> — The Right Tool</H3>
    <CB>{`User::where('school_id', $schoolId)->chunkById(500, function ($users) use ($announcement) {
    Notification::send($users, new AnnouncementNotification($announcement));
});`}</CB>
    <P>
      <IC>chunkById()</IC> uses keyset pagination — also called cursor pagination — internally.
      After processing each chunk, it records the last seen primary key and issues the next query as
      <IC>{'WHERE id > :last_id LIMIT 500'}</IC>. Since the primary key is indexed, this query costs
      the same whether you are on chunk 1 or chunk 10,000.
    </P>
    <P>Benefits over <IC>chunk()</IC>:</P>
    <UL>
      <li><strong className="font-semibold text-gray-900 dark:text-white">O(1) query cost per chunk</strong>, regardless of position in the dataset</li>
      <li>Consistent wall-clock time across all chunks — no degrading tail latency as the dataset grows</li>
      <li>Safe against concurrent inserts: new rows added during processing do not cause skips or duplicates</li>
    </UL>
    <P>
      <strong className="font-semibold text-gray-900 dark:text-white">Always prefer <IC>chunkById()</IC> over <IC>chunk()</IC></strong> for
      notification dispatch, data exports, and any batch operation on large tables. The only reason to reach for
      <IC>chunk()</IC> is when you need to order by a non-primary-key column and cannot guarantee uniqueness
      of that column for keyset pagination.
    </P>

    <H2 id="production-pattern">The Production Pattern</H2>
    <P>
      In Madarik — the school management SaaS I built on Laravel 11 — announcements broadcast to all users
      within a school. Schools range from 50-user rural institutions to 3,000-user urban campuses, with the
      tail of the distribution growing as the platform scales. Here is what runs in production:
    </P>
    <CB>{`// app/Jobs/SendAnnouncementNotificationsJob.php

public function handle(): void
{
    User::query()
        ->where('school_id', $this->announcement->school_id)
        ->whereNull('deleted_at')
        ->select(['id', 'email', 'name', 'school_id'])   // only fetch what you need
        ->chunkById(200, function (Collection $users): void {
            Notification::send($users, new AnnouncementCreated($this->announcement));
        });
}`}</CB>
    <P>Three implementation details are worth unpacking:</P>
    <P>
      <strong className="font-semibold text-gray-900 dark:text-white">Column selection is not optional.</strong>{' '}
      The <IC>{'->select([...])'}</IC> call prevents Laravel from hydrating every column on the model.
      If your <IC>users</IC> table has 25 columns — settings JSON blobs, avatar paths, audit timestamps,
      preference flags — you just cut per-model memory by 60–70%. The notification object only uses a handful of
      fields. Only hydrate those fields. This is not premature optimization; it is the correct default.
    </P>
    <P>
      <strong className="font-semibold text-gray-900 dark:text-white">Chunk size is a tuning knob, not a constant.</strong>{' '}
      For database notifications (writing rows to the <IC>notifications</IC> table), 200 is conservative and safe.
      For SMTP email, 50–100 prevents long-running connections. For SMS drivers or transactional API providers
      with rate limits, 25–50 may be more appropriate. Benchmark your specific driver and deployment before
      committing to a number and treating it as permanent.
    </P>
    <P>
      <strong className="font-semibold text-gray-900 dark:text-white">The outer job must be queued.</strong>{' '}
      Chunking solves memory; queuing solves latency. The web request that triggers the announcement should return
      immediately after dispatching this job — never wait synchronously for chunked dispatch to complete,
      even with chunking in place.
    </P>

    <H2 id="per-chunk-jobs">Dispatching Per-Chunk Jobs for Maximum Resilience</H2>
    <P>
      For very large datasets, or when your notification driver is slow (external HTTP calls, email delivery
      with confirmation), consider dispatching a separate queued job per chunk instead of processing inline:
    </P>
    <CB>{`// Parent job: discovers chunks and dispatches child jobs
public function handle(): void
{
    User::query()
        ->where('school_id', $this->announcement->school_id)
        ->select(['id'])
        ->chunkById(500, function (Collection $users): void {
            SendNotificationChunkJob::dispatch(
                $this->announcement,
                $users->pluck('id')->all()
            );
        });
}`}</CB>
    <CB>{`// SendNotificationChunkJob.php — processes a single chunk in isolation
public function handle(): void
{
    $users = User::whereIn('id', $this->userIds)
        ->select(['id', 'email', 'name', 'school_id'])
        ->get(); // safe: bounded to chunk size

    Notification::send($users, new AnnouncementCreated($this->announcement));
}`}</CB>
    <P>
      This decouples <em className="font-medium text-gray-900 dark:text-white not-italic">chunk discovery</em> from{' '}
      <em className="font-medium text-gray-900 dark:text-white not-italic">chunk execution</em>.
      The parent job is lightweight — it reads only primary keys and dispatches.
      Each child job starts with a fresh memory footprint and an isolated failure domain.
      If chunk 7 fails due to a database timeout or provider rate limit, only chunk 7 retries;
      the other nine chunks have already completed and their work is not lost.
    </P>
    <P>
      The overhead is N jobs in your queue. For a 5,000-user school at a chunk size of 500, that is ten jobs.
      Each completes in under a second for database notifications, a few seconds for email. The resilience gains
      are worth it at any meaningful scale.
    </P>

    <H2 id="lazy-loading">Lazy Loading with <IC>lazyById()</IC></H2>
    <P>
      Laravel also exposes a generator-backed approach via <IC>LazyCollection</IC>, which provides
      essentially constant memory use at the cost of losing batch dispatch:
    </P>
    <CB>{`User::where('school_id', $schoolId)
    ->select(['id', 'email', 'name', 'school_id'])
    ->lazyById(500)
    ->each(function (User $user): void {
        $user->notify(new AnnouncementCreated($this->announcement));
    });`}</CB>
    <P>
      With <IC>lazyById()</IC>, only one chunk lives in memory at any time, and Laravel yields records
      one at a time through a PHP generator. Memory footprint stays essentially constant regardless of
      dataset size — ideal when your notification requires per-user data fetches that make batch dispatch
      meaningless anyway.
    </P>
    <P>
      The tradeoff: you lose <IC>Notification::send()</IC> batching. For database notifications, this means
      individual inserts per user instead of a batch insert — potentially 10–50× more database round trips.
      For email providers with a batch API (Mailgun, Postmark), you lose the ability to submit a batch in
      one HTTP call. Use <IC>lazyById()</IC> when per-record logic dominates. Stick with <IC>chunkById()</IC>
      when your notification driver benefits from operating on a collection.
    </P>

    <H2 id="instrumentation">Instrumenting Memory in Staging</H2>
    <P>
      Before shipping to production, confirm your chunk size is safe with a dataset that mirrors production volume:
    </P>
    <CB>{`->chunkById(200, function (Collection $users): void {
    $before = memory_get_usage(true);

    Notification::send($users, new AnnouncementCreated($this->announcement));

    Log::debug('Notification chunk processed', [
        'count'         => $users->count(),
        'mem_delta_mb'  => round((memory_get_usage(true) - $before) / 1_048_576, 2),
        'peak_mb'       => round(memory_get_peak_usage(true) / 1_048_576, 2),
    ]);
});`}</CB>
    <P>
      Each chunk should process cleanly and leave memory at roughly the pre-chunk baseline.
      If <IC>mem_delta_mb</IC> climbs across consecutive chunks rather than staying flat, you have a memory
      leak — most often an event listener accumulating model instances in a static property, or a service
      singleton caching notification objects without releasing them between chunks.
      Diagnose and fix the leak before shipping. Do not reduce the chunk size to mask it.
    </P>

    <H2 id="pitfalls">Pitfalls That Will Burn You</H2>
    <UL>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Dropping the tenant scope.</strong>{' '}
        In a multi-tenant application, every user query must be scoped to the current tenant.
        A missing <IC>where('school_id', ...)</IC> on a chunk dispatch is not just a performance bug —
        it is a data isolation violation that broadcasts one tenant's announcement to users of every other tenant.
        Write an integration test that asserts notifications are scoped correctly and run it on every deploy.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Over-fetching columns.</strong>{' '}
        Never chunk with <IC>User::all()</IC> or omit <IC>{'->select()'}</IC>. Review your notification class
        to identify exactly which model attributes it accesses, then select only those. The saving compounds
        with every extra column on a wide table.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Ignoring driver rate limits.</strong>{' '}
        Cloud email providers (Mailgun, Postmark, SES) enforce per-second or per-request sending limits.
        A chunk of 1,000 recipients dispatched simultaneously can trigger HTTP 429 responses, failed retries,
        and duplicate deliveries. Tune chunk size to your provider's documented throughput limits.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Using a custom primary key without specifying it.</strong>{' '}
        <IC>chunkById()</IC> assumes <IC>id</IC> as the primary key by default. If your model uses a custom
        key — <IC>uuid</IC>, <IC>user_id</IC>, anything else — pass it as the third argument:
        <IC>{'chunkById(200, $callback, \'uuid\')'}</IC>.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Accumulating state between chunks.</strong>{' '}
        Static caches, service container singletons, and class-level properties survive across chunks.
        If anything in your notification pipeline accumulates per-user data without releasing it,
        memory will grow unboundedly even with chunking in place.
        Use chunk-local variables and let PHP's garbage collector clean up. Call <IC>gc_collect_cycles()</IC> explicitly
        after each chunk if you suspect a static accumulation you cannot easily isolate.
      </li>
    </UL>

    <H2 id="takeaways">Key Takeaways</H2>
    <UL>
      <li>Never call <IC>{'->get()'}</IC> on an unbounded query in a notification job. You are one large tenant away from a fatal OOM crash.</li>
      <li>Prefer <IC>chunkById()</IC> over <IC>chunk()</IC> for consistent O(1) query cost per page at any dataset size.</li>
      <li>Always <IC>{'->select()'}</IC> only the columns your notification actually accesses — this is not optional.</li>
      <li>For very large datasets, dispatch per-chunk jobs to isolate failures and enable parallel processing.</li>
      <li>Instrument memory usage in staging with production-scale data before assuming your chunk size is safe.</li>
      <li>In multi-tenant apps, a missing tenant scope on a bulk query is a correctness bug, not just a performance bug.</li>
    </UL>

    <P>
      The difference between <IC>{'->get()'}</IC> and <IC>chunkById()</IC> is two words in your source code
      and two orders of magnitude in memory safety. Neither change requires a new library or a new abstraction.
      But shipped early — before your user base grows — it is the difference between a notification system
      that silently falls over at scale and one that keeps working as your product succeeds.
      Write the chunked version from day one.
    </P>
  </div>
);

const MultiTenantSaasArticle: React.FC = () => (
  <div>
    <H2 id="mt-what">What Multi-Tenancy Actually Means for a Laravel App</H2>
    <P>
      "Multi-tenancy" is used loosely enough that two developers discussing it often mean different things.
      For this article, it means a single running application serves multiple independent organisations —
      schools, in Madarik's case — where each organisation's data must be completely invisible to every other.
      Not just access-controlled. <strong className="font-semibold text-gray-900 dark:text-white">Invisible.</strong>{' '}
      A teacher at School A must be architecturally incapable of reading School B's students, grades, or invoices,
      regardless of what URL they craft or what token they present.
    </P>
    <P>
      That constraint drives every architectural decision described below.
    </P>

    <H2 id="mt-strategy">Choosing a Strategy: One Database or Many?</H2>
    <P>
      The three canonical strategies for multi-tenant data isolation are:
    </P>
    <UL>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Database per tenant</strong> — each school gets its own MySQL/Postgres database. Maximum isolation, but operational complexity grows linearly with tenant count.</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Schema per tenant</strong> — one database, separate schemas per school. Postgres handles this well; MySQL does not.</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Shared database, discriminator column</strong> — one database, one schema, every tenant's rows share tables and are distinguished by a <IC>school_id</IC> foreign key.</li>
    </UL>
    <P>
      For Madarik, I chose the third option — shared database with a <IC>school_id</IC> column — for several reasons.
      First, the expected tenant count (hundreds of schools, eventually thousands) makes per-database provisioning
      operationally expensive: migrations become fan-out operations, connection pools multiply, and monitoring
      dashboards become unwieldy. Second, Laravel's global scope system gives you a clean enforcement layer
      without manual filtering on every query. Third, horizontal scaling of the application tier is simpler
      when there is no per-request database connection switching.
    </P>
    <P>
      The tradeoff is that the <IC>school_id</IC> column must be on <em className="font-medium text-gray-900 dark:text-white not-italic">every tenant-scoped table</em>,
      and every query path must filter by it. A single missing <IC>where</IC> clause is a data leak.
      The architecture shifts the security burden from the infrastructure layer to the application layer —
      and that is where the global scope pattern becomes essential.
    </P>

    <H2 id="mt-global-scopes">Global Scopes: The Enforcement Layer</H2>
    <P>
      A Laravel global scope automatically appends a <IC>WHERE</IC> clause to every Eloquent query on models
      that use it. In Madarik, every tenant-scoped model uses a <IC>BelongsToSchool</IC> trait that applies
      the scope automatically:
    </P>
    <CB>{`// app/Models/Concerns/BelongsToSchool.php

trait BelongsToSchool
{
    public static function bootBelongsToSchool(): void
    {
        static::addGlobalScope('school', function (Builder $builder): void {
            if ($schoolId = session('school_id')) {
                $builder->where(static::qualifyColumn('school_id'), $schoolId);
            }
        });
    }
}`}</CB>
    <CB>{`// Usage on any tenant model
class Student extends Model
{
    use BelongsToSchool;
    // Every Student::query() now silently filters by the session's school_id
}`}</CB>
    <P>
      The <IC>static::qualifyColumn()</IC> call is important: it prefixes the column with the table name,
      which prevents ambiguous column errors when you join across two tenant-scoped tables.
      Without it, a join between <IC>students</IC> and <IC>grades</IC> would produce
      <IC>WHERE school_id = ?</IC> instead of <IC>WHERE students.school_id = ?</IC>, and MySQL will error
      on ambiguity.
    </P>
    <P>
      Global scopes handle reads automatically. For writes, the <IC>school_id</IC> must be set explicitly —
      either in the controller or via a model observer. I use an observer for this to keep controllers clean:
    </P>
    <CB>{`// app/Observers/TenantObserver.php

class TenantObserver
{
    public function creating(Model $model): void
    {
        if (in_array('school_id', $model->getFillable()) && empty($model->school_id)) {
            $model->school_id = session('school_id');
        }
    }
}`}</CB>
    <P>
      This means a controller can call <IC>Student::create($validated)</IC> without manually injecting
      <IC>school_id</IC> — the observer sets it before the INSERT fires. The <IC>empty()</IC> check ensures
      that explicit overrides (in seeders, during tests, in admin tools) are not clobbered.
    </P>

    <H2 id="mt-middleware">Middleware: Tenant Detection and Status Checks</H2>
    <P>
      Global scopes only work if <IC>session('school_id')</IC> contains a valid, trusted value.
      That value is established and validated in middleware — before any controller runs.
    </P>
    <CB>{`// app/Http/Middleware/CheckSchoolStatus.php

class CheckSchoolStatus
{
    public function handle(Request $request, Closure $next): Response
    {
        $school = School::find(session('school_id'));

        if (!$school) {
            return redirect()->route('login');
        }

        if ($school->status === SchoolStatus::Suspended) {
            Auth::logout();
            return redirect()->route('login')
                ->withErrors(['school' => 'Your school account has been suspended.']);
        }

        app()->instance('current_school', $school);

        return $next($request);
    }
}`}</CB>
    <P>
      Three things happen here. First, the school record is loaded and verified to exist — a stale or forged
      session value cannot sneak through. Second, suspended schools are actively blocked rather than just
      rate-limited; suspended means suspended. Third, the school instance is bound into the service container
      so any class in the request lifecycle can type-hint <IC>School $school</IC> without re-querying.
    </P>
    <P>
      The middleware is applied to all web and API route groups in <IC>bootstrap/app.php</IC> rather than
      on individual route groups. In Laravel 11, this means:
    </P>
    <CB>{`// bootstrap/app.php

->withMiddleware(function (Middleware $middleware): void {
    $middleware->appendToGroup('web', [
        CheckSchoolStatus::class,
    ]);

    $middleware->appendToGroup('api', [
        CheckSchoolStatus::class,
    ]);
})`}</CB>
    <P>
      A subtle but important point: the middleware must run <em className="font-medium text-gray-900 dark:text-white not-italic">after</em>{' '}
      the session middleware and <em className="font-medium text-gray-900 dark:text-white not-italic">after</em>{' '}
      authentication middleware, so that <IC>session('school_id')</IC> and <IC>Auth::user()</IC> are both
      available when it executes. Laravel's middleware stack processes in declaration order —
      appending with <IC>appendToGroup</IC> rather than <IC>prependToGroup</IC> ensures correct ordering.
    </P>

    <H2 id="mt-policies">Policies: The Second Line of Defence</H2>
    <P>
      Global scopes prevent cross-tenant reads at the query level. But they do not protect every surface.
      Direct model lookups by primary key — <IC>Student::find($id)</IC>, route model binding, API endpoints
      that accept an ID — bypass the scope if the developer calls <IC>withoutGlobalScopes()</IC>, and route
      model binding itself does not apply global scopes by default in all versions.
    </P>
    <P>
      Policies are the second line of defence. Every sensitive resource has a policy that re-validates
      the <IC>school_id</IC> constraint explicitly:
    </P>
    <CB>{`// app/Policies/StudentPolicy.php

class StudentPolicy
{
    public function view(User $user, Student $student): bool
    {
        return $user->school_id === $student->school_id;
    }

    public function update(User $user, Student $student): bool
    {
        return $user->school_id === $student->school_id
            && $user->hasPermissionTo('students.edit');
    }

    public function delete(User $user, Student $student): bool
    {
        return $user->school_id === $student->school_id
            && $user->hasRole('admin');
    }
}`}</CB>
    <P>
      The pattern is always the same: <IC>{'$user->school_id === $resource->school_id'}</IC> before any
      permission or role check. If the school IDs do not match, the request is denied regardless of
      what role or permission the user holds. This makes cross-tenant access impossible even if a user
      somehow obtains a valid token from a different school.
    </P>
    <P>
      This redundancy — global scope <em className="font-medium not-italic text-gray-900 dark:text-white">and</em> policy check — is intentional.
      Defence in depth: neither layer alone is sufficient, and the cost of the extra comparison is negligible.
    </P>

    <H2 id="mt-testing">Testing Tenant Isolation</H2>
    <P>
      Tenant isolation is not a feature you can verify manually. It requires a dedicated test suite that
      explicitly attempts cross-tenant access and asserts it fails:
    </P>
    <CB language="php">{`// tests/Feature/TenantIsolationTest.php

it('prevents a user from reading another school\'s students', function (): void {
    $schoolA = School::factory()->create();
    $schoolB = School::factory()->create();

    $userA   = User::factory()->for($schoolA)->create();
    $student = Student::factory()->for($schoolB)->create();

    actingAs($userA)
        ->getJson("/api/students/{$student->id}")
        ->assertForbidden();
});

it('scopes student index to the authenticated user\'s school', function (): void {
    $schoolA = School::factory()->create();
    $schoolB = School::factory()->create();

    $user           = User::factory()->for($schoolA)->create();
    $ownStudent     = Student::factory()->for($schoolA)->create();
    $foreignStudent = Student::factory()->for($schoolB)->create();

    actingAs($user)
        ->getJson('/api/students')
        ->assertOk()
        ->assertJsonFragment(['id' => $ownStudent->id])
        ->assertJsonMissing(['id' => $foreignStudent->id]);
});`}</CB>
    <P>
      These tests are non-negotiable. Run them on every PR. They are the only reliable signal that a
      refactor has not accidentally removed a scope or a policy check.
    </P>
    <P>
      One practical tip: create a custom Pest helper <IC>actingAsSchool()</IC> that sets up both the
      authenticated user and the correct session <IC>school_id</IC> in one call.
      When testing multi-tenant code, you will write this setup dozens of times, and a helper prevents
      subtle test bugs where the user's school and the session school become out of sync.
    </P>

    <H2 id="mt-lessons">Lessons Learned in Production</H2>
    <UL>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Add <IC>school_id</IC> to the schema from the start.</strong>{' '}
        Retrofitting it onto existing tables mid-project is painful. Every migration must backfill a sensible default,
        every query must be audited, and every test must be updated. Make it a first-class column from day one.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Index <IC>school_id</IC> on every table.</strong>{' '}
        Without an index, every global-scope filter becomes a full table scan. A composite index on
        <IC>(school_id, created_at)</IC> covers the vast majority of ordered paginated queries.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Global scopes are invisible — and that is a hazard.</strong>{' '}
        New developers do not see them in queries. Document them in the model class and add a comment in the migration
        reminding future maintainers that this table is tenant-scoped. The <IC>BelongsToSchool</IC> trait name helps,
        but explicit documentation prevents the "why is this query returning no results in the seeder?" confusion.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Seeders and factories must bypass scopes.</strong>{' '}
        When creating test data for multiple schools, you must set <IC>school_id</IC> explicitly on factories
        and run seeders with <IC>withoutGlobalScopes()</IC>. Establish a convention early, because debugging
        seeder failures caused by a silently-applied global scope is not a good use of time.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">The shared database strategy does not scale to every use case.</strong>{' '}
        If a single tenant produces enough load to saturate the database, you have no isolation lever to pull.
        For Madarik's current scale, this is not a concern — but it is the point at which migrating to schema-per-tenant
        or database-per-tenant becomes worth the operational cost.
      </li>
    </UL>
    <P>
      Multi-tenancy in Laravel is not a package you install — it is an architectural discipline you apply consistently.
      The global scope handles the mechanical part. The policies, middleware, and tests handle the correctness guarantees.
      Miss any one layer and your isolation model has a gap. Apply all three and you can sleep soundly
      when a penetration tester tries to read another school's data.
    </P>
  </div>
);

const ServicePatternArticle: React.FC = () => (
  <div>
    <H2 id="sp-god-objects">Why Controllers Become God Objects</H2>
    <P>
      It starts innocuously. A controller method validates a request, queries the database, sends an email,
      fires a notification, and returns a JSON response — all in 80 lines. That is not a controller;
      that is a god object wearing a controller's clothes. Over time it grows: new business rules get appended,
      special cases accumulate, and the method becomes untestable without bootstrapping half the framework.
    </P>
    <P>Here is what a typical over-stuffed controller action looks like before the refactor:</P>
    <CB>{`public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'student_id' => ['required', 'exists:students,id'],
        'course_id'  => ['required', 'exists:courses,id'],
    ]);

    $student = Student::findOrFail($validated['student_id']);
    $course  = Course::findOrFail($validated['course_id']);

    if ($course->students()->count() >= $course->capacity) {
        return response()->json(['error' => 'Course is full'], 422);
    }

    if ($student->enrollments()->where('course_id', $course->id)->exists()) {
        return response()->json(['error' => 'Already enrolled'], 422);
    }

    $enrollment = Enrollment::create([
        'student_id' => $student->id,
        'course_id'  => $course->id,
        'enrolled_at' => now(),
    ]);

    Mail::to($student->email)->send(new EnrollmentConfirmationMail($enrollment));

    $student->notify(new EnrolledInCourseNotification($enrollment));

    return response()->json(new EnrollmentResource($enrollment), 201);
}`}</CB>
    <P>
      This method is doing validation, capacity checking, duplicate detection, persistence, email dispatch,
      and notification dispatch. It is impossible to unit test (you need a database, a mailer, and a notification
      channel), impossible to reuse from a console command, and impossible to read quickly. The service pattern
      fixes this by extracting the business logic into a dedicated class.
    </P>

    <H2 id="sp-service-layer">The Service Layer</H2>
    <P>
      A service is a plain PHP class with no parent, no traits, and no framework magic — just a constructor
      that accepts dependencies and methods that encode business logic. Create one with:
    </P>
    <CB language="bash">{`php artisan make:class Services/EnrollmentService`}</CB>
    <CB>{`// app/Services/EnrollmentService.php

class EnrollmentService
{
    public function __construct(
        private readonly EnrollmentRepository $enrollments,
        private readonly MailerInterface $mailer,
    ) {}

    public function enroll(Student $student, Course $course): Enrollment
    {
        if ($this->enrollments->isFull($course)) {
            throw new CourseFullException($course);
        }

        if ($this->enrollments->isAlreadyEnrolled($student, $course)) {
            throw new AlreadyEnrolledException($student, $course);
        }

        $enrollment = $this->enrollments->create($student, $course);

        $this->mailer->send(new EnrollmentConfirmationMail($enrollment));

        return $enrollment;
    }
}`}</CB>
    <P>
      The controller becomes a thin HTTP adapter — it translates an HTTP request into service inputs
      and translates the result into an HTTP response. Business logic lives nowhere near it:
    </P>
    <CB>{`public function store(EnrollStudentRequest $request, EnrollmentService $service): JsonResponse
{
    try {
        $enrollment = $service->enroll(
            Student::findOrFail($request->student_id),
            Course::findOrFail($request->course_id),
        );

        return response()->json(new EnrollmentResource($enrollment), 201);

    } catch (CourseFullException $e) {
        return response()->json(['error' => $e->getMessage()], 422);
    } catch (AlreadyEnrolledException $e) {
        return response()->json(['error' => $e->getMessage()], 422);
    }
}`}</CB>
    <P>
      Now the same <IC>EnrollmentService::enroll()</IC> can be called from a console command,
      a queued job, a Livewire component, or an API controller — with zero code duplication.
    </P>

    <H2 id="sp-dtos">Data Transfer Objects</H2>
    <P>
      As services grow, methods start accepting many parameters — which is fragile, unreadable, and
      order-dependent. Data Transfer Objects (DTOs) replace parameter lists with typed value objects.
      PHP 8.1's readonly properties make them essentially free to write:
    </P>
    <CB>{`// app/DataTransferObjects/EnrollStudentData.php

readonly class EnrollStudentData
{
    public function __construct(
        public int    $studentId,
        public int    $courseId,
        public ?string $notes = null,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            studentId: (int) $request->validated('student_id'),
            courseId:  (int) $request->validated('course_id'),
            notes:     $request->validated('notes'),
        );
    }
}`}</CB>
    <CB>{`// Service now accepts a single typed object
public function enroll(EnrollStudentData $data): Enrollment
{
    $student = Student::findOrFail($data->studentId);
    $course  = Course::findOrFail($data->courseId);
    // ...
}`}</CB>
    <P>
      DTOs give you IDE autocompletion on every property, compile-time type safety, and a single place
      to add validation or transformation logic when the shape of the input changes.
      The <IC>fromRequest()</IC> factory keeps the HTTP-to-domain translation in one place.
    </P>

    <H2 id="sp-actions">Action Classes: Single Responsibility in Practice</H2>
    <P>
      Services are great for cohesive groups of related operations. But sometimes you have a single,
      discrete operation that does not belong in a broader service. Action classes — single-method
      classes named after the operation they perform — are the right tool:
    </P>
    <CB>{`// app/Actions/EnrollStudentAction.php

class EnrollStudentAction
{
    public function __construct(
        private readonly EnrollmentRepository $repository,
    ) {}

    public function __invoke(EnrollStudentData $data): Enrollment
    {
        if ($this->repository->isFull($data->courseId)) {
            throw new CourseFullException();
        }

        return $this->repository->create(
            studentId:  $data->studentId,
            courseId:   $data->courseId,
            enrolledAt: now(),
        );
    }
}`}</CB>
    <P>
      Actions use PHP's <IC>__invoke()</IC> method so they are callable as functions:
    </P>
    <CB>{`// In the controller
public function store(EnrollStudentRequest $request, EnrollStudentAction $action): JsonResponse
{
    $enrollment = $action(EnrollStudentData::fromRequest($request));

    return response()->json(new EnrollmentResource($enrollment), 201);
}`}</CB>
    <P>
      The rule of thumb: use a service when you need multiple related methods that share dependencies.
      Use an action when you need exactly one operation. In practice, many complex services
      decompose naturally into a collection of action classes orchestrated by a thin service.
    </P>

    <H2 id="sp-together">Structuring the Layers Together</H2>
    <P>
      The full request lifecycle with these patterns looks like this:
    </P>
    <UL>
      <li><strong className="font-semibold text-gray-900 dark:text-white">FormRequest</strong> — validates and authorizes the HTTP input</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">DTO</strong> — converts validated input into a typed domain object</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Action / Service</strong> — executes the business logic</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Eloquent Model / Repository</strong> — persists and retrieves data</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">API Resource</strong> — transforms the Eloquent result into JSON</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Controller</strong> — orchestrates the above, owns no logic itself</li>
    </UL>
    <P>
      A controller that follows this structure is typically 10–20 lines. Every one of those lines is
      readable at a glance, and every layer is independently testable.
    </P>

    <H2 id="sp-testing">Testing Service Classes</H2>
    <P>
      The primary benefit of the service pattern is testability. Because services accept their dependencies
      via the constructor, you can inject mocks in tests without touching the HTTP layer:
    </P>
    <CB language="php">{`it('throws CourseFullException when the course has no capacity', function (): void {
    $repository = Mockery::mock(EnrollmentRepository::class);
    $repository->shouldReceive('isFull')->once()->andReturn(true);
    $repository->shouldNotReceive('create');

    $action = new EnrollStudentAction($repository);
    $data   = new EnrollStudentData(studentId: 1, courseId: 1);

    expect(fn () => $action($data))->toThrow(CourseFullException::class);
});

it('creates an enrollment when the course has capacity', function (): void {
    $repository = Mockery::mock(EnrollmentRepository::class);
    $repository->shouldReceive('isFull')->andReturn(false);
    $repository->shouldReceive('create')->once()->andReturn(
        Enrollment::factory()->make()
    );

    $action     = new EnrollStudentAction($repository);
    $enrollment = $action(new EnrollStudentData(studentId: 1, courseId: 1));

    expect($enrollment)->toBeInstanceOf(Enrollment::class);
});`}</CB>
    <P>
      These are pure unit tests — no database, no HTTP, no framework bootstrap. They run in milliseconds
      and give you pinpoint feedback about exactly which business rule broke.
    </P>

    <H2 id="sp-when-not">When Not to Use This Pattern</H2>
    <P>
      The service pattern is not free. It adds indirection, more files, and a learning curve for new team members.
      Do not reach for it everywhere:
    </P>
    <UL>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Simple CRUD with no business logic</strong> — if a controller
        just validates, saves, and returns, there is no service to extract. A direct Eloquent call in the
        controller is the right answer.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Prototypes and MVPs</strong> — when speed matters and the
        domain is not yet understood, fat controllers are acceptable. Refactor when the domain stabilises.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">One-off scripts and commands</strong> — console commands that
        run once and are never reused do not benefit from the abstraction.
      </li>
    </UL>
    <P>
      The right signal for introducing a service: you find yourself copy-pasting logic between two controllers,
      or you cannot write a unit test for a controller action without spinning up a database.
      When either happens, extract the logic and do not look back.
    </P>
  </div>
);

const EventDrivenArticle: React.FC = () => (
  <div>
    <H2 id="eda-what">What Event-Driven Actually Means in Laravel</H2>
    <P>
      "Event-driven" is often misunderstood as complexity for its own sake. In Laravel, it has a precise meaning:
      instead of a single method doing X and then directly calling Y and Z, you fire an event that says "X happened"
      and let separate listeners decide what to do about it. The action that triggered the event does not know
      — and should not care — what the listeners do.
    </P>
    <P>
      The payoff is decoupling. When a student enrols, you want to: send a confirmation email, post a Slack
      notification to the teacher, increment an analytics counter, and maybe generate a PDF receipt.
      Without events, all of that logic lives in the enrolment service. With events, the service fires
      <IC>StudentEnrolled</IC> and each concern is handled by its own listener. Adding the PDF receipt
      later requires writing one new listener — zero changes to existing code.
    </P>

    <H2 id="eda-events-listeners">Defining Events and Listeners</H2>
    <P>
      Events in Laravel are plain PHP classes that carry data. Create them with Artisan:
    </P>
    <CB language="bash">{`php artisan make:event StudentEnrolled
php artisan make:listener SendEnrollmentConfirmation --event=StudentEnrolled
php artisan make:listener NotifyTeacher --event=StudentEnrolled`}</CB>
    <CB>{`// app/Events/StudentEnrolled.php

class StudentEnrolled
{
    public function __construct(
        public readonly Enrollment $enrollment,
    ) {}
}`}</CB>
    <CB>{`// app/Listeners/SendEnrollmentConfirmation.php

class SendEnrollmentConfirmation
{
    public function handle(StudentEnrolled $event): void
    {
        Mail::to($event->enrollment->student->email)
            ->send(new EnrollmentConfirmationMail($event->enrollment));
    }
}`}</CB>
    <P>
      In Laravel 11, event-listener bindings are discovered automatically via convention — no manual
      registration in a service provider needed. Laravel scans your <IC>app/Events</IC> and
      <IC>app/Listeners</IC> directories and wires them up by the type hint on <IC>handle()</IC>.
      You can verify the mapping with:
    </P>
    <CB language="bash">{`php artisan event:list`}</CB>
    <P>
      Fire the event from wherever the business action completes:
    </P>
    <CB>{`// In your service or action
$enrollment = Enrollment::create([...]);

event(new StudentEnrolled($enrollment));
// or: StudentEnrolled::dispatch($enrollment);

return $enrollment;`}</CB>

    <H2 id="eda-queued">Queued Listeners: Async by Default</H2>
    <P>
      Any listener that performs I/O — sending email, calling an external API, writing to a log service —
      should be queued. Synchronous listeners block the current request and make the user wait
      for operations they do not care about. Implementing <IC>ShouldQueue</IC> is a one-line change:
    </P>
    <CB>{`class SendEnrollmentConfirmation implements ShouldQueue
{
    public string $queue    = 'notifications';
    public int    $tries    = 3;
    public int    $backoff  = 60; // seconds before retry

    public function handle(StudentEnrolled $event): void
    {
        Mail::to($event->enrollment->student->email)
            ->send(new EnrollmentConfirmationMail($event->enrollment));
    }

    public function failed(StudentEnrolled $event, Throwable $e): void
    {
        Log::error('Enrollment confirmation failed', [
            'enrollment_id' => $event->enrollment->id,
            'error'         => $e->getMessage(),
        ]);
    }
}`}</CB>
    <P>
      The <IC>failed()</IC> hook is critical and underused. When a listener exhausts its retries,
      <IC>failed()</IC> gives you one last chance to log, alert, or clean up. Without it,
      failures disappear silently into the failed jobs table.
    </P>
    <P>
      Use dedicated queues per concern (<IC>'notifications'</IC>, <IC>'analytics'</IC>, <IC>'reports'</IC>).
      This lets you scale and prioritise independently — a backlog in the analytics queue should never
      delay notification delivery.
    </P>

    <H2 id="eda-observer-vs-events">Observer vs Events: Choosing the Right Tool</H2>
    <P>
      Laravel ships two mechanisms that look similar but serve different purposes: model observers and
      application events. Knowing when to reach for each prevents architectural confusion.
    </P>
    <P>
      <strong className="font-semibold text-gray-900 dark:text-white">Use model observers</strong> for reactions to Eloquent lifecycle
      hooks — <IC>creating</IC>, <IC>created</IC>, <IC>updating</IC>, <IC>deleting</IC>.
      Observers are the right place for: setting default values on creation, maintaining audit logs,
      cascading soft-deletes, and auto-generating slugs. They respond to <em className="not-italic font-medium text-gray-900 dark:text-white">model persistence events</em>.
    </P>
    <CB language="bash">{`php artisan make:observer EnrollmentObserver --model=Enrollment`}</CB>
    <CB>{`class EnrollmentObserver
{
    public function created(Enrollment $enrollment): void
    {
        AuditLog::record('enrollment.created', $enrollment);
    }

    public function deleting(Enrollment $enrollment): void
    {
        // Cascade soft-delete to related records
        $enrollment->grades()->delete();
    }
}`}</CB>
    <P>
      <strong className="font-semibold text-gray-900 dark:text-white">Use application events</strong> for cross-module communication and
      business-level domain signals. <IC>StudentEnrolled</IC>, <IC>InvoicePaid</IC>,
      <IC>AnnouncementPublished</IC> — these represent <em className="not-italic font-medium text-gray-900 dark:text-white">things that happened in your domain</em>,
      not Eloquent persistence operations. They are the seams between modules and the foundation
      of a loosely coupled architecture.
    </P>

    <H2 id="eda-coupling">Preventing Listener Coupling</H2>
    <P>
      The most common mistake with events is recreating the coupling they were meant to break —
      just in listener form. Watch for these patterns:
    </P>
    <UL>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">One listener doing many things.</strong>{' '}
        If <IC>HandleStudentEnrolled</IC> sends an email AND updates analytics AND posts to Slack,
        you have not decoupled anything — you have just moved the god object. One listener, one concern.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Listeners calling each other.</strong>{' '}
        Listeners should react to events, not fire new events that trigger other listeners in a chain.
        Chains are hard to trace and easy to accidentally make circular.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Past-tense event names.</strong>{' '}
        Events describe things that <em className="not-italic">already happened</em>: <IC>StudentEnrolled</IC>,
        not <IC>EnrollStudent</IC>. The imperative form suggests a command, which belongs in a service or action,
        not an event.
      </li>
    </UL>

    <H2 id="eda-testing">Testing Events and Listeners</H2>
    <P>
      Laravel's <IC>Event::fake()</IC> replaces the event dispatcher with a spy, letting you assert
      which events were fired without running any listeners:
    </P>
    <CB language="php">{`it('fires StudentEnrolled when an enrollment is created', function (): void {
    Event::fake();

    $data = new EnrollStudentData(studentId: 1, courseId: 1);
    app(EnrollStudentAction::class)($data);

    Event::assertDispatched(StudentEnrolled::class, function ($event) {
        return $event->enrollment->student_id === 1;
    });
});`}</CB>
    <P>
      To test the listener itself — independently of whether the event fires — instantiate it directly
      and call <IC>handle()</IC> with a fake event:
    </P>
    <CB language="php">{`it('sends a confirmation email when a student enrols', function (): void {
    Mail::fake();

    $enrollment = Enrollment::factory()->create();
    $event      = new StudentEnrolled($enrollment);

    app(SendEnrollmentConfirmation::class)->handle($event);

    Mail::assertSent(EnrollmentConfirmationMail::class, function ($mail) use ($enrollment) {
        return $mail->hasTo($enrollment->student->email);
    });
});`}</CB>

    <H2 id="eda-pitfalls">Common Pitfalls</H2>
    <UL>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Synchronous listeners on the hot path.</strong>{' '}
        If any listener on a frequently fired event is synchronous and slow, every request that triggers
        that event will be slow. Default to <IC>ShouldQueue</IC>. Make synchronous the exception, not the rule.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Event payloads with Eloquent models.</strong>{' '}
        When events are queued, the model is serialised into the job payload. If the model is large
        (many attributes, loaded relationships), the payload bloats the queue. Pass only the model ID
        and re-fetch inside the listener: <IC>{'$this->enrollment = Enrollment::find($this->enrollmentId)'}</IC>.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Missing <IC>failed()</IC> handlers.</strong>{' '}
        Silent failures are worse than loud ones. Every queued listener that touches external systems
        (email, Slack, SMS) must implement <IC>failed()</IC> and surface the error somewhere actionable.
      </li>
      <li>
        <strong className="font-semibold text-gray-900 dark:text-white">Firing events inside database transactions.</strong>{' '}
        If you fire <IC>StudentEnrolled</IC> inside a transaction that later rolls back, the queued
        listener has already run against data that no longer exists. Use Laravel's <IC>afterCommit()</IC>
        property on the listener — <IC>public bool $afterCommit = true</IC> — to delay dispatch until
        the transaction commits.
      </li>
    </UL>

    <H2 id="eda-takeaways">Key Takeaways</H2>
    <UL>
      <li>Events decouple the action that <em className="not-italic">causes</em> a thing from the reactions to that thing. This is their only job — use them for it.</li>
      <li>Every listener that performs I/O should implement <IC>ShouldQueue</IC>. Synchronous I/O in listeners blocks requests.</li>
      <li>One listener, one concern. Split responsibilities across listeners; do not consolidate them.</li>
      <li>Use <IC>afterCommit = true</IC> on any listener whose event is fired inside a database transaction.</li>
      <li>Model observers handle Eloquent lifecycle hooks; application events handle domain signals. These are different things and serve different purposes.</li>
      <li>Test the event firing and the listener handling independently — they are separate units of behaviour.</li>
    </UL>
  </div>
);

const PerformanceOptimizationArticle: React.FC = () => (
  <div>
    <P>
      Performance problems in Laravel applications share a short list of root causes. In practice,
      the same four patterns — unbounded queries, missing caches, absent indexes, and synchronous
      heavy work — account for the vast majority of slowdowns. This article covers each with
      concrete detection and fix strategies.
    </P>
    <P>
      <em className="not-italic font-medium text-gray-900 dark:text-white">Note:</em>{' '}
      This article is published in full on Medium. The highlights below cover the core concepts;
      the full version includes benchmarks, Horizon configuration, and advanced Redis patterns.
    </P>

    <H2 id="perf-n1">The N+1 Query Problem</H2>
    <P>
      N+1 is the most common Laravel performance bug and the easiest to miss. It occurs when you
      load a collection and then access a relationship on each item — triggering one query per item
      instead of one query for all items.
    </P>
    <CB>{`// This fires 1 + N queries (1 for students, N for each student's course)
$students = Student::all();
foreach ($students as $student) {
    echo $student->course->name; // query per student
}`}</CB>
    <CB>{`// This fires 2 queries total
$students = Student::with('course')->get();
foreach ($students as $student) {
    echo $student->course->name; // already loaded
}`}</CB>
    <P>
      Detection: install Laravel Debugbar in development and watch the query count climb above 10 on
      any page. In production, Laravel Telescope's query panel surfaces slow and repeated queries.
      You can also enforce eager loading by setting <IC>Model::preventLazyLoading()</IC> in your
      <IC>AppServiceProvider</IC> — it throws an exception in development whenever a lazy load fires.
    </P>

    <H2 id="perf-caching">Redis Caching Strategies</H2>
    <P>
      Not every query needs to hit the database on every request. Data that is expensive to compute
      and changes infrequently — dashboard aggregates, configuration values, feature flags,
      role/permission lists — belongs in a cache.
    </P>
    <CB>{`// Cache-aside: check cache first, compute on miss, store result
$stats = Cache::remember("school:{$schoolId}:stats", now()->addMinutes(15), function () use ($schoolId) {
    return [
        'student_count'    => Student::where('school_id', $schoolId)->count(),
        'active_courses'   => Course::where('school_id', $schoolId)->active()->count(),
        'pending_invoices' => Invoice::where('school_id', $schoolId)->pending()->count(),
    ];
});`}</CB>
    <P>
      Cache invalidation is the harder half. Tag your cache entries to invalidate whole groups
      without tracking individual keys:
    </P>
    <CB>{`// Write with tags
Cache::tags(["school:{$schoolId}"])->put('stats', $stats, now()->addMinutes(15));

// Invalidate everything for this school when data changes
Cache::tags(["school:{$schoolId}"])->flush();`}</CB>

    <H2 id="perf-indexes">Database Indexing</H2>
    <P>
      An unindexed column in a <IC>WHERE</IC> clause means a full table scan on every query.
      At 10,000 rows, this is tolerable. At 1,000,000 rows, it destroys response times.
    </P>
    <CB>{`// In a migration: composite index covers WHERE school_id = ? ORDER BY created_at DESC
Schema::table('students', function (Blueprint $table): void {
    $table->index(['school_id', 'created_at']);
});`}</CB>
    <P>
      For multi-tenant applications, every tenant-scoped table needs at minimum an index on
      <IC>school_id</IC>. The most common queries add <IC>created_at</IC> as a second column
      for ordered pagination, producing a composite index that covers both the filter and the sort
      in a single index scan.
    </P>

    <H2 id="perf-queues">Queue-Based Offloading</H2>
    <P>
      Any operation the user does not need to wait for belongs in a queue. Report generation,
      notification dispatch, PDF creation, webhook delivery, and third-party API calls should
      never block an HTTP response.
    </P>
    <CB>{`// Dispatch and return immediately
GenerateReportJob::dispatch($report)->onQueue('reports');

return response()->json(['message' => 'Report generation started'], 202);`}</CB>
    <P>
      Laravel Horizon provides real-time visibility into queue throughput, job failure rates,
      and worker utilisation. Running Horizon in production is non-optional once queues
      become critical infrastructure — you need to know when jobs are backing up before your
      users do.
    </P>

    <H2 id="perf-read-more">Read the Full Article</H2>
    <P>
      The full article on Medium covers: query builder vs Eloquent performance tradeoffs,
      advanced Redis data structures (sorted sets for leaderboards, pub/sub for real-time),
      database connection pooling with PgBouncer, PHP OPcache configuration,
      and a complete Horizon setup with per-queue worker counts and memory limits.
    </P>
  </div>
);

const MultiTenantCompleteArticle: React.FC = () => (
  <div>
    <H2 id="mt2-schema">Planning Your Schema for Multi-Tenancy</H2>
    <P>
      The most expensive decision in a multi-tenant application is the one you make first:
      how tenant data is physically separated. Retrofitting isolation into an existing schema
      is one of the most painful migrations a team can undertake — every table, every query,
      every test, every seeder must be touched. Plan it before you write your first migration.
    </P>
    <P>
      For a shared-database strategy (one database, all tenants' data co-located), the rule is simple:
      <strong className="font-semibold text-gray-900 dark:text-white"> every table that contains tenant data must have a <IC>school_id</IC> foreign key</strong>.
      Not most tables. Every table. Include it in your base migration template so it is impossible
      to forget:
    </P>
    <CB>{`Schema::create('enrollments', function (Blueprint $table): void {
    $table->id();
    $table->foreignId('school_id')->constrained()->cascadeOnDelete();
    $table->foreignId('student_id')->constrained()->cascadeOnDelete();
    $table->foreignId('course_id')->constrained()->cascadeOnDelete();
    $table->timestamp('enrolled_at');
    $table->timestamps();
    $table->softDeletes();

    // Composite index: tenant filter + time sort covered in one scan
    $table->index(['school_id', 'created_at']);
    // Unique constraint: a student cannot enrol in the same course twice per school
    $table->unique(['school_id', 'student_id', 'course_id']);
});`}</CB>
    <P>
      The <IC>cascadeOnDelete()</IC> on the <IC>school_id</IC> foreign key means that if a school
      is ever deleted, all of its data is automatically removed. This is essential for GDPR
      "right to erasure" compliance — one delete on the <IC>schools</IC> table cascades to every
      tenant-scoped table in the database.
    </P>

    <H2 id="mt2-onboarding">Tenant Onboarding Flow</H2>
    <P>
      Onboarding is the first impression of your product and the riskiest transaction in the system —
      it creates multiple records across several tables, sends emails, and potentially charges a card,
      all of which must succeed or fail atomically. Wrap every step in a database transaction and
      dispatch side effects only after the transaction commits:
    </P>
    <CB>{`// app/Actions/OnboardNewSchoolAction.php

class OnboardNewSchoolAction
{
    public function __invoke(OnboardSchoolData $data): School
    {
        return DB::transaction(function () use ($data): School {
            $school = School::create([
                'name'       => $data->schoolName,
                'slug'       => Str::slug($data->schoolName),
                'plan'       => Plan::Trial,
                'trial_ends' => now()->addDays(30),
            ]);

            $admin = User::create([
                'school_id' => $school->id,
                'name'      => $data->adminName,
                'email'     => $data->adminEmail,
                'password'  => Hash::make($data->password),
            ]);

            $admin->assignRole('school_admin');

            // Default configuration for every new school
            $school->settings()->create(SchoolSettings::defaults());

            return $school;
        });
        // Side effects dispatched after transaction commits:
        // SchoolOnboarded event fires here, not inside the transaction
    }
}`}</CB>
    <CB>{`// app/Listeners/SendWelcomeEmail.php

class SendWelcomeEmail implements ShouldQueue
{
    public bool $afterCommit = true; // only fires if the transaction committed

    public function handle(SchoolOnboarded $event): void
    {
        Mail::to($event->school->admin->email)
            ->send(new WelcomeToMadarikMail($event->school));
    }
}`}</CB>

    <H2 id="mt2-config">Per-Tenant Configuration</H2>
    <P>
      Schools are not identical. Some enable parent portals; others do not. Some have custom grading
      scales; others use the default. Storing per-tenant configuration in a JSON column gives you
      schema flexibility without adding a new migration for every new feature flag:
    </P>
    <CB>{`// Migration
$table->json('settings')->nullable();

// Model cast
protected function casts(): array
{
    return [
        'settings' => SchoolSettings::class, // custom cast to typed DTO
    ];
}

// Usage
$school->settings->parentPortalEnabled;   // bool
$school->settings->gradingScale;          // string: 'letters' | 'percentages' | 'points'
$school->settings->maxStudentsPerClass;   // int`}</CB>
    <CB>{`// app/Casts/SchoolSettings.php

class SchoolSettings implements Castable
{
    public bool   $parentPortalEnabled  = false;
    public string $gradingScale         = 'percentages';
    public int    $maxStudentsPerClass  = 40;
    public bool   $attendanceRequired   = true;

    public static function defaults(): array
    {
        return (new self())->toArray();
    }
}`}</CB>
    <P>
      When a school updates their settings, you update the JSON column rather than a dedicated
      settings table. Adding a new feature flag requires no migration — just add a property
      with a sensible default to <IC>SchoolSettings</IC> and every existing school inherits the default.
    </P>

    <H2 id="mt2-billing">Subscription and Billing Logic</H2>
    <P>
      Most SaaS products have plans, and plans have limits. The cleanest way to enforce them is
      through a middleware or a gate check that the controller never has to think about:
    </P>
    <CB>{`// app/Http/Middleware/EnforceSubscriptionLimits.php

class EnforceSubscriptionLimits
{
    public function handle(Request $request, Closure $next, string $feature): Response
    {
        $school = app('current_school');

        if (!$school->canUseFeature($feature)) {
            return $request->expectsJson()
                ? response()->json(['error' => 'Your plan does not include this feature.'], 403)
                : redirect()->route('billing.upgrade');
        }

        return $next($request);
    }
}`}</CB>
    <CB>{`// On routes that require a specific plan feature
Route::post('/api/reports', [ReportController::class, 'generate'])
    ->middleware('subscription:advanced_reports');`}</CB>
    <CB>{`// On the School model
public function canUseFeature(string $feature): bool
{
    if ($this->isTrialExpired()) {
        return false;
    }

    return in_array($feature, Plan::featuresFor($this->plan), true);
}`}</CB>

    <H2 id="mt2-migrations">Running Migrations Across All Tenants</H2>
    <P>
      With a shared database, <IC>php artisan migrate</IC> runs once and affects all tenants simultaneously.
      This is both a strength (simplicity) and a risk (a bad migration is a bad migration for everyone at once).
    </P>
    <P>
      For zero-downtime migrations on large tables, the pattern is:
    </P>
    <UL>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Deploy 1:</strong> Add the new column as nullable. Application runs with the old schema.</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Backfill job:</strong> Dispatch a queued job that populates the column in chunks for existing rows.</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Deploy 2:</strong> Once backfill completes, add the <IC>NOT NULL</IC> constraint or default value in a separate migration.</li>
    </UL>
    <CB>{`// The backfill job — safe for large tables
class BackfillStudentStatusJob implements ShouldQueue
{
    public function handle(): void
    {
        Student::whereNull('status')
            ->chunkById(500, function (Collection $students): void {
                Student::whereIn('id', $students->pluck('id'))
                    ->update(['status' => StudentStatus::Active->value]);
            });
    }
}`}</CB>
    <P>
      Never add a <IC>NOT NULL</IC> column without a default in a single migration on a table with existing rows —
      the migration will lock the table for the entire duration of the backfill. The two-deploy pattern
      keeps the table available throughout.
    </P>

    <H2 id="mt2-takeaways">Key Takeaways</H2>
    <UL>
      <li>Design your schema for multi-tenancy before writing your first line of application code. The cost of retrofitting is an order of magnitude higher than building it in from the start.</li>
      <li>Wrap tenant onboarding in a database transaction. Fire side effects (email, billing) only after the transaction commits, using <IC>afterCommit = true</IC> on queued listeners.</li>
      <li>JSON settings columns with typed casts give you per-tenant configuration flexibility without a migration for every new feature flag.</li>
      <li>Enforce subscription limits in middleware, not in controllers. Controllers should not know about billing.</li>
      <li>Zero-downtime migrations on large shared tables require two deploys and a backfill job. One-step <IC>NOT NULL</IC> column additions lock the table.</li>
    </UL>
  </div>
);

const ApiTestingArticle: React.FC = () => (
  <div>
    <H2 id="api-resources">API Resource Design</H2>
    <P>
      Eloquent API Resources are Laravel's answer to the transform layer: a dedicated class that controls
      exactly what fields are exposed, how relationships are represented, and what metadata accompanies
      the response. Never return an Eloquent model directly from an API endpoint — models expose every
      column by default, and that includes columns you did not intend to make public.
    </P>
    <CB language="bash">{`php artisan make:resource StudentResource
php artisan make:resource StudentCollection`}</CB>
    <CB>{`// app/Http/Resources/StudentResource.php

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'email'       => $this->email,
            'enrolledAt'  => $this->created_at->toIso8601String(),
            'course'      => CourseResource::make($this->whenLoaded('course')),
            'gradeCount'  => $this->when(
                $request->user()->can('view', $this->resource),
                fn () => $this->grades()->count(),
            ),
        ];
    }
}`}</CB>
    <P>
      Two patterns are worth highlighting here. <IC>whenLoaded('course')</IC> only includes the relationship
      in the response if it was eagerly loaded — preventing N+1 queries when the resource is used in contexts
      where the relationship was not fetched. <IC>when(condition, value)</IC> conditionally includes a field
      based on any runtime condition: authorisation, plan tier, request parameters. These two helpers alone
      handle 90% of the "I need different shapes for different consumers" problem.
    </P>

    <H2 id="api-versioning">API Versioning</H2>
    <P>
      APIs are public contracts. Once a consumer is calling <IC>GET /api/students</IC> and expecting a specific
      response shape, you cannot change that shape without breaking them. Versioning gives you a path to
      evolve your API without breaking existing integrations.
    </P>
    <P>
      URL versioning (<IC>/api/v1/</IC>, <IC>/api/v2/</IC>) is the most pragmatic approach for most
      applications. It is explicit, cache-friendly, and trivial to debug in logs:
    </P>
    <CB>{`// routes/api.php

Route::prefix('v1')->name('api.v1.')->group(base_path('routes/api_v1.php'));
Route::prefix('v2')->name('api.v2.')->group(base_path('routes/api_v2.php'));`}</CB>
    <CB>{`// routes/api_v1.php — stays frozen once v2 ships

Route::apiResource('students', V1\StudentController::class);
Route::apiResource('courses',  V1\CourseController::class);`}</CB>
    <P>
      The discipline: once a version ships to consumers, its response contracts are frozen.
      Bug fixes are allowed; shape changes are not. New shapes go in the next version.
      Deprecate old versions with a sunset header and a migration timeline — never delete them
      without giving consumers enough runway to migrate.
    </P>

    <H2 id="api-auth">Authentication with Sanctum</H2>
    <P>
      Laravel Sanctum handles two authentication scenarios: SPA session-based auth (cookies) and
      API token auth (bearer tokens). For a multi-tenant SaaS exposing an API to external integrations,
      token auth with abilities is the right pattern:
    </P>
    <CB>{`// Issuing a token with scoped abilities
$token = $user->createToken('mobile-app', [
    'students:read',
    'students:write',
    'courses:read',
])->plainTextToken;

// In a controller or policy — check the ability
if (!$request->user()->tokenCan('students:write')) {
    abort(403, 'Token does not have students:write ability');
}`}</CB>
    <CB>{`// Middleware — protect routes by ability
Route::middleware(['auth:sanctum', 'ability:students:read'])->group(function () {
    Route::get('/students', [StudentController::class, 'index']);
});`}</CB>
    <P>
      Token rotation is a security requirement, not a nice-to-have. Provide a token refresh endpoint
      and set expiry on sensitive tokens. For mobile clients, implement a refresh token flow.
      For server-to-server integrations, long-lived tokens are acceptable but must be stored
      securely and rotated when a team member leaves.
    </P>

    <H2 id="api-testing">Feature Testing APIs with Pest</H2>
    <P>
      Every API endpoint needs a feature test that covers: the happy path, validation failures,
      authorisation failures, and not-found cases. This is not optional — it is the only reliable
      signal that your API contract is intact after a refactor.
    </P>
    <CB language="php">{`// tests/Feature/Api/V1/StudentTest.php

beforeEach(function (): void {
    $this->school = School::factory()->create();
    $this->user   = User::factory()->for($this->school)->create();
});

it('returns a paginated list of students scoped to the authenticated school', function (): void {
    Student::factory()->count(5)->for($this->school)->create();
    Student::factory()->count(3)->create(); // other school — must not appear

    actingAs($this->user)
        ->getJson('/api/v1/students')
        ->assertOk()
        ->assertJsonCount(5, 'data')
        ->assertJsonStructure([
            'data' => [['id', 'name', 'email', 'enrolledAt']],
            'meta' => ['total', 'per_page', 'current_page'],
        ]);
});

it('returns 401 for unauthenticated requests', function (): void {
    getJson('/api/v1/students')->assertUnauthorized();
});

it('returns 422 with validation errors for an invalid store request', function (): void {
    actingAs($this->user)
        ->postJson('/api/v1/students', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name', 'email']);
});

it('returns 403 when the user lacks the students:write ability', function (): void {
    $token = $this->user->createToken('test', ['students:read'])->plainTextToken;

    withToken($token)
        ->postJson('/api/v1/students', ['name' => 'Test', 'email' => 'test@example.com'])
        ->assertForbidden();
});`}</CB>
    <P>
      Notice the cross-tenant assertion in the index test: <IC>{'Student::factory()->count(3)->create()'}</IC>
      creates students in a different school and the test asserts they do not appear in the response.
      This single assertion verifies tenant isolation on every CI run. Never skip it.
    </P>

    <H2 id="api-tdd">Test-Driven API Development</H2>
    <P>
      TDD for APIs is exceptionally productive because the API contract is defined before the
      implementation. Write the test first, watch it fail, build exactly enough code to make it pass.
      The result is an implementation with no dead code and no missing test coverage.
    </P>
    <P>A typical TDD cycle for a new endpoint:</P>
    <UL>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Red:</strong> Write a test that calls <IC>POST /api/v1/enrollments</IC> and asserts a 201 response with the correct shape. Run it — it fails with 404 (route does not exist).</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Green:</strong> Add the route, controller, form request, service call, and resource. Run the test — it passes.</li>
      <li><strong className="font-semibold text-gray-900 dark:text-white">Refactor:</strong> Clean up the implementation without touching the test. If the test still passes, the refactor is safe.</li>
    </UL>
    <CB language="php">{`// Step 1: write the test first
it('enrols a student in a course', function (): void {
    $student = Student::factory()->for($this->school)->create();
    $course  = Course::factory()->for($this->school)->withCapacity(30)->create();

    actingAs($this->user)
        ->postJson('/api/v1/enrollments', [
            'student_id' => $student->id,
            'course_id'  => $course->id,
        ])
        ->assertCreated()
        ->assertJsonStructure(['data' => ['id', 'student', 'course', 'enrolledAt']]);

    expect(Enrollment::count())->toBe(1);
});

// Step 2: only then write the route, controller, and service`}</CB>
    <P>
      The discipline is writing the assertion before the implementation. This forces you to define
      the contract from the consumer's perspective — which is the only perspective that matters
      for an API.
    </P>

    <H2 id="api-takeaways">Key Takeaways</H2>
    <UL>
      <li>Always use API Resources — never return raw Eloquent models. Use <IC>whenLoaded()</IC> and <IC>when()</IC> to build conditional response shapes without N+1 queries.</li>
      <li>Version your API from day one. Once a response contract is published, it is frozen. New shapes go in a new version.</li>
      <li>Sanctum token abilities let you issue least-privilege tokens per consumer. Every API token should carry only the abilities it actually needs.</li>
      <li>Every endpoint needs four tests: happy path, validation failure, authorisation failure, and (for multi-tenant apps) cross-tenant isolation.</li>
      <li>Write the test before the implementation. It forces you to define the contract from the consumer's perspective and guarantees coverage from the first line of code.</li>
    </UL>
  </div>
);

interface ArticleDoc { toc: TocItem[]; body: React.ReactNode; }

const getArticleContent = (articleId: string): ArticleDoc | null => {
  const map: Record<string, ArticleDoc> = {
    '1': {
      toc: [
        { id: 'mt-what', title: 'What Multi-Tenancy Actually Means' },
        { id: 'mt-strategy', title: 'Choosing a Strategy' },
        { id: 'mt-global-scopes', title: 'Global Scopes: The Enforcement Layer' },
        { id: 'mt-middleware', title: 'Middleware: Tenant Detection & Status' },
        { id: 'mt-policies', title: 'Policies: The Second Line of Defence' },
        { id: 'mt-testing', title: 'Testing Tenant Isolation' },
        { id: 'mt-lessons', title: 'Lessons Learned in Production' },
      ],
      body: <MultiTenantSaasArticle />,
    },
    '2': {
      toc: [
        { id: 'problem', title: 'The Problem' },
        { id: 'why-get', title: "Why ->get() Kills Your Server" },
        { id: 'chunk-vs-chunkbyid', title: 'chunk() vs chunkById()' },
        { id: 'production-pattern', title: 'The Production Pattern' },
        { id: 'per-chunk-jobs', title: 'Dispatching Per-Chunk Jobs' },
        { id: 'lazy-loading', title: 'Lazy Loading with lazyById()' },
        { id: 'instrumentation', title: 'Instrumenting Memory in Staging' },
        { id: 'pitfalls', title: 'Pitfalls That Will Burn You' },
        { id: 'takeaways', title: 'Key Takeaways' },
      ],
      body: <ChunkedNotificationsArticle />,
    },
    '3': {
      toc: [
        { id: 'sp-god-objects', title: 'Why Controllers Become God Objects' },
        { id: 'sp-service-layer', title: 'The Service Layer' },
        { id: 'sp-dtos', title: 'Data Transfer Objects' },
        { id: 'sp-actions', title: 'Action Classes' },
        { id: 'sp-together', title: 'Structuring the Layers Together' },
        { id: 'sp-testing', title: 'Testing Service Classes' },
        { id: 'sp-when-not', title: 'When Not to Use This Pattern' },
      ],
      body: <ServicePatternArticle />,
    },
    '4': {
      toc: [
        { id: 'eda-what', title: 'What Event-Driven Means in Laravel' },
        { id: 'eda-events-listeners', title: 'Defining Events and Listeners' },
        { id: 'eda-queued', title: 'Queued Listeners: Async by Default' },
        { id: 'eda-observer-vs-events', title: 'Observer vs Events' },
        { id: 'eda-coupling', title: 'Preventing Listener Coupling' },
        { id: 'eda-testing', title: 'Testing Events and Listeners' },
        { id: 'eda-pitfalls', title: 'Common Pitfalls' },
        { id: 'eda-takeaways', title: 'Key Takeaways' },
      ],
      body: <EventDrivenArticle />,
    },
    '5': {
      toc: [
        { id: 'perf-n1', title: 'The N+1 Query Problem' },
        { id: 'perf-caching', title: 'Redis Caching Strategies' },
        { id: 'perf-indexes', title: 'Database Indexing' },
        { id: 'perf-queues', title: 'Queue-Based Offloading' },
        { id: 'perf-read-more', title: 'Read the Full Article' },
      ],
      body: <PerformanceOptimizationArticle />,
    },
    '6': {
      toc: [
        { id: 'mt2-schema', title: 'Planning Your Schema' },
        { id: 'mt2-onboarding', title: 'Tenant Onboarding Flow' },
        { id: 'mt2-config', title: 'Per-Tenant Configuration' },
        { id: 'mt2-billing', title: 'Subscription and Billing Logic' },
        { id: 'mt2-migrations', title: 'Running Migrations Safely' },
        { id: 'mt2-takeaways', title: 'Key Takeaways' },
      ],
      body: <MultiTenantCompleteArticle />,
    },
    '7': {
      toc: [
        { id: 'api-resources', title: 'API Resource Design' },
        { id: 'api-versioning', title: 'API Versioning' },
        { id: 'api-auth', title: 'Authentication with Sanctum' },
        { id: 'api-testing', title: 'Feature Testing with Pest' },
        { id: 'api-tdd', title: 'Test-Driven API Development' },
        { id: 'api-takeaways', title: 'Key Takeaways' },
      ],
      body: <ApiTestingArticle />,
    },
  };
  return map[articleId] ?? null;
};

const ArticleModal: React.FC<{ article: Article; onClose: () => void }> = ({ article, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <LazyImage
            src={article.image}
            alt={article.title}
            className="w-full h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-200"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} min read
                </div>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h3>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-none">
            {(() => {
              const doc = getArticleContent(article.id);
              if (!doc) return (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Full article content coming soon.
                </p>
              );
              return <><TableOfContents items={doc.toc} />{doc.body}</>;
            })()}
            
            {article.external && (
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-300 mb-3">
                  This article is published on {article.external.platform}. Click below to read the full article.
                </p>
                <a
                  href={article.external.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  Read on {article.external.platform}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategoryColor = (category: string) => {
  const colors = {
    'Architecture': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    'Data Engineering': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
    'Laravel': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    'Database': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
    'API Design': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
};

export default Blog;