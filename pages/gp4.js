import React from 'react';
import html2pdf from 'html2pdf.js';

const SaveHTMLAsPDF = () => {
  const saveAsPDF = () => {
    const element = document.getElementById('html-content');

    const opt = {
      margin: 0.5,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <h1>Save HTML as PDF</h1>
      <button onClick={saveAsPDF}>Save as PDF</button>
      <div id="html-content">
        {/* Replace with your HTML content */}
        <h2>Hello World</h2>
        <p>This is my HTML content to be saved as a PDF.</p>
      </div>
    </div>
  );
};

export default SaveHTMLAsPDF;
