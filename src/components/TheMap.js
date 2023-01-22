import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { mapState } from '../store/map';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const center = [51.505, -0.09]
const zoom = 13

export default function TheMap() {
    const setMap = useSetRecoilState(mapState);
    // const [, setMap] = useState(null)

    return (
        <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={center}
            zoom={zoom}
            ref={setMap}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}