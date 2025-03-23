
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Puzzle, Info, HelpCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface HtmlTag {
  id: string;
  tag: string;
  description: string;
  isPlaced: boolean;
}

interface GameLevel {
  id: number;
  title: string;
  description: string;
  targetPreview: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: HtmlTag[];
  correctOrder: string[];
  hints: string[];
  xpReward: number;
}

const HtmlBlueprint = () => {
  const navigate = useNavigate();
  const { stats, levelProgress, addXP } = useProgress();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [placedTags, setPlacedTags] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  
  const gameLevels: GameLevel[] = [
    {
      id: 1,
      title: 'Simple Blog Post',
      description: 'Create a simple blog post with a heading, paragraph, and image.',
      targetPreview: 'A blog post with title, paragraph, and image',
      difficulty: 'beginner',
      tags: [
        { id: 'h1', tag: '<h1>Title</h1>', description: 'Main heading', isPlaced: false },
        { id: 'p', tag: '<p>Content</p>', description: 'Paragraph text', isPlaced: false },
        { id: 'img', tag: '<img src="image.jpg" alt="Blog image">', description: 'Image element', isPlaced: false },
      ],
      correctOrder: ['h1', 'p', 'img'],
      hints: ['Start with the heading', 'Follow with paragraph content', 'End with the image'],
      xpReward: 50,
    },
    {
      id: 2,
      title: 'Navigation Menu',
      description: 'Build a navigation menu with links using proper semantic HTML.',
      targetPreview: 'A navigation bar with home, about, and contact links',
      difficulty: 'intermediate',
      tags: [
        { id: 'nav', tag: '<nav>', description: 'Navigation container', isPlaced: false },
        { id: 'ul', tag: '<ul>', description: 'Unordered list', isPlaced: false },
        { id: 'li1', tag: '<li><a href="/">Home</a></li>', description: 'List item with link', isPlaced: false },
        { id: 'li2', tag: '<li><a href="/about">About</a></li>', description: 'List item with link', isPlaced: false },
        { id: 'li3', tag: '<li><a href="/contact">Contact</a></li>', description: 'List item with link', isPlaced: false },
        { id: 'ul-close', tag: '</ul>', description: 'Closing unordered list', isPlaced: false },
        { id: 'nav-close', tag: '</nav>', description: 'Closing navigation', isPlaced: false },
      ],
      correctOrder: ['nav', 'ul', 'li1', 'li2', 'li3', 'ul-close', 'nav-close'],
      hints: ['Start with nav element', 'Use ul for list of links', 'Add list items with links', 'Don\'t forget closing tags'],
      xpReward: 75,
    },
    {
      id: 3,
      title: 'Contact Form',
      description: 'Create a contact form with proper semantic HTML and accessibility features.',
      targetPreview: 'A contact form with name, email, and message fields',
      difficulty: 'advanced',
      tags: [
        { id: 'form', tag: '<form action="/submit" method="post">', description: 'Form element', isPlaced: false },
        { id: 'label1', tag: '<label for="name">Name:</label>', description: 'Label for name field', isPlaced: false },
        { id: 'input1', tag: '<input type="text" id="name" name="name" required>', description: 'Name input field', isPlaced: false },
        { id: 'label2', tag: '<label for="email">Email:</label>', description: 'Label for email field', isPlaced: false },
        { id: 'input2', tag: '<input type="email" id="email" name="email" required>', description: 'Email input field', isPlaced: false },
        { id: 'label3', tag: '<label for="message">Message:</label>', description: 'Label for message field', isPlaced: false },
        { id: 'textarea', tag: '<textarea id="message" name="message" rows="4" required></textarea>', description: 'Message textarea', isPlaced: false },
        { id: 'button', tag: '<button type="submit">Send Message</button>', description: 'Submit button', isPlaced: false },
        { id: 'form-close', tag: '</form>', description: 'Closing form tag', isPlaced: false },
      ],
      correctOrder: ['form', 'label1', 'input1', 'label2', 'input2', 'label3', 'textarea', 'button', 'form-close'],
      hints: ['Start with form element', 'Each input needs a label for accessibility', 'Add required inputs with types', 'End with a submit button'],
      xpReward: 100,
    },
  ];
  
  const currentGameLevel = gameLevels[currentLevel];
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, tagId: string) => {
    e.dataTransfer.setData('tagId', tagId);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const tagId = e.dataTransfer.getData('tagId');
    
    if (!placedTags.includes(tagId)) {
      setPlacedTags([...placedTags, tagId]);
      
      // Update the tag as placed
      const updatedTags = currentGameLevel.tags.map(tag => 
        tag.id === tagId ? { ...tag, isPlaced: true } : tag
      );
      
      const updatedLevel = {
        ...currentGameLevel,
        tags: updatedTags
      };
      
      // Check if level is complete
      if (placedTags.length + 1 === currentGameLevel.tags.length) {
        handleLevelComplete();
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleLevelComplete = () => {
    // Check if tags are in correct order
    const isCorrect = placedTags.every((tagId, index) => 
      currentGameLevel.correctOrder[index] === tagId
    );
    
    if (isCorrect) {
      // Award XP and show success message
      addXP(currentGameLevel.xpReward);
      
      toast({
        title: "Level Complete!",
        description: `You earned ${currentGameLevel.xpReward} XP!`,
        variant: "default",
      });
      
      // Move to next level if available
      if (currentLevel < gameLevels.length - 1) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setPlacedTags([]);
          setShowHint(false);
        }, 1500);
      } else {
        // Game completed
        toast({
          title: "Game Completed!",
          description: "You've mastered HTML fundamentals!",
          variant: "default",
        });
      }
    } else {
      // Show error message
      toast({
        title: "Not quite right",
        description: "The HTML tags aren't in the correct order. Try again!",
        variant: "destructive",
      });
      
      // Reset placed tags
      setPlacedTags([]);
      
      // Reset tag placement
      const resetTags = currentGameLevel.tags.map(tag => ({
        ...tag,
        isPlaced: false,
      }));
      currentGameLevel.tags = resetTags;
    }
  };
  
  const generatePreview = () => {
    const preview = placedTags.map(tagId => {
      const tag = currentGameLevel.tags.find(t => t.id === tagId);
      return tag ? tag.tag : '';
    }).join('\n');
    
    return preview;
  };
  
  return (
    <AnimatedTransition variant="fade">
      <div className="min-h-screen bg-gray-50">
        <Navbar userProgress={{ level: stats.level, xp: stats.xp, levelProgress }} />
        
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="flex items-center justify-between gap-2 mb-4">
                <button 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/learning-path')}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Learning Path
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Level {currentLevel + 1} of {gameLevels.length}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowHint(!showHint)}
                    className="text-muted-foreground"
                  >
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Hint
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Puzzle className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Build the Blueprint</h1>
                  <p className="text-muted-foreground">
                    Drag and drop HTML tags to build the page structure
                  </p>
                </div>
              </div>
            </div>
            
            {showHint && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200"
              >
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Hint</h3>
                    <p className="text-blue-700 text-sm">{currentGameLevel.hints[0]}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span>Level {currentLevel + 1}: {currentGameLevel.title}</span>
                      <div className="ml-2 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {currentGameLevel.difficulty}
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {currentGameLevel.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Target Preview:</h3>
                      <div className="p-4 rounded-md bg-gray-100 border border-gray-200">
                        {currentGameLevel.targetPreview}
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-2">Available Tags:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentGameLevel.tags.map((tag) => (
                        !tag.isPlaced && (
                          <div
                            key={tag.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, tag.id)}
                            className="p-2 bg-white border border-gray-200 rounded-md cursor-move hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-mono text-sm text-gray-800">{tag.tag}</div>
                            <div className="text-xs text-gray-500 mt-1">{tag.description}</div>
                          </div>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your HTML Structure</CardTitle>
                    <CardDescription>
                      Drag and drop tags here to build your HTML structure
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div 
                      className={`h-64 p-4 rounded-md bg-gray-50 border border-dashed ${
                        placedTags.length === 0 ? 'border-gray-300' : 'border-primary'
                      } overflow-y-auto font-mono text-sm`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      {placedTags.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          Drop HTML tags here
                        </div>
                      ) : (
                        <pre className="whitespace-pre-wrap">{generatePreview()}</pre>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="flex justify-between items-center w-full mt-2">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setPlacedTags([]);
                          currentGameLevel.tags.forEach(tag => tag.isPlaced = false);
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        disabled={placedTags.length < currentGameLevel.tags.length}
                        onClick={handleLevelComplete}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Check Solution
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      See your HTML structure in action
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="rounded-md border border-gray-200 p-4 min-h-24 bg-white">
                      {placedTags.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          Preview will appear here
                        </div>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: generatePreview() }} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default HtmlBlueprint;
