import React from 'react';
import puppeteer from 'puppeteer';

const SaveAsPDF = () => {
  const saveAsPDF = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://quartetoarabesco.com/index.htm?quarteto', { waitUntil: 'networkidle0' });

    await page.pdf({
      path: 'document.pdf',
      format: 'A4',
    });

    await browser.close();
  };

  return (
    <div>
      <h1>Save as PDF</h1>
      <button onClick={saveAsPDF}>Save as PDF</button>
    </div>
  );
};

export default SaveAsPDF;
