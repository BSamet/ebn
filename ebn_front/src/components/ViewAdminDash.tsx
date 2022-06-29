import React from 'react';
import MainDash from "./MainDash";
import DashboardAdminHistory from "./DashboardAdminHistory";
import ConteneursList from './ConteneursList';
import ClientsList from './ClientsList';
import CollecteursList from './CollecteursList';
import DashboardHistoryCollecteur from './DashboardHistoryCollecteur';
import  AgendaOrganisation  from './AgendaOrganisation';
import { AgendaDash } from './AgendaDash';

interface ViewAdminDashInterface {
    selectNav: string;
    setSelectConteneurId: any;
    selectConteneurId: string;
    setSelectClientId: any;
    selectClientId: string;
    setSelectCollecteurId: any;
    selectCollecteurId: string;
    setCollectorEtape: any;
    collectorEtape: any;
    consultCollectorEtape: any,
    setConsultCollectorEtape: any;
    actionSelected: any;
    setActionSelected: any;
}

const ViewAdminDash = ({ selectNav, setSelectConteneurId, selectConteneurId, setSelectClientId, selectClientId, setSelectCollecteurId, selectCollecteurId, setCollectorEtape, collectorEtape, consultCollectorEtape, setConsultCollectorEtape, actionSelected, setActionSelected }: ViewAdminDashInterface) => {
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
    case 'Agenda':
        return (
            <AgendaDash setCollectorEtape={setCollectorEtape} collectorEtape={collectorEtape} consultCollectorEtape={consultCollectorEtape} setConsultCollectorEtape={setConsultCollectorEtape} actionSelected={actionSelected} setActionSelected={setActionSelected}/>
        )
    default:
        return (
            <MainDash />
        )
    }
};

export default ViewAdminDash;