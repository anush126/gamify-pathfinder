
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, Trophy, Zap, Calendar, Clock, ArrowUpRight, Award } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import ProgressRing from '@/components/ProgressRing';
import AchievementBadge from '@/components/AchievementBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/hooks/useProgress';

const DashboardCard = ({ children, className }) => (
  <Card className={cn("h-full overflow-hidden", className)}>
    {children}
  </Card>
);

const Dashboard = () => {
  const { stats, loading, levelProgress, percentComplete } = useProgress();
  
  // We'll use mock data for now
  const recentTracks = [
    { id: 1, name: 'Introduction to React', progress: 80, type: 'web' },
    { id: 2, name: 'JavaScript Basics', progress: 100, type: 'web' },
    { id: 3, name: 'CSS Layouts', progress: 40, type: 'web' },
  ];
  
  const achievements = [
    { id: 1, type: 'completion', title: 'First Steps', description: 'Complete your first course', unlocked: true },
    { id: 2, type: 'streak', title: 'Consistency', description: 'Maintain a 3-day streak', unlocked: true },
    { id: 3, type: 'excellence', title: 'Perfect Score', description: 'Ace a challenge with 100%', unlocked: false },
    { id: 4, type: 'mastery', title: 'CSS Master', description: 'Complete all CSS challenges', unlocked: false },
  ];

  const activityData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2 },
    { day: 'Wed', hours: 0.5 },
    { day: 'Thu', hours: 1 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 1 },
  ];

  // Create activity bars
  const maxHours = Math.max(...activityData.map(d => d.hours));
  
  return (
    <AnimatedTransition variant="fade">
      <div className="min-h-screen bg-gray-50">
        <Navbar userProgress={{ level: stats.level, xp: stats.xp, levelProgress }} />
        
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Track your learning journey</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <Link to="/tech-selection" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white border border-border hover:bg-gray-50 transition-colors">
                  Choose Tech <BookOpen className="w-4 h-4" />
                </Link>
                <Link to="/learning-path" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white bg-primary hover:bg-primary/90 transition-colors">
                  Continue Learning <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="glass-card rounded-xl p-6 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressRing progress={levelProgress} size={64} progressColor="hsl(var(--primary))">
                  <span className="text-lg font-bold">{stats.level}</span>
                </ProgressRing>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Current Level</h3>
                  <p className="text-muted-foreground">
                    {stats.xp} XP total • {100 - levelProgress} XP to next level
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="glass-card rounded-xl p-6 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Current Streak</h3>
                  <p className="text-muted-foreground">
                    {stats.streak} days • Keep it up!
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="glass-card rounded-xl p-6 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Achievements</h3>
                  <p className="text-muted-foreground">
                    {stats.achievements.length} unlocked • {achievements.length - stats.achievements.length} locked
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <DashboardCard className="">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Continue Learning</span>
                      <Link to="/learning-path" className="text-sm font-normal text-primary hover:underline flex items-center">
                        View all <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      Pick up where you left off
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTracks.map((track) => (
                        <motion.div 
                          key={track.id}
                          className="glass-card rounded-lg p-4 cursor-pointer"
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className={cn(
                                'w-10 h-10 rounded-md flex items-center justify-center text-white',
                                track.type === 'web' ? 'bg-tech-web' : 
                                track.type === 'mobile' ? 'bg-tech-mobile' : 'bg-tech-backend'
                              )}>
                                <BookOpen className="w-5 h-5" />
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium">{track.name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {track.progress === 100 ? 'Completed' : `${track.progress}% complete`}
                                </p>
                              </div>
                            </div>
                            <div>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                track.progress === 100 ? "bg-green-500" : "bg-primary"
                              )}
                              style={{ width: `${track.progress}%` }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </DashboardCard>
                
                <DashboardCard className="">
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>
                      Your learning hours for the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between h-32">
                      {activityData.map((data, i) => (
                        <div key={data.day} className="flex flex-col items-center">
                          <motion.div 
                            className={cn(
                              "w-10 rounded-t-md",
                              data.hours > 0 ? "bg-primary" : "bg-gray-100"
                            )}
                            style={{ 
                              height: data.hours > 0 ? `${(data.hours / maxHours) * 100}%` : '10%'
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: data.hours > 0 ? `${(data.hours / maxHours) * 100}%` : '10%' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          ></motion.div>
                          <span className="text-xs mt-2 text-muted-foreground">{data.day}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </DashboardCard>
              </div>
              
              <div className="space-y-6">
                <DashboardCard className="">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Achievements</span>
                      <Link to="/" className="text-sm font-normal text-primary hover:underline flex items-center">
                        View all <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      Your learning milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {achievements.map((achievement) => (
                        <AchievementBadge 
                          key={achievement.id}
                          type={achievement.type as any}
                          title={achievement.title}
                          description={achievement.description}
                          unlocked={achievement.unlocked}
                        />
                      ))}
                    </div>
                  </CardContent>
                </DashboardCard>
                
                <DashboardCard className="">
                  <CardHeader>
                    <CardTitle>Daily Reminder</CardTitle>
                    <CardDescription>
                      Set up your schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="glass-card rounded-lg p-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Daily Study Time</h4>
                        <p className="text-sm text-muted-foreground">7:00 PM - 8:00 PM</p>
                      </div>
                      <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </DashboardCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

import { cn } from '@/lib/utils';

export default Dashboard;
