
import { useState, useEffect } from 'react';

interface ProgressStats {
  level: number;
  xp: number;
  streak: number;
  totalChallenges: number;
  completedChallenges: number;
  achievements: string[];
}

// This is a mock implementation - in a real app, we'd connect to Supabase
export const useProgress = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ProgressStats>({
    level: 1,
    xp: 0,
    streak: 0,
    totalChallenges: 10,
    completedChallenges: 0,
    achievements: [],
  });

  useEffect(() => {
    // Mock loading from a database
    const timer = setTimeout(() => {
      setStats({
        level: 2,
        xp: 150,
        streak: 3,
        totalChallenges: 10,
        completedChallenges: 3,
        achievements: ['first_login', 'first_challenge'],
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addXP = (amount: number) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      // Simple level calculation - every 100 XP is a new level
      const newLevel = Math.floor(newXP / 100) + 1;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const completeChallenge = (challengeId: string) => {
    setStats(prev => ({
      ...prev,
      completedChallenges: prev.completedChallenges + 1,
    }));
    
    // Add some XP for completing a challenge
    addXP(50);
  };

  const increaseStreak = () => {
    setStats(prev => ({
      ...prev,
      streak: prev.streak + 1,
    }));
    
    // Add some XP for maintaining a streak
    addXP(10);
  };

  const unlockAchievement = (achievementId: string) => {
    setStats(prev => {
      if (prev.achievements.includes(achievementId)) {
        return prev;
      }
      
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
    
    // Add some XP for unlocking an achievement
    addXP(25);
  };

  return {
    stats,
    loading,
    addXP,
    completeChallenge,
    increaseStreak,
    unlockAchievement,
    
    // Computed properties
    levelProgress: stats.xp % 100, // Progress within current level (0-99)
    percentComplete: Math.round((stats.completedChallenges / stats.totalChallenges) * 100),
  };
};
