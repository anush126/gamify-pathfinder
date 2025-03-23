
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Medal, Badge, Lightbulb, Zap } from 'lucide-react';

type BadgeType = 'completion' | 'excellence' | 'streak' | 'mastery' | 'genius' | 'speed' | 'first';

interface AchievementBadgeProps {
  type: BadgeType;
  title: string;
  description?: string;
  level?: number;
  unlocked?: boolean;
  className?: string;
  onClick?: () => void;
}

const badgeConfig = {
  completion: {
    icon: Trophy,
    color: 'bg-blue-500',
    lockedColor: 'bg-blue-200',
  },
  excellence: {
    icon: Star,
    color: 'bg-yellow-500',
    lockedColor: 'bg-yellow-200',
  },
  streak: {
    icon: Zap,
    color: 'bg-orange-500',
    lockedColor: 'bg-orange-200',
  },
  mastery: {
    icon: Award,
    color: 'bg-purple-500',
    lockedColor: 'bg-purple-200',
  },
  genius: {
    icon: Lightbulb,
    color: 'bg-green-500',
    lockedColor: 'bg-green-200',
  },
  speed: {
    icon: Medal,
    color: 'bg-red-500',
    lockedColor: 'bg-red-200',
  },
  first: {
    icon: Badge,
    color: 'bg-teal-500',
    lockedColor: 'bg-teal-200',
  },
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  title,
  description,
  level = 1,
  unlocked = false,
  className,
  onClick,
}) => {
  const { icon: Icon, color, lockedColor } = badgeConfig[type];
  
  return (
    <motion.div
      className={cn(
        'rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-all',
        unlocked ? 'glass-card' : 'bg-gray-100 opacity-75',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className={cn(
        'rounded-full w-12 h-12 flex items-center justify-center text-white',
        unlocked ? color : lockedColor
      )}>
        <Icon className={cn(
          'w-6 h-6',
          unlocked ? '' : 'opacity-50'
        )} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          {level > 1 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200">
              Lvl {level}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {!unlocked && (
        <div className="absolute inset-0 rounded-lg backdrop-blur-[1px] flex items-center justify-center bg-white/10">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;
