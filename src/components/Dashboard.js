import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import TheAppBar from './AppBar';
import TheSidebar from './TheSidebar';
import TheMapRaw from './TheMapRaw';

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => { setOpen(!open); };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TheAppBar {...{ position: 'absolute', open, toggleDrawer }} />
                <TheSidebar {...{ variant: 'permanent', open, toggleDrawer }} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        p: 0,
                        m: 0,
                    }}
                >
                    { /* Include a toolbar for spacing. Seems dumb, but that's what the example had. */}
                    <Toolbar />
                    <Container disableGutters={true} maxWidth={false}>
                        <TheMapRaw />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}