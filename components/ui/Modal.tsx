import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        className={`bg-white rounded-lg shadow-xl m-4 relative w-full ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export const ModalHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`p-6 border-b ${className}`}>{children}</div>
);

export const ModalTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>
);

export const ModalDescription: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <p className={`mt-1 text-sm text-gray-500 ${className}`}>{children}</p>
);

export const ModalBody: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`p-6 ${className}`}>{children}</div>
);

export const ModalFooter: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`p-6 border-t flex justify-end space-x-2 bg-gray-50 rounded-b-lg ${className}`}>{children}</div>
);
