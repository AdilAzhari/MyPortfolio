import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave';
  type?: 'section' | 'projects' | 'testimonials' | 'blog' | 'contact' | 'footer';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  variant = 'rectangular',
  animation = 'pulse',
  type
}) => {
  // If type is provided, render section skeleton
  if (type) {
    return <SectionSkeleton type={type} />;
  }

  const baseClasses = `bg-gray-300 dark:bg-gray-700 ${animation === 'pulse' ? 'animate-pulse' : 'skeleton-wave'}`;
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-lg'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

export const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl p-8 space-y-6">
    <div className="grid lg:grid-cols-2 gap-8">
      <SkeletonLoader className="w-full h-64 lg:h-full" />
      <div className="space-y-6">
        <div className="space-y-3">
          <SkeletonLoader className="h-8 w-3/4" variant="text" />
          <SkeletonLoader className="h-4 w-1/2" variant="text" />
          <SkeletonLoader className="h-4 w-full" variant="text" />
        </div>
        <div className="space-y-4">
          <SkeletonLoader className="h-20 w-full" />
          <SkeletonLoader className="h-20 w-full" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <SkeletonLoader key={i} className="h-6 w-16" />
          ))}
        </div>
        <div className="flex gap-4 pt-6">
          <SkeletonLoader className="h-12 flex-1" />
          <SkeletonLoader className="h-12 w-12" />
          <SkeletonLoader className="h-12 w-12" />
        </div>
      </div>
    </div>
  </div>
);

export const SkillCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <SkeletonLoader className="h-6 w-24" variant="text" />
        <SkeletonLoader className="h-4 w-16" variant="text" />
      </div>
      <div className="text-right space-y-2">
        <SkeletonLoader className="h-8 w-12" variant="text" />
        <SkeletonLoader className="h-5 w-16" />
      </div>
    </div>
    <SkeletonLoader className="h-3 w-full" />
    <div className="grid grid-cols-2 gap-4">
      <SkeletonLoader className="h-16" />
      <SkeletonLoader className="h-16" />
    </div>
  </div>
);

export const ContactFormSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-900 p-8 lg:p-12 rounded-3xl shadow-2xl space-y-8">
    <SkeletonLoader className="h-8 w-64" variant="text" />
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <SkeletonLoader key={i} className="h-16" />
      ))}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonLoader className="h-12" />
      <SkeletonLoader className="h-12" />
    </div>
    
    <SkeletonLoader className="h-12" />
    <SkeletonLoader className="h-32" />
    <SkeletonLoader className="h-12" />
  </div>
);

const SectionSkeleton: React.FC<{ type: string }> = ({ type }) => {
  const renderSectionSkeleton = () => (
    <div className="py-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SkeletonLoader className="h-6 w-32 mx-auto mb-4" variant="text" />
          <SkeletonLoader className="h-12 w-96 mx-auto mb-6" variant="text" />
          <SkeletonLoader className="h-6 w-2/3 mx-auto" variant="text" />
        </div>
        <div className="space-y-8">
          {[...Array(4)].map((_, index) => (
            <SkeletonLoader key={index} className="h-20 w-full" />
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectsSkeleton = () => (
    <div className="py-20 bg-white dark:bg-gray-900 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SkeletonLoader className="h-6 w-32 mx-auto mb-4" variant="text" />
          <SkeletonLoader className="h-12 w-96 mx-auto mb-6" variant="text" />
          <SkeletonLoader className="h-6 w-2/3 mx-auto" variant="text" />
        </div>
        <div className="space-y-12">
          {[...Array(3)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderTestimonialsSkeleton = () => (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SkeletonLoader className="h-6 w-32 mx-auto mb-4" variant="text" />
          <SkeletonLoader className="h-12 w-96 mx-auto mb-6" variant="text" />
          <SkeletonLoader className="h-6 w-2/3 mx-auto" variant="text" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 p-8">
              <SkeletonLoader className="w-20 h-20 mb-6" variant="circular" />
              <div className="space-y-4">
                <SkeletonLoader className="h-6 w-3/4" variant="text" />
                <SkeletonLoader className="h-4 w-1/2" variant="text" />
                <SkeletonLoader className="h-4 w-2/3" variant="text" />
              </div>
            </div>
            <div className="lg:col-span-3 p-8">
              <div className="space-y-6">
                <SkeletonLoader className="h-8 w-full" variant="text" />
                <SkeletonLoader className="h-4 w-full" variant="text" />
                <SkeletonLoader className="h-4 w-5/6" variant="text" />
                <SkeletonLoader className="h-4 w-4/6" variant="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlogSkeleton = () => (
    <div className="py-20 bg-white dark:bg-gray-900 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SkeletonLoader className="h-6 w-32 mx-auto mb-4" variant="text" />
          <SkeletonLoader className="h-12 w-96 mx-auto mb-6" variant="text" />
          <SkeletonLoader className="h-6 w-2/3 mx-auto" variant="text" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <SkeletonLoader className="h-40 w-full" />
              <div className="p-6 space-y-4">
                <SkeletonLoader className="h-6 w-3/4" variant="text" />
                <SkeletonLoader className="h-4 w-full" variant="text" />
                <SkeletonLoader className="h-4 w-5/6" variant="text" />
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonLoader key={i} className="h-6 w-16" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContactSkeleton = () => (
    <div className="py-20 bg-gray-50 dark:bg-gray-800 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SkeletonLoader className="h-6 w-32 mx-auto mb-4" variant="text" />
          <SkeletonLoader className="h-12 w-96 mx-auto mb-6" variant="text" />
          <SkeletonLoader className="h-6 w-2/3 mx-auto" variant="text" />
        </div>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8">
              <SkeletonLoader className="h-6 w-1/2 mb-4" variant="text" />
              <SkeletonLoader className="h-4 w-3/4" variant="text" />
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-4">
                <SkeletonLoader className="h-6 w-1/3 mb-2" variant="text" />
                <SkeletonLoader className="h-4 w-2/3" variant="text" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <ContactFormSkeleton />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooterSkeleton = () => (
    <div className="bg-gray-900 dark:bg-black py-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-4">
              <SkeletonLoader className="h-6 w-1/2" variant="text" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <SkeletonLoader key={i} className="h-4 w-3/4" variant="text" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8">
          <SkeletonLoader className="h-4 w-1/3 mx-auto" variant="text" />
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'projects':
      return renderProjectsSkeleton();
    case 'testimonials':
      return renderTestimonialsSkeleton();
    case 'blog':
      return renderBlogSkeleton();
    case 'contact':
      return renderContactSkeleton();
    case 'footer':
      return renderFooterSkeleton();
    default:
      return renderSectionSkeleton();
  }
};

export default SkeletonLoader;