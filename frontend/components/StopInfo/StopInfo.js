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
      <div className={`${styles.stop} ${stopData.routes.length < 5 && styles.stopPoucasLinhas}`}>
        <div className={styles.stopHeader}>
          <div className={styles.stopName}>{stopData.name} </div>
          <div>
            <span className={styles.bolhaCinza}>
              <span>#{stopData.code}</span>
            </span>
            <span className={styles.bolhaCinza}>
              {stopData.lat}, {stopData.lon}
            </span>
          </div>
          <div className={styles.linha}></div>
        </div>

        <div className={styles.linesList}>
          {stopData.routes.map((routeCode) => (
            <LineDisplay key={routeCode} route_code={routeCode} />
          ))}
        </div>
      </div>
    )
  );
}
