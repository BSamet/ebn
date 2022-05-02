import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {HOST_BACK} from "../environment/environment";

interface clientInterface {
    nomCommercial: string;
    adresse:string;
}

const MainDashClient = () => {
    const [client, setClient] = useState<clientInterface>();


    useEffect(() => {
        axios
            .get(HOST_BACK +'/client/1')
            .then(res => {
                setClient(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


        return (
            <div className="MainDash">
                <h1>Tableau de bord</h1>
                <div className="idClient">
                    <h4>Information Client</h4>
                    <p>{client?.adresse}</p>
                    <p>{client?.nomCommercial}</p>
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

}
export default MainDashClient;