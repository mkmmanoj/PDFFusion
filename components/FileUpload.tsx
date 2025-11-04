
import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onFilesAdded: (files: FileList) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesAdded(event.target.files);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Keep it true while hovering
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(e.dataTransfer.files);
    }
  }, [onFilesAdded]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`flex flex-col items-center justify-center p-8 md:p-12 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
          : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800/60'
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center text-center">
        <UploadIcon className="w-12 h-12 mb-4 text-slate-400 dark:text-slate-500" />
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          Drop your PDFs here or <span className="text-indigo-500 dark:text-indigo-400">browse</span>
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Select multiple PDF files to get started.</p>
      </div>
    </div>
  );
};
