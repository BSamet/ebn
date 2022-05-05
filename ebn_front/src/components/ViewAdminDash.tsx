import React from 'react';
import MainDash from "./MainDash";
import DashboardAdminHistory from "./DashboardAdminHistory";
import ConteneursList from './ConteneursList';

interface ViewAdminDashInterface {
    selectNav: string;
    setSelectConteneurId: any;
}

const ViewAdminDash = ({selectNav, setSelectConteneurId}: ViewAdminDashInterface) => {
    if(selectNav === 'Historique') {
        return (
            <DashboardAdminHistory/>
        )
    } else if(selectNav === 'Conteneurs'){
        return (
            <ConteneursList setSelectConteneurId={setSelectConteneurId}/>
        )
    } else {
        return (
            <MainDash/>
        )
    }
};

export default ViewAdminDash;