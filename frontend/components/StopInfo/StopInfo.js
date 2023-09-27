'use client';

import useSWR from 'swr';
import styles from './StopInfo.module.css';
import LineDisplay from '@/components/LineDisplay/LineDisplay';
import Link from 'next/link';

export default function StopInfo({ stop_id, index }) {
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
        <div className={styles.headerWrapper}>
          <div className={styles.stopIndex}>{index}</div>
          <div className={styles.header}>
            <div className={styles.stopName}>{stopData.name}</div>
            <div className={styles.stopDetails}>
              <div className={styles.stopLocation}>{stopData.locality}</div>
              <Link href={`https://beta.carrismetropolitana.pt/stops/${stopData.id}`} target="_blank" className={styles.stopId}>
                #{stopData.id}
              </Link>
              <Link href={`https://beta.carrismetropolitana.pt/stops/${stopData.id}`} target="_blank" className={styles.openInWebsite}>
                Ver no Tempo Real
              </Link>
            </div>
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
