// components/PDFDownloadButton/PDFDownloadButton.js

import React from 'react';

const PDFDownloadButton = ({ url }) => {


  // Check if the window object is available (client-side)
  if (typeof window === 'undefined') {
    return null;
  }

  const handleDownload = async () => {
    try {
      console.log('PDF Download button clicked with URL:', url);
      console.log(`will fetch: /api/pdfGenerator/generate-pdf?url=${encodeURIComponent(url)}`)

      const response = await fetch(`http://localhost:5051/pdfGenerator/generate-pdf?url=${encodeURIComponent(url)}`);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'generated-pdf.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};

export default PDFDownloadButton;
