import React from "react";
import { styled } from "@mui/material/styles";
import { Toolbar, Divider, IconButton } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DRAWER_WIDTH_PX } from "../style";
import StupidMapHider from "./StupidMapHider";
import { MapStateDisplay } from "./MapStateDisplay";

const NO_FORWARD_PROPS = ['open', 'toggleDrawer'];
const HoCOpts = {
    shouldForwardProp: prop => !NO_FORWARD_PROPS.includes(prop),
};

const StyledDrawer = styled(MuiDrawer, HoCOpts)(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: DRAWER_WIDTH_PX,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(0),
            }),
        },
    }),
);


export default function TheSidebar(props) {
    const { toggleDrawer } = props;
    return (
        <StyledDrawer {...props}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <StupidMapHider />
            <Divider />
            <MapStateDisplay />
        </StyledDrawer>
    )
}