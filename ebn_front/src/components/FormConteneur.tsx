import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/component/_FormConteneur.scss'
import Button from '@mui/material/Button';

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
                <TextField className='field' id="dechet" label="Type de déchet" variant="outlined" />
                <TextField className='field' id="capacite" label="Capacité maximum (kg)" variant="outlined" />
                <Button type='submit'>Valider</Button>
            </div>
        </Box>
    );
}