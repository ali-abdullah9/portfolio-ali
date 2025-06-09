// src/app/not-found.tsx - VERSION WITH ANIMATIONS
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { AnimatedTitle,AnimatedContent } from '@/components/Shared/NotFoundClient';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      {/* Static Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent blur-3xl opacity-50" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Text with Animation */}
        <AnimatedTitle>
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </AnimatedTitle>

        {/* Error Message */}
        <AnimatedContent delay={0.2}>
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Page Not Found</h2>
            <p className="text-gray-400 text-lg">
              Oops! The page you&#39;re looking for seems to have wandered off into the digital void.
            </p>
          </div>
        </AnimatedContent>

        {/* Action Buttons */}
        <AnimatedContent delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              href="/#projects"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <Search size={18} />
              View Projects
            </Link>
          </div>
        </AnimatedContent>

        {/* Fun Message */}
        <AnimatedContent delay={0.6}>
          <p className="mt-12 text-sm text-gray-500 opacity-50">
            Error Code: 404 | Lost in the Matrix
          </p>
        </AnimatedContent>
      </div>
    </div>
  );
}