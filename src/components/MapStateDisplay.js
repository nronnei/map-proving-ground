import React from 'react';
import { Box, List, ListItem } from "@mui/material";
import { exposedMapState } from "../store";
import { useRecoilValue } from 'recoil';

export function MapStateDisplay() {

    const { center, zoom, lastClick } = useRecoilValue(exposedMapState);

    return (
        <Box>
            <List>
                <ListItem>
                    Longitude: {center?.lng}
                </ListItem>
                <ListItem>
                    Latitude: {center?.lng}
                </ListItem>
                <ListItem>
                    Zoom: {zoom}
                </ListItem>
                <ListItem>
                    Last Clicked Loc: {lastClick}
                </ListItem>
            </List>
        </Box>
    )
}