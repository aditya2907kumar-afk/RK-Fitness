import React from 'react';

interface SmoothRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SmoothReveal: React.FC<SmoothRevealProps> = ({
  children,
  className = '',
}) => {
  return <div className={`transition-all duration-700 ${className}`}>{children}</div>;
};

export default SmoothReveal;
