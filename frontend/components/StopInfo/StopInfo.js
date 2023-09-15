'use client';

import useSWR from 'swr';
import styles from './StopInfo.module.css';
import LineDisplay from '../LineDisplay/LineDisplay';

export default function StopInfo({ stop_id }) {
  //

  //
  // A. Fetch data

  const { data: stopData } = useSWR(`https://api.carrismetropolitana.pt/stops/${stop_id}`);

  //
  // B. Render components

  return (
    stopData &&
    stopData.routes?.length > 0 && (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.stopName}>{stopData.name}</div>
          <div className={styles.stopDetails}>
            <div className={styles.stopLocation}>{stopData.locality}</div>
            <div className={styles.stopId}>#{stopData.id}</div>
          </div>
        </div>

        <div className={styles.linesList}>
          {stopData.routes?.map((routeId) => (
            <LineDisplay key={routeId} route_id={routeId} />
          ))}
        </div>
      </div>
    )
  );
}
