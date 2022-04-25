import React from 'react';
import '../styles/component/_Maps.scss';
import map from '../assets/mulhouse.png'

const Maps = () => {
    return (
        <div className='mapImage'>
            <h3>Carte</h3>
            <img src={map} alt='MulhouseMaps'/>
        </div>
    );
};

export default Maps;