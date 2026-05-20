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