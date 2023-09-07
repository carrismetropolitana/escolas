'use client';

import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import Titles from '@/components/Titles/Titles';
import Image from 'next/image';
import * as turf from '@turf/turf';
import Planner from '@/components/Planner/Planner';
import BackHome from '@/components/BackHome/BackHome';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useMap, Source, Layer, Marker } from 'react-map-gl/maplibre';
import DownloadPDF from '@/components/DownloadPDF/DownloadPDF';
import NaveganteCard from '@/components/NaveganteCard/NaveganteCard';
import StopInfo from '@/components/StopInfo/StopInfo';
import BlackHeader from '@/components/BlackHeader/BlackHeader';
import { SegmentedControl } from '@mantine/core';
import styles from './SchoolInfo.module.css';
import NoServiceMessage from '@/components/NoServiceMessage/NoServiceMessage';
import SourceDisclaimer from '../SourceDisclaimer/SourceDisclaimer';

export default function SchoolInfo({ school_code }) {
  //

  //
  // A. Setup variables

  const { schoolInfoMap } = useMap();
  const [mapStyle, setMapStyle] = useState('map');
  const [schoolStopsAsGeojson, setSchoolStopsAsGeojson] = useState();

  //
  // B. Fetch data

  const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/facilities/schools/${school_code}`);
  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // C. Transform data

  useEffect(() => {
    if (!schoolInfoMap || !schoolStopsAsGeojson?.features?.length) return;
    const boundingBox = turf.bbox(schoolStopsAsGeojson);
    schoolInfoMap.fitBounds(boundingBox, { duration: 2000, padding: 150 });
  }, [schoolInfoMap, schoolStopsAsGeojson]);

  useEffect(() => {
    (async () => {
      const geoJSON = {
        type: 'FeatureCollection',
        features: [],
      };
      if (schoolData && schoolData.stops.length) {
        for (const stopCode of schoolData.stops) {
          const stopResponse = await fetch(`https://api.carrismetropolitana.pt/stops/${stopCode}`);
          const stopData = await stopResponse.json();
          geoJSON.features.push({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [stopData.lon, stopData.lat] },
          });
        }
      }
      if (schoolData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [schoolData.lon, schoolData.lat] },
        });
      }
      setSchoolStopsAsGeojson(geoJSON);
    })();
  }, [schoolData]);

  const allStopsDataAsGeojson = useMemo(() => {
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    if (allStopsData) {
      for (const stop of allStopsData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [stop.lon, stop.lat] },
        });
      }
    }
    return geoJSON;
  }, [allStopsData]);

  //
  // D. Render components

  return (
    schoolData && (
      <div className={styles.container}>
        <div className={styles.titles}>
          <Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
        </div>

        <OSMMap
          id="schoolInfoMap"
          height={400}
          scrollZoom={false}
          navigation={true}
          fullscreen={true}
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
        >
          <Source id="allStops" type="geojson" data={allStopsDataAsGeojson}>
            <Layer id="allStops" type="circle" source="allStops" paint={{ 'circle-color': '#ffdd01', 'circle-radius': 4, 'circle-stroke-width': 1, 'circle-stroke-color': '#000000' }} />
          </Source>
          <Source id="schoolStops" type="geojson" data={schoolStopsAsGeojson}>
            <Layer id="schoolStops" type="circle" source="schoolStops" paint={{ 'circle-color': '#ff0000', 'circle-radius': 5, 'circle-stroke-width': 2, 'circle-stroke-color': '#000000' }} />
          </Source>
          <Marker latitude={schoolData.lat} longitude={schoolData.lon}>
            <Image priority src="/images/escola.png" height={50} width={50} alt={schoolData.name} />
          </Marker>
        </OSMMap>

        <div className={styles.gridWrapper}>
          <div className={styles.stopsWrapper}>
            <BlackHeader text={`Paragens que servem a instituição: ${schoolData.name}`} />
            {schoolData && schoolData.stops.length > 0 ? (
              <div className={styles.stopsList}>
                {schoolData.stops.map((stopCode) => (
                  <StopInfo key={stopCode} stop_code={stopCode} />
                ))}
              </div>
            ) : (
              <div className={styles.stopsList}>
                <NoServiceMessage municipality_code={schoolData.municipality_code} municipality_name={schoolData.municipality_name} />
              </div>
            )}
          </div>
          <div className={styles.actionsWrapper}>
            {/* {schoolData && schoolData.stops.length > 0 && <DownloadPDF school_code={school_code} />} */}
            <Planner />
            <NaveganteCard />
          </div>
        </div>

        <BackHome />

        <SourceDisclaimer />
      </div>
    )
  );

  //
}
