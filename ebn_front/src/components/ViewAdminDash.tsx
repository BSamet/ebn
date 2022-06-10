import React from 'react';
import MainDash from "./MainDash";
import DashboardAdminHistory from "./DashboardAdminHistory";
import ConteneursList from './ConteneursList';
import ClientsList from './ClientsList';
import CollecteursList from './CollecteursList';
import DashboardHistoryCollecteur from './DashboardHistoryCollecteur';
import  AgendaOrganisation  from './AgendaOrganisation';

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
    case 'Commande':
        return(
            <DashboardHistoryCollecteur />
        )
    case 'Collecteurs':
        return (
            <CollecteursList setSelectCollecteurId={setSelectCollecteurId} selectCollecteurId={selectCollecteurId} />
        )
    case 'Agenda':
        return (
            <AgendaOrganisation />
        )
    default:
        return (
            <MainDash />
        )
    }
};

export default ViewAdminDash;