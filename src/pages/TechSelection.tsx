
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Smartphone, Server, Database, Brain, Check, ChevronRight } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface TechPath {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  technologies: Technology[];
}

interface Technology {
  id: string;
  name: string;
  icon: string;
  description: string;
  gamePath?: string;
}

const TechSelection = () => {
  const { stats, levelProgress } = useProgress();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const techPaths: TechPath[] = [
    {
      id: 'web',
      name: 'Web Development',
      description: 'Learn to build responsive websites and web applications',
      icon: Code,
      color: 'bg-tech-web',
      technologies: [
        { 
          id: 'html-css', 
          name: 'HTML & CSS', 
          icon: '🌐', 
          description: 'The building blocks of the web',
          gamePath: '/games/html-blueprint'
        },
        { 
          id: 'javascript', 
          name: 'JavaScript', 
          icon: '📜', 
          description: 'Add interactivity to your websites',
          gamePath: '/games/js-commander'
        },
        { 
          id: 'react', 
          name: 'React', 
          icon: '⚛️', 
          description: 'Build modern user interfaces' 
        },
        { 
          id: 'nextjs', 
          name: 'Next.js', 
          icon: '▲', 
          description: 'Full-stack React framework' 
        },
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      description: 'Create apps for iOS and Android devices',
      icon: Smartphone,
      color: 'bg-tech-mobile',
      technologies: [
        { 
          id: 'react-native', 
          name: 'React Native', 
          icon: '📱', 
          description: 'Cross-platform mobile apps with React',
          gamePath: '/games/react-native-ranger'
        },
        { 
          id: 'flutter', 
          name: 'Flutter', 
          icon: '🦋', 
          description: 'Google\'s UI toolkit for mobile',
          gamePath: '/games/flutter-forge' 
        },
        { 
          id: 'swift', 
          name: 'Swift', 
          icon: '🍎', 
          description: 'Native iOS development' 
        },
        { 
          id: 'kotlin', 
          name: 'Kotlin', 
          icon: '🤖', 
          description: 'Modern Android development' 
        },
      ]
    },
    {
      id: 'backend',
      name: 'Backend Development',
      description: 'Build APIs, servers, and application logic',
      icon: Server,
      color: 'bg-tech-backend',
      technologies: [
        { 
          id: 'nodejs', 
          name: 'Node.js', 
          icon: '🟢', 
          description: 'JavaScript runtime for server-side development' 
        },
        { 
          id: 'python', 
          name: 'Python', 
          icon: '🐍', 
          description: 'Versatile language for backends and more' 
        },
        { 
          id: 'java', 
          name: 'Java', 
          icon: '☕', 
          description: 'Enterprise-grade backend development' 
        },
        { 
          id: 'golang', 
          name: 'Go', 
          icon: '🐹', 
          description: 'Fast, statically typed language' 
        },
      ]
    },
    {
      id: 'data',
      name: 'Data Science',
      description: 'Analyze data and build machine learning models',
      icon: Database,
      color: 'bg-tech-data',
      technologies: [
        { 
          id: 'python-data', 
          name: 'Python for Data', 
          icon: '📊', 
          description: 'Python with pandas, NumPy, and more' 
        },
        { 
          id: 'sql', 
          name: 'SQL', 
          icon: '🗄️', 
          description: 'Query and manipulate databases' 
        },
        { 
          id: 'tableau', 
          name: 'Tableau', 
          icon: '📈', 
          description: 'Data visualization and analytics' 
        },
        { 
          id: 'r', 
          name: 'R', 
          icon: '📉', 
          description: 'Statistical computing and graphics' 
        },
      ]
    },
    {
      id: 'ai',
      name: 'AI & Machine Learning',
      description: 'Build intelligent systems and models',
      icon: Brain,
      color: 'bg-tech-ai',
      technologies: [
        { 
          id: 'ml-basics', 
          name: 'ML Fundamentals', 
          icon: '🧠', 
          description: 'Core concepts of machine learning' 
        },
        { 
          id: 'tensorflow', 
          name: 'TensorFlow', 
          icon: '🔢', 
          description: 'Google\'s ML framework' 
        },
        { 
          id: 'pytorch', 
          name: 'PyTorch', 
          icon: '🔥', 
          description: 'Facebook\'s ML framework' 
        },
        { 
          id: 'nlp', 
          name: 'NLP', 
          icon: '💬', 
          description: 'Natural language processing' 
        },
      ]
    }
  ];
  
  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    setSelectedTechnologies([]);
  };
  
  const handleTechToggle = (techId: string) => {
    const selectedTech = techPaths.find(path => path.id === selectedPath)?.technologies.find(tech => tech.id === techId);
    
    // If the technology has a game path, navigate to it directly
    if (selectedTech?.gamePath) {
      navigate(selectedTech.gamePath);
      return;
    }
    
    setSelectedTechnologies(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };
  
  const handleContinue = () => {
    if (selectedTechnologies.length === 0) {
      toast({
        title: "Select at least one technology",
        description: "Please choose at least one technology to continue",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Learning path selected!",
      description: "Your customized learning journey is ready",
    });
    
    navigate('/learning-path');
  };
  
  const selectedPathData = techPaths.find(path => path.id === selectedPath);

  return (
    <AnimatedTransition variant="fade">
      <div className="min-h-screen bg-gray-50">
        <Navbar userProgress={{ level: stats.level, xp: stats.xp, levelProgress }} />
        
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-bold mb-4">Choose Your Tech Path</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Select a technology path to focus on, then choose specific technologies to master.
              </p>
            </div>
            
            {!selectedPath ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techPaths.map((path, index) => {
                  const Icon = path.icon;
                  return (
                    <motion.div 
                      key={path.id}
                      className="glass-card rounded-xl overflow-hidden cursor-pointer"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => handlePathSelect(path.id)}
                    >
                      <div className="p-6">
                        <div className={`w-14 h-14 rounded-lg ${path.color} text-white flex items-center justify-center mb-4`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{path.name}</h3>
                        <p className="text-muted-foreground">{path.description}</p>
                      </div>
                      <div className="px-6 pb-6 pt-2 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {path.technologies.length} technologies
                        </span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <button 
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setSelectedPath(null)}
                  >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                    Back to all paths
                  </button>
                  <Button 
                    onClick={handleContinue} 
                    disabled={selectedTechnologies.length === 0}
                  >
                    Continue
                  </Button>
                </div>
                
                {selectedPathData && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-lg ${selectedPathData.color} text-white flex items-center justify-center`}>
                        <selectedPathData.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedPathData.name}</h2>
                        <p className="text-muted-foreground">{selectedPathData.description}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Select Technologies</h3>
                    <p className="text-muted-foreground mb-6">Choose one or more technologies to add to your learning path</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPathData.technologies.map((tech, index) => (
                        <motion.div 
                          key={tech.id}
                          className={`border rounded-xl p-5 cursor-pointer transition-all ${
                            selectedTechnologies.includes(tech.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-white'
                          }`}
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          onClick={() => handleTechToggle(tech.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-md flex items-center justify-center text-2xl bg-gray-100">
                                {tech.icon}
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium">{tech.name}</h4>
                                <p className="text-sm text-muted-foreground">{tech.description}</p>
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              selectedTechnologies.includes(tech.id)
                                ? 'bg-primary text-white'
                                : 'border border-gray-200'
                            }`}>
                              {selectedTechnologies.includes(tech.id) && <Check className="w-4 h-4" />}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default TechSelection;
