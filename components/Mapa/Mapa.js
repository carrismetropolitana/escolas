import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { icon } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';

const Mapa = ({ latitude, longitude, text, paragens }) => {

    function toTitleCase(str) {
        return str.replace(/\b\w+/g, function (match) {
            return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
        });
    }


    const schoolIcon = L.divIcon({
        className: 'custom-icon',
        html: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM256 416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H256V416zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z"/></svg>',
    });


    const stopIcon = L.divIcon({
        className: 'custom-icon',
        html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" fill="#ffdd01" /></svg>',
      });
      

    return (
        <>
            <MapContainer
                center={[latitude, longitude]}
                zoom={18}
                style={{ height: '600px', width: '600px' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={[latitude, longitude]} icon={schoolIcon} >
                    <Popup>{text}</Popup>
                </Marker>

                {paragens.map((paragem, index) => (

                    <Marker position={[paragem.stop_lat, paragem.stop_lon]} icon={stopIcon} >
                        <Popup>{toTitleCase(paragem.stop_name)}</Popup>
                    </Marker>

                ))}

            </MapContainer>
        </>
    );
};


export default Mapa;
