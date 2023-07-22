import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const htmlContent = `
    <html>
      <body>
        <h1>PDF Example</h1>
        <p>Hello, world!</p>
        <p>This PDF is generated from HTML in Next.js.</p>
      </body>
    </html>
  `;

  const options = {
    format: 'Letter',
    border: {
      top: '1cm',
      right: '1cm',
      bottom: '1cm',
      left: '1cm'
    },
  };

  pdf.create(htmlContent, options).toBuffer((err, buffer) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    const filePath = path.join(process.cwd(), 'public', 'generated.pdf');
    fs.writeFile(filePath, buffer, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).end();
      }

      return res.status(200).json({ success: true });
    });
  });
}
