
import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-8 h-8 text-indigo-500" />
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              PDF Fusion
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
