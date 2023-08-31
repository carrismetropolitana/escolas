'use client';

import useSWR from 'swr';
import Titles from '@/components/Titles/Titles';
import Planner from '@/components/Planner/Planner';
import BackHome from '@/components/BackHome/BackHome';
import Mapa from '@/components/Mapa/Mapa';
import DownloadStops from '@/components/DownloadStops/DownloadStops';
import Pass from '@/components/Pass/Pass';
import StopInfo from '../StopInfo/StopInfo';
import BlackHeader from '../BlackHeader/BlackHeader';
import { SegmentedControl } from '@mantine/core';
import styles from './SchoolInfo.module.css';
import { useState } from 'react';

export default function SchoolInfo({ school_code }) {
  //

  //
  // A. Setup variables

  const [mapStyle, setMapStyle] = useState('map');

  //
  // B. Fetch data

  const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/facilities/schools/${school_code}`);

  //
  // D. Handle actions

  //
  // C. Render components

  return (
    schoolData && (
      <div className={styles.main}>
        <div className={styles.titles}>
          <Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
        </div>

        <div className={styles.map}>
          <Mapa
            id="patternShape"
            height={500}
            scrollZoom={false}
            mapStyle={mapStyle}
            toolbar={
              <>
                <SegmentedControl
                  value={mapStyle}
                  onChange={setMapStyle}
                  size="xs"
                  data={[
                    { label: 'Map', value: 'map' },
                    { label: 'Satellite', value: 'satellite' },
                  ]}
                />
              </>
            }
            latitude={schoolData.lat}
            longitude={schoolData.lon}
            schoolInfo={schoolData}
            // stops={stops}
          ></Mapa>
        </div>

        <div className={styles.stops}>
          <BlackHeader text={`Paragens que servem a instituição: ${schoolData.name}`} />
          <div className={styles.listOfStops}>
            {schoolData.stops.map((stopCode) => (
              <StopInfo key={stopCode} stop_code={stopCode} />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <DownloadStops schoolCode={schoolData.code} />
          <Planner />
          <Pass />
        </div>

        <div className={styles.back}>
          <BackHome />
        </div>
      </div>
    )
  );

  //
}
