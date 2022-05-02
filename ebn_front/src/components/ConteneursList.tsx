import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


function ConteneursList() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <div>
            <h1>LISTE DES CONTENEURS</h1>
            <div className='liste'>
                <Box sx={{ width: '80%', bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="Liste des conteneurs">
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemText className='listItem' primary="Conteneur ID: 1"/>
                            <ListItemText className='listItem' primary="Type de déchet : Bio-déchet" />
                            <ListItemText className='listItem' primary="Capacité maximum : 12kg" />
                            <ListItemText className='listItem' primary="Client : Restaurant Le Bacio" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemText className='listItem' primary="Conteneur ID: 2" />
                            <ListItemText className='listItem' primary="Type de déchet : Café" />
                            <ListItemText className='listItem' primary="Capacité maximum : 8kg" />
                            <ListItemText className='listItem' primary="Client : Restaurant Le Bacio" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemText className='listItem' primary="Conteneur ID: 3" />
                            <ListItemText className='listItem' primary="Type de déchet : Bio-déchet" />
                            <ListItemText className='listItem' primary="Capacité maximum : 12kg" />
                            <ListItemText className='listItem' primary="Client : Restaurant Hug" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemText className='listItem' primary="Conteneur ID: 4" />
                            <ListItemText className='listItem' primary="Type de déchet : Café" />
                            <ListItemText className='listItem' primary="Capacité maximum : 10kg" />
                            <ListItemText className='listItem' primary="Client : Starbucks" />
                        </ListItemButton>
                        <Divider />
                    </List>
                </Box>
            </div>
        </div>
    )
}

export default ConteneursList