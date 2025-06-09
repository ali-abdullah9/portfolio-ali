// src/components/sections/Projects/index.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Play,
  Pause,
  Code2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { projects } from '@/data/projects';
import dynamic from 'next/dynamic';
import SectionWrapper from '@/components/Shared/SectionWrapper';

// Dynamically import components
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPlaying(false);
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(45deg, ${project.color}40, transparent)` }}
      />
      
      {/* Card content */}
      <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {/* Video/Image Preview */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {project.demoVideo ? (
            <div className="relative w-full h-full">
              <ReactPlayer
                url={project.demoVideo}
                playing={isPlaying && isHovered}
                loop
                muted
                width="100%"
                height="100%"
                playsinline
              />
              {/* Play/Pause overlay */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.div>
              </motion.button>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl opacity-20">{project.icon}</div>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium"
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <Github size={16} />
                Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <SectionWrapper id="projects" gradient="purple">

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
            <Code2 className="w-8 h-8 text-cyan-400" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Exploring the boundaries of web development through innovative solutions
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setFilter(category);
                setCurrentPage(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {category === 'all' && ` (${projects.length})`}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-4"
          >
            <motion.button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentPage 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400 w-8' 
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* Featured Project Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-4">Interested in my work?</p>
          <motion.a
            href="https://github.com/ali-abdullah9"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full font-medium hover:bg-white/20 transition-colors"
          >
            <Github size={20} />
            View More on GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}