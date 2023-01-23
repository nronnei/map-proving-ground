import React, { useEffect, useRef } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { layerIdsState, layersStateFamily } from '../store/map';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import GlobalMapService from '../services/LeafletMapService';

// Static Map Configs
const mapStyles = {
    overflow: "hidden",
    width: "100%",
    height: "100vh"
};
const mapParams = { center: [51.505, -0.09], zoom: 13 };
// A Priori knowledge right now, to prove the concept
const BASEMAP_OPTIONS = [
    {
        name: 'Standard OSM (EN)',
        id: 1,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        isVisible: false,
    },
    {
        name: 'Standard OSM (DE)',
        id: 2,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
        isVisible: false,
    },
    {
        name: 'Stamen Terrain',
        id: 3,
        subdomains: 'abcd',
        ext: 'png',
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        isVisible: false,
    },
    {
        name: 'Esri World Imagery',
        id: 4,
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        isVisible: true,
    }
];

export default function TheMap() {

    const mapRef = useRef();
    // Right now, we need to wait for the map to actually render
    // or the layers won't get added to the map.
    // const [map, setMap] = useRecoilState(mapState);
    const addLayerId = useRecoilCallback(({ set }) => (newId) => {
        set(layerIdsState, (currentState) => Array.from(new Set([...currentState, newId])))
    }, []);

    const setLayer = useRecoilCallback(({ set }) => (layerConfig) => {
        set(layersStateFamily(layerConfig.id), layerConfig);
    }, []);


    // set up map
    useEffect(() => {
        GlobalMapService.map = L.map(mapRef.current, mapParams);
        // setMap(L.map("map", mapParams));

        BASEMAP_OPTIONS.forEach(l => {
            addLayerId(l.id);
            setLayer(l)
        });
    }, [mapRef])

    // resize map
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => GlobalMapService.invalidateMapSize());
        resizeObserver.observe(mapRef.current);
        return resizeObserver.disconnect
    }, [mapRef]);

    return (<div id="map" style={mapStyles} ref={mapRef}></div>)
}