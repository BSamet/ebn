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

const ViewAdminDash = ({ selectNav, setSelectConteneurId, selectConteneurId, setSelectClientId, selectClientId, setSelectCollecteurId, selectCollecteurId}: ViewAdminDashInterface) => {
    if (selectNav === 'Historique') {
        return (
            <DashboardAdminHistory />
        )
    } else if (selectNav === 'Conteneurs') {
        return (
            <ConteneursList setSelectConteneurId={setSelectConteneurId} selectConteneurId={selectConteneurId} />
        )
    } else if (selectNav === 'Clients') {
        return (
            <ClientsList setSelectClientId={setSelectClientId} selectClientId={selectClientId} />
        )
        } else if (selectNav === 'Collecteurs') {
            return (
                <CollecteursList setSelectCollecteurId={setSelectCollecteurId} selectCollecteurId={selectCollecteurId} />
            )
            } else {
        return (
            <MainDash />
        )
    }
};

export default ViewAdminDash;