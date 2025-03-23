
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, Code, Award, ChevronsRight, Clock, Lightbulb, Check, X, Terminal } from 'lucide-react';
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
    initialCode: string;
    expectedOutput: string;
    hints: string[];
  };
}

const ReactNativeRanger = () => {
  const { stats, levelProgress, completeChallenge, addXP } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [isLevelDialogOpen, setIsLevelDialogOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState('challenge');
  const navigate = useNavigate();
  
  const levels: Level[] = [
    {
      id: 1,
      title: "Fix The Shopping Cart",
      description: "Debug a shopping app where items don't add to the cart correctly.",
      difficulty: 'beginner',
      xpReward: 50,
      timeLimit: 10,
      isLocked: false,
      isCompleted: false,
      challenge: {
        description: "The ShoppingCart component doesn't update when new items are added. Find and fix the bug in the state management.",
        initialCode: `import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  
  const products = [
    { id: 1, name: 'Headphones', price: 99.99 },
    { id: 2, name: 'Smart Watch', price: 199.99 },
    { id: 3, name: 'Bluetooth Speaker', price: 49.99 },
  ];
  
  const addToCart = (product) => {
    // BUG: This doesn't update the state correctly
    items.push(product);
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Products</Text>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      
      <Text style={{ fontSize: 20, marginTop: 20 }}>Cart Items: {items.length}</Text>
      
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ${item.price}</Text>
        )}
      />
    </View>
  );
};

export default ShoppingCart;`,
        expectedOutput: "The shopping cart should update when items are added, displaying the correct count and list of items.",
        hints: [
          "Think about how React state should be updated. Direct mutations won't trigger re-renders.",
          "The setItems function should be used to update the state.",
          "Try using the spread operator or Array.concat() to create a new array."
        ]
      }
    },
    {
      id: 2,
      title: "Navigation Nightmare",
      description: "Fix a broken navigation system in a social media app.",
      difficulty: 'intermediate',
      xpReward: 75,
      timeLimit: 15,
      isLocked: true,
      isCompleted: false,
      challenge: {
        description: "The app's navigation system is broken. Users can't move between screens properly. Fix the React Navigation setup.",
        initialCode: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* BUG: Navigation setup is incorrect */}
        <Stack.Screen component={HomeScreen} />
        <Stack.Screen name="Settings" component={ProfileScreen} />
        <Stack.Screen name="Profile" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;`,
        expectedOutput: "Navigation should work correctly with proper screen names and components.",
        hints: [
          "Each Stack.Screen needs a unique 'name' prop.",
          "The HomeScreen is missing its name prop.",
          "The ProfileScreen and SettingsScreen components are switched."
        ]
      }
    },
    {
      id: 3,
      title: "API Integration",
      description: "Implement a product listing that fetches data from an API.",
      difficulty: 'advanced',
      xpReward: 100,
      timeLimit: 20,
      isLocked: true,
      isCompleted: false,
      challenge: {
        description: "Create a ProductList component that fetches products from an API and displays them with proper loading and error states.",
        initialCode: `import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // TODO: Implement the fetchProducts function
  const fetchProducts = () => {
    // Fetch data from https://fakestoreapi.com/products
  };
  
  // TODO: Call fetchProducts when component mounts
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading products</Text>
      </View>
    );
  }
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Products</Text>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProductList;`,
        expectedOutput: "The app should fetch products from the API, display a loading indicator while fetching, handle errors, and display the products in a list.",
        hints: [
          "Use the useEffect hook to fetch data when the component mounts.",
          "Implement proper try/catch handling for the fetch operation.",
          "Update loading, error, and products states at appropriate times during the fetch operation."
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
      completeChallenge(`react-native-level-${selectedLevel.id}`);
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
                <h1 className="text-3xl font-bold mb-2">React Native Ranger</h1>
                <p className="text-muted-foreground max-w-2xl">
                  Debug and build React Native applications through engaging challenges. Fix bugs, implement features, and optimize mobile apps.
                </p>
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                <span>Mobile Development</span>
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
                        <div className={`w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center`}>
                          <Code className="w-6 h-6" />
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
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Terminal className="w-4 h-4 mr-2 text-primary" />
                      Task
                    </h3>
                    <p className="text-sm">{selectedLevel?.challenge.description}</p>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Code className="w-4 h-4 mr-2 text-primary" />
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

export default ReactNativeRanger;
