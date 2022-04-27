import React from 'react';


const MainDashClient = () => {
    return (
        <div className="MainDash">
            <h1>Tableau de bord</h1>

            <div className="idClient">
                <h4>Information Client</h4>
                <p>Restaurant le Mer Rouge</p>
                <p>12 rue des fleurs</p>
                <p>68200 Mulhouse</p>
            </div>

            <div className="abonnement">
                <h4>Abonnement</h4>
                <p>Ramassage tout les:</p>
                <p>Mardi</p>
                <p>Jeudi</p>

            </div>

            <div className="typeDechets">
                <h4>Type de déchets</h4>
                <p>Bio-déchets</p>
                <p>Marc de café</p>

            </div>

            </div>
    );
};

export default MainDashClient;