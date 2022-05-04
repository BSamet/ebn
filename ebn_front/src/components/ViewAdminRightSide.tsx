import React from 'react';
import Maps from './Maps';
import RightSideQrcode from './RightSideQrcode';

interface ViewAdminRightSideInterface {
    selectRight: string;
}

const ViewAdminRightSide = ({selectRight}: ViewAdminRightSideInterface) => {
    
    if (selectRight === 'Conteneurs'){
        return (
        <RightSideQrcode />
        )
    } else {
        return(
            <Maps />
        )
    }
};

export default ViewAdminRightSide;