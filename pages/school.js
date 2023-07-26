import Layout, { siteTitle } from '../components/Layout/layout';
import ParagensVizinhas from '../components/ParagensVizinhas/ParagensVizinhas';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Mapa from '../components/Mapa/Mapa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


// cálculo da distancia entre duas posições geográficas
function haversineDistance(lat1, lon1, lat2, lon2) {

  const toRadians = (degree) => (degree * Math.PI) / 180;
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const radius = 6371;
  const distance = radius * c;
  return distance;
}


const School = () => {

  const router = useRouter();
  const { municipio, escola } = router.query;
  
  const componentRef = useRef();

  const [escolaInfo, setEscolaInfo] = useState(escola);
  const [loading, setLoading] = useState(false);

  // ativação de spinner
  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); }, 2000); // após 2s, volta a por o loading a false  
  };


  // Constroi pdfUrl, URL para descarregar PDF
  const baseUrl = 'http://localhost:5051/generate-pdf';
  const urlParams = new URLSearchParams({
    // url: `http://localhost:3000/folheto?escola=${escola}&paragens=${paragensInfo}`,
    url: `http://localhost:3000/folheto?municipio=${municipio}&escola=${escola}`,
    escola: escola,
  });
  const pdfUrl = `${baseUrl}?${urlParams.toString()}`;


  return (
    <Layout>

      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/cm.png" />

        <script src="https://kit.fontawesome.com/5d1319edfb.js" crossorigin="anonymous"></script>

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
          integrity="leaflet-css-integrity"
          crossorigin=""
        />
      </Head>

      <main >

        <div style={{
          backgroundColor: 'white',
          color: 'black',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '10px',
          marginBottom: '10px',
        }}>
          <b> {municipio} </b>
        </div>

        <div style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
          <b> {escola} </b>
        </div>

        {/* <Mapa latitude={escolaInfo.lat} longitude={escolaInfo.lon} escolaNome={escolaInfo.name} paragens={paragensInfo} /> */}

        <div ref={componentRef}>
          {/* <ParagensVizinhas paragens={paragensInfo} escola={escolaInfo.name} /> */}
        </div>

        <a
          href={pdfUrl}
          onClick={handleDownload}
          style={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px',
            borderRadius: '10px',
            display: 'block',
            width: '100%'
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '1rem', height: '1rem' }} spin />
              <span style={{ marginLeft: '10px' }}>a gerar o PDF...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i class="fa fa-download" aria-hidden="true"></i>
              <span style={{ marginLeft: '10px' }}>Descarregue o PDF informativo</span>
            </div>
          )}
        </a>

      </main>
    </Layout >
  )
}

export default School;