import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from 'sonner';
export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        isLogin ? 'Logged in successfully' : 'Account created successfully'
      );
      navigate('/');
    }, 1500);
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="w-full max-w-md bg-surface border border-subtle/30 rounded-2xl p-8 shadow-2xl shadow-black/50">

        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent-gold flex items-center justify-center text-background">
            <Laptop className="w-7 h-7" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="text-center text-body mb-8">
          {isLogin ?
          'Enter your details to access your account.' :
          'Join TechVault for a premium experience.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin &&
            <motion.div
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}>

                <Input
                label="Full Name"
                placeholder="John Doe"
                leftIcon={<User className="w-4 h-4" />}
                required={!isLogin} />

              </motion.div>
            }
          </AnimatePresence>

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            required />


          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              required />

            {isLogin &&
            <div className="flex justify-end mt-2">
                <a
                href="#"
                className="text-xs text-accent-blue hover:text-accent-blueHover transition-colors">

                  Forgot password?
                </a>
              </div>
            }
          </div>

          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-body">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent-gold hover:text-accent-goldHover font-medium transition-colors">

              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>);

}