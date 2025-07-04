import styles from './OSMMap.module.css';
import osmMapDefaults from './OSMMap.config';
import Map, { NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function OSMMap({
	children,
	id,
	mapStyle,
	scrollZoom = true,
	onClick = () => {},
	onMouseEnter = () => {},
	onMouseLeave = () => {},
	onMove = () => {},
	onMoveStart = () => {},
	onMoveEnd = () => {},
	interactiveLayerIds = [],
	toolbar,
	navigation = true,
	fullscreen = true,
	scale = true,
}) {
	return (
		<div className={styles.container}>
			<Map
				id={id}
				mapLib={maplibregl}
				initialViewState={osmMapDefaults.initialViewState}
				minZoom={osmMapDefaults.minZoom}
				maxZoom={osmMapDefaults.maxZoom}
				scrollZoom={scrollZoom}
				mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
				style={{ width: '100%', height: '400px' }}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMove={onMove}
				onMoveStart={onMoveStart}
				onMoveEnd={onMoveEnd}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
			>
				{navigation && <NavigationControl />}
				{fullscreen && <FullscreenControl />}
				{scale && <ScaleControl maxWidth={100} unit='metric' />}
				{children}
			</Map>
			{toolbar && <div className={styles.toolbar}>{toolbar}</div>}
		</div>
	);
}