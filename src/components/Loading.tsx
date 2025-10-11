import React from 'react';
import { Code2, Zap, Sparkles } from 'lucide-react';

interface LoadingProps {
  isVisible: boolean;
  progress?: number;
}

const Loading: React.FC<LoadingProps> = ({ isVisible, progress = 0 }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex items-center justify-center">
      {/* Animated background orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-32 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-pink-500/20 rounded-full blur-xl animate-pulse floating-orb" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Loading content */}
      <div className="text-center space-y-8 relative z-10">
        {/* Animated logo */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse quantum-glow"></div>
          <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50">
            <Code2 className="h-12 w-12 text-white animate-spin-slow" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">
              Loading Portfolio
            </h1>
            <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" style={{animationDelay: '0.5s'}} />
          </div>
          
          <p className="text-slate-300 text-sm font-medium">
            Initializing quantum development environment...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Loading assets...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
          ))}
        </div>

        {/* Quantum effects */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2 text-cyan-300 text-sm font-mono">
            <Zap className="h-4 w-4 animate-bounce" />
            <span className="animate-pulse">Compiling neural pathways...</span>
          </div>
        </div>
      </div>

      {/* Additional quantum grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="quantum-grid-pattern h-full w-full"></div>
      </div>
    </div>
  );
};

export default Loading;