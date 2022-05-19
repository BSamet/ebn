import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST_BACK } from "../environment/environment";
import { useParams } from "react-router-dom";
import moment from "moment";

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
  ramassageAbonnement: [
    {
      periodicite: number;
      dateReference: Date;
    }
  ];
  typeDechet: [
    {
      typeDechets: string;
    }
  ];
  ramassagePonctuel: [
    {
      date: Date;
    }
  ];
}

const MainDashClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState<clientInterface>();
  const formatDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
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
  }, []);

  return (
    <div className="scroll">
      <div className="MainDashClient">
        <h1>Tableau de bord</h1>
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
        {/*TODO: gérer les multiples abonnement via une message*/}
        <div className="abonnement">
          <h4>Ramassage</h4>
          <h3>Abonnement</h3>
          {client?.ramassageAbonnement?.map((abonnement) => (
            <div>
              <p>
                Vous avez un abonnement actif depuis le:{" "}
                {moment(abonnement.dateReference).format(
                  "DD.MM.YYYY à HH [h] mm"
                )}{" "}
              </p>
              <p>Collecte tout les {abonnement.periodicite} jours</p>
            </div>
          ))}

          <h3>Ponctuel</h3>
          {client?.ramassagePonctuel.map((ponctuel) => (
            <div>
              <p>
                Vous avez demandé un ramassage ponctuel le :{" "}
                {moment(ponctuel.date).format("DD.MM.YYYY à HH [h] mm")}{" "}
              </p>
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
    </div>
  );
};
export default MainDashClient;
