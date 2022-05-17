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

interface propsUpdateConteneurInterface {
    selectConteneurId: string;
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
    const [idClient, setClient] =React.useState('');
    let dataConteneur = {
        "capaciteMax": poids,
        "isAvailable": true,
        "typeDechet": dechet,
        "client":idClient
    };
    const dechetChange = (event: SelectChangeEvent) => {
        setDechet(event.target.value as string);
    };
    const poidsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoids(event.target.value);
    };
    const clientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClient(event.target.value);
    };
    const updateConteneur = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        axios.patch(HOST_BACK + '/conteneur/' + selectConteneurId, dataConteneur)
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
                                <h1 className='titleConteneurs'>Modifier un conteneur</h1>

                                <InputLabel id="demo-simple-select-label">Type de déchets</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dechet}
                                    label="Déchets"
                                    onChange={dechetChange}
                                >
                                    <MenuItem value={1}>bio-déchets</MenuItem>
                                    <MenuItem value={2}>café</MenuItem>
                                </Select>

                                <InputLabel htmlFor="component-outlined">Capacité maximum du conteneur (kg)</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={poids}
                                    onChange={poidsChange}
                                    label="Capacité maximum"
                                />
                                <InputLabel htmlFor="component-outlined">Client N°</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={idClient}
                                    onChange={clientChange}
                                    label="ID Client"
                                />
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