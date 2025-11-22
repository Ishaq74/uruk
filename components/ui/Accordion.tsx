import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-700"
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className="pb-4 text-gray-600">{children}</div>}
    </div>
  );
};

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="border rounded-md">{children}</div>;
};

export default Accordion;
