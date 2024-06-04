'use client';

import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import * as turf from '@turf/turf';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useMap, Source, Layer, Marker } from 'react-map-gl/maplibre';
import { SegmentedControl } from '@mantine/core';

export default function SchoolInfoUpdateMap({schoolData}) {
  //

  //
  // A. Setup variables

  const { schoolInfoMap } = useMap();
  const [mapStyle, setMapStyle] = useState('map');
  const [schoolStopsAsGeojson, setSchoolStopsAsGeojson] = useState();

  const {data:allStopsData} = useSWR('https://api.carrismetropolitana.pt/stops')

  //
  // B. Fetch data


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
      if (schoolData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)] },
        });
      }
      if (schoolData && schoolData.stops.length) {
        for (const [stopIndex, stopCode] of schoolData.stops.entries()) {
          const stopResponse = await fetch(`https://api.carrismetropolitana.pt/stops/${stopCode}`);
          const stopData = await stopResponse.json();
          geoJSON.features.push({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [parseFloat(stopData.lon), parseFloat(stopData.lat)] },
            properties: { index: stopIndex + 1 },
          });
        }
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
            <Layer id="schoolStops" type="circle" source="schoolStops" paint={{ 'circle-color': '#235fe1', 'circle-radius': 10, 'circle-stroke-width': 2, 'circle-stroke-color': '#000000' }} />
            <Layer id="school-stops-labels" type="symbol" source="schoolStops" layout={{ 'text-field': ['get', 'index'], 'text-offset': [0, 0], 'text-anchor': 'center', 'text-size': 12 }} paint={{ 'text-color': '#ffffff' }} />
          </Source>
          <Marker latitude={schoolData.lat} longitude={schoolData.lon}>
            <Image priority src="/images/escola.png" height={50} width={50} alt={schoolData.name} />
          </Marker>
        </OSMMap>
    )
  );

  //
}
