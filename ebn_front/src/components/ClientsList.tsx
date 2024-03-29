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
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import { Button } from '@mui/material';


interface propsClientListInterface {
  setSelectClientId: any;
  selectClientId: string;
}

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
  clientvalide:boolean,
}

const ClientsList = ({ setSelectClientId, selectClientId }: propsClientListInterface) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [clientValid, setclientValid] = React.useState(true);
  const [clientNotValid, setclientNotValid] = React.useState(false);
  const [clientsList, setClientslist] = useState<clientsInterface[]>();
  const [fetchOnce, setFetchOnce] = useState(true);
  //Paginations des clients
  const [totalPages, setTotalPages] = React.useState('')
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    axios.get(HOST_BACK + '/client/all/' + value, {
      headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
      }
  }).then(res => {
      setClientslist(res.data.clients)
      
    });
  };

  let clientvalide = {
    "clientvalide": clientValid,
};
  let clientnonvalide = {
    "clientvalide" : clientNotValid,
  }

  //Fin pagination des clients

  useEffect(() => {
    if (fetchOnce) {
      axios.get(HOST_BACK + '/client/all/' + page, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(res => {
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

  const statusClient = (
    list : clientsInterface
  ) => {
    if(list.clientvalide == false){
      return <p>En attente</p>
    }
    else{
      return <p>Valide</p>
    }
  }

  const validClient = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    list : clientsInterface
   ) => {
     if(list.clientvalide == true){
   
      axios.patch(HOST_BACK + '/client/' + list.id, clientnonvalide, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      list.clientvalide = false;
     }
     else{
       
       axios.patch(HOST_BACK + '/client/' + list.id, clientvalide, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    list.clientvalide = true;
     }
     
}

  const deleteClient = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    axios.delete(HOST_BACK + '/client/' + index, {
      headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
      }
  }).then(res => {
    axios.get(HOST_BACK + '/client/all/' + page, {
      headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`}
      }).then(res => {
        setClientslist(res.data.clients)
        setTotalPages(res.data.totalPages)
      });
    });

  }

  return (
    <div className='conteneurs'>
      <h1>LISTE DES CLIENTS</h1>
      <div className='bouton'>
                <AddClient />
            </div>
      <div className='liste'>
        <Box sx={{ width: '80%', bgcolor: 'background.paper' }}>

          <List component="nav" aria-label="Liste des clients">
            <ListItem className='listItemHeader'>
              <ListItemText className='listHeader' primary="Nom Commercial" />
              <ListItemText className='listHeader' primary="Nom" />
              <ListItemText className='listHeader' primary="Prénom" />
              <ListItemText className='listHeader' primary="Téléphone" />
              <ListItemText className='listHeader' primary="Statut" />
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
                <ListItemButton >
                <ListItemText onClick={(event) => validClient(event, list)}  className='ValidClient' primary={statusClient(list)}/>
                </ListItemButton>
                <div>
                  <UpdateClient selectClientId={selectClientId} />
                </div>
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
