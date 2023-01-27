import React, { useEffect, useState } from 'react';

import { Box, List, ListItem, TextField } from "@mui/material";
// import { useEditLayer } from '../hooks/use-edit-layer';
import { useLayerAttribution } from '../hooks/use-layer-attr-hooks';


export function LayerEditor({ layerId }) {

    const [attribution, setAttribution] = useLayerAttribution(layerId);
    console.log(attribution, setAttribution)
    const [localAttr, setLocalAttr] = useState(attribution || '');
    const handleChange = (e) => {
        const { value } = e.target;
        setAttribution(value);
        // setLocalAttr(attribution);
    }
    useEffect(() => { setLocalAttr(attribution) }, [attribution])
    return (
        <Box>
            <h2>Editing!</h2>
            <TextField
                id="attribution-field"
                label="Attribution"
                value={localAttr}
                onChange={handleChange}
            />
        </Box>
    )
}