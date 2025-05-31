// src/data/journey.ts
import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'nust-education',
    title: 'Bachelor of Computer Science',
    company: 'NUST Islamabad',
    duration: 'Sep 2022 - Sep 2026',
    description: [
      'Pursuing comprehensive computer science education with focus on software engineering',
      'Active member of tech societies and hackathon participant',
      'Maintaining strong academic performance while building real-world projects',
    ],
    type: 'education',
  },
  {
    id: 'network-intern',
    title: 'Network Analyst Intern',
    company: 'Brainotech IT Solutions GmbH',
    duration: 'Jun 2024 - Aug 2024',
    description: [
      'Monitored network performance and troubleshot routing, switching, and firewall issues',
      'Configured and maintained network devices including routers and switches',
      'Gained hands-on experience with TCP/IP, LAN/WAN protocols, and Wireshark',
    ],
    technologies: ['Networking', 'TCP/IP', 'Wireshark', 'Firewall Configuration'],
    type: 'work',
  },
  {
    id: 'aws-cert',
    title: 'AWS Solutions Architecture Job Simulation',
    company: 'Forage',
    duration: 'May 2025',
    description: [
      'Designed scalable hosting architecture for cloud applications',
      'Gained practical experience with AWS services and best practices',
    ],
    type: 'certification',
  },
  {
    id: 'cisco-cert',
    title: 'Cisco Networking Basics',
    company: 'Cisco Networking Academy',
    duration: 'Dec 2024',
    description: [
      'Completed comprehensive networking fundamentals course',
      'Learned practical network troubleshooting and configuration',
    ],
    type: 'certification',
  },
];