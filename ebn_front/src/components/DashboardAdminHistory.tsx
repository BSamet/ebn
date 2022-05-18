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
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@mui/material/TextField';


registerLocale('fr', fr)


interface historyCustomerInterface{

    typeAction:string;
    commentaire:string;
    date:number;
    typeDeDechet:string;
    poids:number;

    client:{
        nomCommercial:string;
        utilisateur:{
            nom:string;
            prenom:string;
        }
    }
}




        const DashboardAdminHistory = () => {
            const [DashboardAdminHistory, setDashboardAdminHistory] = useState<historyCustomerInterface[]>();
            const [nomCommercial, setNomCommercial] = useState('');
            const [typeAction, setTypeAction] = useState('');
            const [typeDeDechet, settypeDeDechet] = useState('');
            const [fetchOnce, setFetchOnce] = useState(true);
            const [orderBy, setOrderBy] = useState("date");
            const formatDate = moment().format('DD-MM-YYYY')
            const [totalPages, setTotalPages] = React.useState('')
            const [page, setPage] = React.useState(1);
            const [selected, setSelected] = useState([]);
            const [startDate, setStartDate] = useState('');
            const [startTime, setStartTime] = useState('');
            const [endDate, setEndDate] = useState('');

            console.log(startDate + ' ' + startTime)

            const nomCommercialCat = DashboardAdminHistory?.reduce(
                (acc, nomCommercial) =>
                    acc.includes(nomCommercial.client.nomCommercial) ? acc : acc.concat(nomCommercial.client.nomCommercial),
                [] as string[]
            )

            const actionCat = DashboardAdminHistory?.reduce(
                (acc, typeAction) =>
                    acc.includes(typeAction.typeAction) ? acc : acc.concat(typeAction.typeAction),
                [] as string[]
            )

            const dateCat = DashboardAdminHistory?.reduce(
                (acc, date) =>
                    acc.includes(date.date) ? acc : acc.concat(date.date),
                [] as number[]
            )

            const dechetCat = DashboardAdminHistory?.reduce(
                (acc, typeDeDechet) =>
                    acc.includes(typeDeDechet.typeDeDechet) ? acc : acc.concat(typeDeDechet.typeDeDechet),
                [] as string[]
            )

            function clearFilter() {
                setNomCommercial('')
                setTypeAction('')
                settypeDeDechet('')
                setStartDate('')
                setEndDate('')
                axios.get(HOST_BACK + '/historique/all/' + page + '?take=5&orderBy=date', {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }}).then(res => {
                    setDashboardAdminHistory(res.data.historiques)
                    // appel de l'api
                    setFetchOnce(false);
                    setTotalPages(res.data.totalPages)
                })
            }

            function validateFilter(){
                setPage(1)
                axios.get(HOST_BACK + '/historique/all/' + page + '?take=5&nomCommercial=' + nomCommercial + '&typeDeDechet=' + typeDeDechet + '&typeAction='+typeAction+ '&startDate' + startDate + '&endDate' + endDate + '&orderBy=date', {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }}).then(res => {
                    setDashboardAdminHistory(res.data.historiques)
                })
            }

            const handleChange = (event: string, value: number) => {
                setPage(value);

                axios.get(HOST_BACK + '/historique/all/' + value + '?take=5&nomCommercial=' + nomCommercial + '&typeDeDechet=' + typeDeDechet + '&typeAction='+typeAction+ '&startDate' + startDate + '&endDate' + endDate + '&orderBy=date', {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }}).then(res => {
                    setDashboardAdminHistory(res.data.historiques)
                })
            };


            const configOrderBy = (orderBy: string) => {
                setPage(1);
                axios.get(HOST_BACK + '/historique/all/' + page + '?take=5&orderBy=date', {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }}).then(res => {
                    setDashboardAdminHistory(res.data.historiques)
                    setOrderBy(orderBy)
                })
            }


            useEffect(() => {
                if (fetchOnce) {
                    axios.get(HOST_BACK + '/historique/all/' + page + '?take=5&orderBy=date', {
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }}).then(res => {
                        setDashboardAdminHistory(res.data.historiques)
                        // appel de l'api
                        setFetchOnce(false);
                        setTotalPages(res.data.totalPages)
                    })
                }
            }, [DashboardAdminHistory, fetchOnce]);

            return (

                <div className='conteneurs'>

                    <h1>Historiques des clients</h1>

                    <div className="datePickerHistorique">
                        <Stack component="form" noValidate spacing={3}>
                            <div className="filter">
                            <TextField
                                id="nomCommercial"
                                defaultValue="Small"
                                select
                                helperText="Société"
                                value={nomCommercial}
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={(e) => setNomCommercial(e.target.value)}

                            >
                                <option value='Société'>
                                    Société
                                </option>
                                {nomCommercialCat?.map((list, index) =>
                                    <option key={index} value={list}>
                                        {list}
                                    </option>
                                )}
                            </TextField>
                                <TextField
                                    id="typeAction"

                                    select
                                    value={typeAction}

                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Type d'action"


                                    onChange={(e) => setTypeAction(e.target.value)}
                                >
                                    <option value="Type d'action">
                                        Type d'action
                                    </option>
                                    {actionCat?.map((list, index) =>
                                        <option key={index} value={list}>
                                            {list}
                                        </option>
                                    )}
                                </TextField>
                                <TextField
                                    id="typeDeDechet"
                                    select
                                    value={typeDeDechet}
                                    SelectProps={{
                                        native: true,
                                    }}

                                    helperText="Type de déchet"
                                    onChange={(e) => settypeDeDechet(e.target.value)}
                                >
                                    <option value="Type de déchet">
                                        Type de déchet
                                    </option>
                                    {dechetCat?.map((list, index) =>
                                        <option key={index} value={list}>
                                            {list}
                                        </option>
                                    )}
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    id="datetime-local"
                                    label="Date de début"
                                    type="datetime-local"
                                    defaultValue="2022-05-24T10:30"
                                    sx={{ width: 300}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>  setStartDate(e.target.value)}
                                />
                                <TextField
                                    id="datetime-local"
                                    label="Date de fin"
                                    type="datetime-local"
                                    defaultValue="2022-05-24T10:30"
                                    sx={{ width: 300}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>  setEndDate(e.target.value)}
                                />

                            </div>

                        </Stack>


                    </div>

                    <div className="buttonChoice">
                     <div className="buttonChoice__filter">
                        <button onClick={validateFilter}> Valider</button>
                     </div>

                     <div className="buttonChoice__filter">
                        <button onClick={clearFilter}> Annuler</button>
                     </div>
                    </div>


                    <div className='liste'>
                        <Box sx={{width: '80%', bgcolor: 'background.paper'}}>
                            <List component="nav" aria-label="Liste des conteneurs">
                                <ListItem className='listItemHeader'>
                                    <ListItemText className='listHeader listHeader--neron' primary="Nom Commercial"
                                                  onClick={() => configOrderBy("nomCommercial")}/>
                                    <ListItemText className='listHeader listHeader--neron' primary="Action"
                                                  onClick={() => configOrderBy("typeAction")}/>
                                    <ListItemText className='listHeader listHeader--neron' primary="Type de déchet"
                                                  onClick={() => configOrderBy("typeDeDechet")}/>
                                    <ListItemText className='listHeader listHeader--neron' primary="Date"
                                                  onClick={() => configOrderBy("date")}/>
                                    <ListItemText className='listHeader' primary="Commentaire"/>
                                </ListItem>

                                <ListItem className='listItemHeader'>
                                    <ListItemText className='listHeader' primary=" "/>
                                </ListItem>
                                <Divider/>
                                {DashboardAdminHistory?.map((list, index) =>
                                    <ListItem className="listItemBody">
                                        <ListItemText className='listItem' primary={list.client.nomCommercial}/>
                                        <ListItemText className='listItem' primary={list.typeAction}/>
                                        <ListItemText className='listItem' primary={list.typeDeDechet}/>
                                        <ListItemText className='listItem'
                                                      primary={moment(list.date).format('DD.MM.YYYY à HH [h] mm')}/>
                                        <ListItemText className='listItem' primary={list.commentaire}/>
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    </div>

                    <div className='pagination'>
                        <Stack spacing={2}>
                            <Pagination count={parseInt(totalPages)} color="primary" page={page}
                                        onChange={handleChange}/>
                        </Stack>
                    </div>


                </div>
            )
        };
export default DashboardAdminHistory;