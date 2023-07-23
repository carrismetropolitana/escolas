const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.get('/generate-pdf', async (req, res) => {
  try {
    const url = req.query.url; // Get the 'url' parameter from the query
    if (!url) {
      return res.status(400).send('URL parameter is missing');
    }

    const urlToConvert = encodeURIComponent(url);
    const pdfBuffer = await fetch(`http://localhost:5050/generate-pdf?url=${urlToConvert}`).then((response) =>
      response.buffer()
    );

    // Set the response header to force download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="generated-pdf.pdf"`);

    // Send the PDF as a response
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
