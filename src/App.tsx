import React, { useEffect, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import SkeletonLoader from './components/SkeletonLoader';
import { initAnalytics } from './utils/analytics';
import { initPWA } from './utils/pwa';
import ErrorBoundary from './components/ErrorBoundary';

const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Blog = React.lazy(() => import('./components/Blog'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {
  useEffect(() => {
    initAnalytics();
    initPWA();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-[#080808] animate-fade-in" role="main" aria-label="Adil Omer's Portfolio Website">
          <Header />

          <main id="main-content" aria-label="Portfolio Content">
            <Hero />

            <Suspense fallback={<SkeletonLoader type="section" />}>
              <About />
            </Suspense>

            <Suspense fallback={<SkeletonLoader type="projects" />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<SkeletonLoader type="testimonials" />}>
              <Testimonials />
            </Suspense>

            <Suspense fallback={<SkeletonLoader type="blog" />}>
              <Blog />
            </Suspense>

            <Suspense fallback={<SkeletonLoader type="section" />}>
              <Certifications />
            </Suspense>

            <Suspense fallback={<SkeletonLoader type="section" />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<SkeletonLoader type="contact" />}>
              <Contact />
            </Suspense>
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
