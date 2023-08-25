import puppeteer from 'puppeteer';

/* * */
/* GENERATE PDF */
/* Explanation needed. */
/* * */

let BROSWER_INSTANCE;

export default async function handler(req, res) {
  //

  try {
    // 0.
    // Refuse request if not GET

    if (req.method != 'GET') {
      await res.setHeader('Allow', ['GET']);
      return await res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
    }

    // 1.
    // Setup a new browser instance only if it is not yet created

    if (!BROSWER_INSTANCE) {
      BROSWER_INSTANCE = await puppeteer.launch({
        headless: 'new', // Enable headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    }

    // 2.
    // Check if required parameters are set

    if (!req.query.school_code) return res.status(400).send('Parameter "school_code" is missing.');

    // 3.
    // Validate the query parameters to avoid abuse

    const validatedSchoolCode = req.query.school_code;

    // 4.
    // Fetch school data

    const schoolResponse = await fetch(`https://api.carrismetropolitana.pt/facilities/schools/${validatedSchoolCode}`);
    const schoolData = await schoolResponse.json();

    if (!schoolData) return res.status(404).send(`School with code "${validatedSchoolCode}" not found.`);

    // 4.
    // Setup the final PDF filename

    const filename = `${schoolData.name}_paragens_CarrisMetropolitana.pdf`;

    // 5.
    // Visit the page where the PDF will be rendered

    const browserPage = await BROSWER_INSTANCE.newPage();
    await browserPage.goto(`https://escolas.carrismetropolitana.pt/${validatedSchoolCode}/render`, { waitUntil: 'networkidle0', timeout: 20000 });
    await browserPage.emulateMediaType('screen');

    // 6.
    // Render the PDF

    const renderedPdfData = await browserPage.pdf({ printBackground: true, format: 'A4' });

    // 5.
    // Send the result to the client

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(renderedPdfData);

    // 5.
    // Log operation details

    console.log('🟢 → Request for "%s": OK', req.query.school_code);

    //
  } catch (err) {
    console.error('🔴 → Request for "%s": Server Error', req.query.school_code, err);
    res.status(500).send('');
  }

  //
}
