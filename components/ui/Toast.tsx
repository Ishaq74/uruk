import React from 'react';

export const useToast = () => {
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return { toast, showToast };
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Can be extended to manage multiple toasts
  return <>{children}</>;
};

export const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  const baseClasses = 'fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg text-white';
  const typeClasses = type === 'success' ? 'bg-emerald-500' : 'bg-rose-500';

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold">X</button>
    </div>
  );
};

export default Toast;
