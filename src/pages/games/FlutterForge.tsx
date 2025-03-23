
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, Code, Award, ChevronsRight, Clock, Lightbulb, Check, Paintbrush, LayoutGrid } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import { useProgress } from '@/hooks/useProgress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  timeLimit: number; // in minutes
  isLocked: boolean;
  isCompleted: boolean;
  challenge: {
    description: string;
    mockupImage?: string;
    initialCode: string;
    expectedOutput: string;
    hints: string[];
  };
}

const FlutterForge = () => {
  const { stats, levelProgress, completeChallenge, addXP } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [isLevelDialogOpen, setIsLevelDialogOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState('challenge');
  const navigate = useNavigate();
  
  const levels: Level[] = [
    {
      id: 1,
      title: "Basic Login UI",
      description: "Create a beautiful login screen with Flutter widgets.",
      difficulty: 'beginner',
      xpReward: 50,
      timeLimit: 10,
      isLocked: false,
      isCompleted: false,
      challenge: {
        description: "Build a login screen with email and password inputs, a login button, and a 'Forgot Password?' link.",
        initialCode: `import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: Implement the login screen UI
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Center(
        child: Text('Login Screen'),
      ),
    );
  }
}`,
        expectedOutput: "A beautiful login screen with text inputs for email and password, a login button, and a forgot password link. The screen should be responsive and visually appealing.",
        hints: [
          "Use Column widget to arrange elements vertically.",
          "TextFormField widgets are great for input fields.",
          "Add padding and margin for better spacing.",
          "Use ElevatedButton for the login button."
        ]
      }
    },
    {
      id: 2,
      title: "Animated Card Grid",
      description: "Build a grid of cards with staggered animations.",
      difficulty: 'intermediate',
      xpReward: 75,
      timeLimit: 15,
      isLocked: true,
      isCompleted: false,
      challenge: {
        description: "Create a grid of animated cards that appear with a staggered animation when the screen loads.",
        initialCode: `import 'package:flutter/material.dart';

class AnimatedCardGrid extends StatefulWidget {
  @override
  _AnimatedCardGridState createState() => _AnimatedCardGridState();
}

class _AnimatedCardGridState extends State<AnimatedCardGrid> {
  // TODO: Add animation controllers and state
  
  @override
  void initState() {
    super.initState();
    // TODO: Initialize animations
  }
  
  @override
  void dispose() {
    // TODO: Dispose animation controllers
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Animated Card Grid'),
      ),
      body: Center(
        child: Text('Implement the grid here'),
      ),
    );
  }
}

// TODO: Create a custom card widget`,
        expectedOutput: "A grid of cards that animates in with a staggered effect when the screen loads. Each card should have a different animation delay.",
        hints: [
          "Use AnimationController and Animation<double> for the animations.",
          "GridView.builder is perfect for creating the card grid.",
          "Use staggered delays with Future.delayed or calculate delays based on index.",
          "Create a custom card widget that accepts an animation."
        ]
      }
    },
    {
      id: 3,
      title: "Interactive Dashboard",
      description: "Create a dashboard with interactive charts and statistics.",
      difficulty: 'advanced',
      xpReward: 100,
      timeLimit: 20,
      isLocked: true,
      isCompleted: false,
      challenge: {
        description: "Build a dashboard with multiple interactive card widgets showing statistics and a simple chart.",
        initialCode: `import 'package:flutter/material.dart';

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  // Mock data for the dashboard
  final List<Map<String, dynamic>> statistics = [
    {'title': 'Total Users', 'value': 24680, 'increase': true, 'percentage': 12.5},
    {'title': 'Revenue', 'value': 8570, 'increase': true, 'percentage': 8.2},
    {'title': 'Tasks', 'value': 1243, 'increase': false, 'percentage': 3.6},
    {'title': 'Products', 'value': 427, 'increase': true, 'percentage': 4.3},
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
      ),
      body: Center(
        child: Text('Implement the dashboard here'),
      ),
    );
  }
}

// TODO: Implement StatCard widget

// TODO: Implement SimpleChart widget`,
        expectedOutput: "A responsive dashboard with multiple statistics cards and at least one interactive chart. The design should be clean and modern.",
        hints: [
          "Create reusable widget components for statistics cards and charts.",
          "Use GridView or CustomScrollView for responsive layouts.",
          "Custom paint or a charting library can be used for simple charts.",
          "Use animations to make the dashboard feel interactive."
        ]
      }
    }
  ];
  
  const handleLevelSelect = (level: Level) => {
    if (level.isLocked) {
      toast({
        title: "Level Locked",
        description: "Complete the previous level to unlock this one",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedLevel(level);
    setIsLevelDialogOpen(true);
    setShowHint(false);
    setActiveTab('challenge');
  };
  
  const handleCompleteChallenge = () => {
    if (selectedLevel) {
      completeChallenge(`flutter-level-${selectedLevel.id}`);
      addXP(selectedLevel.xpReward);
      
      toast({
        title: "Challenge completed!",
        description: `You've earned ${selectedLevel.xpReward} XP!`,
      });
      
      // Unlock next level
      if (selectedLevel.id < levels.length) {
        const nextLevel = levels[selectedLevel.id];
        if (nextLevel && nextLevel.isLocked) {
          nextLevel.isLocked = false;
        }
      }
      
      selectedLevel.isCompleted = true;
      setIsLevelDialogOpen(false);
    }
  };
  
  return (
    <AnimatedTransition variant="fade">
      <div className="min-h-screen bg-gray-50">
        <Navbar userProgress={{ level: stats.level, xp: stats.xp, levelProgress }} />
        
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <button 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                onClick={() => navigate('/tech-selection')}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Tech Selection
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Flutter Forge</h1>
                <p className="text-muted-foreground max-w-2xl">
                  Craft beautiful mobile UIs using Flutter. Build responsive layouts, animations, and interactive components.
                </p>
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <Paintbrush className="w-4 h-4 mr-2" />
                <span>UI Development</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: level.id * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`rounded-xl overflow-hidden ${level.isLocked ? 'opacity-70' : ''}`}
                >
                  <Card className="h-full flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center`}>
                          <LayoutGrid className="w-6 h-6" />
                        </div>
                        
                        <div className="flex items-center">
                          {level.isCompleted && (
                            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                            level.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                            level.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {level.difficulty.charAt(0).toUpperCase() + level.difficulty.slice(1)}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">Level {level.id}: {level.title}</h3>
                      <p className="text-muted-foreground mb-4">{level.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-5">
                        <div className="flex items-center text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
                          <Award className="w-3 h-3 mr-1" />
                          <span>{level.xpReward} XP</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{level.timeLimit} min</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 pt-0 mt-auto">
                      <Button 
                        onClick={() => handleLevelSelect(level)}
                        className="w-full"
                        variant={level.isLocked ? "outline" : "default"}
                        disabled={level.isLocked}
                      >
                        {level.isLocked ? (
                          <>
                            <span>Locked</span>
                          </>
                        ) : level.isCompleted ? (
                          <>
                            <span>Replay Level</span>
                            <Play className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          <>
                            <span>Start Challenge</span>
                            <Play className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <Dialog open={isLevelDialogOpen} onOpenChange={setIsLevelDialogOpen}>
          <DialogContent className="sm:max-w-[900px] h-[80vh] max-h-[900px] flex flex-col">
            <DialogHeader>
              <DialogTitle>Level {selectedLevel?.id}: {selectedLevel?.title}</DialogTitle>
              <DialogDescription>
                {selectedLevel?.challenge.description}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mb-2">
                <TabsTrigger value="challenge">Challenge</TabsTrigger>
                <TabsTrigger value="code">Code Editor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="challenge" className="flex-1 overflow-auto">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Paintbrush className="w-4 h-4 mr-2 text-blue-500" />
                      Task
                    </h3>
                    <p className="text-sm">{selectedLevel?.challenge.description}</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Code className="w-4 h-4 mr-2 text-blue-500" />
                      Expected Outcome
                    </h3>
                    <p className="text-sm">{selectedLevel?.challenge.expectedOutput}</p>
                  </div>
                  
                  <div>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => setShowHint(!showHint)}
                    >
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      {showHint ? "Hide Hints" : "Show Hints"}
                    </Button>
                    
                    {showHint && selectedLevel && (
                      <div className="mt-3 space-y-2">
                        {selectedLevel.challenge.hints.map((hint, index) => (
                          <div 
                            key={index}
                            className="bg-yellow-50 border-l-4 border-yellow-500 p-3"
                          >
                            <p className="text-sm">{hint}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-auto bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm">
                  <pre>{selectedLevel?.challenge.initialCode}</pre>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <div className="flex w-full gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsLevelDialogOpen(false)}>
                  Exit Challenge
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

export default FlutterForge;
