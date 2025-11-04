
// This tells TypeScript that PDFLib is available as a global variable
// from the script loaded in index.html.
declare const PDFLib: any;

/**
 * Merges an array of PDF files into a single PDF.
 * @param files An array of File objects, expected to be PDFs.
 * @returns A promise that resolves with a Uint8Array of the merged PDF.
 */
export const mergePdfs = async (files: File[]): Promise<Uint8Array> => {
  if (!files || files.length === 0) {
    throw new Error("No files provided to merge.");
  }
  
  if (typeof PDFLib === 'undefined' || typeof PDFLib.PDFDocument === 'undefined') {
    throw new Error('pdf-lib is not loaded. Please check the script tag in your HTML file.');
  }
  
  const { PDFDocument } = PDFLib;

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    try {
      const fileBuffer = await file.arrayBuffer();
      // We pass { ignoreEncryption: true } to handle some encrypted files, though fully encrypted files might still fail.
      const pdfDoc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    } catch(e) {
      console.error(`Skipping file ${file.name} due to an error:`, e);
      throw new Error(`Could not process "${file.name}". The file might be corrupted or encrypted.`);
    }
  }

  const mergedPdfBytes = await mergedPdf.save();
  return mergedPdfBytes;
};
