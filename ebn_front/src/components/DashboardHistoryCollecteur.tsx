import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";
import { MenuItem } from "@mui/material";
import {FormControl, InputLabel, Select} from "@mui/material";






interface Collecteur {
        id: number;
        utilisateur: {
            nom: string;
            prenom: string;
        }
    
}

interface InformationEtape{
    date: Date;
    client:{
        nomCommercial: string;
        nom: string;
        prenom: string;
        adresse: string;
    }
}


export function DashboardHistoryCollecteur () {
    const [Collecteur, setCollecteur] = useState<Collecteur[]>();
    const [InformationEtape, setInformationEtape] = useState<InformationEtape[]>();
    const [fetchOnce, setFetchOnce] = useState(true);
    const [fetchCollectorOnce, setFetchCollectorOnce] = useState(true);



    useEffect(() => {
        if (fetchOnce) { axios.get(HOST_BACK + '/etape/collecteur/1', {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
            setInformationEtape(res.data)
            console.log("etape:" + InformationEtape)
            setFetchOnce(false)
            
            })
        }      
    }, [fetchOnce,InformationEtape ]);

    useEffect(() => {
        if(fetchCollectorOnce){
        axios.get(HOST_BACK + '/collecteur',{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data)
            setCollecteur(res.data)
            console.log("collecteur:" + Collecteur)
            setFetchCollectorOnce(false)

            })
        }
    }, [fetchCollectorOnce, Collecteur])

    return(
    <div>
        

            <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={agendaCollecteur}
                label="Age"
                // onChange={agendaCollecteur}
            >
                {Collecteur?.map((list) => 
                    <MenuItem value={list.id}>{list.utilisateur.nom + " " + list.utilisateur.prenom}</MenuItem>
                
                )}
                
                
            </Select>
        </FormControl>

                

            </div>
            
        
    </div>
    )
}

export default DashboardHistoryCollecteur