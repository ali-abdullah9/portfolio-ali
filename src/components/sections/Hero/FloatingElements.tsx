// src/components/sections/Hero/FloatingElements.tsx
'use client';

import { motion } from 'framer-motion';

const floatingElements = [
  { id: 1, size: 300, left: '10%', top: '20%', delay: 0 },
  { id: 2, size: 200, right: '15%', top: '60%', delay: 2 },
  { id: 3, size: 150, left: '80%', bottom: '30%', delay: 4 },
  { id: 4, size: 250, left: '50%', top: '40%', delay: 1 },
];

export default function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          style={{
            width: element.size,
            height: element.size,
            left: element.left,
            right: element.right,
            top: element.top,
            bottom: element.bottom,
            background: `radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}