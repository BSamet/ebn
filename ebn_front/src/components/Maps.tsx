import React from 'react';
import map from '../assets/mulhouse.png'

const Maps = () => {
    return (
        <div >
            <h3>Carte</h3>
            <img className="map" src={map} alt='MulhouseMaps'/>
        </div>
    );
};

export default Maps;