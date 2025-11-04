
import React from 'react';
import { MergeIcon, DownloadIcon, ClearIcon, LoadingIcon } from './icons';

interface ActionButtonsProps {
  fileCount: number;
  isMerging: boolean;
  downloadUrl: string | null;
  onMerge: () => void;
  onClear: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  fileCount,
  isMerging,
  downloadUrl,
  onMerge,
  onClear,
}) => {
  const hasFiles = fileCount > 0;

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {fileCount} {fileCount === 1 ? 'file' : 'files'} selected.
      </div>
      <div className="flex items-center gap-3">
        {hasFiles && (
          <button
            onClick={onClear}
            disabled={isMerging}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ClearIcon className="w-4 h-4" />
            Clear
          </button>
        )}
        {downloadUrl ? (
          <a
            href={downloadUrl}
            download="merged.pdf"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <DownloadIcon className="w-4 h-4" />
            Download Merged PDF
          </a>
        ) : (
          <button
            onClick={onMerge}
            disabled={isMerging || fileCount < 2}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
          >
            {isMerging ? (
              <LoadingIcon className="w-4 h-4 animate-spin" />
            ) : (
              <MergeIcon className="w-4 h-4" />
            )}
            {isMerging ? 'Merging...' : 'Merge PDFs'}
          </button>
        )}
      </div>
    </div>
  );
};
