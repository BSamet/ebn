import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Bouton from './Bouton';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { HOST_BACK } from '../environment/environment';


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

export default function AddCollecteur() {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [nom, setNom] = React.useState('');
    const [prenom, setPrenom] = React.useState('');
    const [adresse, setAdresse] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');

    let dataConteneur = {
        "role": "Collecteur",
        "nom": nom,
        "prenom": prenom,
        "adresse": adresse,
        "telephone": telephone,
        "mail": mail,
        "password": password
    };

    const nomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value as string);
    };
    const prenomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrenom(event.target.value);
    };
    const adresseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresse(event.target.value);
    };
    const telephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone(event.target.value);
    };
    const mailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value);
    };
    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const addCollecteur = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        axios.post(HOST_BACK + '/collecteur/', dataConteneur, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        handleClose()
    }
    return (
        <div>
            <div onClick={handleOpen}>
                <Bouton />
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
                                <h1 className='titleConteneurs'>Ajouter un collecteur</h1>

                                <InputLabel htmlFor="component-outlined">Nom</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={nom}
                                    onChange={nomChange}
                                    label="Nom"
                                />

                                <InputLabel htmlFor="component-outlined">Prénom</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={prenom}
                                    onChange={prenomChange}
                                    label="Prénom"
                                />
                                <InputLabel htmlFor="component-outlined">Adresse</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={adresse}
                                    onChange={adresseChange}
                                    label="Adresse"
                                />
                                <InputLabel htmlFor="component-outlined">Téléphone</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={telephone}
                                    onChange={telephoneChange}
                                    label="Téléphone"
                                />
                                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={mail}
                                    onChange={mailChange}
                                    label="Email"
                                />
                                <InputLabel htmlFor="component-outlined">Mot de passe</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={password}
                                    onChange={passwordChange}
                                    label="Mot de passe (min, maj, chiffre, caractère special"
                                />
                                <div onClick={(event) => addCollecteur(event)}>
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