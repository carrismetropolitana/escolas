const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

let browser;

app.get('/generate-pdf', async (req, res) => {
  try {
    const url = req.query.url; // Get the 'url' parameter from the query

    if (!url) {
      return res.status(400).send('URL parameter is missing');
    }

    const page = await browser.newPage();

    // Web site URL to export as pdf
    const website_url = url;

    // Open URL in the current page
    await page.goto(website_url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForTimeout(5000); // Wait for 5 seconds after the page is loaded

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Download the PDF
    const resultPdf = await page.pdf({
   //   path: 'generated-pdf.pdf', // Optional: Save the PDF to a file for debugging
      printBackground: true,
      format: 'A4',
    });

    // Close the browser instance
    await page.close();

    console.log('🟢 → Request for "%s": OK', url);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(resultPdf);
  } catch (err) {
    console.error('🔴 → Request for "%s": Server Error', req.query.url, err);
    res.status(500).send([]);
  }
});

const PORT = 5050;
app.listen(PORT, async () => {
  console.log('PDF Generator listening on port %s...', PORT);
  console.log();

  browser = await puppeteer.launch({
    headless: true, // Enable headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
});
