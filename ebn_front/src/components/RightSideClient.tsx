import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";
import {useParams} from "react-router-dom";
import moment from "moment";

interface historyCustomerInterface{
    typeAction:string;
    commentaire:string;
    date:number;
    poids:number;

}



const RightSideClient = () => {
    const [history, setHistory] = useState<historyCustomerInterface[]>([]);
    const {id} = useParams();




    useEffect(() => {
        axios
            .get(HOST_BACK +'/historique/customer/' + sessionStorage.getItem("id"), {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(res => {
                setHistory(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const formatDate = moment().format('DD-MM-YYYY')

    return (
        <div>
            <h3>MON HISTORIQUE</h3>
            {history.map((data) => (
                <div className="historique">

                    <h3>{data.typeAction}</h3>
                    <p>{moment(data.date).format('DD.MM.YYYY à HH [h] mm')} </p>
                    <p>{data.commentaire}</p>
                </div>
            ))}
        </div>
    );
};

export default RightSideClient;