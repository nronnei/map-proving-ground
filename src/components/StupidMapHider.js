import { FormGroup, FormControlLabel, Switch, FormControl } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editLayerState, layersStateFamily, layerIdsState } from "../store/map";

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


export default function StupidMapHider() {

    const layerIds = useRecoilValue(layerIdsState);

    return (
        <FormControl>
            <FormGroup>
                {layerIds.map((id) => <LayerToggle key={id} layerId={id} />)}
            </FormGroup>
        </FormControl>
    )
}