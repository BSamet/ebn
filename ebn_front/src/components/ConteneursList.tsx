import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddConteneur from './AddConteneur';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { HOST_BACK } from '../environment/environment';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';


interface conteneursInterface {
    id: number;
    capaciteMax: number;
    isAvailable: boolean;
    client: {
        nomCommercial: string,
        id:number,
        utilisateur: {
            nom: string,
            prenom: string
        },
    }
    typeDechet: {
        typeDechets: string;
    }
}

const ConteneursList = ({ setSelectConteneurId }: any) => {


    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [conteneursList, setConteneurslist] = useState<conteneursInterface[]>();
    const [fetchOnce, setFetchOnce] = useState(true);
    //Paginations des conteneurs
    const [totalPages, setTotalPages] = React.useState('')
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        axios.get(HOST_BACK + '/conteneur/all/' + value + "?take=2").then(res => {
            setConteneurslist(res.data.conteneurs)
        });
    };

    //Fin pagination des conteneurs

    useEffect(() => {
        if (fetchOnce) {
            axios.get(HOST_BACK + '/conteneur/all/' + page).then(res => {
                setConteneurslist(res.data.conteneurs)
                // appel de l'api
                setFetchOnce(false);
                setTotalPages(res.data.totalPages)
            });
        }
    }, [conteneursList, fetchOnce]);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setSelectConteneurId(index);

    }

    return (
        <div className='conteneurs'>
            <h1>LISTE DES CONTENEURS</h1>
            <div className='bouton'>
                <AddConteneur />
            </div>
            <div className='liste'>
                <Box sx={{ width: '80%', bgcolor: 'background.paper' }}>

                    <List component="nav" aria-label="Liste des conteneurs">
                        <ListItem className='listItemHeader'>
                            <ListItemText className='listHeader' primary="Conteneur N°" />
                            <ListItemText className='listHeader' primary="Type de déchet" />
                            <ListItemText className='listHeader' primary="Capacité maximum" />
                            <ListItemText className='listHeader' primary="Client" />
                        </ListItem>
                        <ListItem className='listItemHeader'>
                            <ListItemText className='listHeader' primary=" " />
                        </ListItem>
                        <Divider />
                        {conteneursList?.map((list, index) =>
                            <ListItemButton
                                selected={selectedIndex === list.id}
                                onClick={(event) => handleListItemClick(event, list.id)}
                                key={index}
                            >
                                <ListItemText className='listItem' primary={list.id} />
                                <ListItemText className='listItem' primary={list.typeDechet.typeDechets} />
                                <ListItemText className='listItem' primary={list.capaciteMax} />   
                                {list.client.nomCommercial === null
                                ?<ListItemText className='listItem' primary='test'/>                    
                                :<ListItemText className='listItem' primary={list.client.nomCommercial} />
                                }
                            </ListItemButton>
                        )}
                    </List>
                </Box>
            </div>
            <div className='pagination'>
                <Stack spacing={2}>
                    <Pagination count={parseInt(totalPages)} color="primary" page={page} onChange={handleChange} />
                </Stack>
                { }
            </div>
        </div>
    )
}

export default ConteneursList
