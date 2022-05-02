import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";

interface historyCustomerInterface{
    typeAction:string;
    commentaire:string;
    date:number;
    poids:number;

}

const RightSideClient = () => {
    const [history, setHistory] = useState<historyCustomerInterface>();


    useEffect(() => {
        axios
            .get(HOST_BACK +'/historique/1')
            .then(res => {
                setHistory(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className="historique">
            <h2>Historique</h2>
            <ul>
                <li>{history?.typeAction}</li>
                <li>{history?.commentaire}</li>
                <li>poids : {history?.poids} kg</li>
                <li>{history?.date}</li>


            </ul>
        </div>
    );
};

export default RightSideClient;