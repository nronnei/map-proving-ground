import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import GlobalMapService from '../services/LeafletMapService';
import { useMapEventListeners } from '../hooks/use-map-event-listeners';

// Static Map Configs
const mapStyles = {
    overflow: "hidden",
    width: "100%",
    height: "calc(100vh - 64px)"
};
const mapParams = { center: [51.505, -0.09], zoom: 13 };
// A Priori knowledge right now, to prove the concept
const BASEMAP_OPTIONS = [
    {
        name: 'Standard OSM (EN)',
        id: 1,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        visible: false,
    },
    {
        name: 'Standard OSM (DE)',
        id: 2,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
        visible: false,
    },
    {
        name: 'Stamen Terrain',
        id: 3,
        subdomains: 'abcd',
        ext: 'png',
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        visible: false,
    },
    {
        name: 'Esri World Imagery',
        id: 4,
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        visible: true,
    }
];

export default function TheMap() {

    const mapRef = useRef();
    // const [_, setMap] = useRecoilState(mapState);

    // If we try to do this w/o useRecoilCallback, it doesn't work.
    // const [layerIds, setLayerIds] = useRecoilState(layerIdsState);
    // const addLayerIdUnwrapped = (newId) => {
    //     setLayerIds(Array.from(new Set([...layerIds, newId])))
    // }

    const [{ setLayer, addLayerId }, registerMapEventListeners] = useMapEventListeners();

    // set up map
    useEffect(() => {
        GlobalMapService.map = L.map(mapRef.current, mapParams);
        GlobalMapService.map.whenReady(() => {
            try {
                registerMapEventListeners()
            } catch (error) {
                console.error('from map setup', error)
            }
        })

        BASEMAP_OPTIONS.forEach(l => {
            addLayerId(l.id);
            // addLayerIdUnwrapped(l.id);
            setLayer(l);
        });
    }, [mapRef])

    // resize map
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => GlobalMapService.invalidateMapSize(true));
        resizeObserver.observe(mapRef.current);
        return resizeObserver.disconnect
    }, [mapRef]);

    return (<div id="map" style={mapStyles} ref={mapRef}></div>)
}