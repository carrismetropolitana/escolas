'use client';

import useSWR from 'swr';
import styles from './SchoolPDF.module.css';
import StopInfo from '@/components/StopInfo/StopInfo';

export default function SchoolPDF({ school_code }) {
  //

  //
  // A. Fetch data

  const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/facilities/schools/${school_code}`);

  //
  // B. Render components

  return (
    schoolData && (
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.esquerda}>
            <img src="/images/logo.png" />
          </div>
          <div className={styles.direita}>
            <div className={styles.textoGrande}>Carris Metropolitana mais próxima das escolas</div>
            <div className={styles.textoPequeno}>O teu regresso às aulas vai correr sobre rodas</div>
          </div>
        </header>

        <div className={styles.info}>
          <div className={styles.municipio}>
            <div>{schoolData.municipality_name}</div>
          </div>
          <div className={styles.escola}>
            <div>{schoolData.name}</div>
          </div>
        </div>

        <div className={styles.stops}>
          {schoolData.stops.map((stopCode) => (
            <StopInfo key={stopCode} stop_code={stopCode} />
          ))}
        </div>
      </div>
    )
  );
}
