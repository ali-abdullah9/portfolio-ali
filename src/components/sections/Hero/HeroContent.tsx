// src/components/sections/Hero/HeroContent.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Palette,
} from "lucide-react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const socialLinks = [
  {
    Icon: Github,
    href: "https://github.com/ali-abdullah9",
    label: "GitHub",
    color: "#ffffff",
    hoverColor: "#6e5494",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/ali-abdullah9/",
    label: "LinkedIn",
    color: "#ffffff",
    hoverColor: "#0077b5",
  },
  {
    Icon: Mail,
    href: "mailto:aliabdullah656561@gmail.com",
    label: "Email",
    color: "#ffffff",
    hoverColor: "#ea4335",
  },
];

export default function HeroContent() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP text animation
    const ctx = gsap.context(() => {
      // Create timeline
      const tl = gsap.timeline();

      // Animate first name letters
      tl.from(firstNameRef.current?.children ?? [], {
        y: 100,
        opacity: 0,
        rotationX: -90,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Animate last name letters
      tl.from(
        lastNameRef.current?.children ?? [],
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      // Add floating animation to the whole name
      tl.to(nameContainerRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  // Split text for animation
  const firstName = "Ali".split("");
  const lastName = "Abdullah".split("");

  return (
    <div className="relative z-10 flex h-full items-center justify-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="text-center max-w-7xl mx-auto"
      >
        {/* Animated Name with GSAP */}
        <div ref={nameContainerRef} className="relative mb-6">
          <h1 className="font-space-grotesk font-bold leading-[0.9] tracking-tight">
            {/* First Name */}
            <span
              ref={firstNameRef}
              className="block text-[clamp(3rem,10vw,7rem)] relative"
            >
              {firstName.map((letter, index) => (
                <span
                  key={index}
                  className="inline-block relative"
                  style={{ perspective: "1000px" }}
                >
                  <span className="inline-block text-white relative">
                    {letter}
                    {/* Glow effect behind text */}
                    <span
                      className="absolute inset-0 blur-xl opacity-70 bg-gradient-to-r from-cyan-400 to-blue-400"
                      style={{
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        zIndex: -1,
                      }}
                    >
                      {letter}
                    </span>
                    {/* Additional glow layer */}
                    <span
                      className="absolute inset-0 blur-2xl opacity-50 text-cyan-400"
                      style={{ zIndex: -2 }}
                    >
                      {letter}
                    </span>
                  </span>
                </span>
              ))}
            </span>

            {/* Last Name */}
            <span
              ref={lastNameRef}
              className="block text-[clamp(3rem,10vw,7rem)] mt-[-0.1em] relative"
            >
              {lastName.map((letter, index) => (
                <span
                  key={index}
                  className="inline-block relative"
                  style={{ perspective: "1000px" }}
                >
                  <span className="inline-block text-white relative">
                    {letter}
                    {/* Glow effect behind text */}
                    <span
                      className="absolute inset-0 blur-xl opacity-70 bg-gradient-to-r from-purple-400 to-pink-400"
                      style={{
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        zIndex: -1,
                      }}
                    >
                      {letter}
                    </span>
                    {/* Additional glow layer */}
                    <span
                      className="absolute inset-0 blur-2xl opacity-50 text-purple-400"
                      style={{ zIndex: -2 }}
                    >
                      {letter}
                    </span>
                  </span>
                </span>
              ))}
            </span>
          </h1>

          {/* Floating particles around name */}
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="text-cyan-400" size={24} />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{
              y: [10, -10, 10],
              rotate: [360, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Code2 className="text-purple-400" size={24} />
          </motion.div>
        </div>

        {/* Enhanced Bio */}
        <motion.div variants={fadeInUp} className="mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Palette className="text-purple-400" size={16} />
            </motion.div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
              Creative Developer • Problem Solver • Tech Enthusiast
            </p>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Code2 className="text-cyan-400" size={16} />
            </motion.div>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
            Building next-generation web experiences with{" "}
            <span className="text-cyan-400 font-semibold">
              cutting-edge tech
            </span>{" "}
            and{" "}
            <span className="text-purple-400 font-semibold">
              creative design
            </span>
          </p>
        </motion.div>

        {/* Colorful CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            className="group relative rounded-full overflow-hidden px-8 py-3.5 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsButtonHovered(true)}
            onHoverEnd={() => setIsButtonHovered(false)}
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
              animate={{
                backgroundPosition: isButtonHovered
                  ? ["0% 50%", "100% 50%", "0% 50%"]
                  : "0% 50%",
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />
            <span className="relative z-10 flex items-center gap-2 text-white">
              Explore My Work
              <motion.span
                animate={{ x: isButtonHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block rounded-full focus:outline-none"
          >
            {/* Gradient ring */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-[2px]"
            >
              {/* Fills the gradient ring so the middle stays black */}
              <span className="block h-full w-full rounded-full bg-black" />
            </span>

            {/* Real button surface + padding */}
            <span className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-medium text-white">
              Get&nbsp;In&nbsp;Touch
            </span>
          </motion.a>
        </motion.div>

        {/* Animated Social Links */}
        <motion.div
          variants={fadeInUp}
          className="relative flex items-center justify-center gap-6"
        >
          {socialLinks.map(
            ({ Icon, href, label, color, hoverColor }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredLink(label)}
                onMouseLeave={() => setHoveredLink(null)}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {/* Colored background on hover */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: hoveredLink === label ? 1 : 0,
                    backgroundColor:
                      hoveredLink === label ? `${hoverColor}30` : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                />

                <Icon
                  size={20}
                  className="relative z-10 transition-all duration-300"
                  style={{
                    color: hoveredLink === label ? hoverColor : color,
                    filter:
                      hoveredLink === label
                        ? `drop-shadow(0 0 10px ${hoverColor})`
                        : "none",
                  }}
                />

                {/* Pulse effect */}
                {hoveredLink === label && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    style={{ backgroundColor: hoverColor }}
                  />
                )}
              </motion.a>
            )
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInUp}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
              Scroll
            </span>
            <ArrowDown
              size={20}
              className="group-hover:text-cyan-400 transition-colors"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
