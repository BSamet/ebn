import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { HOST_BACK } from '../environment/environment';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

interface propsUpdateCollecteurListInterface {
    collecteur: any;
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

export default function UpdateCollecteur({ collecteur }: propsUpdateCollecteurListInterface) {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [nom, setNom] = React.useState(collecteur.utilisateur.nom);
    const [prenom, setPrenom] = React.useState(collecteur.utilisateur.prenom);
   
    const [numeroVelo, setNumeroVelo] = React.useState(collecteur.numeroVelo);

    let dataConteneur = {
        "nom": nom,
        "prenom": prenom,
        "numeroVelo": numeroVelo
    };

    const nomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value as string);
    };
    const prenomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrenom(event.target.value);
    };

    const numeroVeloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumeroVelo(event.target.value);
    };

    const updateCollecteur = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            
        axios.patch(HOST_BACK + '/collecteur/' + collecteur.id, dataConteneur, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        handleClose()
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
                                <h1 className='titleConteneurs'>Modifier un collecteur</h1>

                                <InputLabel htmlFor="component-outlined">Nom</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    defaultValue={nom}
                                    onChange={nomChange}
                                    label="Nom"
                                />

                                <InputLabel htmlFor="component-outlined">Prénom</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    defaultValue={prenom}
                                    onChange={prenomChange}
                                    label="Prénom"
                                />
                               
                                <InputLabel htmlFor="component-outlined">N° de vélo</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    defaultValue={numeroVelo}
                                    onChange={numeroVeloChange}
                                    label="N° de vélo"
                                />
                                <div onClick={(event) => updateCollecteur(event)}>
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