import Layout, { siteTitle } from '../components/layout';
import ParagensVizinhas from '../components/ParagensVizinhas/ParagensVizinhas';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Script from 'next/script';
import Mapa from '../components/Mapa/Mapa';


export default function Escola() {

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



  return (
    <Layout>

      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/cm.png" />

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
        
        <div style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '10px' }}><b> {escolaInfo.nome} </b></div>

        <ParagensVizinhas paragens={paragens} escola={escolaInfo.nome} />

        Mapa

        <Mapa latitude='38.754244' longitude='-8.959557' text={escolaInfo.nome} paragens={paragens} />

      </main>

    </Layout>
  )
}

