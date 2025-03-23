
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Terminal, Play, RefreshCw, Info, HelpCircle, Bug, CheckCircle } from 'lucide-react';
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

interface GameLevel {
  id: number;
  title: string;
  description: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  initialCode: string;
  solutionCriteria: string[];
  hints: string[];
  visualElements: { [key: string]: { x: number, y: number } };
  xpReward: number;
}

const JsCommander = () => {
  const navigate = useNavigate();
  const { stats, levelProgress, addXP } = useProgress();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string[]>([]);
  const [characterPositions, setCharacterPositions] = useState<{[key: string]: {x: number, y: number}}>({});
  const [debugMode, setDebugMode] = useState<boolean>(false);
  
  const gameLevels: GameLevel[] = [
    {
      id: 1,
      title: 'Moving the Robot',
      description: 'Write JavaScript code to move the robot to the star.',
      instructions: 'Use moveRight(), moveDown(), etc. functions to move the robot to the star. The robot starts at (0,0) and the star is at (3,2).',
      difficulty: 'beginner',
      initialCode: `// Use these functions to move the robot:
// moveRight() - moves right by 1
// moveLeft() - moves left by 1
// moveUp() - moves up by 1
// moveDown() - moves down by 1

function runRobot() {
  // Your code here
  
}`,
      solutionCriteria: [
        'Robot must reach position (3,2)',
        'Code must include movement functions'
      ],
      hints: [
        'Try using moveRight() multiple times to move horizontally',
        'Then use moveDown() to move vertically',
        'The robot needs to reach coordinates (3,2)'
      ],
      visualElements: {
        'robot': { x: 0, y: 0 },
        'star': { x: 3, y: 2 }
      },
      xpReward: 50,
    },
    {
      id: 2,
      title: 'Looping Commands',
      description: 'Use loops to make your code more efficient.',
      instructions: 'Use a loop to move the robot to the star. The robot starts at (0,0) and the star is at (5,0).',
      difficulty: 'intermediate',
      initialCode: `// Use these functions to move the robot:
// moveRight() - moves right by 1
// moveLeft() - moves left by 1
// moveUp() - moves up by 1
// moveDown() - moves down by 1

function runRobot() {
  // Instead of writing moveRight() 5 times,
  // can you use a loop?
  
}`,
      solutionCriteria: [
        'Robot must reach position (5,0)',
        'Code must include at least one loop',
        'Code should be less than 5 lines'
      ],
      hints: [
        'Use a for loop to repeat moveRight() multiple times',
        'The loop syntax is: for (let i = 0; i < 5; i++) { ... }',
        'You need exactly 5 moves to the right'
      ],
      visualElements: {
        'robot': { x: 0, y: 0 },
        'star': { x: 5, y: 0 }
      },
      xpReward: 75,
    },
    {
      id: 3,
      title: 'Conditional Movement',
      description: 'Use conditions to navigate around obstacles.',
      instructions: 'Move the robot to the star while avoiding obstacles. Use hasObstacle() to check if there\'s an obstacle in the way.',
      difficulty: 'advanced',
      initialCode: `// Use these functions:
// moveRight(), moveLeft(), moveUp(), moveDown()
// hasObstacle(direction) - returns true if there's an obstacle
// in the specified direction ("right", "left", "up", "down")

function runRobot() {
  // Use if statements to check for obstacles
  // and navigate around them
  
}`,
      solutionCriteria: [
        'Robot must reach position (4,3)',
        'Robot must not hit any obstacles',
        'Code must include conditional statements'
      ],
      hints: [
        'Check for obstacles before moving: if (hasObstacle("right")) { ... }',
        'If there\'s an obstacle, try a different direction',
        'You\'ll need to use multiple if/else statements to handle different scenarios'
      ],
      visualElements: {
        'robot': { x: 0, y: 0 },
        'obstacle1': { x: 2, y: 0 },
        'obstacle2': { x: 2, y: 1 },
        'obstacle3': { x: 3, y: 2 },
        'star': { x: 4, y: 3 }
      },
      xpReward: 100,
    },
  ];
  
  const currentGameLevel = gameLevels[currentLevel];
  
  useEffect(() => {
    // Initialize character positions and user code when level changes
    setCharacterPositions(currentGameLevel.visualElements);
    setUserCode(currentGameLevel.initialCode);
    setOutput([]);
  }, [currentLevel]);
  
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Reset character positions
    setCharacterPositions(currentGameLevel.visualElements);
    
    // Create a safe environment to run user code
    const consoleMessages: string[] = [];
    const robotPosition = { ...currentGameLevel.visualElements.robot };
    
    // Define robot movement functions
    const moveRight = () => {
      robotPosition.x += 1;
      consoleMessages.push(`Robot moved right to (${robotPosition.x}, ${robotPosition.y})`);
      setCharacterPositions(prev => ({
        ...prev,
        robot: { ...robotPosition }
      }));
    };
    
    const moveLeft = () => {
      robotPosition.x -= 1;
      consoleMessages.push(`Robot moved left to (${robotPosition.x}, ${robotPosition.y})`);
      setCharacterPositions(prev => ({
        ...prev,
        robot: { ...robotPosition }
      }));
    };
    
    const moveUp = () => {
      robotPosition.y -= 1;
      consoleMessages.push(`Robot moved up to (${robotPosition.x}, ${robotPosition.y})`);
      setCharacterPositions(prev => ({
        ...prev,
        robot: { ...robotPosition }
      }));
    };
    
    const moveDown = () => {
      robotPosition.y += 1;
      consoleMessages.push(`Robot moved down to (${robotPosition.x}, ${robotPosition.y})`);
      setCharacterPositions(prev => ({
        ...prev,
        robot: { ...robotPosition }
      }));
    };
    
    const hasObstacle = (direction: string) => {
      const { x, y } = robotPosition;
      
      // Check if there's an obstacle in the specified direction
      const obstacles = Object.entries(currentGameLevel.visualElements)
        .filter(([key]) => key.startsWith('obstacle'))
        .map(([_, pos]) => pos);
      
      switch (direction) {
        case 'right':
          return obstacles.some(obs => obs.x === x + 1 && obs.y === y);
        case 'left':
          return obstacles.some(obs => obs.x === x - 1 && obs.y === y);
        case 'up':
          return obstacles.some(obs => obs.x === x && obs.y === y - 1);
        case 'down':
          return obstacles.some(obs => obs.x === x && obs.y === y + 1);
        default:
          return false;
      }
    };
    
    // Wrap the user code in a try/catch to handle errors
    try {
      // Extract the user's function
      const functionBody = userCode.split('function runRobot() {')[1].split('}')[0];
      
      // Create a new function with our environment
      const userFunction = new Function(
        'moveRight', 'moveLeft', 'moveUp', 'moveDown', 'hasObstacle', 'console',
        `function runRobot() {${functionBody}}; runRobot();`
      );
      
      // Create a console mock
      const consoleMock = {
        log: (message: any) => {
          consoleMessages.push(String(message));
        },
        error: (message: any) => {
          consoleMessages.push(`Error: ${message}`);
        },
        warn: (message: any) => {
          consoleMessages.push(`Warning: ${message}`);
        }
      };
      
      // Run the user's code
      userFunction(moveRight, moveLeft, moveUp, moveDown, hasObstacle, consoleMock);
      
      // Check if the robot reached the star
      const starPos = currentGameLevel.visualElements.star;
      if (robotPosition.x === starPos.x && robotPosition.y === starPos.y) {
        consoleMessages.push(`Success! Robot reached the star at (${starPos.x}, ${starPos.y})`);
        
        // Award XP after a delay to let the animation complete
        setTimeout(() => {
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
              setShowHint(false);
            }, 1500);
          } else {
            // Game completed
            toast({
              title: "Game Completed!",
              description: "You've mastered JavaScript basics!",
              variant: "default",
            });
          }
        }, 1000);
      } else {
        consoleMessages.push(`Robot ended at (${robotPosition.x}, ${robotPosition.y}), but the star is at (${starPos.x}, ${starPos.y})`);
      }
    } catch (error) {
      console.error('Error executing user code:', error);
      consoleMessages.push(`Error executing code: ${error}`);
    }
    
    // Update the console output
    setOutput(consoleMessages);
    setIsRunning(false);
  };
  
  const renderGameGrid = () => {
    // Create a grid for visualization
    const gridSize = 6;
    const cells = [];
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Check what's in this cell
        let content = null;
        
        if (characterPositions.robot?.x === x && characterPositions.robot?.y === y) {
          content = <div className="text-2xl">🤖</div>;
        } else if (characterPositions.star?.x === x && characterPositions.star?.y === y) {
          content = <div className="text-2xl">⭐</div>;
        } else {
          // Check for obstacles
          const isObstacle = Object.entries(characterPositions)
            .some(([key, pos]) => key.startsWith('obstacle') && pos.x === x && pos.y === y);
          
          if (isObstacle) {
            content = <div className="text-2xl">🧱</div>;
          }
        }
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`w-12 h-12 border border-gray-200 flex items-center justify-center ${
              (x + y) % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            }`}
            style={{ gridColumn: x + 1, gridRow: y + 1 }}
          >
            {content}
            {debugMode && (
              <div className="absolute top-0 left-0 text-[8px] text-gray-400">
                {x},{y}
              </div>
            )}
          </div>
        );
      }
    }
    
    return (
      <div className="grid grid-cols-6 grid-rows-6 border border-gray-300 rounded-md overflow-hidden">
        {cells}
      </div>
    );
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
                <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Code Commanders</h1>
                  <p className="text-muted-foreground">
                    Use JavaScript to command objects in the virtual world
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
                    <h3 className="font-medium text-blue-800 mb-1">Coding Hint</h3>
                    <p className="text-blue-700 text-sm">{currentGameLevel.hints[0]}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
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
                    <div className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                      <h3 className="text-sm font-medium mb-2 text-blue-700">Instructions:</h3>
                      <p className="text-sm text-blue-700">{currentGameLevel.instructions}</p>
                    </div>
                    
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-64 bg-transparent outline-none resize-none"
                        spellCheck="false"
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setUserCode(currentGameLevel.initialCode)}
                        className="gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset Code
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setDebugMode(!debugMode)}
                          className={`gap-2 ${debugMode ? 'bg-orange-50 border-orange-200 text-orange-700' : ''}`}
                        >
                          <Bug className="w-4 h-4" />
                          {debugMode ? 'Hide Coords' : 'Show Coords'}
                        </Button>
                        
                        <Button
                          onClick={handleRunCode}
                          disabled={isRunning}
                          className="gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Run Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Console Output</CardTitle>
                    <CardDescription>
                      See the results of your code execution
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto max-h-48 overflow-y-auto">
                      {output.length === 0 ? (
                        <span className="text-gray-500">// Output will appear here</span>
                      ) : (
                        output.map((line, index) => (
                          <div key={index} className={`mb-1 ${
                            line.includes('Error') ? 'text-red-400' : 
                            line.includes('Success') ? 'text-green-400' : 
                            line.includes('Warning') ? 'text-yellow-400' : 
                            'text-gray-300'
                          }`}>
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Game World</CardTitle>
                    <CardDescription>
                      Control the robot to reach the star
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      {renderGameGrid()}
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="text-xl">🤖</div>
                        <span className="text-sm">Your robot</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xl">⭐</div>
                        <span className="text-sm">Target destination</span>
                      </div>
                      {Object.keys(characterPositions).some(key => key.startsWith('obstacle')) && (
                        <div className="flex items-center gap-2">
                          <div className="text-xl">🧱</div>
                          <span className="text-sm">Obstacle (avoid these)</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="w-full">
                      <h3 className="text-sm font-medium mb-2">Success Criteria:</h3>
                      <ul className="space-y-1">
                        {currentGameLevel.solutionCriteria.map((criterion, index) => (
                          <li key={index} className="text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-gray-400" />
                            <span>{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default JsCommander;
