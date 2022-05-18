import React from 'react';
import MainDash from "./MainDash";
import DashboardAdminHistory from "./DashboardAdminHistory";
import ConteneursList from './ConteneursList';
import ClientsList from './ClientsList';
import CollecteursList from './CollecteursList';

interface ViewAdminDashInterface {
    selectNav: string;
    setSelectConteneurId: any;
    selectConteneurId: string;
    setSelectClientId: any;
    selectClientId: string
    setSelectCollecteurId: any;
    selectCollecteurId: string
}

const ViewAdminDash = ({ selectNav, setSelectConteneurId, selectConteneurId, setSelectClientId, selectClientId, setSelectCollecteurId, selectCollecteurId }: ViewAdminDashInterface) => {
    switch (selectNav) {
    case 'Historique':
        return (
            <DashboardAdminHistory />
        )
    case 'Conteneurs':
        return (
            <ConteneursList setSelectConteneurId={setSelectConteneurId} selectConteneurId={selectConteneurId} />
        )
    case 'Clients':
        return (
            <ClientsList setSelectClientId={setSelectClientId} selectClientId={selectClientId} />
        )
    case 'Collecteurs':
        return (
            <CollecteursList setSelectCollecteurId={setSelectCollecteurId} selectCollecteurId={selectCollecteurId} />
        )
    default:
        return (
            <MainDash />
        )
    }
};

export default ViewAdminDash;