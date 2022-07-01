import React, {useEffect, useState} from "react";
import axios from "axios";
import {HOST_BACK} from "../environment/environment";
import {useParams} from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import {ClientAskCollect} from "./ClientAskCollect";
import Subscribe from "./customer/subscribe/subscribe";

const cronstrue = require('cronstrue');
const fr = require("cronstrue/locales/fr")


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
    collect: [
        {
            "id": number,
            "refDate": Date
            "cronExpression": string
            typeDechet:
                {
                    typeDechets: string;
                }
        }
    ];
    typeDechet: [
        {
            typeDechets: string;
        }
    ];
}

interface typeOfWaste {
    id: number;
    typeDechets: string;
}

interface ClientDashInterface {
    selectNav: string;
}

const MainDashClient = ({selectNav}: ClientDashInterface) => {
    const {id} = useParams();
    const [client, setClient] = useState<clientInterface>();
    const [allTypeOfWaste, setAllTypeOfWaste] = useState<typeOfWaste>()
    const clientvalide = sessionStorage.getItem("clientvalide");

    const getClient = () => {
        axios
            .get(HOST_BACK + "/client/" + sessionStorage.getItem("id"), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setClient(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getAllTypeOfWaste = () => {
        axios
            .get(HOST_BACK + "/type-dechets/", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setAllTypeOfWaste(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getClient();
        getAllTypeOfWaste();
    }, []);

    const formatCronToStringDate = (cron: string) => {
        let cronToString = cronstrue.toString(cron, {
            locale: 'fr',
            use24HourTimeFormat: true
        }).split(", ")
        let getDateInSplittedCron = cronToString[0].split(" ")
        let timeToPeriod = "";
        if (getDateInSplittedCron[1] === "08:00") {
            timeToPeriod = "les matins"
        } else {
            timeToPeriod = "les après-midi"
        }

        return timeToPeriod + ", "+cronToString[1]
    }

    switch (selectNav) {
        case 'Demande de collecte':
            return (
                <ClientAskCollect client={client} setClient={setClient} allTypeOfWaste={allTypeOfWaste}/>
            );
        case 'Abonnement':
            return (
                <Subscribe client={client} setClient={setClient} allTypeOfWaste={allTypeOfWaste}/>
            );
        default:
            if (clientvalide == "true") {
                return (
                    <div className="MainDashClient">
                        <h1>Tableau de bord</h1>
                        <div className="idClient">
                            <h3>Information Client</h3>
                            <p>
                                {client?.utilisateur?.nom} {client?.utilisateur?.prenom}
                            </p>
                            <p>{client?.nomCommercial}</p>
                            <p> Adresse: {client?.adresse}</p>
                            <p> E-mail: {client?.utilisateur.mail}</p>
                            <p> Téléphone: {client?.utilisateur.telephone}</p>
                        </div>
                        <div className="abonnement">
                            <h3>Collecte</h3>
                            <h4>Abonnement</h4>
                            {client?.collect.filter((checkCollect) => checkCollect.cronExpression != null).length != 0
                                ?
                                client?.collect.filter((checkCollect) => checkCollect.cronExpression != null).map((subscribe, index) => (
                                    <div key={index}>
                                        <p>
                                            Les {subscribe.typeDechet.typeDechets.toLowerCase()}, à partir du{" "}
                                            {moment(subscribe.refDate).locale('fr').format(
                                                "DD MMMM YYYY"
                                            )}{", "}
                                            {formatCronToStringDate(subscribe.cronExpression)}.
                                        </p>
                                    </div>
                                ))
                                :
                                <div>
                                    <p className="emptyCollect">
                                        Vous n'avez aucun abonnement actif.
                                    </p>
                                </div>
                            }
                            <h4>Demande de collecte</h4>
                            {client?.collect.filter((checkCollect) => checkCollect.cronExpression === null).length != 0
                                ?
                                client?.collect.filter((checkCollect) => checkCollect.cronExpression === null).map((oneTime, index) => (
                                    <div key={index}>
                                        <p>
                                            Les {oneTime.typeDechet.typeDechets.toLowerCase()}, le{" "}
                                            {moment(oneTime.refDate).locale('fr').format("DD MMMM YYYY")}{" "} {new Date(oneTime.refDate).getHours() === 8 ? "matin" : "après-midi"}
                                        </p>
                                    </div>
                                ))
                                :
                                <div>
                                    <p className="emptyCollect">
                                        Vous n'avez aucune demande collecte
                                    </p>
                                </div>
                            }
                        </div>

                        <div className="typeDechets">
                            <h4>Type de déchets</h4>
                            {client?.typeDechet.length === 0
                                ?
                                <div>
                                    <p className="emptyCollect">
                                        Vous n'avez pas encore configurer vos types de déchets pour les collectes.
                                    </p>
                                </div>
                                :
                                client?.typeDechet?.map((dechets) => (
                                    <p>{dechets.typeDechets}</p>
                                ))
                            }
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="MainDashClient">
                        <h1>Tableau de bord</h1>
                        <div className="dontvalid">
                            <p>Votre compte est en attente de validation, lorsque celui-ci sera validé vous aurez accès
                                à l'ensemble de l'application</p>
                        </div>
                        <div className="idClient">
                            <h4>Information Client</h4>
                            <p>
                                {client?.utilisateur?.nom} {client?.utilisateur?.prenom}
                            </p>
                            <p>{client?.nomCommercial}</p>
                            <p> Adresse: {client?.adresse}</p>
                            <p> e-mail: {client?.utilisateur.mail}</p>
                            <p> téléphone: {client?.utilisateur.telephone}</p>
                        </div>
                    </div>
                );
            }
    }
};
export default MainDashClient;
