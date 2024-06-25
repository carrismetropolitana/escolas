'use client';

import { useState } from 'react';
import styles from './Mapa.module.css';
import Map, { NavigationControl, FullscreenControl, ScaleControl, Marker, Popup } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Divider } from '@mantine/core';

export default function Mapa({ id, mapStyle, width, height, scrollZoom = true, onClick = () => {}, interactiveLayerIds = [], children, toolbar, latitude, longitude, schoolInfo, _stops }) {
	// DEFAULTS FOR OSM MAP

	// Bearing, Pitch and Zoom
	const defaultBearing = 0;
	const defaultPicth = 0;
	const defaultZoom = 15;

	// Min and Max Zoom
	const minZoom = 5;
	const maxZoom = 18;

	// MAP STYLES

	const styleMap = 'https://maps.carrismetropolitana.pt/styles/default/style.json';

	const styleSatellite = {
		version: 8,
		sources: {
			'raster-tiles': {
				type: 'raster',
				tiles: ['https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
				tileSize: 256,
				attribution:
					'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
			},
		},
		layers: [
			{
				id: 'simple-tiles',
				type: 'raster',
				source: 'raster-tiles',
			},
		],
	};

	//
	// EXPORT SINGLE OBJECT

	const osmMapDefaults = {
		center: [longitude, latitude],
		initialViewState: { longitude: longitude, latitude: latitude, bearing: defaultBearing, pitch: defaultPicth, zoom: defaultZoom },
		viewport: { center: [longitude, latitude], bearing: defaultBearing, pitch: defaultPicth, zoom: defaultZoom },
		styles: { default: styleMap, map: styleMap, satellite: styleSatellite },
		minZoom: minZoom,
		maxZoom: maxZoom,
	};

	// variables to toggle the popup

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const handleMarkerClick = () => {
		setIsPopupOpen(!isPopupOpen); // Toggle the popup state
	};

	// const [selectedStop, setSelectedStop] = useState(null);
	// const _handleStopMarkerClick = stop => {
	// 	setSelectedStop(stop);
	// };

	//
	// rendered content

	return (
		<div className={styles.container} style={{ width: width || '100%', height: height || '100%' }}>
			<Map
				id={`${id}Map`}
				mapLib={maplibregl}
				initialViewState={osmMapDefaults.initialViewState}
				minZoom={osmMapDefaults.minZoom}
				maxZoom={osmMapDefaults.maxZoom}
				scrollZoom={scrollZoom}
				mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
				style={{ width: width || '100%', height: height || '100%' }}
				onClick={onClick}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				attributionControl={false}
			>
				<Marker latitude={latitude} longitude={longitude}>
					<div className={styles.customMarker} onMouseOver={handleMarkerClick} onMouseOut={handleMarkerClick}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src='/images/escola.png' alt='escola' className={styles.markerImage} />
					</div>

					{isPopupOpen &&
						<Popup latitude={latitude} longitude={longitude} closeButton={true} closeOnClick={false} onClose={() => setIsPopupOpen(false)} className={styles.popup}>
							<div className={styles.school}>
								<div className={styles.schoolName}>{schoolInfo.name}</div>
								<div className={styles.schoolAddress}>{schoolInfo.address}</div>
								<div className={styles.schoolPostalCode}>{schoolInfo.postal_code}</div>
							</div>
						</Popup>
					}
				</Marker>

				{/* {stops.map((stop, index) => (
					<Marker key={index} latitude={parseFloat(stop.stop_lat)} longitude={parseFloat(stop.stop_lon)}>
						<div className={styles.circleMarker} onMouseOver={() => handleStopMarkerClick(stop)}></div>
					</Marker>
				))} */}

				{/* {selectedStop && (
					<Popup latitude={parseFloat(selectedStop.stop_lat)} longitude={parseFloat(selectedStop.stop_lon)} onClose={() => setSelectedStop(null)} closeOnClick={true} className={styles.popup}>
						<Stop stop={selectedStop} isMap={true} />
					</Popup>
				)} */}

				<NavigationControl />
				<FullscreenControl />
				<ScaleControl maxWidth={200} unit='metric' />
				{children}
			</Map>
			<Divider />
			{toolbar && <div className={styles.toolbar}>{toolbar}</div>}
		</div>
	);
}