import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Stops from '../../components/Stops/Stops';
import getStops from './getStops'
import styles from './styles.module.css';


export default function Folheto() {

  const router = useRouter();
  const { schoolCode } = router.query;

  // descarrega info da escola 
  const [schoolInfo, setschoolInfo] = useState({});
  useEffect(() => {

    fetch(`https://api.carrismetropolitana.pt/facilities/${schoolCode}`)
      .then(response => response.json())
      .then(data => {
        setschoolInfo(data);
      });

  }, [schoolCode]);

  // obtem info das paragens 
  const stops = schoolInfo ? getStops(schoolInfo) : '';

  //
  // renderização

  return (

    <div className={styles.body}>

      <Head>
        <title>Folheto Informativo</title>
        <link rel="icon" href="/cm.png" />
      </Head>

      <header className={styles.header}>

        <div className={styles.esquerda}>

          <div className={styles.textoGrande}>
            Sabias que tens <br></br>autocarro à porta?
          </div>
          <div className={styles.textoPequeno}>
            A Carris Metropolitana passa na <br></br>{schoolInfo.name}
          </div>

        </div>

        <div className={styles.direita}>
          <img src="/images/logo.png" height="150px" />
        </div>

      </header>

      <h2>Paragens na proximidade e suas linhas</h2>

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

