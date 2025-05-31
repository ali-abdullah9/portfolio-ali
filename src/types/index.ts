// src/types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'blockchain' | 'fullstack' | 'ml' | 'security';
  demoVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  color: string;
  icon?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'blockchain' | 'ml' | 'tools';
  icon?: string;
  projects?: string[]; // Project IDs
}

export interface Experience {
  id: string; // Unique ID for sorting
  title: string;
  company: string;
  duration: string; // e.g., "Sep 2022 - Sep 2026"
  type: 'education' | 'work' | 'certification';
  description: string[]; // Array of strings for detailed description
  technologies?: string[]; // Optional array of technologies used
}
