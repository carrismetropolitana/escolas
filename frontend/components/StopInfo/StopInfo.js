'use client';

import useSWR from 'swr';
import styles from './StopInfo.module.css';
import LineDisplay from '../LineDisplay/LineDisplay';

export default function StopInfo({ stop_code }) {
  //

  //
  // A. Fetch data

  const { data: stopData } = useSWR(`https://api.carrismetropolitana.pt/stops/${stop_code}`);

  //
  // B. Render components

  return (
    stopData && (
      <div className={`${styles.container} ${stopData.routes.length < 5 && styles.stopPoucasLinhas}`}>
        <div className={styles.header}>
          <div className={styles.stopName}>{stopData.name}</div>
          <div className={styles.stopDetails}>
            <div className={styles.stopLocation}>{stopData.locality}</div>
            <div className={styles.stopCode}>#{stopData.code}</div>
          </div>
        </div>

        <div className={styles.linesList}>
          {stopData.routes?.map((routeCode) => (
            <LineDisplay key={routeCode} route_code={routeCode} />
          ))}
        </div>
      </div>
    )
  );
}
