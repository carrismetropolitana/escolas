import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DownloadPDF = () => {
  const pdfUrl = '/pdf.pdf';

  return (
    <div>
      <h1>Download PDF</h1>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
      <a href={pdfUrl} download="document.pdf">
        Download PDF
      </a>
    </div>
  );
};

export default DownloadPDF;
