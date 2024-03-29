import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import {FormControl, InputLabel, Select} from "@mui/material";
import '../styles/component/_DashboardHistoryCollecteur.scss';
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
        adresse: string;
        utilisateur:{
            nom: string;
            prenom: string;
        }
    }
    collecteur:{
        utilisateur: {
            nom: string;
            prenom: string;
        }
    }
    
}

const hours = [
    {
      value: 'T08:00:00.000Z',
      label: 'Matin',
    },
    {
      value: 'T12:00:00.000Z',
      label: 'Après-Midi',
    },
    
  ];

export function DashboardHistoryCollecteur () {
    const [Collecteur, setCollecteur] = useState<Collecteur[]>();
    const [InformationEtape, setInformationEtape] = useState<InformationEtape[]>();
    const [fetchOnce, setFetchOnce] = useState(true);
    const [fetchCollectorOnce, setFetchCollectorOnce] = useState(true);
    const [collecteurid, setCollecteurId] = useState('null');
    const [date, setDate] = useState('');
    const [hour, setHour] = React.useState('');
    const [limit, setLimit] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState('')



    useEffect(() => {
        if(fetchCollectorOnce){
        axios.get(HOST_BACK + '/collecteur',{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            
            }}).then(res => {
                setCollecteur(res.data)
                setFetchCollectorOnce(false)
            })
        }
    }, [fetchCollectorOnce, Collecteur])

    useEffect(() => {
        if(fetchOnce){
            console.log(collecteurid)
            setPage(1)
            axios.get(HOST_BACK + '/etape/day/' + page +'/?take=5', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
                setInformationEtape(res.data.etapes)
                setTotalPages(res.data.totalPages)
                setFetchOnce(false)
            })
        }
    }, [fetchOnce, InformationEtape])

    function getEtapeByCollecteur(){
        setPage(1);
        if(date == undefined || date == '' || hour == undefined || hour == ''){
            axios.get(HOST_BACK + '/etape/collecteur/' + collecteurid, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }}).then(res => {
                    setInformationEtape(res.data)
                }).catch((err) =>
                console.log(err.response))
        } else {
            axios.get(HOST_BACK + '/etape/collecteur/' + collecteurid + '/' + date + hour + '/' + date + limit + '/' + page + '/?take=5', {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
                setInformationEtape(res.data.etapes)
                setTotalPages(res.data.totalPages)
            }).catch((err) =>
            console.log(err.response))
        }
    }      
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHour(event.target.value);      
        console.log(hour)

        if(event.target.value == 'T08:00:00.000Z'){
            setLimit('T11:59:59.000Z')

        } else if(event.target.value == 'T12:00:00.000Z'){
            setLimit('T20:00:00.000Z')

        } 
    };

    const changePage = (event: string, value: number) => {
        setPage(value);
        if(collecteurid == 'null'){
            axios.get(HOST_BACK + '/etape/day/' + value +'/?take=5', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
                setInformationEtape(res.data.etapes)
                setTotalPages(res.data.totalPages)
                setFetchOnce(false)
            })
        } else {
            axios.get(HOST_BACK + '/etape/collecteur/' + collecteurid + '/' + date + hour + '/' + date + limit + '/' + value + '/?take=5', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }}).then(res => {
                    setInformationEtape(res.data.etapes)
                    setTotalPages(res.data.totalPages)

                }).catch((err) =>
                    console.log(err.response)
                )
        }
    };

    return(
    <div className="conteneurs">
        <h1>Consulter l'agenda</h1>
        <Grid container justifyContent="space-around" alignItems="center" marginTop={-4}>
            <FormControl>
                <h3>Collecteur:</h3>
                <TextField
                    id="demo-simple-select"
                    select
                    value={collecteurid}
                    label="Collecteur"
                    sx={{ width: 250, mt: 0.5}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => setCollecteurId(e.target.value)}
                    >
                {Collecteur?.map((list) => 
                    <MenuItem value={list.id}>{list.utilisateur.nom + " " + list.utilisateur.prenom}</MenuItem>
                )}
                </TextField>
            </FormControl>
            <FormControl>
                <h3>Date:</h3>  
                <TextField
                    id="datetime-local"
                    label="Date"
                    type="date"
                    defaultValue="moment(nowDate.getDate()).format('DD.MM.YYYY')"
                    sx={{ width: 250, mt: 0.5}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newDate) => {
                        setDate(newDate.target.value);
                    }}
                />       
            </FormControl>
            <FormControl>
                <h3>Plage horaire:</h3>
                <TextField
                    sx={{ width: 250, mt: 0.5 }}
                    id="select"
                    select
                    value={hour}
                    label="Horaire"
                    onChange={handleChange}
                >
                    {hours.map((hour) => (
                        <MenuItem key={hour.value} value={hour.value}>{hour.label}</MenuItem>
                    ))}
                </TextField>
            </FormControl>
        </Grid>
        <Grid container justifyContent="space-around" alignItems="center">
            <Button
                sx={{ my: 0.5, mt: 1, ml: 0.5, mb: -1 }}
                variant="outlined"
                size="medium"
                onClick={getEtapeByCollecteur}
                aria-label="move all left"
            >
                Valider
            </Button>
        </Grid>
        <div className='liste'>
            <Box className="box" sx={{width: '80%', bgcolor: 'background.paper'}}>
                <List className="list" component="nav" aria-label="Liste des conteneurs">
                    <ListItem className='listItemHeader'>
                        <ListItemText className='listHeader' primary="Nom Commercial"/>
                        <ListItemText className='listHeader' primary="Adresse"/>
                        <ListItemText className='listHeader' primary="Client"/>
                        <ListItemText className='listHeader' primary="Collecteur"/>
                        <ListItemText className='listHeader' primary="Date"/>
                    </ListItem>
                    <ListItem className='listItemHeader'>
                        <ListItemText className='listHeader' primary=" "/>
                    </ListItem>
                    <Divider/>
                    {InformationEtape?.map((list) => {
                        return(    
                            <ListItem className="listItemBody">
                                <ListItemText className='listItem' primary={list.client.nomCommercial}/>
                                <ListItemText className='listItem' primary={list.client.adresse}/>
                                <ListItemText className='listItem' primary={list.client.utilisateur.nom + " " + list.client.utilisateur.prenom}/>
                                <ListItemText className='listItem' primary={list.collecteur.utilisateur.nom + " " + list.collecteur.utilisateur.prenom}/>
                                <ListItemText className='listItem' primary={moment(list.date).format('DD.MM.YYYY à HH [h] mm')}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </div>   
        <div className='pagination'>
            <Stack spacing={2}>
                <Pagination count={parseInt(totalPages)} color="primary" page={page}
                    onChange={changePage}/>
            </Stack>
        </div>
    </div>        
    )
}

export default DashboardHistoryCollecteur






