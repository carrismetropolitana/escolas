import Layout, { siteTitle } from '../../components/Layout/layout';
import Stops from '../../components/Stops/Stops';
// import PDFDownloadButton from '../components/PDFDownloadButton/PDFDownloadButton';
import styles from './styles.module.css';

import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';

import Head from 'next/head';

import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import getStops from './getStops'


const PDFDownloadButton = dynamic(() => import('../../components/PDFDownloadButton/PDFDownloadButton'), {
  ssr: false, // Disable server-side rendering for this component
});


function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (match) {
    return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
  });
}


export default function Folheto() {

  const router = useRouter();
  const { schoolCode } = router.query;

  const [schoolInfo, setschoolInfo] = useState({});
  // descarrega da API a info da escola 
  useEffect(() => {

    fetch(`https://api.carrismetropolitana.pt/facilities/${schoolCode}`)
      .then(response => response.json())
      .then(data => {
        setschoolInfo(data);
      });

  }, [schoolCode]);


  const stops = schoolInfo ? getStops(schoolInfo) : '';

  const componentRef = useRef();

  return (

    <div className={styles.body}>

      <Head>
        <title>Folheto Informativo</title>
        <link rel="icon" href="/cm.png" />

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
          integrity="leaflet-css-integrity"
          crossorigin=""
        />
      </Head>


      <header className={styles.header}>

        <div className={styles.esquerda}>

          <div className={styles.textoGrande}>
            Sabias que tens <br></br>autocarro à porta?
          </div>
          <div className={styles.textoPequeno}>
            A Carris Metropolitana <br></br>passa na {schoolInfo.name}
          </div>

        </div>

        <div className={styles.direita}>
          <img src="/images/logo.png" height="150px" />
        </div>

      </header>


      <div className={styles.stops}>
        <Stops
          school={schoolInfo}
          stops={stops}
        />
      </div>


      <footer className={styles.footer}>
        <img src="/folheto/carris-metropolitana.svg" />
      </footer>
    </div>
  )
}

