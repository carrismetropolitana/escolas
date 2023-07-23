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

  const router = useRouter();
  const { escola } = router.query;

  /* não uso pois o JSON está a dar problemas */
  const [escolaInfo, setEscolaInfo] = useState({});
  // const [municipio, setMunicipio] = useState({});

  const paragens_str = '[{"_id": "6474e051155a72200ee0dda0", "stop_id": "010001", "__v": 0, "createdAt": "2023-05-29T17:26:41.264Z", "routes": [{"route_id": "4001_0", "route_short_name": "4001", "route_long_name": "Alcochete | Circular", "route_color": "#3D85C6", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0dad9"}, {"route_id": "4002_0", "route_short_name": "4002", "route_long_name": "São Francisco | Circular", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02d155a72200ee0d827"}], "stop_lat": "38.754244", "stop_lon": "-8.959557", "stop_name": "ALCOCHETE (R C M R FRANC 229)ESC MT NOVO", "updatedAt": "2023-06-18T12:21:39.504Z"}, {"_id": "6474e051155a72200ee0dda4", "stop_id": "010002", "__v": 0, "createdAt": "2023-05-29T17:26:41.268Z", "routes": [{"route_id": "4001_0", "route_short_name": "4001", "route_long_name": "Alcochete | Circular", "route_color": "#3D85C6", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0dad9"}, {"route_id": "4002_0", "route_short_name": "4002", "route_long_name": "São Francisco | Circular", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02d155a72200ee0d827"}], "stop_lat": "38.754572", "stop_lon": "-8.959615", "stop_name": "ALCOCHETE (R C M R FRANC 229)ESC MT NOVO", "updatedAt": "2023-06-18T12:21:39.508Z"}, {"_id": "6474e051155a72200ee0dea3", "stop_id": "010080", "__v": 0, "createdAt": "2023-05-29T17:26:41.523Z", "routes": [{"route_id": "4501_0", "route_short_name": "4501", "route_long_name": "Alcochete - Montijo (Terminal Fluvial)", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0dd71"}, {"route_id": "4502_0", "route_short_name": "4502", "route_long_name": "Alcochete - Passil", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0dd53"}, {"route_id": "4510_0", "route_short_name": "4510", "route_long_name": "Alcochete (Freeport) - Montijo (Terminal Rodoviário)", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0d95b"}, {"route_id": "4511_0", "route_short_name": "4511", "route_long_name": "Alcochete (Freeport) - Montijo (Terminal Rodoviário)", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02d155a72200ee0d86b"}, {"route_id": "4512_0", "route_short_name": "4512", "route_long_name": "Alcochete (Freeport) - Setúbal (ITS) via Alto Estanqueiro", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02d155a72200ee0d87b"}, {"route_id": "4513_0", "route_short_name": "4513", "route_long_name": "Alcochete (Freeport) - Pinhal Novo", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02d155a72200ee0d7f9"}, {"route_id": "4600_0", "route_short_name": "4600", "route_long_name": "Alcochete (Freeport) - Barreiro (Terminal)", "route_color": "#ED1944", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0da25"}, {"route_id": "4702_0", "route_short_name": "4702", "route_long_name": "Lisboa (Oriente) - Valbom", "route_color": "#FDB71A", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0d993"}, {"route_id": "4703_0", "route_short_name": "4703", "route_long_name": "Lisboa (Oriente) - Montijo (Terminal Rodoviário) via Alcochete e Samouco", "route_color": "#FDB71A", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0daeb"}, {"route_id": "4704_0", "route_short_name": "4704", "route_long_name": "Atalaia - Lisboa (Oriente)", "route_color": "#FDB71A", "route_text_color": "#FFFFFF", "_id": "6474e02e155a72200ee0da73"}], "stop_lat": "38.753388", "stop_lon": "-8.959593", "stop_name": "ALCOCHETE (AV REVOLUÇÃO 86)", "updatedAt": "2023-06-18T12:21:39.771Z"}]';
  const paragens = JSON.parse(paragens_str);
  const municipio = 'Almada'


  // descarrega da API a info da escola 
  useEffect(() => {

    fetch(`https://cmescola.pythonanywhere.com/escola/${escola}`)
      .then(response => response.json())
      .then(data => {
        setEscolaInfo(data.escola);
      });

  }, [escola]);

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
          <div className={styles.textoPequeno}>A Carris Metropolitana <br></br>passa na {escolaInfo.nome}</div>
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

