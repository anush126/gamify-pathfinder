
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
  bgColor?: string;
  progressColor?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 64,
  strokeWidth = 4,
  className,
  bgColor = '#e2e8f0',
  progressColor = 'hsl(var(--primary))',
  children,
}) => {
  const normalizedProgress = Math.max(0, Math.min(100, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedProgress / 100) * circumference;
  
  const center = size / 2;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute">
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          stroke={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={center}
          cy={center}
          style={{
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      <div className="z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;
