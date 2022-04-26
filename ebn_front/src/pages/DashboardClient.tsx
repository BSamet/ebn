import React from 'react';
import '../styles/component/_DashboardClient.scss'
import Sidebar_DashboardClient from "../components/Sidebar_DashboardClient";
import MainDashClient from "../components/MainDashClient";
import RightSideClient from "../components/RightSideClient";

const DashboardClient = () => {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar_DashboardClient/>
                <MainDashClient/>
                <RightSideClient/>

            </div>
        </div>
    );
};

export default DashboardClient;