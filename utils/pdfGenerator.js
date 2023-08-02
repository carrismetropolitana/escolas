const puppeteer = require('puppeteer');
const express = require('express');
const { NextApiRequest, NextApiResponse } = require('next');


let browser;

const app = express();
const PORT = 5052; // Change this port to avoid conflicts


app.get('/generate-pdf', async (req, res) => {
  try {
    const url = req.query.url; // Get the 'url' parameter from the query
    const schoolName = req.query.schoolName; // Get the 'schoolName' parameter from the query

    if (!url) {
      return res.status(400).send('URL parameter is missing');
    }

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 1000 });

    // Espera 1s para ter tempo de carregar toda a pagina antes de a gravar em PDF
    // await page.waitForTimeout(1000); 
    
    // use screen CSS instead of print
    await page.emulateMediaType('screen');

    // Download the PDF
    const resultPdf = await page.pdf({
      printBackground: true,
      format: 'A4',
    });

    // Close the browser instance
    await page.close();

    console.log('🟢 → Request for "%s": OK', url);

    const filename=`${schoolName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}_paragens_CarrisMetropolitana.pdf`

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(resultPdf);

  } catch (err) {
    console.error('🔴 → Request for "%s": Server Error', req.query.url, err);
    res.status(500).send([]);
  }
});

app.listen(PORT, async () => {
  console.log('PDF Generator listening on port %s...', PORT);
  console.log();

  browser = await puppeteer.launch({
    headless: 'new', // Enable headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
});
