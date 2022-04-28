import React from 'react';
import Maps from "./Maps";
import DeliveryList from '../components/DeliveryList'

const RightSide = () => {
    return (
        <div className="RightSide">
            <div>
                <Maps/>
                <DeliveryList/>
            </div>
        </div>
    );
};

export default RightSide;