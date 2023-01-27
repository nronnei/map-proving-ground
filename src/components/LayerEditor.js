import React, { useEffect, useState } from 'react';

import { Box, TextField } from "@mui/material";
// import { useEditLayer } from '../hooks/use-edit-layer';
import { useLayerAttrHooks } from '../hooks/use-layer-attr-hooks';


export function LayerEditor({ layerId }) {

    const { useLayerAttribution } = useLayerAttrHooks();
    const [attribution, setAttribution] = useLayerAttribution(layerId);
    const handleChange = (e) => { setAttribution(e.target.value) }

    // This feels bad, and I don't think I'd do this in prod, but see:
    // https://github.com/facebookexperimental/Recoil/issues/488
    const [localAttr, setLocalAttr] = useState(attribution || '');
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