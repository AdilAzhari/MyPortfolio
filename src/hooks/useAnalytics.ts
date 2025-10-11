import { useEffect } from 'react';
import { trackEngagement, trackEvent, PerformanceMonitor } from '../utils/analytics';

// Hook for tracking section visibility
export const useSectionTracking = (sectionName: string, ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEngagement.sectionView(sectionName);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: '-10% 0px -10% 0px' // Only trigger when well within viewport
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [sectionName, ref]);
};

// Hook for tracking project interactions
export const useProjectTracking = () => {
  const trackProjectView = (projectName: string) => {
    trackEngagement.projectView(projectName);
  };

  const trackProjectDemo = (projectName: string) => {
    trackEvent('project_demo_click', 'projects', projectName);
  };

  const trackProjectRepo = (projectName: string) => {
    trackEvent('project_repo_click', 'projects', projectName);
  };

  return {
    trackProjectView,
    trackProjectDemo,
    trackProjectRepo
  };
};

// Hook for tracking contact form
export const useContactTracking = () => {
  const trackFormStart = () => {
    trackEngagement.contactFormStart();
  };

  const trackFormSubmit = () => {
    trackEngagement.contactFormSubmit();
  };

  const trackFormError = (error: string) => {
    trackEvent('contact_form_error', 'contact', error);
  };

  const trackFormFieldFocus = (fieldName: string) => {
    trackEvent('contact_form_field_focus', 'contact', fieldName);
  };

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackFormFieldFocus
  };
};

// Hook for tracking social media clicks
export const useSocialTracking = () => {
  const trackSocialClick = (platform: string, location: string) => {
    trackEvent('social_click', 'social', `${platform}_${location}`);
  };

  return { trackSocialClick };
};

// Hook for tracking blog interactions
export const useBlogTracking = () => {
  const trackBlogPostView = (postTitle: string) => {
    trackEngagement.blogPostView(postTitle);
  };

  const trackBlogPostRead = (postTitle: string, readingTime: number) => {
    trackEvent('blog_post_read', 'blog', postTitle, readingTime);
  };

  const trackBlogCategoryFilter = (category: string) => {
    trackEvent('blog_category_filter', 'blog', category);
  };

  const trackBlogSearch = (searchTerm: string) => {
    trackEvent('blog_search', 'blog', searchTerm);
  };

  return {
    trackBlogPostView,
    trackBlogPostRead,
    trackBlogCategoryFilter,
    trackBlogSearch
  };
};

// Hook for tracking certification interactions
export const useCertificationTracking = () => {
  const trackCertificationView = (certificationName: string) => {
    trackEngagement.certificationView(certificationName);
  };

  const trackCertificationVerify = (certificationName: string) => {
    trackEvent('certification_verify', 'certifications', certificationName);
  };

  const trackCertificationDownload = (certificationName: string) => {
    trackEvent('certification_download', 'certifications', certificationName);
  };

  return {
    trackCertificationView,
    trackCertificationVerify,
    trackCertificationDownload
  };
};

// Hook for tracking testimonial interactions
export const useTestimonialTracking = () => {
  const trackTestimonialView = (testimonialId: string) => {
    trackEngagement.testimonialView(testimonialId);
  };

  const trackTestimonialNavigation = (direction: 'next' | 'previous') => {
    trackEvent('testimonial_navigation', 'testimonials', direction);
  };

  const trackTestimonialAutoplay = (testimonialId: string) => {
    trackEvent('testimonial_autoplay', 'testimonials', testimonialId);
  };

  return {
    trackTestimonialView,
    trackTestimonialNavigation,
    trackTestimonialAutoplay
  };
};

// Hook for tracking performance metrics
export const usePerformanceTracking = () => {
  useEffect(() => {
    const performanceMonitor = PerformanceMonitor.getInstance();
    
    // Track component mount time
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const mountTime = endTime - startTime;
      performanceMonitor.trackCustomMetric('component_mount_time', mountTime);
    };
  }, []);
};

// Hook for tracking user engagement time
export const useEngagementTracking = (sectionName: string, ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startTime: number | null = null;
    let totalTime = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && startTime === null) {
            startTime = Date.now();
          } else if (!entry.isIntersecting && startTime !== null) {
            totalTime += Date.now() - startTime;
            startTime = null;
            
            // Track engagement time if user spent more than 3 seconds
            if (totalTime > 3000) {
              trackEvent('section_engagement_time', 'engagement', sectionName, Math.round(totalTime / 1000));
            }
          }
        });
      },
      { threshold: [0.1, 0.9] }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      
      // Track final engagement time on cleanup
      if (startTime !== null) {
        totalTime += Date.now() - startTime;
      }
      
      if (totalTime > 1000) { // Only track if more than 1 second
        trackEvent('section_final_engagement_time', 'engagement', sectionName, Math.round(totalTime / 1000));
      }
    };
  }, [sectionName, ref]);
};

// Hook for tracking external link clicks
export const useExternalLinkTracking = () => {
  const trackExternalLink = (url: string, linkText: string, location: string) => {
    trackEvent('external_link_click', 'navigation', `${location}: ${linkText}`, 1);
    trackEvent('external_link_destination', 'navigation', url);
  };

  return { trackExternalLink };
};

// Hook for tracking search interactions
export const useSearchTracking = () => {
  const trackSearch = (searchTerm: string, section: string, resultsCount: number) => {
    trackEvent('search_query', 'search', `${section}: ${searchTerm}`, resultsCount);
  };

  const trackSearchNoResults = (searchTerm: string, section: string) => {
    trackEvent('search_no_results', 'search', `${section}: ${searchTerm}`);
  };

  const trackFilterUsage = (filterType: string, filterValue: string, section: string) => {
    trackEvent('filter_usage', 'search', `${section}: ${filterType} = ${filterValue}`);
  };

  return {
    trackSearch,
    trackSearchNoResults,
    trackFilterUsage
  };
};