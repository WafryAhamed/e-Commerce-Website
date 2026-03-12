import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverable = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverable
            ? {
                y: -4,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        className={`bg-surface border border-subtle/30 rounded-xl overflow-hidden ${
          hoverable
            ? 'hover:border-subtle/60 hover:shadow-lg hover:shadow-black/20 transition-colors'
            : ''
        } ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';