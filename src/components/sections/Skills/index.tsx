// src/components/sections/Skills/index.tsx
'use client';

import { useRef, useState} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Blocks, 
  Brain, 
  Wrench,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { skills } from '@/data/skills';


// Category icons
const categoryIcons = {
  frontend: Code2,
  backend: Database,
  blockchain: Blocks,
  ml: Brain,
  tools: Wrench,
};

// Category colors
const categoryColors = {
  frontend: '#00d9ff',
  backend: '#8b5cf6',
  blockchain: '#f59e0b',
  ml: '#ef4444',
  tools: '#10b981',
};

// Category labels
const categoryLabels = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  blockchain: 'Blockchain & Web3',
  ml: 'Machine Learning',
  tools: 'Tools & DevOps'
};

// Group skills by category
const skillsByCategory = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, typeof skills>);

const SkillCard = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = categoryColors[skill.category as keyof typeof categoryColors];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl transition-opacity duration-300"
        style={{ 
          backgroundColor: color,
          opacity: isHovered ? 0.3 : 0 
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 h-full">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-white">{skill.name}</h4>
          <span className="text-sm font-medium" style={{ color }}>
            {skill.level}%
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
            className="h-full rounded-full relative"
            style={{ backgroundColor: color }}
          >
            <motion.div 
              className="absolute inset-0 bg-white/30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Projects using this skill */}
        {skill.projects && skill.projects.length > 0 && (
          <div className="text-xs text-gray-400">
            Used in {skill.projects.length} project{skill.projects.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CategorySection = ({ 
  category, 
  skills, 
  index 
}: { 
  category: string, 
  skills: typeof skillsByCategory[string], 
  index: number 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const Icon = categoryIcons[category as keyof typeof categoryIcons];
  const color = categoryColors[category as keyof typeof categoryColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-8"
    >
      {/* Category Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-6 group"
        whileHover={{ x: 5 }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-3 rounded-lg bg-gradient-to-r from-transparent to-transparent"
            style={{ 
              backgroundColor: `${color}20`,
              borderColor: `${color}40`,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <Icon size={24} style={{ color }} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-white">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h3>
            <p className="text-sm text-gray-400">{skills.length} skills</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={24} className="text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Skills Grid */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-20" // Removed bg-black
    >
      {/* Animated gradient background - reduced opacity */}
      <div className="absolute inset-0 opacity-30"> {/* Reduced from opacity-50 */}
        <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-bl from-cyan-500/20 via-transparent to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-tr from-purple-500/20 via-transparent to-transparent blur-3xl animate-pulse animation-delay-2000" />
      </div>

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
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern digital experiences
          </p>
        </motion.div>

        {/* Skills Display */}
        <div className="space-y-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
            <CategorySection
              key={category}
              category={category}
              skills={categorySkills}
              index={index}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6"
        >
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const color = categoryColors[category as keyof typeof categoryColors];
            const avgLevel = Math.round(
              categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length
            );

            return (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-30"
                  style={{ backgroundColor: color }}
                />
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                  <Icon size={24} className="mx-auto mb-2" style={{ color }} />
                  <div className="text-sm text-gray-400 capitalize">{category}</div>
                  <div className="text-2xl font-bold text-white">{avgLevel}%</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}