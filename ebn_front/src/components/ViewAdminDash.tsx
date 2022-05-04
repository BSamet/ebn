import React from 'react';
import MainDash from "./MainDash";
import DashboardAdminHistory from "./DashboardAdminHistory";

interface ViewAdminDashInterface {
    selectNav: string;
}

const ViewAdminDash = ({selectNav}: ViewAdminDashInterface) => {
    if(selectNav === 'Historique') {
        return (
            <DashboardAdminHistory/>
        )
    } else {
        return (
            <MainDash/>
        )
    }
};

export default ViewAdminDash;