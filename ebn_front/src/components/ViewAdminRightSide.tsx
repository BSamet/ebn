import React from 'react';
import Maps from './Maps';
import RightSideQrcode from './RightSideQrcode';

interface ViewAdminRightSideInterface {
    selectRight: string;
    selectConteneurId : string;
}

const ViewAdminRightSide = ({selectRight, selectConteneurId}: ViewAdminRightSideInterface) => {
    
    if (selectRight === 'Conteneurs'){
        return (
        <RightSideQrcode selectConteneurId={selectConteneurId}/>
        )
    } else {
        return(
            <Maps />
        )
    }
};

export default ViewAdminRightSide;