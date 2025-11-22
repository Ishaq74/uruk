import React from 'react';

export const Tooltip: React.FC<{ content: string; children: React.ReactNode; className?: string }> = ({ content, children, className }) => {
  return (
    <div className={`relative group inline-block ${className}`}>
      {children}
      <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
