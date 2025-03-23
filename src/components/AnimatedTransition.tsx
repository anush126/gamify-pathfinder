
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimationVariant = 'fade' | 'slide-up' | 'slide-down' | 'scale';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  duration?: number;
  delay?: number;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  'slide-down': {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  variant = 'fade',
  duration = 0.3,
  delay = 0,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn('w-full h-full', className)}
        key={variant}
        initial={variants[variant].initial}
        animate={variants[variant].animate}
        exit={variants[variant].exit}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
