import React, { useState, useEffect, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CodeRain from './components/CodeRain';
import Loading from './components/Loading';
import SkeletonLoader from './components/SkeletonLoader';
import { initAnalytics } from './utils/analytics';
import { initPWA } from './utils/pwa';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for code splitting
const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Blog = React.lazy(() => import('./components/Blog'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Initialize PWA
    initPWA();

    // Fast loading process - minimal delay for better UX
    const simulateLoading = async () => {
      const stages = [
        { progress: 30, delay: 100 },
        { progress: 60, delay: 100 },
        { progress: 100, delay: 100 }
      ];

      for (const stage of stages) {
        await new Promise(resolve => setTimeout(resolve, stage.delay));
        setLoadingProgress(stage.progress);
      }

      // Minimal delay before showing content
      await new Promise(resolve => setTimeout(resolve, 150));
      setIsLoading(false);
    };

    simulateLoading();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Loading isVisible={isLoading} progress={loadingProgress} />
        
        <div 
          className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-black dark:via-slate-900 dark:to-blue-900 transition-all duration-700 relative overflow-hidden quantum-app-container ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          role="main"
          aria-label="Adil Omer's Portfolio Website"
        >
          {/* Quantum Reality Background */}
          <div className="fixed inset-0 z-0" role="presentation" aria-hidden="true">
            <CodeRain />
            {/* Additional Quantum Particles */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '0s'}} aria-hidden="true"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '2s'}} aria-hidden="true"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '4s'}} aria-hidden="true"></div>
              <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '6s'}} aria-hidden="true"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '8s'}} aria-hidden="true"></div>
            </div>
          </div>
          
          <Header />
          
          <main 
            id="main-content"
            className="relative z-10 quantum-main-content"
            role="main"
            aria-label="Portfolio Content"
          >
            <section aria-labelledby="hero-section">
              <Hero />
            </section>
            
            <section aria-labelledby="about-section">
              <Suspense fallback={<SkeletonLoader type="section" />}>
                <About />
              </Suspense>
            </section>
            
            <section aria-labelledby="projects-section">
              <Suspense fallback={<SkeletonLoader type="projects" />}>
                <Projects />
              </Suspense>
            </section>
            
            <section aria-labelledby="testimonials-section">
              <Suspense fallback={<SkeletonLoader type="testimonials" />}>
                <Testimonials />
              </Suspense>
            </section>
            
            <section aria-labelledby="blog-section">
              <Suspense fallback={<SkeletonLoader type="blog" />}>
                <Blog />
              </Suspense>
            </section>
            
            <section aria-labelledby="certifications-section">
              <Suspense fallback={<SkeletonLoader type="section" />}>
                <Certifications />
              </Suspense>
            </section>
            
            <section aria-labelledby="skills-section">
              <Suspense fallback={<SkeletonLoader type="section" />}>
                <Skills />
              </Suspense>
            </section>
            
            <section aria-labelledby="contact-section">
              <Suspense fallback={<SkeletonLoader type="contact" />}>
                <Contact />
              </Suspense>
            </section>
          </main>
          
          <footer role="contentinfo" aria-label="Website Footer">
            <Suspense fallback={<SkeletonLoader type="footer" />}>
              <Footer />
            </Suspense>
          </footer>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;