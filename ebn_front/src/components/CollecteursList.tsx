import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { HOST_BACK } from '../environment/environment';
import "../styles/component/cssList.scss"
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateCollecteur from './UpdateCollecteur';

interface propsCollecteurListInterface {
    setSelectCollecteurId: any;
    selectCollecteurId: string;
}
interface collecteursInterface {
    id: number;
    numeroCollecteur: number;
    numeroVelo: number;
    utilisateur: {
        nom: string,
        prenom: string,
    }
}

const CollecteursList = ({ setSelectCollecteurId, selectCollecteurId }: propsCollecteurListInterface) => {


    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [collecteursList, setCollecteurslist] = useState<collecteursInterface[]>();
    const [fetchOnce, setFetchOnce] = useState(true);
    //Paginations des collecteurs
    const [totalPages, setTotalPages] = React.useState('')
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        axios.get(HOST_BACK + '/collecteur/all/' + value).then(res => {
            setCollecteurslist(res.data.collecteurs)
        });
    };

    //Fin pagination des collecteurs

    useEffect(() => {
        if (fetchOnce) {
            axios.get(HOST_BACK + '/collecteur/all/' + page).then(res => {
                setCollecteurslist(res.data.collecteurs)
                // appel de l'api
                setFetchOnce(false);
                setTotalPages(res.data.totalPages)
            });
        }
    }, [collecteursList, fetchOnce]);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setSelectCollecteurId(index);
    }

    const deleteCollecteur = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        axios.delete(HOST_BACK + '/collecteur/'+ index).then(res => {
            setCollecteurslist(res.data.collecteurs)
        });

    }

    return (
        <div className='conteneurs'>
            <h1>LISTE DES COLLECTEURS</h1>
            <div className='liste'>
                <Box sx={{ width: '80%', bgcolor: 'background.paper' }}>

                    <List component="nav" aria-label="Liste des conteneurs">
                        <ListItem className='listItemHeader'>
                            <ListItemText className='listHeader' primary="N° Collecteur" />
                            <ListItemText className='listHeader' primary="Nom" />
                            <ListItemText className='listHeader' primary="Prénom" />
                            <ListItemText className='listHeader' primary="N° Vélo" />
                            <ListItemText className='listHeader' primary="" />
                        </ListItem>
                        <ListItem className='listItemHeader'>
                            <ListItemText className='listHeader' primary=" " />
                        </ListItem>
                        <Divider />
                        {collecteursList?.map((list, index) =>
                            <ListItemButton
                                selected={selectedIndex === list.id}
                                onClick={(event) => handleListItemClick(event, list.id)}
                                key={index}
                            >
                                <ListItemText className='listItem' primary={list.id} />
                                <ListItemText className='listItem' primary={list.utilisateur.nom} />
                                <ListItemText className='listItem' primary={list.utilisateur.prenom} />
                                <ListItemText className='listItem' primary={list.numeroVelo} />
                                <div>
                                    <UpdateCollecteur selectCollecteurId={selectCollecteurId} />
                                </div>
                                <div onClick={(event) => deleteCollecteur(event, list.id)} >
                                <IconButton aria-label="delete" size="large" color="warning">
                                    <DeleteIcon />
                                </IconButton>
                                </div>
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
        </div >
    )
}

export default CollecteursList
