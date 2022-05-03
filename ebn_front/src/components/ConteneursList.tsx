import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddConteneur from './AddConteneur';
import ListItem from '@mui/material/ListItem';
import ListConteneursPagination from './ListConteneursPagination'


function ConteneursList() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

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
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemText className='listItem' primary="1" />
                            <ListItemText className='listItem' primary="Bio-déchet" />
                            <ListItemText className='listItem' primary="12kg" />
                            <ListItemText className='listItem' primary="Restaurant Le Bacio" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemText className='listItem' primary="2" />
                            <ListItemText className='listItem' primary="Café" />
                            <ListItemText className='listItem' primary="8kg" />
                            <ListItemText className='listItem' primary="Restaurant Le Bacio" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemText className='listItem' primary="3" />
                            <ListItemText className='listItem' primary="Bio-déchet" />
                            <ListItemText className='listItem' primary="12kg" />
                            <ListItemText className='listItem' primary="Restaurant Hug" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemText className='listItem' primary="4" />
                            <ListItemText className='listItem' primary="Café" />
                            <ListItemText className='listItem' primary="10kg" />
                            <ListItemText className='listItem' primary="Starbucks" />
                        </ListItemButton>
                        <Divider />
                    </List>
                </Box>
            </div>
            <ListConteneursPagination/>
        </div>
    )
}

export default ConteneursList