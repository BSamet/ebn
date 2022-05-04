import React from 'react';
import MainDash from "./MainDash";
import DashboardAdminHistory from "./DashboardAdminHistory";
import ConteneursList from './ConteneursList';

interface ViewAdminDashInterface {
    selectNav: string;
}

const ViewAdminDash = ({selectNav}: ViewAdminDashInterface) => {
    if(selectNav === 'Historique') {
        return (
            <DashboardAdminHistory/>
        )
    } else if(selectNav === 'Conteneurs'){
        return (
            <ConteneursList/>
        )
    } else {
        return (
            <MainDash/>
        )
    }
};

export default ViewAdminDash;