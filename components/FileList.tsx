
import React, { useState, useCallback } from 'react';
import type { UploadedFile } from '../types';
import { PdfIcon, DragHandleIcon, TrashIcon } from './icons';

interface FileListProps {
  files: UploadedFile[];
  onReorder: (files: UploadedFile[]) => void;
  onRemove: (fileId: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onReorder, onRemove }) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedItemId(id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (id !== draggedItemId) {
        setDropTargetId(id);
    }
  }, [draggedItemId]);

  const handleDragLeave = useCallback(() => {
    setDropTargetId(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (!draggedItemId || draggedItemId === targetId) return;

    const newFiles = [...files];
    const draggedIndex = newFiles.findIndex(f => f.id === draggedItemId);
    const targetIndex = newFiles.findIndex(f => f.id === targetId);

    const [removed] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(targetIndex, 0, removed);
    
    onReorder(newFiles);
    setDraggedItemId(null);
    setDropTargetId(null);
  }, [draggedItemId, files, onReorder]);

   const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
    setDropTargetId(null);
  }, []);

  return (
    <div className="space-y-3">
      {files.map((uploadedFile, index) => (
        <div
          key={uploadedFile.id}
          draggable
          onDragStart={(e) => handleDragStart(e, uploadedFile.id)}
          onDragOver={(e) => handleDragOver(e, uploadedFile.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, uploadedFile.id)}
          onDragEnd={handleDragEnd}
          className={`
            flex items-center p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-sm transition-all duration-200
            ${draggedItemId === uploadedFile.id ? 'opacity-50 cursor-grabbing' : 'cursor-grab'}
          `}
        >
          <div className="flex items-center flex-grow">
            <DragHandleIcon className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
            <div className={`
                w-1 h-8 rounded-full mr-3
                ${dropTargetId === uploadedFile.id ? 'bg-indigo-500' : 'bg-transparent'}
                transition-colors duration-200
            `}></div>
            <PdfIcon className="w-6 h-6 mr-3 text-red-500" />
            <span className="flex-grow text-sm text-slate-700 dark:text-slate-300 truncate" title={uploadedFile.file.name}>
              {uploadedFile.file.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-3 whitespace-nowrap">
              {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <button
            onClick={() => onRemove(uploadedFile.id)}
            className="ml-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label={`Remove ${uploadedFile.file.name}`}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};
