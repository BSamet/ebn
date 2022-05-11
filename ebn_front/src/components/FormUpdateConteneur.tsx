import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/component/_FormConteneur.scss'
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import '../styles/component/_FormConteneur.scss'


export default function FormUpdateConteneur() {
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
                <h1 className='titleConteneurs'>Modifier un conteneur</h1>
                {/* <TextField className='field' id="dechet" label="Type de déchet" variant="outlined" /> */}

                <Autocomplete
                    disablePortal
                    id="typeDechet"
                    options={dechets}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="type de déchet" />}
                />
                <TextField
                    label="Capacité maximum du conteneur"
                    id="poids_conteneur"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                />
                <TextField
                    label="Client "
                    id="poids_conteneur"
                    sx={{ m: 1, width: '25ch' }}
                    
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