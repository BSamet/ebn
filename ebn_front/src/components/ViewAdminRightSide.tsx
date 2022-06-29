import React from 'react';
import Maps from './Maps';
import RightSideQrcode from './RightSideQrcode';

interface ViewAdminRightSideInterface {
    selectRight: string;
    selectConteneurId : string;
    collectorEtape: any;
    consultCollectorEtape: any;
    actionSelected: any;
}

const ViewAdminRightSide = ({selectRight, selectConteneurId, collectorEtape, consultCollectorEtape, actionSelected}: ViewAdminRightSideInterface) => {
    
    if (selectRight === 'Conteneurs'){
        return (
        <RightSideQrcode selectConteneurId={selectConteneurId}/>
        )
    } else {
        return(
            <Maps collectorEtape={collectorEtape} consultCollectorEtape={consultCollectorEtape} actionSelected={actionSelected} />
        )
    }
};

export default ViewAdminRightSide;