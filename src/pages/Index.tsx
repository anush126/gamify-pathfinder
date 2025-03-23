
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Trophy, BarChart3, ArrowUpRight } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    className="glass-card rounded-xl p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const Index = () => {
  return (
    <AnimatedTransition variant="fade">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-28 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                  Learn coding through gamification
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                  Master coding with <span className="text-primary">playful</span> learning
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                  CodeQuest transforms coding education through gamification. Earn XP, unlock achievements, and 
                  level up your development skills with our interactive learning paths.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/auth" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                    Start Your Journey <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#features" className="px-6 py-3 rounded-lg border border-border hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                    Learn More <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-xl blur-xl opacity-50"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500"></div>
                    <div className="p-1">
                      <img 
                        src="https://cdn.discordapp.com/attachments/1191542040611905598/1218629408518234262/learning_dashboard.png?ex=66091f4b&is=65f6aa4b&hm=7fe8d4f0c25af647b23b0b56d7e7dde6b5d16ac36eda4dc8cd4ead14fbfa0f53&" 
                        alt="CodeQuest Dashboard Preview" 
                        className="rounded-lg w-full h-auto object-cover shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Learn through play, achieve through practice
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Our platform combines serious learning with game mechanics to keep you engaged and motivated
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Zap}
                title="Engaging Learning Paths"
                description="Follow structured learning paths tailored to your chosen tech stack and skill level."
                delay={0.2}
              />
              <FeatureCard 
                icon={Trophy}
                title="Achievement System"
                description="Earn badges, trophies, and rewards as you complete challenges and master new concepts."
                delay={0.3}
              />
              <FeatureCard 
                icon={Code}
                title="Interactive Coding Challenges"
                description="Practice with hands-on coding challenges designed to reinforce learning and build real skills."
                delay={0.4}
              />
              <FeatureCard 
                icon={BarChart3}
                title="Progress Tracking"
                description="Monitor your growth with detailed analytics and visualize your journey from beginner to pro."
                delay={0.5}
              />
              <FeatureCard 
                icon={Zap}
                title="Streak System"
                description="Build consistent learning habits with daily streak tracking and bonus rewards."
                delay={0.6}
              />
              <FeatureCard 
                icon={Trophy}
                title="Competitive Leaderboards"
                description="Compare your progress with peers and climb the ranks as you level up your skills."
                delay={0.7}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-blue-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-12 text-center">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  Ready to start your coding adventure?
                </motion.h2>
                <motion.p 
                  className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Join thousands of learners who have transformed their coding skills through our gamified platform.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Link to="/auth" className="px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 text-lg">
                    Begin Your Quest <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <span className="text-xl font-bold text-primary">CodeQuest</span>
                <p className="text-muted-foreground mt-2">© 2023 CodeQuest. All rights reserved.</p>
              </div>
              <div className="flex gap-8">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
