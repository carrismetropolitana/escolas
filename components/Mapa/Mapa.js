import { MapContainer, Marker, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import { icon } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Paragem from '../Paragem/Paragem';

const Mapa = ({ latitude, longitude, escolaNome, paragens }) => {

    function toTitleCase(str) {
        return str.replace(/\b\w+/g, function (match) {
            return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
        });
    }

    if (!latitude) {
        return;
    }


    const schoolIcon = L.divIcon({
        className: 'custom-icon',
        html: '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM256 416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H256V416zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z"/></svg>',
    });

    const stopIcon = {
        radius: 6,
        fillColor: '#ffdd01',
        color: 'black',
        weight: 1,
        fillOpacity: 1,
    };

    return (
        <div>
            <MapContainer
                center={[latitude, longitude]}
                zoom={16}
                style={{ height: '600px' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={[parseFloat(latitude), parseFloat(longitude)]} icon={schoolIcon}>
                    <Popup>
                        {escolaNome}
                    </Popup>
                </Marker>

                {paragens.map((paragem, index) => (
                    // Use CircleMarker with the stopIconStyle
                    <CircleMarker
                        key={index}
                        center={[parseFloat(paragem.stop_lat), parseFloat(paragem.stop_lon)]}
                        pathOptions={stopIcon}
                        
                    >
                        <Popup>
                            <Paragem paragem={paragem} />
                        </Popup>
                    </CircleMarker>
                ))}

            </MapContainer>
        </div>
    );
};

export default Mapa;
