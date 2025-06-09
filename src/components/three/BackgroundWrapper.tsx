// src/components/three/BackgroundWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const GlobalBackground = dynamic(
  () => import('./GlobalBackground'),
  { 
    ssr: false,
    loading: () => <BackgroundFallback />
  }
);

// Fallback background that matches the 3D background style
function BackgroundFallback() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Static gradient background as fallback */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/10 via-transparent to-transparent blur-3xl" />
      </div>
    </div>
  );
}

export default function BackgroundWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the fallback first, then replace with 3D when ready
  return (
    <>
      {!mounted && <BackgroundFallback />}
      {mounted && <GlobalBackground />}
    </>
  );
}