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

interface conteneursInterface {
    id: number;
    capaciteMax: number;
    isAvailable: boolean;
    client: {
        nomCommercial: string,
        utilisateur: {
            nom: string,
            prenom: string
        },
    }
    typeDechet: {
        typeDechets: string;
        }
}

const ConteneursList = () => {


    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const [conteneursList, setConteneurslist] = useState<conteneursInterface[]>();
    const [fetchOnce, setFetchOnce] = useState(true);

    useEffect(() => {
        if (fetchOnce) {
            axios.get(HOST_BACK + '/conteneur/all/1').then(res => {
                setConteneurslist(res.data)
                // appel de l'api
                setFetchOnce(false);                
            });
        }
    }, [conteneursList, fetchOnce]);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        idConteneur: any,        
    ) => {
        setSelectedIndex(index);
        console.log(idConteneur);
        
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
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0, list.id)}
                            key={index}
                        >
                            
                            <ListItemText className='listItem' primary={list.id} />
                            <ListItemText className='listItem' primary={list.typeDechet.typeDechets} />
                            <ListItemText className='listItem' primary={list.capaciteMax} />
                            <ListItemText className='listItem' primary={list.client.nomCommercial} />
                        </ListItemButton>
                        )}
                    </List>
                </Box>
            </div>
            <div className='pagination'>
                <Stack spacing={2}>
                    <Pagination count={10} color="primary" />
                </Stack>
                {}
            </div>
        </div>
    )
}

export default ConteneursList
