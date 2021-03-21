import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapAPI from '../GoogleMap/MapAPI';


const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const Map = () => {
    return (
        <div>
            <LoadScript googleMapsApiKey={MapAPI.key}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default React.memo(Map);