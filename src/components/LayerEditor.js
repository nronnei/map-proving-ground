import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Box, TextField } from "@mui/material";
import { editLayerState } from '../store';

export function LayerEditor({ layerId }) {

    const [attribution, setAttribution] = useRecoilState(editLayerState({
        path: 'attribution',
        id: layerId
    }))

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