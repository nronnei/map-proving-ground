import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { mapState } from '../store/map';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

// Static Map Configs
const mapStyles = {
    overflow: "hidden",
    width: "100%",
    height: "100vh"
};
const mapParams = { center: [51.505, -0.09], zoom: 13 };

export default function TheMap() {

    // Recoil State APIs
    const setMap = useSetRecoilState(mapState);

    // set up map
    useEffect(() => { setMap(L.map("map", mapParams)) }, [])

    return (<div id="map" style={mapStyles}></div>)
}