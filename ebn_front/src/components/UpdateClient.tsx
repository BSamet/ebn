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

interface propsUpdateClientListInterface {
    client : any;
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

export default function UpdateClient({ client}: propsUpdateClientListInterface) {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [nom, setNom] = React.useState(client.utilisateur.nom);
    const [prenom, setPrenom] = React.useState(client.utilisateur.prenom);
    const [nomCommercial, setNomComercial] =React.useState(client.nomCommercial);
    const [adresse, setAdresse] =React.useState(client.adresse);
    const [siret, setSiret] =React.useState(client.siret);
    const [telephone, setTelephone] =React.useState(client.utilisateur.telephone);

    let dataConteneur = {
        "nom": nom,
        "prenom": prenom,
        "nomCommercial": nomCommercial,
        "adresse": adresse,
        "siret": siret,
        "telephone": telephone
    };

    const nomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value as string);
    };
    const prenomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrenom(event.target.value);
    };
    const nomCommercialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomComercial(event.target.value);
    };
    const adresseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresse(event.target.value);
    };
    const siretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSiret(event.target.value);
    };
    const telephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone(event.target.value);
    };

    const updateClient = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        axios.put(HOST_BACK + '/client/' + client.id, dataConteneur, {
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
                                <h1 className='titleConteneurs'>Modifier un client</h1>

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
                                <InputLabel htmlFor="component-outlined">Nom commercial</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={nomCommercial}
                                    onChange={nomCommercialChange}
                                    label="Nom commercial"
                                />
                                <InputLabel htmlFor="component-outlined">Adresse</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={adresse}
                                    onChange={adresseChange}
                                    label="Adresse"
                                />
                                <InputLabel htmlFor="component-outlined">Siret</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={siret}
                                    onChange={siretChange}
                                    label="Siret"
                                />
                                <InputLabel htmlFor="component-outlined">Téléphone</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={telephone}
                                    onChange={telephoneChange}
                                    label="Téléphone"
                                />
                                <div onClick={(event) => updateClient(event)}>
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