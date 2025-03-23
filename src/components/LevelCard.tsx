
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, CheckCircle } from 'lucide-react';
import ProgressRing from './ProgressRing';

interface LevelCardProps {
  level: number;
  title: string;
  description: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
  className?: string;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  description,
  progress,
  isLocked,
  isCompleted,
  onClick,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        'rounded-xl overflow-hidden relative flex flex-col',
        isLocked ? 'bg-gray-100 cursor-not-allowed' : 'glass-card cursor-pointer',
        className
      )}
      whileHover={!isLocked ? { y: -5, transition: { duration: 0.2 } } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-primary/10 text-primary">
              Level {level}
            </span>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          
          {isLocked ? (
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          ) : isCompleted ? (
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          ) : (
            <ProgressRing progress={progress} size={48} strokeWidth={3}>
              <span className="text-sm font-semibold">{progress}%</span>
            </ProgressRing>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </div>
      
      <div className={cn(
        "h-3 w-full mt-auto",
        isLocked ? "bg-gray-200" : isCompleted ? "bg-green-500" : "bg-primary"
      )} style={
        !isCompleted && !isLocked ? { width: `${progress}%`, transition: "width 1s ease-in-out" } : {}
      }>
      </div>
      
      {isLocked && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex flex-col items-center justify-center">
          <Lock className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-500">Complete previous levels</p>
        </div>
      )}
    </motion.div>
  );
};

export default LevelCard;
