import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  border = true,
  shadow = true
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };

  const borderStyle = border ? 'border border-gray-200' : '';
  const shadowStyle = shadow ? 'shadow-md' : '';

  return (
    <div className={`bg-white rounded-lg ${paddingStyles[padding]} ${borderStyle} ${shadowStyle} ${className}`}>
      {children}
    </div>
  );
};

export default Card;