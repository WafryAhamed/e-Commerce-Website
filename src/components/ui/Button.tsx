import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
  {
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  },
  ref) =>
  {
    const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
      primary:
      'bg-accent-gold text-background hover:bg-accent-goldHover focus:ring-accent-gold',
      secondary:
      'bg-surface text-primary hover:bg-elevated border border-subtle/30 focus:ring-subtle',
      outline:
      'bg-transparent text-primary border border-subtle hover:border-muted hover:bg-surface focus:ring-subtle',
      ghost:
      'bg-transparent text-body hover:text-primary hover:bg-surface focus:ring-subtle',
      danger:
      'bg-status-error/10 text-status-error hover:bg-status-error/20 border border-status-error/20 focus:ring-status-error'
    };
    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5',
      icon: 'p-2'
    };
    return (
      <motion.button
        ref={ref}
        whileTap={{
          scale: disabled || isLoading ? 1 : 0.98
        }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}>

        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>);

  }
);
Button.displayName = 'Button';