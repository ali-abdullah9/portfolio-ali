// src/app/page.tsx or src/app/(root)/page.tsx
"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/Shared/LoadingScreen";
import Cursor from "@/components/Shared/Cursor";
import Navigation from "@/components/Shared/Navigation";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

// Smooth scroll behavior
const smoothScroll = () => {
  document.documentElement.style.scrollBehavior = "smooth";
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    smoothScroll();

    // Simulate loading of assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <Cursor />
      <Navigation />

      <main className="relative bg-black">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
