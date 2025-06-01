// src/components/sections/About/index.tsx
"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Code2,
  Rocket,
  GraduationCap,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";
import { skills } from "@/data/skills";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import the canvas component
const AboutCanvas = dynamic(() => import("./AboutCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

// Group skills by category for rotation
const skillsByCategory = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, typeof skills>);

// Category labels
const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  blockchain: "Blockchain",
  ml: "Machine Learning",
  tools: "Tools & DevOps",
};

// Flatten all skills for rotation
const allSkills = skills.sort((a, b) => b.level - a.level);

const stats = [
  { label: "Years of Experience", value: "2+", icon: Code2 },
  { label: "Projects Completed", value: "30+", icon: Rocket },
  { label: "Technologies Mastered", value: `${skills.length}+`, icon: Brain },
  { label: "Cups of Coffee", value: "∞", icon: Target },
];

function SkillRotator() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const categories = Object.keys(skillsByCategory);
  const [displayMode, setDisplayMode] = useState<"category" | "all">(
    "category"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayMode === "category") {
        setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
      }
    }, 4000); // Change category every 4 seconds

    return () => clearInterval(interval);
  }, [categories.length, displayMode]);

  const currentCategory = categories[currentCategoryIndex];
  const currentSkills =
    displayMode === "category"
      ? skillsByCategory[currentCategory]
      : allSkills.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-semibold text-white">Skills & Expertise</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setDisplayMode("category")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              displayMode === "category"
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                : "bg-white/10 text-gray-400 hover:bg-white/20"
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setDisplayMode("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              displayMode === "all"
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                : "bg-white/10 text-gray-400 hover:bg-white/20"
            }`}
          >
            Top Skills
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentCategory}-${displayMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {displayMode === "category" && (
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-lg font-medium text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                {categoryLabels[currentCategory as keyof typeof categoryLabels]}
              </h5>
              <div className="flex gap-1">
                {categories.map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => setCurrentCategoryIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentCategoryIndex
                        ? "bg-gradient-to-r from-cyan-400 to-purple-400 w-8"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {currentSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${currentCategory}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    {skill.name}
                    {skill.projects && skill.projects.length > 0 && (
                      <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ({skill.projects.length} projects)
                      </span>
                    )}
                  </span>
                  <span className="text-cyan-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Background - Same as Hero */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full bg-black" />}>
          <AboutCanvas />
        </Suspense>
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-tl from-purple-500/20 via-transparent to-transparent blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Hover Glow Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer crafting digital experiences at the
            intersection of creativity and technology
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Bio Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">
                    Ali Abdullah
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Computer Science student at NUST Islamabad with a passion for
                  building innovative web applications. I specialize in{" "}
                  <span className="text-cyan-400 font-semibold">Next.js</span>,
                  <span className="text-purple-400 font-semibold"> React</span>,
                  and modern web technologies.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  My journey in tech started with curiosity and evolved into a
                  deep love for creating digital solutions that make a
                  difference. From{" "}
                  <span className="text-cyan-400 font-semibold">
                    blockchain voting systems
                  </span>{" "}
                  to
                  <span className="text-purple-400 font-semibold">
                    {" "}
                    AI-powered applications
                  </span>
                  , I enjoy pushing the boundaries of what&#39;s possible.
                </p>
              </div>
            </div>

            {/* Animated Skills */}
            <SkillRotator />
          </motion.div>

          {/* Right Column - Stats & Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Profile Image Placeholder */}
            <div className="relative group mx-auto w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <Code2 className="w-24 h-24 text-white/50" />
                </div>
                <Image
                  src="/images/profile.jpg"
                  alt="Ali Abdullah"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <a
                href="/resume/Ali_Abdullah_CV.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-medium hover:scale-105 transition-transform"
              >
                Download Resume
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-light text-gray-300 italic">
            &quot;The best way to predict the future is to
            <span className="text-cyan-400 font-semibold"> create</span>{" "}
            it.&quot;
          </blockquote>
          <p className="text-gray-500 mt-4">- My Development Philosophy</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
