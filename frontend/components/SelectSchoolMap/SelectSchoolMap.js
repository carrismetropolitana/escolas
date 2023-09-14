'use client';

import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import generateUUID from '@/services/generateUUID';
import * as turf from '@turf/turf';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';
import { SegmentedControl } from '@mantine/core';

export default function SelectSchoolMap({ allSchoolsData, onSelectSchool }) {
  //

  //
  // A. Setup variables

  const { selectSchoolMap } = useMap();
  const [mapStyle, setMapStyle] = useState('map');
  const [allSchoolsAsGeojson, setAllSchoolsAsGeojson] = useState();

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // C. Transform data

  useEffect(() => {
    if (!selectSchoolMap || !allSchoolsAsGeojson?.features?.length) return;
    selectSchoolMap.loadImage('/images/escola.png', (error, image) => {
      if (error) throw error;
      selectSchoolMap.addImage('store-icon', image, { sdf: false });
    });
    const boundingBox = turf.bbox(allSchoolsAsGeojson);
    selectSchoolMap.fitBounds(boundingBox, { duration: 2000, padding: 5 });
  }, [selectSchoolMap, allSchoolsAsGeojson]);

  useEffect(() => {
    (async () => {
      const geoJSON = {
        type: 'FeatureCollection',
        features: [],
      };
      if (allSchoolsData && allSchoolsData.length) {
        for (const school of allSchoolsData) {
          geoJSON.features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [school.lon, school.lat],
            },
            properties: {
              mapid: `${stop.code}${generateUUID()}`,
              code: school.code,
            },
          });
        }
      }
      setAllSchoolsAsGeojson(geoJSON);
    })();
  }, [allSchoolsData]);

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
  // D. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectSchool(event.features[0].properties.code);
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.code) {
      selectSchoolMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.code) {
      selectSchoolMap.getCanvas().style.cursor = 'default';
    }
  };

  //
  // D. Render components

  return (
    allSchoolsData &&
    allStopsData && (
      <OSMMap
        id="selectSchoolMap"
        height={400}
        scrollZoom={true}
        navigation={true}
        fullscreen={true}
        mapStyle={mapStyle}
        interactiveLayerIds={['allSchools']}
        onClick={handleMapClick}
        onMouseEnter={handleMapMouseEnter}
        onMouseLeave={handleMapMouseLeave}
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
          <Layer
            id="allStops"
            type="circle"
            source="allStops"
            paint={{
              'circle-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#EE4B2B', '#ffdd01'],
              'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 20, 10]],
              'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 0.35, 26, 5],
              'circle-stroke-color': '#000000',
            }}
          />
        </Source>
        <Source id="allSchools" type="geojson" data={allSchoolsAsGeojson}>
          <Layer id="allSchools" source="allSchools" type={'symbol'} layout={{ 'icon-image': 'store-icon', 'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 9, 0.1, 26, 0.75] }} />
        </Source>
      </OSMMap>
    )
  );

  //
}
