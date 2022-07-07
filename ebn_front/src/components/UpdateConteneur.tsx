import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { HOST_BACK } from '../environment/environment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import { FormControl, TextField } from '@mui/material';
import { useEffect } from 'react';

interface propsUpdateConteneurInterface {
    selectConteneurId: string;
}

interface clientInterface {
    id: number;
    adresse: string;
    utilisateur:{
        nom: string;
        prenom: string;
    }
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UpdateConteneur({selectConteneurId }: propsUpdateConteneurInterface) {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [poids, setPoids] = React.useState('');
    const [dechet, setDechet] = React.useState('1');
    const [clients, setClients] = React.useState([])
    const [client, setClient] = React.useState<clientInterface>();
    const [fetchOnce, setFetchOnce] = React.useState(true)

    let dataConteneur = {
        "capaciteMax": poids,
        "isAvailable": true,
        "typeDechet": dechet,
        "client": client?.id
    };
    const dechetChange = (event: SelectChangeEvent) => {
        setDechet(event.target.value as string);
    };
    const poidsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoids(event.target.value);
    };
    useEffect(() => {
        if (fetchOnce) {
            axios.get(HOST_BACK + '/client', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                setClients(res.data)
                // appel de l'api
                console.log(clients)
                setFetchOnce(false);
            });
        }
    }, [clients, fetchOnce]);
    const updateConteneur = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        axios.patch(HOST_BACK + '/conteneur/' + selectConteneurId, dataConteneur, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        handleClose()
    }
    // function fillSelectOptions() {
    //     if(client == undefined || client === null){
    //         return
    //     } else{
    //         return client.utilisateur.nom + " " + client.utilisateur.prenom;
    //     }
    // }
    const handleChange = (event: any) => {
        setClient(event.target.value);
        console.log(client)
    }
    return (
        <div>
            <div onClick={handleOpen}>
            <Fab size="medium" color="primary" aria-label="edit">
                <EditIcon />
                </Fab>
            </div>
            <Modal
                sx={{ style }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <div className='popupConteneurs'>
                                <h1 className='titleConteneurs'>Modifier un conteneur</h1>

                                <InputLabel id="demo-simple-select-label">Type de déchets</InputLabel>
                                <Select
                                    sx={{width: 300, mt: 0.5}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dechet}
                                    label="Déchets"
                                    onChange={dechetChange}
                                >
                                    <MenuItem value={1}>Bio-déchets</MenuItem>
                                    <MenuItem value={2}>Café</MenuItem>
                                </Select>

                                <InputLabel htmlFor="component-outlined">Capacité maximum du conteneur (kg)</InputLabel>
                                <OutlinedInput
                                    sx={{width: 300, mt: 0.5}}

                                    id="component-outlined"
                                    value={poids}
                                    onChange={poidsChange}
                                    label="Capacité maximum"
                                />
                                <InputLabel htmlFor="component-outlined">Client</InputLabel>
                                <FormControl>
                                    
                                    <TextField
                                        sx={{width: 300, mt: 0.5}}
                                        id="select"
                                        select
                                        value={client}
                                        onChange={(event) => handleChange(event)}
                                    >
                                        {clients?.map((client: clientInterface) => (
                                            <MenuItem key={client.id}
                                                      value={client.id}>{client.utilisateur.nom + " " + client.utilisateur.prenom}</MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                                <div onClick={(event) => updateConteneur(event)}>
                                    <Button>Valider</Button>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const dechets = [
    { label: 'Bio-déchet', id: 1 },
    { label: 'café', id: 2 },
    { label: 'huile', id: 3 },
];