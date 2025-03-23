
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut, Home, BookOpen, Award, BarChart } from 'lucide-react';
import ProgressRing from './ProgressRing';

interface NavbarProps {
  userProgress?: {
    level: number;
    xp: number;
    levelProgress: number;
  };
}

const Navbar: React.FC<NavbarProps> = ({ userProgress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const isAuthenticated = location.pathname !== '/' && location.pathname !== '/auth';

  return (
    <header 
      className={cn(
        'fixed w-full z-40 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            <motion.div 
              className="flex items-center gap-2" 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl font-bold tracking-tight">CodeQuest</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === '/dashboard' 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}>
                  Dashboard
                </Link>
                <Link to="/tech-selection" className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === '/tech-selection' 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}>
                  Tech Paths
                </Link>
                <Link to="/learning-path" className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === '/learning-path' 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}>
                  Learning
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </>
            )}
          </nav>

          {/* User Profile or Auth Button */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && userProgress ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ProgressRing progress={userProgress.levelProgress} size={40} strokeWidth={3}>
                    <span className="text-xs font-semibold">{userProgress.level}</span>
                  </ProgressRing>
                  <div className="text-xs">
                    <p className="font-medium">Level {userProgress.level}</p>
                    <p className="text-muted-foreground">{userProgress.xp} XP</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-border"></div>
                <Link to="/profile" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                  <User className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <Link to="/auth" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col p-4 gap-4">
              {isAuthenticated ? (
                <>
                  {userProgress && (
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-2">
                      <ProgressRing progress={userProgress.levelProgress} size={48} strokeWidth={3}>
                        <span className="text-sm font-semibold">{userProgress.level}</span>
                      </ProgressRing>
                      <div className="ml-4">
                        <p className="font-medium">Level {userProgress.level}</p>
                        <p className="text-muted-foreground text-sm">{userProgress.xp} XP</p>
                      </div>
                    </div>
                  )}
                  <Link to="/dashboard" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/tech-selection" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <BookOpen className="w-5 h-5" />
                    <span>Tech Paths</span>
                  </Link>
                  <Link to="/learning-path" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <BarChart className="w-5 h-5" />
                    <span>Learning</span>
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-red-500">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                  <Link to="/auth" className="p-3 rounded-lg bg-primary text-primary-foreground font-medium text-center">
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
