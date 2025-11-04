
import React, { useEffect, useState } from 'react';
import { SuccessIcon, ErrorIcon } from './icons';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    if (type === 'error') {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, type, onClose]);

  const bgColor = type === 'success' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50';
  const textColor = type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className={`fixed bottom-5 right-5 transition-all duration-300 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${bgColor} ${textColor}`}>
        <div className={`flex-shrink-0 ${iconColor}`}>
          {type === 'success' ? <SuccessIcon className="w-5 h-5" /> : <ErrorIcon className="w-5 h-5" />}
        </div>
        <div className="ml-3 text-sm font-medium">{message}</div>
        {type === 'error' && (
          <button onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-red-900/50 inline-flex" aria-label="Dismiss">
            <span className="sr-only">Dismiss</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        )}
      </div>
    </div>
  );
};
