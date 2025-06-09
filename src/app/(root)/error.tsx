// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-black border-2 border-red-500 rounded-full p-4">
              <AlertCircle size={32} className="text-red-500" />
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-gray-400 mb-8">
          We encountered an unexpected error. Please try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-medium"
          >
            <RefreshCw size={18} />
            Try Again
          </motion.button>

          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            <Home size={18} />
            Go Home
          </motion.a>
        </div>
      </div>
    </div>
  );
}