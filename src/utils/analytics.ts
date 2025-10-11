// Analytics and Performance Monitoring

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics Configuration
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 tracking ID

// Initialize Google Analytics
export const initGA = () => {
  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      'custom_parameter': 'developer_portfolio'
    }
  });
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track user engagement events
export const trackEngagement = {
  // Track when user scrolls to different sections
  sectionView: (sectionName: string) => {
    trackEvent('section_view', 'engagement', sectionName);
  },
  
  // Track project interactions
  projectView: (projectName: string) => {
    trackEvent('project_view', 'projects', projectName);
  },
  
  // Track contact form interactions
  contactFormStart: () => {
    trackEvent('contact_form_start', 'contact');
  },
  
  contactFormSubmit: () => {
    trackEvent('contact_form_submit', 'contact');
  },
  
  // Track social link clicks
  socialClick: (platform: string) => {
    trackEvent('social_click', 'social', platform);
  },
  
  // Track resume/CV download
  resumeDownload: () => {
    trackEvent('resume_download', 'engagement');
  },
  
  // Track external link clicks
  externalLinkClick: (url: string, linkText: string) => {
    trackEvent('external_link_click', 'navigation', `${linkText} - ${url}`);
  },
  
  // Track testimonial interactions
  testimonialView: (testimonialId: string) => {
    trackEvent('testimonial_view', 'testimonials', testimonialId);
  },
  
  // Track blog post interactions
  blogPostView: (postTitle: string) => {
    trackEvent('blog_post_view', 'blog', postTitle);
  },
  
  // Track certification views
  certificationView: (certificationName: string) => {
    trackEvent('certification_view', 'certifications', certificationName);
  }
};

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: { [key: string]: number } = {};
  
  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  // Track Core Web Vitals
  public trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    this.trackLCP();
    
    // First Input Delay (FID)
    this.trackFID();
    
    // Cumulative Layout Shift (CLS)
    this.trackCLS();
    
    // First Contentful Paint (FCP)
    this.trackFCP();
  }
  
  private trackLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        const lcp = lastEntry.startTime;
        this.metrics.lcp = lcp;
        
        trackEvent('core_web_vital', 'performance', 'LCP', Math.round(lcp));
        
        observer.disconnect();
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
  
  private trackFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          this.metrics.fid = fid;
          
          trackEvent('core_web_vital', 'performance', 'FID', Math.round(fid));
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }
  
  private trackCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.cls = clsValue;
        trackEvent('core_web_vital', 'performance', 'CLS', Math.round(clsValue * 1000));
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  private trackFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            this.metrics.fcp = fcp;
            
            trackEvent('core_web_vital', 'performance', 'FCP', Math.round(fcp));
          }
        });
        
        observer.disconnect();
      });
      
      observer.observe({ entryTypes: ['paint'] });
    }
  }
  
  // Track custom performance metrics
  public trackCustomMetric(name: string, value: number) {
    this.metrics[name] = value;
    trackEvent('custom_metric', 'performance', name, Math.round(value));
  }
  
  // Track page load time
  public trackPageLoadTime() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          
          this.trackCustomMetric('page_load_time', pageLoadTime);
          this.trackCustomMetric('dom_content_loaded', domContentLoaded);
        }
      }, 0);
    });
  }
  
  // Track route changes (for SPA)
  public trackRouteChange(fromPath: string, toPath: string) {
    const startTime = performance.now();
    
    // Track the route change
    trackEvent('route_change', 'navigation', `${fromPath} -> ${toPath}`);
    
    // Track route change duration
    setTimeout(() => {
      const duration = performance.now() - startTime;
      this.trackCustomMetric('route_change_duration', duration);
    }, 100);
  }
  
  // Get all tracked metrics
  public getMetrics() {
    return { ...this.metrics };
  }
}

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  trackEvent('javascript_error', 'errors', error.message);
  
  // Log to console for debugging
  console.error('Tracked Error:', error, errorInfo);
  
  // You could also send to external error tracking service like Sentry
  // Sentry.captureException(error, { extra: errorInfo });
};

// User session tracking
export class SessionTracker {
  private sessionStartTime: number;
  private pageViews: number = 0;
  private lastActiveTime: number;
  
  constructor() {
    this.sessionStartTime = Date.now();
    this.lastActiveTime = Date.now();
    this.setupActivityTracking();
    this.setupBeforeUnloadTracking();
  }
  
  private setupActivityTracking() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, () => {
        this.lastActiveTime = Date.now();
      }, { passive: true });
    });
  }
  
  private setupBeforeUnloadTracking() {
    window.addEventListener('beforeunload', () => {
      this.trackSessionEnd();
    });
    
    // Also track session periodically
    setInterval(() => {
      this.trackSessionMetrics();
    }, 30000); // Every 30 seconds
  }
  
  public trackPageView() {
    this.pageViews++;
    trackEvent('page_view', 'session', window.location.pathname, this.pageViews);
  }
  
  private trackSessionMetrics() {
    const sessionDuration = Date.now() - this.sessionStartTime;
    const timeSinceLastActivity = Date.now() - this.lastActiveTime;
    
    // Only track if user has been active recently (within 5 minutes)
    if (timeSinceLastActivity < 5 * 60 * 1000) {
      trackEvent('session_active', 'session', 'duration', Math.round(sessionDuration / 1000));
    }
  }
  
  private trackSessionEnd() {
    const sessionDuration = Date.now() - this.sessionStartTime;
    
    trackEvent('session_end', 'session', 'total_duration', Math.round(sessionDuration / 1000));
    trackEvent('session_end', 'session', 'page_views', this.pageViews);
  }
}

// Scroll depth tracking
export class ScrollTracker {
  private maxScrollDepth: number = 0;
  private milestones: number[] = [25, 50, 75, 100];
  private trackedMilestones: Set<number> = new Set();
  
  constructor() {
    this.setupScrollTracking();
  }
  
  private setupScrollTracking() {
    let ticking = false;
    
    const trackScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercent;
      }
      
      // Track milestones
      this.milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !this.trackedMilestones.has(milestone)) {
          this.trackedMilestones.add(milestone);
          trackEvent('scroll_depth', 'engagement', `${milestone}%`, milestone);
        }
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(trackScroll);
        ticking = true;
      }
    }, { passive: true });
  }
  
  public getMaxScrollDepth(): number {
    return this.maxScrollDepth;
  }
}

// Initialize all tracking
export const initAnalytics = () => {
  // Initialize Google Analytics
  initGA();
  
  // Initialize performance monitoring
  const performanceMonitor = PerformanceMonitor.getInstance();
  performanceMonitor.trackCoreWebVitals();
  performanceMonitor.trackPageLoadTime();
  
  // Initialize session tracking
  const sessionTracker = new SessionTracker();
  
  // Initialize scroll tracking
  const scrollTracker = new ScrollTracker();
  
  // Track initial page view
  sessionTracker.trackPageView();
  
  return {
    performanceMonitor,
    sessionTracker,
    scrollTracker
  };
};