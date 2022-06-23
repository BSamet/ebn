import React, {useState} from 'react';
import {
    Alert,
    Button, Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Snackbar,
    TextField
} from "@mui/material";
import moment from "moment";
import 'moment/locale/fr';

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


const Subscribe = () => {
    const [date, setDate] = useState('');
    const [hour, setHour] = React.useState('');
    const [days, setDays] = React.useState({
        lundi: false,
        mardi: false,
        mercredi: false,
        jeudi: false,
        vendredi: false,
    });
    const [selectedDays, setSelectedDays] = React.useState([
        {
            numberOfDay: 1,
            day: 'lundi',
            selected: false
        },
        {
            numberOfDay: 1,
            day: 'mardi',
            selected: false
        },
        {
            numberOfDay: 1,
            day: 'mercredi',
            selected: false
        },        {
            numberOfDay: 1,
            day: 'jeudi',
            selected: false
        },        {
            numberOfDay: 1,
            day: 'vendredi',
            selected: false
        },
    ]);
    let lundi = selectedDays[0].selected
    let mardi = selectedDays[1].selected
    let mercredi = selectedDays[2].selected
    let jeudi = selectedDays[3].selected
    let vendredi = selectedDays[4].selected
    let selectedDay: string[] = [];
    const [open, setOpen] = React.useState(false);
    const [confirm, setConfirm] = useState(false);
    const [period, setPeriod] = React.useState('');


    const changeDays = (index: number) => {
        selectedDays[index].selected = !selectedDays[index].selected
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHour(event.target.value);
    };
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const setTimePeriod = () => {
        if (hour == "T08:00:00.000Z") {
            setPeriod("matins");
        } else if (hour == "T12:00:00.000Z") {
            setPeriod("après-midis");
        } else {
            setPeriod("Aucune tranche horaire sélectionnée")
        }
    }

    function ValidateCollect() {
        setTimePeriod()
        setConfirm(!confirm)
    }

    function AnnulCollect() {
        setConfirm(false)
    }

    return (
        <div className="subscribeContainer">
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="success"></Alert>
            </Snackbar>
            <h1>Souscrire a un abonnement</h1>
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
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <h3>Sélectionner une tranche horaire:</h3>
                        <TextField
                            sx={{width: 300, mt: 0.5}}
                            id="select"
                            select
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
            <FormControl sx={{m: 3}} style={{display: 'flex', alignItems: "center"}} component="fieldset"
                         variant="standard">
                <h3 style={{textAlign: "center", marginBottom: 15}} component="legend">Selectionner les jours de la
                    semaine</h3>
                <FormGroup style={{display: 'flex', flexDirection: 'row'}}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={lundi} onChange={() => changeDays(0)} name="lundi"/>
                        }
                        label="Lundi"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={mardi} onChange={() => changeDays(1)} name="mardi"/>
                        }
                        label="Mardi"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={mercredi} onChange={() => changeDays(2)} name="mercredi"/>
                        }
                        label="Mercredi"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={jeudi} onChange={() => changeDays(3)} name="jeudi"/>
                        }
                        label="Jeudi"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={vendredi} onChange={() => changeDays(4)} name="vendredi"/>
                        }
                        label="Vendredi"
                        labelPlacement="top"
                    />
                </FormGroup>
            </FormControl>
            {confirm &&
                <Grid container justifyContent="center" alignItems="center" marginTop={2}>
                    Vous allez souscrire à un abonnement qui va démarrer
                    le {moment(date).format('DD MMMM YYYY')}, la collecte se fera le{" "}

                    {period}. Etes-vous sûr ?
                </Grid>
            }
            <Grid container justifyContent="center" alignItems="center">
                {!confirm ?
                    <Button
                        sx={{my: 0.5, mt: 2, ml: 0.5}}
                        variant="outlined"
                        size="medium"
                        aria-label="move all left"
                        onClick={ValidateCollect}
                    >
                        Valider
                    </Button>
                    :
                    <>
                        <Button
                            sx={{my: 0.5, mt: 4, ml: 0.5, width: 100}}
                            variant="outlined"
                            size="medium"
                            aria-label="move all left"
                            onClick={ValidateCollect}
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
                    </>
                }
            </Grid>
        </div>
    );
};

export default Subscribe;