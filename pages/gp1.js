import React from 'react';
import jsPDF from 'jspdf';

const GeneratePDF = () => {
  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Hello World', 105, 80);
    pdf.save('generated.pdf');
  };

  return (
    <div>
      <h1>Generate PDF</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default GeneratePDF;
