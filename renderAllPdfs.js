const fs = require('fs');

(async function renderAllPdfs() {
  //

  let erroredSchooldIds = [];

  const allSchoolsResponse = await fetch('https://api.carrismetropolitana.pt/facilities/schools');
  const allSchoolsData = await allSchoolsResponse.json();

  for (const [schoolIndex, schoolData] of allSchoolsData.entries()) {
    //
    if (!schoolData.stops.length) continue;
    //
    try {
      const pdfResponse = await fetch('http://0.0.0.0:5050', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ render_path: `${schoolData.id}/render` }),
      });

      if (!pdfResponse.ok) throw Error('Response not OK');

      const pdfData = await pdfResponse.arrayBuffer();
      const pdfDataBuffer = Buffer.from(pdfData);

      fs.writeFileSync(`./pdfsresult/${schoolData.id}.pdf`, pdfDataBuffer);

      console.log(`[${schoolIndex}/${allSchoolsData.length}] Saved PDF ${schoolData.id}.pdf`);
    } catch (error) {
      erroredSchooldIds.push(schoolData.id);
      console.log('error on school', schoolData.id);
    }

    //
  }

  console.log(erroredSchooldIds);

  //
})();
