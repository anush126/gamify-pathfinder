
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Brush, Info, HelpCircle, RefreshCw } from 'lucide-react';
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

interface CssProperty {
  id: string;
  property: string;
  value: string;
  description: string;
}

interface GameLevel {
  id: number;
  title: string;
  description: string;
  html: string;
  targetImage: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  availableProperties: CssProperty[];
  targetCss: Record<string, string>;
  hints: string[];
  xpReward: number;
}

const CssStyler = () => {
  const navigate = useNavigate();
  const { stats, levelProgress, addXP } = useProgress();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [appliedProperties, setAppliedProperties] = useState<CssProperty[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [clientRequest, setClientRequest] = useState<string | null>(null);
  
  const gameLevels: GameLevel[] = [
    {
      id: 1,
      title: 'Style a Button',
      description: 'Apply CSS properties to style a button according to the design.',
      html: '<button class="target-element">Click Me</button>',
      targetImage: 'A blue button with rounded corners and white text',
      difficulty: 'beginner',
      availableProperties: [
        { id: 'bg1', property: 'background-color', value: '#3b82f6', description: 'Background color' },
        { id: 'color1', property: 'color', value: 'white', description: 'Text color' },
        { id: 'padding1', property: 'padding', value: '10px 20px', description: 'Inner spacing' },
        { id: 'border1', property: 'border', value: 'none', description: 'Border style' },
        { id: 'radius1', property: 'border-radius', value: '4px', description: 'Rounded corners' },
        { id: 'cursor1', property: 'cursor', value: 'pointer', description: 'Change cursor on hover' },
      ],
      targetCss: {
        'background-color': '#3b82f6',
        'color': 'white',
        'padding': '10px 20px',
        'border': 'none',
        'border-radius': '4px',
        'cursor': 'pointer',
      },
      hints: ['Start with background and text colors', 'Add padding for size', 'Round the corners with border-radius'],
      xpReward: 50,
    },
    {
      id: 2,
      title: 'Create a Card',
      description: 'Style a content card with proper spacing, shadows, and typography.',
      html: `<div class="target-element">
  <h2>Card Title</h2>
  <p>This is some card content that needs styling.</p>
  <a href="#">Read more</a>
</div>`,
      targetImage: 'A white card with shadow, padding, and styled typography',
      difficulty: 'intermediate',
      availableProperties: [
        { id: 'bg2', property: 'background-color', value: 'white', description: 'Background color' },
        { id: 'padding2', property: 'padding', value: '20px', description: 'Inner spacing' },
        { id: 'shadow2', property: 'box-shadow', value: '0 4px 6px rgba(0,0,0,0.1)', description: 'Box shadow' },
        { id: 'radius2', property: 'border-radius', value: '8px', description: 'Rounded corners' },
        { id: 'mtitle2', property: 'margin-bottom: 10px', value: 'h2', description: 'Title margin' },
        { id: 'ftitle2', property: 'font-size: 1.5rem', value: 'h2', description: 'Title font size' },
        { id: 'clink2', property: 'color: #3b82f6', value: 'a', description: 'Link color' },
      ],
      targetCss: {
        'background-color': 'white',
        'padding': '20px',
        'box-shadow': '0 4px 6px rgba(0,0,0,0.1)',
        'border-radius': '8px',
        'h2:margin-bottom': '10px',
        'h2:font-size': '1.5rem',
        'a:color': '#3b82f6',
      },
      hints: ['Start with card container styles', 'Add spacing between elements', 'Style title and link differently'],
      xpReward: 75,
    },
    {
      id: 3,
      title: 'Flexbox Layout',
      description: 'Create a responsive navbar using flexbox properties.',
      html: `<nav class="target-element">
  <div class="logo">LOGO</div>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
      targetImage: 'A horizontal navbar with logo on left and menu items on right',
      difficulty: 'advanced',
      availableProperties: [
        { id: 'display3', property: 'display', value: 'flex', description: 'Flex container' },
        { id: 'justify3', property: 'justify-content', value: 'space-between', description: 'Space between items' },
        { id: 'align3', property: 'align-items', value: 'center', description: 'Center items vertically' },
        { id: 'padding3', property: 'padding', value: '1rem 2rem', description: 'Inner spacing' },
        { id: 'bg3', property: 'background-color', value: '#f8f9fa', description: 'Background color' },
        { id: 'uldisplay3', property: 'display: flex', value: 'ul', description: 'Menu as flex container' },
        { id: 'ulgap3', property: 'gap: 1.5rem', value: 'ul', description: 'Space between menu items' },
        { id: 'lilist3', property: 'list-style: none', value: 'li', description: 'Remove list bullets' },
        { id: 'acolor3', property: 'color: #4b5563', value: 'a', description: 'Link color' },
        { id: 'adecor3', property: 'text-decoration: none', value: 'a', description: 'Remove underline' },
      ],
      targetCss: {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'padding': '1rem 2rem',
        'background-color': '#f8f9fa',
        'ul:display': 'flex',
        'ul:gap': '1.5rem',
        'li:list-style': 'none',
        'a:color': '#4b5563',
        'a:text-decoration': 'none',
      },
      hints: ['Use display: flex on both nav and ul', 'Space logo and menu with justify-content', 'Style list items to remove bullets'],
      xpReward: 100,
    },
  ];
  
  const currentGameLevel = gameLevels[currentLevel];
  
  const handleApplyProperty = (property: CssProperty) => {
    if (!appliedProperties.find(p => p.id === property.id)) {
      setAppliedProperties([...appliedProperties, property]);
    }
  };
  
  const handleRemoveProperty = (propertyId: string) => {
    setAppliedProperties(appliedProperties.filter(p => p.id !== propertyId));
  };
  
  const handleCheckSolution = () => {
    // Calculate match percentage based on applied properties
    const totalProperties = Object.keys(currentGameLevel.targetCss).length;
    let matchedProperties = 0;
    
    for (const [key, value] of Object.entries(currentGameLevel.targetCss)) {
      const applied = appliedProperties.find(p => {
        if (key.includes(':')) {
          const [selector, prop] = key.split(':');
          return p.property === prop && p.value.includes(selector);
        }
        return p.property === key;
      });
      
      if (applied) {
        matchedProperties++;
      }
    }
    
    const matchPercentage = Math.round((matchedProperties / totalProperties) * 100);
    
    if (matchPercentage >= 80) {
      // Award XP and show success message
      addXP(currentGameLevel.xpReward);
      
      toast({
        title: "Level Complete!",
        description: `You achieved ${matchPercentage}% match! Earned ${currentGameLevel.xpReward} XP.`,
        variant: "default",
      });
      
      // Move to next level if available
      if (currentLevel < gameLevels.length - 1) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setAppliedProperties([]);
          setShowHint(false);
          setClientRequest(null);
        }, 1500);
      } else {
        // Game completed
        toast({
          title: "Game Completed!",
          description: "You've mastered CSS styling!",
          variant: "default",
        });
      }
    } else {
      // Show feedback
      toast({
        title: "Not quite there yet",
        description: `Your design is ${matchPercentage}% similar to the target. Need at least 80% to pass.`,
        variant: "destructive",
      });
      
      // Generate a random client request as a hint
      generateClientRequest();
    }
  };
  
  const generateClientRequest = () => {
    const requests = [
      "Can you make the colors more vibrant?",
      "The spacing doesn't look right yet.",
      "Try adjusting the font styles.",
      "Consider adding some rounded corners!",
      "The layout needs to be more balanced."
    ];
    
    const randomRequest = requests[Math.floor(Math.random() * requests.length)];
    setClientRequest(randomRequest);
  };
  
  const generateCss = () => {
    let css = '';
    const mainStyles: string[] = [];
    const childStyles: Record<string, string[]> = {};
    
    appliedProperties.forEach(({ property, value }) => {
      if (value.includes(':')) {
        // This is a selector-specific style like "h2:margin-bottom"
        const [selector, propVal] = value.split(':');
        if (!childStyles[selector]) {
          childStyles[selector] = [];
        }
        childStyles[selector].push(`  ${property}: ${propVal};`);
      } else if (property.includes(':')) {
        // This is a nested style like "margin-bottom: 10px" for "h2"
        const [prop, val] = property.split(':');
        if (!childStyles[value]) {
          childStyles[value] = [];
        }
        childStyles[value].push(`  ${prop}: ${val};`);
      } else {
        // This is a main style
        mainStyles.push(`  ${property}: ${value};`);
      }
    });
    
    // Build the CSS string
    css += '.target-element {\n';
    css += mainStyles.join('\n');
    css += '\n}\n';
    
    // Add child selectors
    for (const [selector, styles] of Object.entries(childStyles)) {
      css += `\n.target-element ${selector} {\n`;
      css += styles.join('\n');
      css += '\n}\n';
    }
    
    return css;
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
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Brush className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Style the Scene</h1>
                  <p className="text-muted-foreground">
                    Apply CSS properties to transform plain HTML into beautiful designs
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
                    <h3 className="font-medium text-blue-800 mb-1">Design Hint</h3>
                    <p className="text-blue-700 text-sm">{currentGameLevel.hints[0]}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {clientRequest && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 rounded-lg bg-orange-50 border border-orange-200"
              >
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-orange-800 mb-1">Client Request</h3>
                    <p className="text-orange-700 text-sm">{clientRequest}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6">
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
                      <h3 className="text-sm font-medium mb-2">Target Design:</h3>
                      <div className="p-4 rounded-md bg-gray-100 border border-gray-200">
                        {currentGameLevel.targetImage}
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-2">Available CSS Properties:</h3>
                    <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-2">
                      {currentGameLevel.availableProperties.map((property) => (
                        <div
                          key={property.id}
                          onClick={() => handleApplyProperty(property)}
                          className="p-2 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-mono text-sm text-gray-800">{property.property}: {property.value};</div>
                          <div className="text-xs text-gray-500 mt-1">{property.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your CSS</CardTitle>
                    <CardDescription>
                      Applied CSS properties will show here
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4 min-h-32">
                      {appliedProperties.length === 0 ? (
                        <span className="text-gray-500">/* Your CSS will appear here */</span>
                      ) : (
                        <pre>{generateCss()}</pre>
                      )}
                    </div>
                    
                    {appliedProperties.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Applied Properties:</h3>
                        <div className="flex flex-wrap gap-2">
                          {appliedProperties.map((property) => (
                            <div
                              key={property.id}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center"
                            >
                              <span>{property.property}</span>
                              <button
                                onClick={() => handleRemoveProperty(property.id)}
                                className="ml-1 p-0.5 rounded-full hover:bg-primary/20"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <h3 className="text-sm font-medium mb-2">Preview:</h3>
                    <div className="p-6 rounded-md border border-gray-200 bg-white flex justify-center">
                      <div
                        className="preview-container"
                        dangerouslySetInnerHTML={{ __html: currentGameLevel.html }}
                        style={{ 
                          fontFamily: 'system-ui, sans-serif',
                          maxWidth: '100%',
                          overflow: 'hidden'
                        }}
                      />
                      <style>
                        {appliedProperties.length > 0 ? generateCss() : ''}
                      </style>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="flex justify-between items-center w-full mt-2">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setAppliedProperties([]);
                          setClientRequest(null);
                        }}
                        className="gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                      </Button>
                      <Button
                        onClick={handleCheckSolution}
                        disabled={appliedProperties.length === 0}
                        className="gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Check Design
                      </Button>
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

export default CssStyler;
