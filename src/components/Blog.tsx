import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, ArrowRight, Tag, Eye, Heart, Share2, Filter, Search, ExternalLink } from 'lucide-react';
import LazyImage from './LazyImage';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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
      title: 'Building Scalable Microservices with Node.js and Kubernetes',
      slug: 'scalable-microservices-nodejs-kubernetes',
      excerpt: 'Learn how to architect and deploy production-ready microservices that can handle millions of requests with proper monitoring, logging, and auto-scaling.',
      content: 'Detailed guide on building microservices...',
      publishedAt: '2024-01-15',
      readingTime: 12,
      category: 'Architecture',
      tags: ['Node.js', 'Kubernetes', 'Microservices', 'DevOps'],
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&h=400',
      views: 3500,
      likes: 245,
      featured: true
    },
    {
      id: '2',
      title: 'Real-time Data Processing with Apache Kafka and Flink',
      slug: 'realtime-data-processing-kafka-flink',
      excerpt: 'Dive deep into stream processing architecture for handling high-volume data streams with low latency and fault tolerance.',
      content: 'Comprehensive guide on stream processing...',
      publishedAt: '2024-01-08',
      readingTime: 15,
      category: 'Data Engineering',
      tags: ['Apache Kafka', 'Apache Flink', 'Stream Processing', 'Big Data'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=400',
      views: 2800,
      likes: 189,
      featured: true
    },
    {
      id: '3',
      title: 'Advanced Laravel Service Pattern Implementation',
      slug: 'advanced-laravel-service-pattern',
      excerpt: 'Master clean architecture in Laravel using advanced service patterns, DTOs, and action classes for maintainable enterprise applications.',
      content: 'Laravel service pattern comprehensive guide...',
      publishedAt: '2024-01-20',
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
      content: 'Event-driven architecture in Laravel guide...',
      publishedAt: '2024-01-12',
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
      content: 'Laravel performance optimization comprehensive guide...',
      publishedAt: '2024-01-05',
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
      content: 'Multi-tenant Laravel SaaS implementation guide...',
      publishedAt: '2023-12-28',
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
      content: 'Laravel API testing comprehensive guide...',
      publishedAt: '2023-12-15',
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

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This is a preview of the article content. In a real implementation, you would load the full article content here.
              The article would include detailed explanations, code examples, diagrams, and practical insights about {article.title.toLowerCase()}.
            </p>
            
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