import Titles from '../Titles/Titles';
import Planner from '../Planner/Planner';
import BackHome from '../BackHome/BackHome';
import Mapa from '../Mapa/Mapa';
import getStops from './getStops';
import getSchoolInfo from './getSchoolInfo';
import Stops from '../Stops/Stops';
import DownloadStops from '../DownloadStops/DownloadStops';
import Pass from '../Pass/Pass';

import { Switch, SegmentedControl } from '@mantine/core';

import styles from './ShowSchool.module.css';

import React, { useState } from 'react';

const ShowSchool = ({ municipality, school, setSchool }) => {
  const schoolInfo = getSchoolInfo(school);
  const stops = getStops(schoolInfo);

  const [mapStyle, setMapStyle] = useState('map');

  return (
    schoolInfo && (
      <div className={styles.main}>
        <div className={styles.titles}>
          <Titles municipality={schoolInfo ? schoolInfo.municipality_name : schoolInfo} school={school} setSchool={setSchool} />
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
            latitude={schoolInfo.lat}
            longitude={schoolInfo.lon}
            schoolInfo={schoolInfo}
            stops={stops}
          ></Mapa>
        </div>

        <div className={styles.stops}>
          <Stops stops={stops} school={schoolInfo} />
        </div>

        <div className={styles.info}>
          <DownloadStops schoolInfo={schoolInfo} municipality={schoolInfo ? schoolInfo.municipality_name : schoolInfo} school={school} stops={stops} />

          <Planner />

          <Pass />
        </div>

        <div className={styles.back}>
          <BackHome className={styles.back} setSchool={setSchool} />
        </div>
      </div>
    )
  );
};

export default ShowSchool;
