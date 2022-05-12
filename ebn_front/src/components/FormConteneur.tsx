import React, { useState } from 'react';
import Box from '@mui/material/Box';
import '../styles/component/_FormConteneur.scss'
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { HOST_BACK } from '../environment/environment';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';



export default function FormConteneur() {

    const [poids, setPoids] = useState('');
    const [dechet, setDechet] = useState('1');
    let dataConteneur = {
        "capaciteMax": poids,
        "isAvailable": true,
        "typeDechetId": dechet
    }

    const postConteneur = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        axios.post(HOST_BACK + '/conteneur', dataConteneur)
    }

    const dechetChange = (event: SelectChangeEvent) => {
        setDechet(event.target.value as string);
    };

    const poidsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoids(event.target.value);
    };
    console.log(dataConteneur)

    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 2, width: '30ch' },
            }}
            component="form"
            noValidate
            autoComplete="off"
        >
            <div className='popupConteneurs'>
                <h1 className='titleConteneurs'>Ajouter un conteneur</h1>

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
                <div onClick={(event) => postConteneur(event)}>
                    <Button>Valider</Button>
                </div>
            </div>
        </Box>
    );
}