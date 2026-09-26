import React from 'react';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => (
  <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-12 md:px-12">
    <p className="font-mono text-sm font-semibold text-teal-300">404</p>
    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl">Page not found</h1>
    <p className="mt-4 text-lg leading-relaxed">That page doesn&apos;t exist, or it moved.</p>
    <a href="/" className="group mt-8 inline-flex items-center font-semibold text-teal-300">
      <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-2 motion-reduce:transition-none" />
      Back to the home page
    </a>
  </main>
);

export default NotFound;
