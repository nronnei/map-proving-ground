import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { editLayerState, layersStateFamily, layerIdsState } from "../store";

function LayerToggle({ layerId }) {

    const [isVisible, setIsVisible] = useRecoilState(editLayerState({
        path: 'isVisible',
        id: layerId
    }))
    const name = useRecoilValue(editLayerState({
        path: 'name',
        id: layerId
    }))
    const toggleVisible = () => setIsVisible(!isVisible);

    return (
        <FormControlLabel
            control={<Switch checked={isVisible} onChange={toggleVisible} />}
            label={name}
        />
    )
}


export default function StupidMapHider() {

    const layerIds = useRecoilValue(layerIdsState);

    return (
        <FormGroup>
            {layerIds.map((id) => <LayerToggle key={id} layerId={id} />)}
        </FormGroup>
    )
}