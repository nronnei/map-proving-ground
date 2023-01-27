import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { useEditLayer } from "../hooks/use-edit-layer";
import { layerIdsState } from "../store";

function LayerToggle({ layerId }) {

    const [{ name, visible }, { setVisible }] = useEditLayer(layerId);
    const toggleVisible = () => setVisible(!visible);

    return (
        <FormControlLabel
            control={<Switch checked={visible} onChange={toggleVisible} />}
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