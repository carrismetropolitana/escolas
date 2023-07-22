import React from 'react';
import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GeneratePDF = () => {
  useEffect(() => {
    const generatePDF = async () => {
      const contentElement = document.getElementById('pdf-content');

      const canvas = await html2canvas(contentElement);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('generated.pdf');
    };

    generatePDF();
  }, []);

  return (
    <div>
      <h1>Generate PDF</h1>
      <div id="pdf-content">
        {/* Replace with your HTML content */}
        <h2>Hello World</h2>
        <p>This is my HTML content to be converted to PDF.</p>
      </div>
    </div>
  );
};

export default GeneratePDF;
