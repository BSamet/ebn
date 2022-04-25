import React from 'react';
import '../styles/component/_MainDash.scss'
import Cards from '../components/Cards'

const MainDash = () => {
    return (
        <div className="MainDash">
            <h1>Tableau de bord</h1>
            <Cards/>

        </div>
    );
};

export default MainDash;