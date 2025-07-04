// DEFAULTS FOR OSM MAP

// Locations
const defaultLat = 38.7;
const defaultLon = -9.0;

// Bearing, Pitch and Zoom
const defaultBearing = 0;
const defaultPicth = 0;
const defaultZoom = 9.5;

// Min and Max Zoom
const minZoom = 5;
const maxZoom = 18;

//
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

const config = {
	center: [defaultLon, defaultLat],
	initialViewState: { longitude: defaultLon, latitude: defaultLat, bearing: defaultBearing, pitch: defaultPicth, zoom: defaultZoom },
	viewport: { center: [defaultLon, defaultLat], bearing: defaultBearing, pitch: defaultPicth, zoom: defaultZoom },
	styles: { default: styleMap, map: styleMap, satellite: styleSatellite },
	minZoom: minZoom,
	maxZoom: maxZoom,
};

export default config;