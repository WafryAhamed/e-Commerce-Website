import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
  { className = '', label, error, leftIcon, rightIcon, id, ...props },
  ref) =>
  {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label &&
        <label htmlFor={inputId} className="text-sm font-medium text-primary">
            {label}
          </label>
        }
        <div className="relative flex items-center">
          {leftIcon &&
          <div className="absolute left-3 text-muted pointer-events-none">
              {leftIcon}
            </div>
          }
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full bg-surface border border-subtle/50 rounded-lg text-primary placeholder:text-muted
              focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              ${error ? 'border-status-error focus:ring-status-error/50 focus:border-status-error' : ''}
              ${className}
            `}
            style={{
              height: '42px'
            }}
            {...props} />

          {rightIcon &&
          <div className="absolute right-3 text-muted">{rightIcon}</div>
          }
        </div>
        {error &&
        <motion.p
          initial={{
            opacity: 0,
            y: -5
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="text-xs text-status-error mt-0.5">

            {error}
          </motion.p>
        }
      </div>);

  }
);
Input.displayName = 'Input';