import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          height: 0,
          opacity: 0
        }}
        animate={{
          height: 'auto',
          opacity: 1
        }}
        exit={{
          height: 0,
          opacity: 0
        }}
        className="bg-accent-gold text-background relative z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center relative">
          <p className="text-sm font-medium text-center">
            Free shipping on orders over $99 | 30-day hassle-free returns
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Dismiss announcement">

            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>);

}