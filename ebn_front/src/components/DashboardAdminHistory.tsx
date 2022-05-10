import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST_BACK} from "../environment/environment";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import moment from "moment";
import {useParams} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";


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
    const [fetchOnce, setFetchOnce] = useState(true);
    const formatDate = moment().format('DD-MM-YYYY')
    const [totalPages, setTotalPages] = React.useState('')
    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        axios.get(HOST_BACK + '/historique/all/' + value + '?take=5').then(res => {
            setDashboardAdminHistory(res.data.historiques)
            console.log(res.data)
        });
    };



    useEffect(() => {
        if (fetchOnce) {
            axios.get(HOST_BACK + '/historique/all/' + page + '?take=5&orderBy=date').then(res => {
                setDashboardAdminHistory(res.data.historiques)
                // appel de l'api
                setFetchOnce(false);
                setTotalPages(res.data.totalPages)
            });
        }
    }, [DashboardAdminHistory, fetchOnce]);


    return (

        <div className='conteneurs'>
            <h1>LISTE DES HISTORIQUES</h1>
        <div className='liste'>
            <Box sx={{width: '80%', bgcolor: 'background.paper'}}>

                <List component="nav" aria-label="Liste des conteneurs">
                    <ListItem className='listItemHeader'>
                        <ListItemText className='listHeader' primary="Nom Commercial"/>
                        <ListItemText className='listHeader' primary="Action"/>
                        <ListItemText className='listHeader' primary="Type de déchet"/>
                        <ListItemText className='listHeader' primary="Date"/>
                        <ListItemText className='listHeader' primary="Commentaire"/>
                    </ListItem>
                    <ListItem className='listItemHeader'>
                        <ListItemText className='listHeader' primary=" "/>
                    </ListItem>
                    <Divider/>

                    {DashboardAdminHistory?.map((list,index) =>
                        <ListItem className="listItemBody">
                        <ListItemText className='listItem' primary={list.client.nomCommercial}/>
                            <ListItemText className='listItem' primary={list.typeAction}/>
                            <ListItemText className='listItem' primary={list.typeDeDechet}/>
                            <ListItemText className='listItem' primary={moment(list.date).format('DD.MM.YYYY à HH [h] mm')}/>
                            <ListItemText className='listItem' primary={list.commentaire}/>

                        </ListItem>

                    )}
                </List>
            </Box>
        </div>

            <div className='pagination'>
                <Stack spacing={2}>
                    <Pagination count={totalPages} color="primary" page={page} onChange={handleChange}/>
                </Stack>
            </div>

        </div>
    )
}

export default DashboardAdminHistory;