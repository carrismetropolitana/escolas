import Layout, { siteTitle } from '../../components/Layout/layout';
import ParagensVizinhas from '../../components/ParagensVizinhas/ParagensVizinhas';
// import PDFDownloadButton from '../components/PDFDownloadButton/PDFDownloadButton';
import styles from './styles.module.css';

import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';

import Head from 'next/head';

import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const PDFDownloadButton = dynamic(() => import('../../components/PDFDownloadButton/PDFDownloadButton'), {
  ssr: false, // Disable server-side rendering for this component
});

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (match) {
    return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
  });
}

const Folheto = ({ escola, paragens }) => {

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
          <div className={styles.textoGrande}>Sabias que tens <br></br>autocarro à porta?</div>
          <div className={styles.textoPequeno}>A Carris Metropolitana <br></br>passa na {escola}</div>
        </div>
        <div className={styles.direita}>
          <img src="/folheto/logoCMEscola.png" height="150px" />
        </div>

      </header>


      <main className={styles.main} >
        <div ref={componentRef}>
          {/* <ParagensVizinhas paragens={paragens} escola={escolaInfo.nome} /> */}

          <div
            className={styles.container}
            style={{ textAlign: 'left', marginTop: '40px' }}
          >

            <div style={{
              height: '400px', width: '100%',
              padding: '20px', background: 'white',
              display: 'flex', flexDirection: 'column', gap: '10px', flexWrap: 'wrap', alignitems: 'flex-start'
            }}>

              {paragens.map((paragem, index) => (
                <div key={paragem._id} style={{ width: 'calc(50% - 5px)' }}>
                  <Paragem paragem={paragem} />
                </div>
              ))}
              
            </div>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <img src="/folheto/carris-metropolitana.svg" />
      </footer>
    </div>
  )
};

export default Folheto;