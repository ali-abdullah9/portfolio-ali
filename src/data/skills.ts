// src/data/skills.ts
import { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', level: 96, category: 'frontend', projects: ['votememaybe', 'nustac-admin,1','1','2','3','4','5','6','7'] },
  { name: 'Next.js', level: 96, category: 'frontend', projects: ['votememaybe', 'nustac-admin','1','2','3','4','5'] },
  { name: 'TypeScript', level: 92, category: 'frontend', projects: ['votememaybe', 'nustac-admin'] },
  { name: 'Tailwind CSS', level: 93, category: 'frontend', projects: ['votememaybe', 'nustac-admin','1','2','3','4','5'] },
  { name: 'Three.js', level: 60, category: 'frontend', projects: ['votememaybe','1','2','3','4'] },
  { name: 'Framer Motion', level: 70, category: 'frontend', projects: ['votememaybe','1','2','3','4'] },
  { name: 'shadcn/ui', level: 80, category: 'frontend', projects: ['nustac-admin','1','2','3','4','5'] },
  
  // Backend
  { name: 'Node.js', level: 82, category: 'backend', projects: ['votememaybe', 'nustac-admin','1','2','3'] },
  { name: 'Express.js', level: 75, category: 'backend', projects: ['votememaybe', 'nustac-admin','1','2'] },
  { name: 'MongoDB', level: 70, category: 'backend', projects: ['votememaybe', 'nustac-admin','1','2'] },
  { name: 'Convex', level: 92, category: 'backend', projects: ['votememaybe', 'nustac-admin','1','2','3','4'] },
  
  // Blockchain
  { name: 'Ethereum', level: 60, category: 'blockchain', projects: ['votememaybe'] },
  { name: 'Solidity', level: 50, category: 'blockchain', projects: ['votememaybe'] },
  { name: 'Web3.js', level: 60, category: 'blockchain', projects: ['votememaybe'] },
  
  // ML
  { name: 'PyTorch', level: 84, category: 'ml', projects: ['fake-news-detector', 'plant-disease-classification','1','2','3','4','5'] },
  { name: 'TensorFlow', level: 80, category: 'ml', projects: ['fake-news-detector', 'plant-disease-classification','1','2','3','4','5'] },
  { name: 'BERT', level: 60, category: 'ml', projects: ['fake-news-detector', 'plant-disease-classification','1','2','3'] },
  { name: 'ResNet50', level: 73, category: 'ml', projects: ['fake-news-detector', 'plant-disease-classification','1','2','3'] },
  { name: 'Keras', level: 75, category: 'ml', projects: ['fake-news-detector', 'plant-disease-classification','1','2','3'] },
  // Tools
  { name: 'Git', level: 92, category: 'tools',projects: ['votememaybe', 'nustac-admin', 'fake-news-detector', 'plant-disease-classification','1','2','3','5','6','7'] },
  { name: 'VS Code', level: 94, category: 'tools', projects: ['votememaybe', 'nustac-admin', 'fake-news-detector', 'plant-disease-classification','1','2','3','4','5','6','7','1','2','3'] },
  { name: 'Docker', level: 40, category: 'tools', projects: ['votememaybe', 'nustac-admin','1'] },
  { name: 'AWS', level: 50, category: 'tools', projects: ['votememaybe', 'nustac-admin','1'] },
];
