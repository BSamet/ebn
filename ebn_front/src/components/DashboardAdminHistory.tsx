import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";

const DashboardAdminHistory = () => {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get(HOST_BACK +'/historique')
            .then(res => {
                setHistory(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <div>
            {history.map((data) => (
                <div>
                    <h1>{data.typeAction}</h1>
                    <p>{data.client.utilisateur.nom} {data.client.utilisateur.prenom}</p>
                    <p>{data.date}</p>
                    <p>{data.commentaire}</p>
                </div>
            ))}
        </div>
    );
};

export default DashboardAdminHistory;