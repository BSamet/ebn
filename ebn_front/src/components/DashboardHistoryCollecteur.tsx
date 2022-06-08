import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
import TextField from '@mui/material/TextField';





interface AgendaCollecteur {
    date: Date;
    collecteur:{
        numeroVelo: number;
        utilisateur: {
            nom: string;
            prenom: string;
            telephone: number;
        }
    }
}

const DashboardHistoryCollecteur  = () => {
    const [agendaCollecteur, setAgendaCollecteur] = useState<AgendaCollecteur>();
    const [fetchOnce, setFetchOnce] = useState(true);



useEffect(() => {
    if (fetchOnce) { axios.get(HOST_BACK + '/etape/collecteur/1', {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }}).then(res => {
        setAgendaCollecteur(res.data)
    })
}}, [DashboardHistoryCollecteur, fetchOnce, agendaCollecteur]);

<div>
{agendaCollecteur?.map((agenda, index) => 
    <div>
        <p>{agenda.date}</p>
        <p>{agenda.client.id}</p>
        <p>{agenda.collecteur.utilisateur.nom}</p>
        <p>{agenda.collecteur.utilisateur.prenom}</p>
        <p>{agenda.collecteur.utilisateur.telephone}</p>
        <p>{agenda.collecteur.numeroVelo}</p>

    </div>
)}
</div>

}