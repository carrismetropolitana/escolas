import '../styles/global.css';
import 'select2';
import 'jquery';
import 'select2/dist/css/select2.min.css';
import { MapProvider } from 'react-map-gl/maplibre';

export default function App({ Component, pageProps }) {
  return (
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  )
}