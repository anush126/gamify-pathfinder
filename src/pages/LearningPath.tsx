import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Lock, Star, Award, Zap, Lightbulb, HelpCircle, Puzzle, Brush, Terminal } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import LevelCard from '@/components/LevelCard';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const LearningPath = () => {
  const { stats, levelProgress, completeChallenge, addXP } = useProgress();
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const levels = [
    {
      level: 1,
      title: 'Introduction to HTML',
      description: 'Learn the basics of HTML, the backbone of the web. Understand tags, elements, and document structure.',
      progress: 100,
      isLocked: false,
      isCompleted: true,
      gameType: 'html',
      icon: <Puzzle className="w-5 h-5 text-orange-500" />,
      gameName: 'Build the Blueprint',
    },
    {
      level: 2,
      title: 'CSS Fundamentals',
      description: 'Master CSS to style your web pages. Learn selectors, properties, and the box model.',
      progress: 70,
      isLocked: false,
      isCompleted: false,
      gameType: 'css',
      icon: <Brush className="w-5 h-5 text-blue-500" />,
      gameName: 'Style the Scene',
    },
    {
      level: 3,
      title: 'JavaScript Basics',
      description: 'Get started with JavaScript, the language that powers web interactivity. Learn variables, functions, and control flow.',
      progress: 0,
      isLocked: false,
      isCompleted: false,
      gameType: 'javascript',
      icon: <Terminal className="w-5 h-5 text-yellow-500" />,
      gameName: 'Code Commanders',
    },
    {
      level: 4,
      title: 'DOM Manipulation',
      description: 'Learn to interact with HTML using JavaScript. Manipulate the Document Object Model to create dynamic websites.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
    {
      level: 5,
      title: 'Building Interactive Forms',
      description: 'Create and validate web forms. Handle user input and provide feedback with JavaScript.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
    {
      level: 6,
      title: 'Introduction to APIs',
      description: 'Learn to communicate with external services. Make HTTP requests and handle responses.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
    {
      level: 7,
      title: 'Responsive Web Design',
      description: 'Build websites that work on any device. Use media queries and flexible layouts.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
    {
      level: 8,
      title: 'JavaScript ES6+ Features',
      description: 'Learn modern JavaScript syntax and features. Use arrow functions, destructuring, and more.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
    {
      level: 9,
      title: 'Introduction to React',
      description: 'Get started with React, a popular JavaScript library for building user interfaces.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
    {
      level: 10,
      title: 'Building a Complete Web App',
      description: 'Apply everything you\'ve learned to build a complete web application from scratch.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
  ];

  const handleLevelClick = (level: number) => {
    const selectedLevel = levels[level - 1];
    
    if (level <= 3 && !selectedLevel.isLocked) {
      navigateToGame(selectedLevel.gameType);
      return;
    }
    
    setActiveLevel(level);
    setDialogOpen(true);
  };
  
  const navigateToGame = (gameType: string) => {
    switch (gameType) {
      case 'html':
        navigate('/games/html-blueprint');
        break;
      case 'css':
        navigate('/games/css-styler');
        break;
      case 'javascript':
        navigate('/games/js-commander');
        break;
      default:
        setDialogOpen(true);
    }
  };
  
  const handleCompleteChallenge = () => {
    if (activeLevel !== null) {
      completeChallenge(`level-${activeLevel}`);
      
      toast({
        title: "Challenge completed!",
        description: "You've earned 50 XP and made progress on this level.",
      });
      
      setDialogOpen(false);
    }
  };

  return (
    <AnimatedTransition variant="fade">
      <div className="min-h-screen bg-gray-50">
        <Navbar userProgress={{ level: stats.level, xp: stats.xp, levelProgress }} />
        
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-2">
                <button 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/tech-selection')}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Tech Selection
                </button>
              </div>
              <h1 className="text-3xl font-bold mb-4">Web Development Path</h1>
              <p className="text-muted-foreground max-w-2xl">
                Progress through these levels to master web development. Each level builds on the previous one
                and teaches you new concepts and skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level, index) => (
                <LevelCard
                  key={level.level}
                  level={level.level}
                  title={level.title}
                  description={level.description}
                  progress={level.progress}
                  isLocked={level.isLocked}
                  isCompleted={level.isCompleted}
                  onClick={() => handleLevelClick(level.level)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Level {activeLevel}: {activeLevel && levels[activeLevel - 1]?.title}</DialogTitle>
              <DialogDescription>
                {activeLevel && levels[activeLevel - 1]?.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Challenge
                </h3>
                <p className="text-muted-foreground mb-4">
                  Create a simple HTML page with a heading, paragraph, and an image.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is my first web page!</p>
  <img src="image.jpg" alt="A description of the image">
</body>
</html>`}</pre>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Complete this challenge to earn 50 XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Unlock the next level</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span>Work towards the "HTML Master" achievement</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCompleteChallenge}>
                  Complete Challenge
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AnimatedTransition>
  );
};

export default LearningPath;
