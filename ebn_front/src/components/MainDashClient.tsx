import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {HOST_BACK} from "../environment/environment";
import {useParams} from "react-router-dom";

interface clientInterface {
    siret: number;
    nomCommercial: string;
    adresse: string;
    utilisateur: {
        nom: string;
        prenom: string;
        mail: string;
        telephone: number;
    };
    ramassageAbonnement: [{
        periodicite: number;
        dateReference: Date;
    }];
    typeDechet: [{
        typeDechets: string;
    }]
}

const MainDashClient = () => {
    const {id} = useParams();
    const [client, setClient] = useState<clientInterface>();


    useEffect(() => {
        axios
            .get(HOST_BACK + '/client/' + id)
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
                <p>{client?.utilisateur?.nom} {client?.utilisateur?.prenom}</p>
                <p>{client?.nomCommercial}</p>
                <p> Adresse: {client?.adresse}</p>
                <p> e-mail: {client?.utilisateur.mail}</p>
                <p> téléphone: {client?.utilisateur.telephone}</p>

            </div>
            {/*TODO: gérer les multiples abonnement via une message*/}
            <div className="abonnement">
                <h4>Abonnement</h4>
                {client?.ramassageAbonnement?.map((abonnement) => (
                    <div>
                        <p>Vous avez un abonnement actif depuis le: {abonnement.dateReference}</p>
                        <p>Collecte tout les {abonnement.periodicite} jours</p>
                    </div>
                ))}


            </div>

            <div className="typeDechets">
                <h4>Type de déchets</h4>
                {client?.typeDechet?.map((dechets) => (
                    <p>{dechets.typeDechets}</p>
                ))}

            </div>

        </div>
    );

}
export default MainDashClient;