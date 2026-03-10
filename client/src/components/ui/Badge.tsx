import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gold' | 'blue';
  className?: string;
}
export function Badge({
  children,
  variant = 'default',
  className = ''
}: BadgeProps) {
  const variants = {
    default: 'bg-elevated text-body border-subtle/30',
    success:
    'bg-status-success/10 text-status-success border-status-success/20',
    warning:
    'bg-status-warning/10 text-status-warning border-status-warning/20',
    error: 'bg-status-error/10 text-status-error border-status-error/20',
    gold: 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
    blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20'
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>

      {children}
    </span>);

}