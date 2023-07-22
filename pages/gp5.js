import React from 'react';
import { useEffect } from 'react';
import html2pdf from 'html2pdf.js';

const CreatePDF = () => {
  useEffect(() => {
    const createPDF = () => {
      const element = document.createElement('div');
      element.innerHTML = `
        <html>
          <body>
            <h1>PDF Example</h1>
            <p>Hello, world!</p>
            <p>This PDF is generated from HTML in Next.js.</p>
          </body>
        </html>
      `;

      html2pdf().from(element).save('generated.pdf');
    };

    createPDF();
  }, []);

  return (
    <div>
      <h1>Create PDF from HTML</h1>
    </div>
  );
};

export default CreatePDF;
