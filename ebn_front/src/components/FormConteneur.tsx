import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/component/_FormConteneur.scss'
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';


export default function FormConteneur() {
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
                {/* <TextField className='field' id="dechet" label="Type de déchet" variant="outlined" /> */}

                <Autocomplete
                    disablePortal
                    id="typeDechet"
                    options={dechets}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="type de déchet" />}
                />
                {/* <TextField className='field' id="capacite" label="Capacité maximum (kg)" variant="outlined" /> */}

                <TextField
                    label="Capacité maximum du conteneur"
                    id="poids_conteneur"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                />

                <Button type='submit'>Valider</Button>
            </div>
        </Box>
    );
}

const dechets = [
    { label: 'Bio-déchet', id: 1 },
    { label: 'café', id: 2 },
    { label: 'huile', id: 3 },
];