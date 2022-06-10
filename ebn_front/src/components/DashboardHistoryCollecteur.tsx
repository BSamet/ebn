import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";
import { ListItem, ListItemText, MenuItem } from "@mui/material";
import {FormControl, InputLabel, Select} from "@mui/material";
import { listenerCount } from "process";
import moment from "moment";






interface Collecteur {
        id: number;
        utilisateur: {
            nom: string;
            prenom: string;
        }
    
}

interface InformationEtape{
    date: Date;
    clientid: number;
    client:{
        nomCommercial: string;
        nom: string;
        prenom: string;
        adresse: string;
    }
}


export function DashboardHistoryCollecteur () {
    const [DashboardHistoryCollecteur, setDashboardHistoryCollecteur] = useState<Collecteur[]>();
    const [Collecteur, setCollecteur] = useState<Collecteur[]>();
    const [InformationEtape, setInformationEtape] = useState<InformationEtape[]>();
    const [fetchOnce, setFetchOnce] = useState(true);
    const [fetchCollectorOnce, setFetchCollectorOnce] = useState(true);
    const [id, setid] = useState('');



    useEffect(() => {
        if (fetchOnce) { axios.get(HOST_BACK + '/etape', {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
            setInformationEtape(res.data)
            setFetchOnce(false)
            
            })
        }      
    }, [fetchOnce,InformationEtape ]);

    useEffect(() => {
        if(fetchCollectorOnce){
        axios.get(HOST_BACK + '/collecteur',{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            
            }}).then(res => {
            setCollecteur(res.data)
            setDashboardHistoryCollecteur(res.data.historiques)

            setFetchCollectorOnce(false)


            })
        }
    }, [fetchCollectorOnce, Collecteur])
    
    function validateFilter(){
        axios.get(HOST_BACK + '/collecteur',{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            
            }}).then(res => {
            setCollecteur(res.data)
            setDashboardHistoryCollecteur(res.data.historiques)

            setFetchCollectorOnce(false)
        })
    } 

    return(
    <div>
        

            <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">collecteur</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 value={id}
                label="collecteur"
                onChange={(e) => setid(e.target.value)}
                >
                {Collecteur?.map((list) => 
                    <MenuItem value={list.id}>{list.utilisateur.nom + " " + list.utilisateur.prenom}</MenuItem>

                )}
                </Select>
        </FormControl>
        <button onClick={validateFilter}> Valider</button>

              
     </div>
     {InformationEtape?.map((list, _index) =>
{return(
    
    
 <ListItem className="listItemBody">
                <ListItemText className='listItem' primary={list.client.nomCommercial}/>
                <ListItemText className='listItem' primary={list.client.adresse}/>
                <ListItemText className='listItem' primary={list.client.nom}/>
                <ListItemText className='listItem'primary={moment(list.date).format('DD.MM.YYYY à HH [h] mm')}/>
                <ListItemText className='listItem' primary={list.client.prenom}/>
            </ListItem>
                    )})}
        </div>
        
    )
}

export default DashboardHistoryCollecteur





