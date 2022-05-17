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
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface clientsInterface {
  id: number,
  siret: number,
  nomCommercial: string,
  adresse: string,
  utilisateur: {
    nom: string,
    prenom: string,
    telephone: number
  },
  typeDechet:
  {
    typeDechets: number
  }
}

const ClientsList = ({ setSelectClientId }: any) => {


  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [clientsList, setClientslist] = useState<clientsInterface[]>();
  const [fetchOnce, setFetchOnce] = useState(true);
  //Paginations des clients
  const [totalPages, setTotalPages] = React.useState('')
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    axios.get(HOST_BACK + '/client/all/' + value).then(res => {
      setClientslist(res.data.clients)
    });
  };

  //Fin pagination des clients

  useEffect(() => {
    if (fetchOnce) {
      axios.get(HOST_BACK + '/client/all/' + page).then(res => {
        setClientslist(res.data.clients)
        // appel de l'api
        setFetchOnce(false);
        setTotalPages(res.data.totalPages)
      });
    }
  }, [clientsList, fetchOnce]);


  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setSelectClientId(index);
  }

  const deleteClient = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    axios.delete(HOST_BACK + '/client/' + index).then(res => {
      setClientslist(res.data.collecteurs)
    });

  }

  return (
    <div className='conteneurs'>
      <h1>LISTE DES CLIENTS</h1>
      <div className='liste'>
        <Box sx={{ width: '80%', bgcolor: 'background.paper' }}>

          <List component="nav" aria-label="Liste des clients">
            <ListItem className='listItemHeader'>
              <ListItemText className='listHeader' primary="Nom Commercial" />
              <ListItemText className='listHeader' primary="Nom" />
              <ListItemText className='listHeader' primary="Prénom" />
              <ListItemText className='listHeader' primary="Téléphone" />
              <ListItemText className='listHeader' primary="Modifier / Supprimer" />
            </ListItem>
            <ListItem className='listItemHeader'>
              <ListItemText className='listHeader' primary=" " />
            </ListItem>
            <Divider />
            {clientsList?.map((list, index) =>
              <ListItemButton
                selected={selectedIndex === list.id}
                onClick={(event) => handleListItemClick(event, list.id)}
                key={index}
              >
                <ListItemText className='listItem' primary={list.nomCommercial} />
                <ListItemText className='listItem' primary={list.utilisateur.nom} />
                <ListItemText className='listItem' primary={list.utilisateur.prenom} />
                <ListItemText className='listItem' primary={list.utilisateur.telephone} />
                <Fab size="medium" color="primary" aria-label="edit">
                  <EditIcon className='listItemEnd'/>
                </Fab>
                <div onClick={(event) => deleteClient(event, list.id)}>
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
    </div>
  )
}

export default ClientsList
