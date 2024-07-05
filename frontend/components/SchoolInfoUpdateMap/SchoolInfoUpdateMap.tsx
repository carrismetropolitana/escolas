'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as turf from '@turf/turf';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useMap, Marker } from 'react-map-gl/maplibre';
import { SegmentedControl } from '@mantine/core';
import { SchoolData } from '../SchoolInfoUpdate/types';

export default function SchoolInfoUpdateMap({ schoolData }:{schoolData:SchoolData}) {
	//

	//
	// A. Setup variables

	const { schoolInfoMap } = useMap();
	const [mapStyle, setMapStyle] = useState('map');

	//
	// B. Fetch data

	//
	// C. Transform data

	useEffect(() => {
		if (!schoolInfoMap || !schoolData) return;
		schoolInfoMap.flyTo({
			center: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)],
			zoom: 15,
			speed: 0.5,
		});
	}, [schoolData, schoolInfoMap]);

	//
	// D. Render components

	return (
		schoolData &&
				<OSMMap
					id='schoolInfoMap'
					scrollZoom={false}
					navigation={true}
					fullscreen={true}
					mapStyle={mapStyle}
					toolbar={
						<>
							<SegmentedControl
								value={mapStyle}
								onChange={setMapStyle}
								size='xs'
								data={[
									{ label: 'Map', value: 'map' },
									{ label: 'Satellite', value: 'satellite' },
								]}
							/>
						</>
					}
				>
					<Marker latitude={parseFloat(schoolData.lat)} longitude={parseFloat(schoolData.lon)}>
						<Image priority src='/images/escola.png' height={50} width={50} alt={schoolData.name} />
					</Marker>
				</OSMMap>

	);

	//
}