// src/app/(root)/page.tsx
"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { CodeTerminalLoading as LoadingScreen } from "@/components/Shared/LoadingScreen/LoadingScreenAlt";
import dynamic from "next/dynamic";

// Lazy load components
const Hero = lazy(() => import("@/components/sections/Hero"));
const Navigation = dynamic(() => import("@/components/Shared/Navigation"), {
  ssr: false,
});
const Cursor = dynamic(() => import("@/components/Shared/Cursor"), {
  ssr: false,
});

// Import all sections normally (not lazy) since they're navigation targets
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Shorter loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Enable smooth scroll after loading
    if (!isLoading) {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Cursor />
          <Navigation />

          <main className="relative">
            <Suspense fallback={null}>
              <Hero />
            </Suspense>
            
            {/* All sections are loaded immediately for navigation */}
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}