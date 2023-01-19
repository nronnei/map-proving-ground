import React from "react";
import Dashboard from './components/Dashboard';
import { RecoilRoot } from "recoil";

const App = () => {
    return (
        <RecoilRoot>
            <div id="app">
                <Dashboard />
            </div>
        </RecoilRoot>
    )
}

export default App