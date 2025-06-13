import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CodeRain from './components/CodeRain';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        <CodeRain />
        <Header />
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;