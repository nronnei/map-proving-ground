import { FormGroup, FormControlLabel, Switch, FormControl } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { atom, useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { editLayerState, layersStateFamily } from "../store/map";

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

function LayerToggle({ layerId }) {

    const layer = useRecoilValue(layersStateFamily(layerId));
    const setIsVisible = useSetRecoilState(editLayerState({
        path: 'isVisible',
        id: layerId
    }))

    useEffect(() => {
        console.log(layer.name, 'isVisible', layer.isVisible);
        // console.log('LAYER_TOGGLE', layer, JSON.stringify(layerConfig))
    }, [layer])

    const toggleVisible = () => setIsVisible(!layer.isVisible);

    return (
        <FormControlLabel
            control={<Switch checked={layer.isVisible} onChange={toggleVisible} />}
            label={layer.name}
        />
    )
}

export const layerIdsState = atom({ key: 'layerIds', default: new Set() });


export default function StupidMapHider() {

    // Right now, we need to wait for the map to actually render
    // or the layers won't get added to the map.
    // const layerIds = useRecoilValue(layerIdsState);

    // const addLayerId = useRecoilCallback(({ set }) => (newId) => {
    //     set(layerIdsState, (currentState) => new Set(currentState, new Set(newId)))
    // }, []);
    const setLayer = useRecoilCallback(({ set }) => (layerConfig) => {
        set(layersStateFamily(layerConfig.id), layerConfig);
    }, []);

    BASEMAP_OPTIONS.forEach(setLayer);

    return (
        <FormControl>
            <FormGroup>
                {BASEMAP_OPTIONS.map(({ id }) => <LayerToggle key={id} layerId={id} />)}
            </FormGroup>
        </FormControl>
    )
}