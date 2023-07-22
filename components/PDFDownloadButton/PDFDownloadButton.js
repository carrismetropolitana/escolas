import React from 'react';
import axios from 'axios';

const PDFDownloadButton = ({ html }) => {
  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post('/api/html-to-pdf', { html }, { responseType: 'arraybuffer' });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'component.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div onClick={handleDownloadPDF} style={{ width: '100%', background: 'black', color: 'white', padding: '3ch' }}>
      FAÇA DOWNLOAD DO PDF INFORMATIVO
    </div>
  );
};

export default PDFDownloadButton;
