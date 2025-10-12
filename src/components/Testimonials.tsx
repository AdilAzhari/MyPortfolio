import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, Users, Briefcase, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import LazyImage from './LazyImage';
import { TouchGestureManager } from '../utils/pwa';
import { useTestimonialTracking } from '../hooks/useAnalytics';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  content: string;
  project: string;
  duration: string;
  skills: string[];
  companySize: string;
  industry: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const { trackTestimonialView, trackTestimonialNavigation, trackTestimonialAutoplay } = useTestimonialTracking();

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Ahmad Hassan',
      role: 'Operations Manager',
      company: 'Premium Car Rentals',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150',
      rating: 5,
      content: 'Adil is currently developing our vehicle rental system with impressive progress so far. The multi-language support architecture for Arabic and English, booking system design, and payment integration planning show exceptional technical expertise. Looking forward to the final implementation.',
      project: 'Vehicle Rental System (In Development)',
      duration: 'Ongoing project',
      skills: ['Laravel 12', 'Vue.js 3', 'Inertia.js', 'MySQL'],
      companySize: '20-60 employees',
      industry: 'Transportation'
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      role: 'Store Manager',
      company: 'Modern Retail Solutions',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&h=150',
      rating: 5,
      content: 'The POS and retail management system Adil built transformed our store operations completely. Real-time inventory tracking, customer loyalty features, and comprehensive reporting have significantly improved our efficiency. The Redis optimization handles our high-volume transactions perfectly.',
      project: 'POS & Retail Management System',
      duration: '8 months',
      skills: ['Laravel 11', 'Vue.js 3', 'Redis', 'MySQL'],
      companySize: '20-50 employees',
      industry: 'Retail'
    },
    {
      id: '3',
      name: 'Dr. Khalid Rahman',
      role: 'Blood Bank Director',
      company: 'Central Healthcare Hospital',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&h=150',
      rating: 5,
      content: 'Adil\'s BloodConnect platform has been transformational for our blood bank operations. The donor-patient matching system, automated notifications for critical requests, and comprehensive audit trails ensure regulatory compliance while saving lives efficiently.',
      project: 'BloodConnect Healthcare Platform',
      duration: '9 months',
      skills: ['Laravel 11', 'Spatie Permissions', 'AdminLTE', 'MySQL'],
      companySize: '500+ employees',
      industry: 'Healthcare'
    },
    {
      id: '4',
      name: 'Omar Abdullah',
      role: 'Real Estate Manager',
      company: 'Elite Properties Group',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150',
      rating: 5,
      content: 'Adil built a comprehensive real estate management platform that handles our property listings perfectly. The advanced search capabilities, offer management system, and comprehensive analytics have improved our client service significantly. Clean Laravel architecture and excellent performance.',
      project: 'Real Estate Management Platform',
      duration: '3 months',
      skills: ['Laravel 12', 'Vue.js 3', 'Inertia.js', 'MySQL'],
      companySize: '50-100 employees',
      industry: 'Real Estate'
    },
    {
      id: '5',
      name: 'Nadia Hassan',
      role: 'Head Librarian',
      company: 'Central City Library',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150',
      rating: 5,
      content: 'The library management system Adil developed completely modernized our operations. The intelligent search using Typesense, automated borrowing workflow, and comprehensive analytics dashboard have made managing our collection effortless. Exceptional Laravel development skills.',
      project: 'Enterprise Library Management System',
      duration: '6 months',
      skills: ['Laravel 12', 'Vue.js 3', 'Typesense', 'MySQL'],
      companySize: '100-200 employees',
      industry: 'Education'
    }
  ];

  const nextTestimonial = (isAutoplay = false) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);
    
    // Track navigation
    if (isAutoplay) {
      trackTestimonialAutoplay(testimonials[newIndex].id);
    } else {
      trackTestimonialNavigation('next');
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
    
    // Track navigation
    trackTestimonialNavigation('previous');
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Track testimonial view
    trackTestimonialView(testimonials[index].id);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial(true); // Mark as autoplay
    }, 8000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Set up touch gestures
  useEffect(() => {
    const element = testimonialRef.current;
    if (!element) return;

    const gestureManager = new TouchGestureManager(element);
    
    // Handle swipe gestures
    const handleSwipe = (event: CustomEvent) => {
      const { direction } = event.detail;
      
      if (direction === 'left') {
        nextTestimonial();
      } else if (direction === 'right') {
        prevTestimonial();
      }
    };

    element.addEventListener('swipe', handleSwipe as EventListener);

    return () => {
      element.removeEventListener('swipe', handleSwipe as EventListener);
      gestureManager.destroy();
    };
  }, [currentIndex, isAnimating]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 relative overflow-hidden"
      role="region"
      aria-labelledby="testimonials-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            Client Testimonials
          </div>
          <h2 
            id="testimonials-heading"
            className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
          >
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real feedback from engineering leaders and founders who've worked with me on transformative projects
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <div 
            ref={testimonialRef}
            className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            role="region"
            aria-live="polite"
            aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length} from ${currentTestimonial.name}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Client Info Panel */}
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 p-8 lg:p-12 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>

                  <div className="relative">
                    {/* Client Avatar Placeholder */}
                    <div className="mb-6">
                      <div className="w-20 h-20 rounded-full border-4 border-white/20 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>

                    {/* Client Details */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{currentTestimonial.name}</h3>
                      <p className="text-blue-100 font-medium mb-1">{currentTestimonial.role}</p>
                      <p className="text-blue-200 text-sm mb-4">{currentTestimonial.company}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex gap-1">
                          {renderStars(currentTestimonial.rating)}
                        </div>
                        <span className="text-sm text-blue-200">({currentTestimonial.rating}.0/5.0)</span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="space-y-4">
                      <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-blue-200" />
                          <span className="text-sm font-medium text-blue-200">Project</span>
                        </div>
                        <p className="text-white font-medium">{currentTestimonial.project}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                          <p className="text-xs text-blue-200 mb-1">Duration</p>
                          <p className="text-white font-medium text-sm">{currentTestimonial.duration}</p>
                        </div>
                        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                          <p className="text-xs text-blue-200 mb-1">Company Size</p>
                          <p className="text-white font-medium text-sm">{currentTestimonial.companySize}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                        <p className="text-xs text-blue-200 mb-2">Industry</p>
                        <p className="text-white font-medium text-sm">{currentTestimonial.industry}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 opacity-60" />
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                        "{currentTestimonial.content}"
                      </blockquote>

                      {/* Skills Used */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentTestimonial.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentIndex
                                ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={prevTestimonial}
                          disabled={isAnimating}
                          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 disabled:opacity-50"
                        >
                          <ArrowLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={nextTestimonial}
                          disabled={isAnimating}
                          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 disabled:opacity-50"
                        >
                          <ArrowRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '8+', label: 'Projects Delivered', icon: CheckCircle },
            { number: '100%', label: 'Client Satisfaction', icon: Star },
            { number: '24hr', label: 'Average Response', icon: Users },
            { number: '5.0', label: 'Average Rating', icon: Quote }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;