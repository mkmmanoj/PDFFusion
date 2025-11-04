
import React, { useState, useCallback } from 'react';
import type { UploadedFile } from './types';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { ActionButtons } from './components/ActionButtons';
import { mergePdfs } from './services/pdfService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const App: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesAdded = useCallback((newFiles: FileList) => {
    setError(null);
    setMergedPdfUrl(null);
    const addedFiles: UploadedFile[] = Array.from(newFiles)
      .filter(file => file.type === 'application/pdf')
      .map(file => ({
        id: crypto.randomUUID(),
        file,
      }));
    setFiles(prevFiles => [...prevFiles, ...addedFiles]);
  }, []);

  const handleReorder = useCallback((reorderedFiles: UploadedFile[]) => {
    setFiles(reorderedFiles);
  }, []);

  const handleRemoveFile = useCallback((fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    if (files.length <= 1) {
      setMergedPdfUrl(null);
    }
  }, [files.length]);
  
  const handleClear = useCallback(() => {
    setFiles([]);
    setMergedPdfUrl(null);
    setIsMerging(false);
    setError(null);
  }, []);

  const handleMergePdfs = async () => {
    if (files.length < 2) {
      setError("Please upload at least two PDF files to merge.");
      return;
    }
    setIsMerging(true);
    setError(null);
    setMergedPdfUrl(null);

    try {
      const pdfBytes = await mergePdfs(files.map(f => f.file));
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during merging.";
      setError(`Failed to merge PDFs. ${errorMessage}`);
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <FileUpload onFilesAdded={handleFilesAdded} />

          {files.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Your Files</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Drag and drop to reorder the files before merging.</p>
              <FileList files={files} onReorder={handleReorder} onRemove={handleRemoveFile} />
            </div>
          )}

          <ActionButtons
            fileCount={files.length}
            isMerging={isMerging}
            downloadUrl={mergedPdfUrl}
            onMerge={handleMergePdfs}
            onClear={handleClear}
          />

          {error && (
             <Toast message={error} type="error" onClose={() => setError(null)} />
          )}
           {mergedPdfUrl && (
             <Toast message="PDFs merged successfully! You can now download the file." type="success" onClose={() => {}} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
