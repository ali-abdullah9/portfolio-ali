// src/data/skills.ts
import { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', level: 96, category: 'frontend', projects: ['votememaybe', 'nustac-admin'] },
  { name: 'Next.js', level: 96, category: 'frontend', projects: ['votememaybe', 'nustac-admin'] },
  { name: 'TypeScript', level: 92, category: 'frontend', projects: ['votememaybe'] },
  { name: 'Tailwind CSS', level: 93, category: 'frontend', projects: ['votememaybe', 'nustac-admin'] },
  { name: 'Three.js', level: 60, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 82, category: 'backend' },
  { name: 'Express.js', level: 75, category: 'backend' },
  { name: 'MongoDB', level: 70, category: 'backend' },
  { name: 'Convex', level: 92, category: 'backend', projects: ['votememaybe', 'nustac-admin'] },
  
  // Blockchain
  { name: 'Ethereum', level: 60, category: 'blockchain', projects: ['votememaybe'] },
  { name: 'Solidity', level: 50, category: 'blockchain', projects: ['votememaybe'] },
  { name: 'Web3.js', level: 60, category: 'blockchain', projects: ['votememaybe'] },
  
  // ML
  { name: 'PyTorch', level: 84, category: 'ml', projects: ['fake-news-detector'] },
  { name: 'TensorFlow', level: 80, category: 'ml', projects: ['fake-news-detector'] },
  { name: 'BERT', level: 60, category: 'ml', projects: ['fake-news-detector'] },
  
  // Tools
  { name: 'Git', level: 92, category: 'tools' },
  { name: 'VS Code', level: 94, category: 'tools' },
  { name: 'Docker', level: 40, category: 'tools' },
  { name: 'AWS', level: 50, category: 'tools' },
];
