import { FormGroup, FormControlLabel, Switch, FormControl } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { layersStateFamily } from "../store/map";

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
        isVisible: false,
    }
];

function LayerToggle({ layerConfig }) {
    console.log(JSON.stringify(layerConfig))

    const [layer, setLayer] = useRecoilState(layersStateFamily(layerConfig.id));

    useEffect(() => { setLayer(layerConfig) }, [])
    useEffect(() => { console.log('LAYER_TOGGLE', layer, JSON.stringify(layerConfig)) }, [layer])

    const toggleVisible = () => setLayer({ ...layer, isVisible: !layer.isVisible });

    return (
        <FormControlLabel
            control={<Switch value={layer.isVisible} onChange={toggleVisible} />}
            label={layer.name}
        />
    )
}

export default function StupidMapHider() {
    return (
        <FormControl>
            <FormGroup>
                {BASEMAP_OPTIONS.map(layer => <LayerToggle key={layer.id} layerConfig={layer} />)}
            </FormGroup>
        </FormControl>
    )
}