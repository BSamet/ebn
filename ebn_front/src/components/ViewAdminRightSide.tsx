import React from 'react';
import Maps from './Maps';
import RightSideQrcode from './RightSideQrcode';

interface ViewAdminRightSideInterface {
    selectRight: string;
    selectConteneurId : string;
    collectorEtape: any;
}

const ViewAdminRightSide = ({selectRight, selectConteneurId, collectorEtape}: ViewAdminRightSideInterface) => {
    
    if (selectRight === 'Conteneurs'){
        return (
        <RightSideQrcode selectConteneurId={selectConteneurId}/>
        )
    } else {
        return(
            <Maps collectorEtape={collectorEtape} />
        )
    }
};

export default ViewAdminRightSide;