
// src/data/projects.ts
import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'votememaybe',
    title: 'VoteMeMaybe',
    description: 'Decentralized voting platform built on Ethereum',
    longDescription: 'A comprehensive blockchain-based voting application that enables transparent and tamper-proof decision making through Ethereum smart contracts. Features secure wallet integration, real-time updates, and beautiful analytics.',
    technologies: ['Next.js 14', 'TypeScript', 'Ethereum', 'Truffle', 'wagmi', 'ethers.js', 'Convex', 'Framer Motion'],
    category: 'blockchain',
    demoVideo: '/videos/votememaybe-demo.mp4',
    githubUrl: 'https://github.com/ali-abdullah9/vote-me-maybe',
    featured: true,
    color: '#00D9FF',
    icon: '🗳️',
  },
  {
    id: 'nustac-admin',
    title: 'NusTAC Admin Portal',
    description: 'Campus access management system for NUST',
    longDescription: 'A secure administrative dashboard for managing campus access control at NUST. Part of a three-component system including mobile and scanner applications. Features real-time monitoring, analytics, and comprehensive user management.',
    technologies: ['Next.js 14', 'Tailwind CSS', 'shadcn/ui', 'Convex', 'Recharts'],
    category: 'fullstack',
    demoVideo: '/videos/nustac-demo.mp4',
    githubUrl: 'https://github.com/ali-abdullah9/admin-portal',
    liveUrl: 'https://admin-portal-taupe.vercel.app/',
    featured: true,
    color: '#8B5CF6',
    icon: '🏛️',
  },
  {
    id: 'fake-news-detector',
    title: 'Fake News Detection System',
    description: 'AI-powered multimodal fake news detector',
    longDescription: 'A multimodal machine learning system that analyzes both text and images to detect potential fake news. Features attention-based visualization, interactive analysis interface, and explainable AI capabilities.',
    technologies: ['Python', 'PyTorch', 'BERT', 'ResNet50', 'TensorFlow', 'Jupyter'],
    category: 'ml',
    githubUrl: 'https://github.com/ali-abdullah9/fake-news-detection',
    featured: true,
    color: '#FF5757',
    icon: '🤖',
  },
];