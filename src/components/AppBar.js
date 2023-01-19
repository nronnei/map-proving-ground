import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Toolbar, IconButton, Typography, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { DRAWER_WIDTH_PX } from '../style';

const NO_FORWARD_PROPS = ['open', 'toggleDrawer'];
const HoCOpts = {
    shouldForwardProp: prop => !NO_FORWARD_PROPS.includes(prop),
};

const StyledAppBar = styled(MuiAppBar, HoCOpts)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH_PX,
        width: `calc(100% - ${DRAWER_WIDTH_PX}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function TheAppBar(props) {
    const { open, toggleDrawer } = props;
    return (
        <StyledAppBar {...props}>
            <Toolbar sx={{ pr: '24px', /* keep right padding when drawer closed */ }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{ marginRight: '36px', ...(open && { display: 'none' }), }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Map Proving Grounds
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </ StyledAppBar>
    )
}