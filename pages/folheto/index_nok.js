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

export default function Folheto() {

  console.log('cheguei')

  const router = useRouter();
  const { escola, paragens } = router.query;

  console.log('paragens', paragens);

  return;

  const [escolaInfo, setEscolaInfo] = useState({});

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
          <img src="/folheto/logoCMEscola.png" height="150px"/>
        </div>

      </header>

      <main className={styles.main} >
        <div ref={componentRef}>
          {/* <ParagensVizinhas paragens={paragens} escola={escolaInfo.nome} /> */}

          <div  
            className={styles.container} 
            style={{ textAlign:'left', marginTop: '40px'}}
        >

            <div style={{ height:'400px', width:'100%', 
             padding:'20px',  background:'white', 
            display:'flex', flexDirection:'column', gap:'10px', flexWrap: 'wrap', alignitems:'flex-start'}}>
                {paragens.map((paragem, index) => (
                    <div key={paragem._id} style={{width: 'calc(50% - 5px)' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{paragem.stop_name} 
                        <br></br>
                        <span class={styles.bolhaCinza}>#{paragem.stop_id}</span>                        
                        <span class={styles.bolhaCinza}> {paragem.stop_lat}, {paragem.stop_lon} </span>
                        
                        <div style={{ height:'0', marginTop:'5px', borderBottom: '1px solid lightgrey', }}></div>

                            {paragem.routes.map((route, route_index) => (

                                <div key={route_index} style={{ 
                                    // backgroundColor: 'white', 
                                    borderRadius: '20px', margin: '5px 0', padding: '0', display: 'flex', justifyContent: 'flex-start', alignItems:'flex-start'}}>

                                    <span style={{ fontWeight: 'bold', backgroundColor: route.route_color, borderRadius: '20px', padding: '0 8px', width: '6.2ch', color:'white'}}>
                                        {route.route_short_name}
                                    </span>

                                    <span style={{ fontWeight: 'normal', paddingLeft: '5px' }}>
                                        {toTitleCase(route.route_long_name)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <img src="/folheto/carris-metropolitana.svg"/>
      </footer>
    </div>
  )
}

