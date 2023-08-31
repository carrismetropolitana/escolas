'use client';

import useSWR from 'swr';
// import { useEffect, useMemo, useState } from 'react';
// import { useMap, Source, Layer, Marker } from 'react-map-gl/maplibre';
import Image from 'next/image';
// import * as turf from '@turf/turf';
import styles from './SchoolPDF.module.css';
import StopInfo from '@/components/StopInfo/StopInfo';
// import OSMMap from '@/components/OSMMap/OSMMap';

export default function SchoolPDF({ school_code }) {
  //

  //
  // A. Setup variables

  //   const { pdfMap } = useMap();
  //   const [schoolStopsAsGeojson, setSchoolStopsAsGeojson] = useState();

  //
  // B. Fetch data

  const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/facilities/schools/${school_code}`);
  //   const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // C. Transform data

  //   useEffect(() => {
  //     if (!pdfMap || !schoolStopsAsGeojson.features.length) return;
  //     const boundingBox = turf.bbox(schoolStopsAsGeojson);
  //     pdfMap.fitBounds(boundingBox, { duration: 10, padding: 50 });
  //   }, [pdfMap, schoolStopsAsGeojson]);

  //   useEffect(() => {
  //     (async () => {
  //       const geoJSON = {
  //         type: 'FeatureCollection',
  //         features: [],
  //       };
  //       if (schoolData && schoolData.stops.length) {
  //         for (const stopCode of schoolData.stops) {
  //           const stopResponse = await fetch(`https://api.carrismetropolitana.pt/stops/${stopCode}`);
  //           const stopData = await stopResponse.json();
  //           geoJSON.features.push({
  //             type: 'Feature',
  //             geometry: { type: 'Point', coordinates: [parseFloat(stopData.lon), parseFloat(stopData.lat)] },
  //           });
  //         }
  //         geoJSON.features.push({
  //           type: 'Feature',
  //           geometry: { type: 'Point', coordinates: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)] },
  //         });
  //       }
  //       setSchoolStopsAsGeojson(geoJSON);
  //     })();
  //   }, [schoolData]);

  //   const allStopsDataAsGeojson = useMemo(() => {
  //     const geoJSON = {
  //       type: 'FeatureCollection',
  //       features: [],
  //     };
  //     if (allStopsData) {
  //       for (const stop of allStopsData) {
  //         geoJSON.features.push({
  //           type: 'Feature',
  //           geometry: { type: 'Point', coordinates: [parseFloat(stop.lon), parseFloat(stop.lat)] },
  //         });
  //       }
  //     }
  //     return geoJSON;
  //   }, [allStopsData]);

  //
  // D. Render components

  return (
    schoolData && (
      <div className={styles.container}>
        <div className={styles.header}>
          <Image priority src="/images/logo.png" height={100} width={100} alt="Logotipo Carris Metropolitana próxima das escolas" />
          <div className={styles.headerWrapper}>
            <div className={styles.title}>Carris Metropolitana mais próxima das escolas</div>
            <div className={styles.subtitle}>O teu regresso às aulas vai correr sobre rodas!</div>
          </div>
        </div>

        <div className={styles.schoolDetails}>
          <p className={styles.schoolName}>{schoolData.name}</p>
          <p className={styles.municipalityName}>{schoolData.municipality_name}</p>
        </div>

        {/* <OSMMap id="pdfMap" height={400} scrollZoom={false} navigation={false} fullscreen={false}>
          <Source id="allStops" type="geojson" data={allStopsDataAsGeojson}>
            <Layer id="allStops" type="circle" source="allStops" paint={{ 'circle-color': '#ffdd01', 'circle-radius': 4, 'circle-stroke-width': 1, 'circle-stroke-color': '#000000' }} />
          </Source>
          <Source id="schoolStops" type="geojson" data={schoolStopsAsGeojson}>
            <Layer id="schoolStops" type="circle" source="schoolStops" paint={{ 'circle-color': '#ff0000', 'circle-radius': 5, 'circle-stroke-width': 2, 'circle-stroke-color': '#000000' }} />
          </Source>
          <Marker latitude={schoolData.lat} longitude={schoolData.lon}>
            <Image priority src="/images/escola.png" height={50} width={50} alt={schoolData.name} />
          </Marker>
        </OSMMap> */}

        <div className={styles.stopsWrapper}>
          {schoolData.stops.map((stopCode) => (
            <StopInfo key={stopCode} stop_code={stopCode} />
          ))}
        </div>
      </div>
    )
  );
}
