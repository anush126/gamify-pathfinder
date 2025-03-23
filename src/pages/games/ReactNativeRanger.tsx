
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Terminal, Play, RefreshCw, Info, HelpCircle, Code, CheckCircle, Smartphone } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GameLevel {
  id: number;
  title: string;
  description: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  initialCode: string;
  solutionCode: string;
  solutionCriteria: string[];
  hints: string[];
  xpReward: number;
}

const ReactNativeRanger = () => {
  const navigate = useNavigate();
  const { stats, levelProgress, addXP } = useProgress();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('challenge');
  const [showSolution, setShowSolution] = useState(false);
  
  const gameLevels: GameLevel[] = [
    {
      id: 1,
      title: 'Simple Product List',
      description: 'Create a scrollable list of products using FlatList',
      instructions: 'Create a FlatList component that displays a list of products with their names and prices.',
      difficulty: 'beginner',
      initialCode: `import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Phone', price: 699 },
    { id: 2, name: 'Laptop', price: 999 },
    { id: 3, name: 'Headphones', price: 149 },
    { id: 4, name: 'Tablet', price: 499 },
    { id: 5, name: 'Smartwatch', price: 299 },
  ];

  const addToCart = (product) => {
    console.log(\`Added \${product.name} to cart\`);
  };

  // TODO: Implement a FlatList to display products
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Products</Text>
      {/* Your FlatList implementation goes here */}
    </View>
  );
};

export default ProductList;`,
      solutionCode: `import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Phone', price: 699 },
    { id: 2, name: 'Laptop', price: 999 },
    { id: 3, name: 'Headphones', price: 149 },
    { id: 4, name: 'Tablet', price: 499 },
    { id: 5, name: 'Smartwatch', price: 299 },
  ];

  const addToCart = (product) => {
    console.log(\`Added \${product.name} to cart\`);
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
    </View>
  );
};

export default ProductList;`,
      solutionCriteria: [
        'Must use FlatList component',
        'Must display product name and price',
        'Must include Add to Cart button for each item',
        'Must use keyExtractor for unique keys'
      ],
      hints: [
        'FlatList takes data, keyExtractor, and renderItem props',
        'renderItem is a function that returns JSX for each item',
        'Use the item parameter in renderItem to access each product',
        'Don\'t forget to add styles for better UI appearance'
      ],
      xpReward: 50,
    },
    {
      id: 2,
      title: 'Shopping Cart',
      description: 'Create a simple shopping cart with state management',
      instructions: 'Implement a shopping cart that allows adding products and displays the cart items.',
      difficulty: 'intermediate',
      initialCode: `import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const ShoppingCart = () => {
  // TODO: Create state for cart items
  
  const products = [
    { id: 1, name: 'Phone', price: 699 },
    { id: 2, name: 'Laptop', price: 999 },
    { id: 3, name: 'Headphones', price: 149 },
  ];

  // TODO: Implement addToCart function
  
  // TODO: Calculate cart total

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Products</Text>
      {/* TODO: Add FlatList for products */}
      
      <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 10 }}>Cart</Text>
      {/* TODO: Add FlatList for cart items */}
      
      {/* TODO: Display cart total */}
    </View>
  );
};

export default ShoppingCart;`,
      solutionCode: `import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  
  const products = [
    { id: 1, name: 'Phone', price: 699 },
    { id: 2, name: 'Laptop', price: 999 },
    { id: 3, name: 'Headphones', price: 149 },
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

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
      
      <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 10 }}>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ${item.price}</Text>
        )}
      />
      
      <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 'bold' }}>
        Total: ${cartTotal}
      </Text>
    </View>
  );
};

export default ShoppingCart;`,
      solutionCriteria: [
        'Must use useState for cart management',
        'Must display list of products',
        'Must implement addToCart functionality',
        'Must display cart items',
        'Must calculate and display cart total'
      ],
      hints: [
        'Use useState([]) to initialize empty cart',
        'Create an addToCart function that uses setCartItems',
        'Use reduce() to calculate the cart total',
        'Display two separate FlatLists: one for products and one for cart items'
      ],
      xpReward: 75,
    },
    {
      id: 3,
      title: 'Product Screen with Navigation',
      description: 'Create a product detail screen that uses React Navigation concepts',
      instructions: 'Create a product detail screen that simulates React Navigation\'s route params.',
      difficulty: 'advanced',
      initialCode: `import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

// Simulated route params - in a real app, these would come from React Navigation
const route = {
  params: {
    product: {
      id: 1,
      name: 'Wireless Headphones',
      price: 149,
      description: 'Premium wireless headphones with noise cancellation and 20-hour battery life.',
      image: 'https://example.com/headphones.jpg'
    }
  }
};

const ProductScreen = () => {
  // TODO: Extract product from route params
  
  // TODO: Implement add to cart functionality
  
  // TODO: Create a goBack function (simulate navigation)

  return (
    <View style={styles.container}>
      {/* TODO: Display product details with styling */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  // TODO: Add more styles
});

export default ProductScreen;`,
      solutionCode: `import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';

// Simulated route params - in a real app, these would come from React Navigation
const route = {
  params: {
    product: {
      id: 1,
      name: 'Wireless Headphones',
      price: 149,
      description: 'Premium wireless headphones with noise cancellation and 20-hour battery life.',
      image: 'https://example.com/headphones.jpg'
    }
  }
};

const ProductScreen = () => {
  const { product } = route.params;
  const [inCart, setInCart] = useState(false);
  
  const addToCart = () => {
    setInCart(true);
    Alert.alert('Success', \`Added \${product.name} to cart!\`);
  };
  
  const goBack = () => {
    Alert.alert('Navigation', 'Going back to product list...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="← Back" onPress={goBack} />
      </View>
      
      <View style={styles.imageContainer}>
        <Text style={styles.imagePlaceholder}>Product Image</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      
      <Button 
        title={inCart ? "Added to Cart" : "Add to Cart"} 
        onPress={addToCart}
        disabled={inCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: '#f0f0f0',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  detailsContainer: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#0066cc',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default ProductScreen;`,
      solutionCriteria: [
        'Must extract product from route.params',
        'Must display product details (name, price, description)',
        'Must implement Add to Cart functionality with state',
        'Must have a Back button with goBack function',
        'Must use proper styling with StyleSheet'
      ],
      hints: [
        'Extract the product with const { product } = route.params',
        'Use useState for the cart state',
        'Create styled components for each part of the product details',
        'Simulate navigation with an Alert'
      ],
      xpReward: 100,
    },
  ];
  
  // Initialize user code when level changes
  useEffect(() => {
    setUserCode(gameLevels[currentLevel].initialCode);
    setOutput([]);
    setShowSolution(false);
  }, [currentLevel]);
  
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Analyze the code for specific criteria
    const code = userCode;
    const level = gameLevels[currentLevel];
    const consoleMessages: string[] = [];
    
    // Check if code meets the criteria
    const criteriaResults = checkCodeCriteria(code, level);
    
    // Add results to console output
    consoleMessages.push("=== Code Analysis ===");
    let criteriaMet = 0;
    
    criteriaResults.forEach(result => {
      consoleMessages.push(`${result.passed ? '✓' : '✗'} ${result.criteria}`);
      if (result.passed) criteriaMet++;
    });
    
    const passPercentage = Math.round((criteriaMet / level.solutionCriteria.length) * 100);
    consoleMessages.push(`\nCriteria met: ${criteriaMet}/${level.solutionCriteria.length} (${passPercentage}%)`);
    
    // Check if passed
    if (passPercentage >= 80) {
      consoleMessages.push("\n🎉 Great job! Your solution meets the requirements!");
      
      // Award XP after a delay
      setTimeout(() => {
        addXP(level.xpReward);
        
        toast({
          title: "Level Complete!",
          description: `You earned ${level.xpReward} XP!`,
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
            description: "You've mastered React Native basics!",
            variant: "default",
          });
        }
      }, 1000);
    } else {
      consoleMessages.push("\n⚠️ Your solution doesn't meet all requirements yet. Keep trying!");
    }
    
    // Update the console output
    setOutput(consoleMessages);
    setIsRunning(false);
  };
  
  const checkCodeCriteria = (code: string, level: GameLevel) => {
    return level.solutionCriteria.map(criteria => {
      let passed = false;
      
      // Level 1 specific checks
      if (level.id === 1) {
        if (criteria.includes('FlatList')) {
          passed = code.includes('<FlatList');
        } else if (criteria.includes('product name and price')) {
          passed = code.includes('item.name') && code.includes('item.price');
        } else if (criteria.includes('Add to Cart button')) {
          passed = code.includes('<Button') && code.includes('addToCart');
        } else if (criteria.includes('keyExtractor')) {
          passed = code.includes('keyExtractor');
        }
      }
      
      // Level 2 specific checks
      else if (level.id === 2) {
        if (criteria.includes('useState')) {
          passed = code.includes('useState(');
        } else if (criteria.includes('display list of products')) {
          passed = code.includes('<FlatList') && code.includes('data={products}');
        } else if (criteria.includes('addToCart functionality')) {
          passed = code.includes('addToCart') && code.includes('setCartItems');
        } else if (criteria.includes('display cart items')) {
          passed = code.includes('data={cartItems}');
        } else if (criteria.includes('cart total')) {
          passed = code.includes('cartTotal') && code.includes('reduce(');
        }
      }
      
      // Level 3 specific checks
      else if (level.id === 3) {
        if (criteria.includes('extract product')) {
          passed = code.includes('route.params') && code.includes('product');
        } else if (criteria.includes('display product details')) {
          passed = code.includes('product.name') && code.includes('product.price') && code.includes('product.description');
        } else if (criteria.includes('Add to Cart functionality')) {
          passed = code.includes('useState') && code.includes('addToCart');
        } else if (criteria.includes('Back button')) {
          passed = code.includes('goBack') && code.includes('Back');
        } else if (criteria.includes('StyleSheet')) {
          passed = code.includes('StyleSheet.create');
        }
      }
      
      return { criteria, passed };
    });
  };
  
  const toggleSolution = () => {
    setShowSolution(!showSolution);
    if (!showSolution) {
      toast({
        title: "Solution Revealed",
        description: "Try to understand the solution before moving on.",
        variant: "default",
      });
    }
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
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">React Native Ranger</h1>
                  <p className="text-muted-foreground">
                    Master React Native concepts by building mobile UI components
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
                    <p className="text-blue-700 text-sm">{gameLevels[currentLevel].hints[0]}</p>
                    {gameLevels[currentLevel].hints.length > 1 && (
                      <p className="text-blue-700 text-sm mt-2">{gameLevels[currentLevel].hints[1]}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span>Level {currentLevel + 1}: {gameLevels[currentLevel].title}</span>
                      <div className="ml-2 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {gameLevels[currentLevel].difficulty}
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {gameLevels[currentLevel].description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                      <h3 className="text-sm font-medium mb-2 text-blue-700">Instructions:</h3>
                      <p className="text-sm text-blue-700">{gameLevels[currentLevel].instructions}</p>
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
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setUserCode(gameLevels[currentLevel].initialCode)}
                          className="gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reset Code
                        </Button>
                        <Button
                          variant="outline"
                          onClick={toggleSolution}
                          className="gap-2"
                        >
                          <Code className="w-4 h-4" />
                          {showSolution ? "Hide Solution" : "View Solution"}
                        </Button>
                      </div>
                      
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Run Code
                      </Button>
                    </div>
                    
                    {showSolution && (
                      <div className="mt-6 border border-green-200 rounded-md overflow-hidden">
                        <div className="bg-green-50 p-3">
                          <h3 className="text-sm font-medium text-green-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Solution
                          </h3>
                        </div>
                        <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-x-auto">
                          <pre>{gameLevels[currentLevel].solutionCode}</pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Console Output</CardTitle>
                    <CardDescription>
                      See the results of your code verification
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto max-h-48 overflow-y-auto">
                      {output.length === 0 ? (
                        <span className="text-gray-500">// Run your code to see verification results</span>
                      ) : (
                        output.map((line, index) => (
                          <div key={index} className={`mb-1 ${
                            line.includes('✗') ? 'text-red-400' : 
                            line.includes('✓') ? 'text-green-400' : 
                            line.includes('Great job') ? 'text-green-400 font-bold' : 
                            line.includes('⚠️') ? 'text-yellow-400 font-bold' : 
                            line.includes('===') ? 'text-blue-400 font-bold' : 
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
                    <CardTitle>Challenge Requirements</CardTitle>
                    <CardDescription>
                      Your code should meet these criteria
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {gameLevels[currentLevel].solutionCriteria.map((criterion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Reward:</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <span className="text-xs">{gameLevels[currentLevel].xpReward}</span>
                        </div>
                        <span>XP upon completion</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-yellow-50 p-4 rounded-md">
                      <h3 className="text-sm font-medium text-yellow-800 mb-2">React Native Tip:</h3>
                      <p className="text-xs text-yellow-700">
                        {currentLevel === 0 ? (
                          "FlatList is more efficient than ScrollView for long lists because it only renders items that are currently visible on screen."
                        ) : currentLevel === 1 ? (
                          "When managing cart state, always use the functional update form of setState when the new state depends on the previous state."
                        ) : (
                          "In a real React Native app, you would use React Navigation to handle screen navigation and route parameters."
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      Mobile UI preview (simulated)
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex justify-center">
                    <div className="w-64 h-[420px] bg-white border-8 border-gray-800 rounded-3xl relative overflow-hidden">
                      <div className="h-6 bg-gray-800 flex justify-center items-center">
                        <div className="w-20 h-2 bg-gray-700 rounded-full"></div>
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-gray-400 text-xs italic">
                          (Preview simulated - in a real app, you'd see your component rendered here)
                        </p>
                        
                        {currentLevel === 0 ? (
                          <div className="mt-4 text-left">
                            <p className="text-lg font-bold mb-2">Products</p>
                            <div className="border border-gray-200 p-2 rounded mb-2">
                              <p>Phone - $699</p>
                              <button className="bg-blue-500 text-white rounded text-xs px-2 py-1 mt-1">Add to Cart</button>
                            </div>
                            <div className="border border-gray-200 p-2 rounded mb-2">
                              <p>Laptop - $999</p>
                              <button className="bg-blue-500 text-white rounded text-xs px-2 py-1 mt-1">Add to Cart</button>
                            </div>
                            <div className="border border-gray-200 p-2 rounded">
                              <p>Headphones - $149</p>
                              <button className="bg-blue-500 text-white rounded text-xs px-2 py-1 mt-1">Add to Cart</button>
                            </div>
                          </div>
                        ) : currentLevel === 1 ? (
                          <div className="mt-4 text-left">
                            <p className="text-lg font-bold mb-2">Products</p>
                            <div className="border border-gray-200 p-2 rounded mb-2">
                              <p>Phone - $699</p>
                              <button className="bg-blue-500 text-white rounded text-xs px-2 py-1 mt-1">Add to Cart</button>
                            </div>
                            <p className="text-lg font-bold mt-4 mb-2">Cart</p>
                            <div className="border border-gray-200 p-2 rounded mb-2">
                              <p>Phone - $699</p>
                            </div>
                            <p className="font-bold mt-2">Total: $699</p>
                          </div>
                        ) : (
                          <div className="mt-4 text-left">
                            <button className="text-blue-500 mb-4">← Back</button>
                            <div className="bg-gray-100 h-20 flex items-center justify-center mb-4">
                              <p className="text-gray-400">Product Image</p>
                            </div>
                            <p className="text-lg font-bold">Wireless Headphones</p>
                            <p className="text-blue-500 font-bold">$149</p>
                            <p className="text-sm mt-2 mb-4">Premium wireless headphones with noise cancellation and 20-hour battery life.</p>
                            <button className="bg-blue-500 text-white rounded w-full py-1">Add to Cart</button>
                          </div>
                        )}
                      </div>
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

export default ReactNativeRanger;
