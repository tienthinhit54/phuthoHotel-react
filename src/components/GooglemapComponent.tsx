import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styles/map.css';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 10.762622,
    lng: 106.660172,
};

interface MapComponentProps {
    apiKey: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
    return (
        <div className='map-container'>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapComponent;
