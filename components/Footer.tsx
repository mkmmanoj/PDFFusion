
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} PDF Fusion. All files are processed locally in your browser.
        </p>
      </div>
    </footer>
  );
};
