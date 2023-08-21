import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Stops from '../../components/Stops/Stops';
import getStops from './getStops'
import styles from './styles.module.css';


export default function Folheto() {

  const router = useRouter();
  const { schoolCode } = router.query;

  // download info from school (not working the funciton from ShowSchool)
  const [schoolInfo, setschoolInfo] = useState({});
  useEffect(() => {

    fetch(`https://api.carrismetropolitana.pt/facilities/${schoolCode}`)
      .then(response => response.json())
      .then(data => {
        setschoolInfo(data);
      });

  }, [schoolCode]);


  const stops = schoolInfo ? getStops(schoolInfo) : '';

  //
  // rendering
  return (

    <div className={styles.body}>

      <Head>
        <title>Folheto Informativo</title>
        <link rel="icon" href="/cm.png" />
        <style jsx>{`
          body {background: white;}
        `}</style>
      </Head>

      <header className={styles.header}>

        <div className={styles.esquerda}>
          <img src="/images/logo.png" />
        </div>

        <div className={styles.direita}>

          <div className={styles.textoGrande}>
            Carris Metropolitana mais próxima das escolas
          </div>
          <div className={styles.textoPequeno}>
            O teu regresso às aulas vai correr sobre rodas
          </div>

        </div>

      </header>

      <div className={styles.info}>

        <div className={styles.municipio}>
          <div> {schoolInfo.municipality_name} </div>
        </div>
        <div className={styles.escola}>
          <div> {schoolInfo.name} </div>
        </div>

      </div>


      <div className={styles.stops}>
        <Stops
          school={schoolInfo}
          stops={stops}
        />

      </div>

      {/* <div className={styles.pageNumber}></div> */}

    </div>

  )
}

