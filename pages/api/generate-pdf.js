import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Disposition', 'attachment; filename="component.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).end();
  }
}
