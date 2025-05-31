// src/components/sections/Hero/HeroContent.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code2, Palette } from 'lucide-react';

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
    href: 'https://github.com/ali-abdullah9',
    label: 'GitHub',
    color: '#ffffff',
    hoverColor: '#6e5494'
  },
  { 
    Icon: Linkedin, 
    href: 'https://www.linkedin.com/in/ali-abdullah9/',
    label: 'LinkedIn',
    color: '#ffffff',
    hoverColor: '#0077b5'
  },
  { 
    Icon: Mail, 
    href: 'mailto:aliabdullah656561@gmail.com',
    label: 'Email',
    color: '#ffffff',
    hoverColor: '#ea4335'
  },
];

// Text animation variants
const letterAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export default function HeroContent() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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
        {/* Animated Name */}
        <motion.div variants={fadeInUp} className="relative mb-6">
          <h1 className="font-space-grotesk font-bold leading-[0.9] tracking-tight">
            {/* First Name */}
            <span className="block text-[clamp(3rem,10vw,7rem)] relative">
              {firstName.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="inline-block bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [-5, 5, -5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            {/* Last Name */}
            <span className="block text-[clamp(3rem,10vw,7rem)] mt-[-0.1em] relative">
              {lastName.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="inline-block bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [5, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>
          
          {/* Floating particles around name */}
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 360]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="text-cyan-400" size={24} />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{ 
              y: [10, -10, 10],
              rotate: [360, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Code2 className="text-purple-400" size={24} />
          </motion.div>
        </motion.div>

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
            Building next-generation web experiences with{' '}
            <span className="text-cyan-400 font-semibold">cutting-edge tech</span> and{' '}
            <span className="text-purple-400 font-semibold">creative design</span>
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
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
              animate={{
                backgroundPosition: isButtonHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
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
            className="group relative rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              borderColor: "transparent",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundClip: "padding-box",
              background: "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))",
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ padding: "2px" }}
            />
            <span className="relative z-10">Get In Touch</span>
          </motion.a>
        </motion.div>

        {/* Animated Social Links */}
        <motion.div
          variants={fadeInUp}
          className="relative flex items-center justify-center gap-6"
        >
          {socialLinks.map(({ Icon, href, label, color, hoverColor }, index) => (
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
                  backgroundColor: hoveredLink === label ? `${hoverColor}30` : "transparent"
                }}
                transition={{ duration: 0.3 }}
              />
              
              <Icon 
                size={20} 
                className="relative z-10 transition-all duration-300"
                style={{ 
                  color: hoveredLink === label ? hoverColor : color,
                  filter: hoveredLink === label ? `drop-shadow(0 0 10px ${hoverColor})` : "none"
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
          ))}
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
            <ArrowDown size={20} className="group-hover:text-cyan-400 transition-colors" />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}