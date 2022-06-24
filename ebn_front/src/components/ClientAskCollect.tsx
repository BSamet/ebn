import {FormControl, Grid, TextField, Button, MenuItem, Modal, Alert, Snackbar} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React from "react";
import {useState} from "react";
import {HOST_BACK} from "../environment/environment";

const hours = [
    {
        value: 'T08:00:00.000Z',
        label: 'Matin',
    },
    {
        value: 'T12:00:00.000Z',
        label: 'Après-Midi',
    },

];

export function ClientAskCollect() {
    const [date, setDate] = useState('');
    const [dateSelected, setDateSelected] = useState(false);
    const [hour, setHour] = React.useState('');
    const [period, setPeriod] = React.useState('');
    const [sendMessage, setSendMessage] = useState('');
    const [open, setOpen] = React.useState(false);

    const clientId = sessionStorage.getItem("id");

    function ValidateCollect() {
        setDateSelected(true)
        setTimePeriod()
    }

    function AnnulCollect() {
        setDateSelected(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHour(event.target.value);
    };

    function setTimePeriod() {
        if (hour == "T08:00:00.000Z") {
            setPeriod("Matin");
        } else if (hour == "T12:00:00.000Z") {
            setPeriod("Après-Midi");
        } else {
            setPeriod("Aucune tranche horaire sélectionnée")
        }
    }

    function sendClientCollect() {
        const collectToAdd = {
            clientId: clientId,
            refDate: date + hour,
        }
        axios
            .post(HOST_BACK + "/collect", collectToAdd, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setOpen(true)
                setSendMessage('La demande de collecte a été prise en compte')
                setDateSelected(false)
            })
            .catch(error => {
                console.log(error)
            });


    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (!dateSelected) {
        return (
            <div className="conteneur">
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success">{sendMessage}</Alert>
                </Snackbar>
                <h1>Demande de collecte</h1>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item>
                        <FormControl>
                            <h3>Sélectionner une date:</h3>
                            <TextField
                                id="datetime-local"
                                label="Date"
                                type="date"
                                defaultValue="moment(nowDate.getDate()).format('DD.MM.YYYY')"
                                sx={{width: 300, mt: 0.5}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(newDate) => {
                                    setDate(newDate.target.value);
                                }}
                                onClick={AnnulCollect}/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <h3>Sélectionner une tranche horaire:</h3>
                            <TextField
                                sx={{width: 300, mt: 0.5}}
                                id="select"
                                select
                                value={hour}
                                label="Horaire"
                                onChange={handleChange}
                            >
                                {hours.map((hour) => (
                                    <MenuItem key={hour.value} value={hour.value}>{hour.label}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Button
                        sx={{my: 0.5, mt: 2, ml: 0.5}}
                        variant="outlined"
                        size="medium"
                        onClick={ValidateCollect}
                        aria-label="move all left"
                    >
                        Valider
                    </Button>
                </Grid>
            </div>
        );
    } else {
        return (
            <div className="conteneur">
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success">{sendMessage}</Alert>
                </Snackbar>
                <h1>Demande de collecte</h1>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item>
                        <FormControl>
                            <h3>Sélectionner une date:</h3>
                            <TextField
                                id="datetime-local"
                                label="Date"
                                type="date"
                                defaultValue="moment(nowDate.getDate()).format('DD.MM.YYYY')"
                                sx={{width: 300, mt: 0.5}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(newDate) => {
                                    setDate(newDate.target.value);
                                }}
                                onClick={AnnulCollect}/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <h3>Sélectionner une tranche horaire:</h3>
                            <TextField
                                sx={{width: 300, mt: 0.5}}
                                id="select"
                                select
                                value={hour}
                                label="Horaire"
                                onChange={handleChange}
                            >
                                {hours.map((hour) => (
                                    <MenuItem key={hour.value} value={hour.value}>{hour.label}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Button
                        sx={{my: 0.5, mt: 2, ml: 0.5}}
                        variant="outlined"
                        size="medium"
                        onClick={ValidateCollect}
                        aria-label="move all left"
                    >
                        Valider
                    </Button>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" marginTop={2}>
                    Vous voulez programmer une collecte pour le {moment(date).format('DD.MM.YYYY')}: {period}. Etes-vous
                    sûr ?
                </Grid>
                <Grid container justifyContent="center" alignItems="center" marginTop={2}>
                    <Button
                        sx={{my: 0.5, mt: 4, ml: 0.5, width: 100}}
                        variant="outlined"
                        size="medium"
                        onClick={sendClientCollect}
                        aria-label="move all left"
                    >
                        Confirmer
                    </Button>
                    <Button
                        sx={{my: 0.5, mt: 4, ml: 0.5, width: 100}}
                        variant="outlined"
                        size="medium"
                        onClick={AnnulCollect}
                        aria-label="move all left"
                    >
                        Annuler
                    </Button>
                </Grid>
            </div>
        );
    }
}