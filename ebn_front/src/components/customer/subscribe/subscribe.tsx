import React, {useState} from 'react';
import {Alert, Button, Checkbox, FormControl, Grid, MenuItem, Snackbar, TextField, Menu} from "@mui/material";
import moment from "moment";
import 'moment/locale/fr';
import axios from "axios";
import {HOST_BACK} from "../../../environment/environment";

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

interface subscribeProps {
    client: {
        collect: [
            {
                refDate: string,
                cronExpression: string
                typeDechet: {
                    id: number,
                    typeDechets: string
                }
            }
        ];
        conteneur: [
            {
                capaciteMax: number,
                id: number,
                isAvailable: boolean,
            }
        ];
        typeDechet: [
            {
                id: number
            }
        ]
    };
    setClient: any;
    allTypeOfWaste: [
        {
            id: number;
            typeDechets: string;
        }
    ]
}

const Subscribe = ({client, setClient, allTypeOfWaste}: subscribeProps) => {
        const clientId = sessionStorage.getItem("id");
        const [date, setDate] = useState('');
        const [hour, setHour] = React.useState('');
        const [typeOfWaste, setTypeOfWaste] = React.useState<number>();
        const [selectedDay, setSelectedDay] = useState([
            {id: 1, day: 'Lundi', status: false},
            {id: 2, day: 'Mardi', status: false},
            {id: 3, day: 'Mercredi', status: false},
            {id: 4, day: 'Jeudi', status: false},
            {id: 5, day: 'Vendredi', status: false},
        ]);
        const [open, setOpen] = React.useState(false);
        const [confirm, setConfirm] = useState(false);
        const [period, setPeriod] = React.useState('');
        const [errorSubscribe, setErrorSubscribe] = useState<string>();
        const [sendMessage, setSendMessage] = useState('');

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setHour(event.target.value);
        };
        const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }
            setOpen(false);
        };

        const selectTypeOfWaste = (event: React.ChangeEvent<HTMLInputElement>) => {
            setTypeOfWaste(parseInt(event.target.value))
        };

        const setTimePeriod = () => {
            if (hour === "T08:00:00.000Z") {
                setPeriod("matin");
            } else if (hour === "T12:00:00.000Z") {
                setPeriod("après-midi");
            } else {
                setPeriod("Aucune tranche horaire sélectionnée")
            }
        }

        const selectDayForChecked = (dayNumber: number) => {
            const newCheckedDay = selectedDay.map(day => {
                if (day.id === dayNumber) {
                    return {...day, status: !day.status};
                }
                return day;
            });

            setSelectedDay(newCheckedDay);
        }

        const onClickOnCheckbox = (dayNumber: number) => {
            selectDayForChecked(dayNumber);
        }

        function ValidateCollect() {
            let dayToPost: number[] = []
            selectedDay.map((e) => {
                if (e.status) {
                    dayToPost.push(e.id);
                }
            })
            if (date === '') {
                setErrorSubscribe('Veuillez sélectionner une date !')
            } else if (hour === '') {
                setErrorSubscribe('Veuillez sélectionner une tranche horaire !')
            } else if (typeOfWaste === undefined) {
                setErrorSubscribe('Veuillez sélectionner un type de déchet !')
            } else if (dayToPost.length === 0) {
                setErrorSubscribe('Veuillez sélectionner au moins un jour !')
            } else {
                let findSubscribe = false;
                client.collect.map((collect) => {
                    if (collect.cronExpression != null) {
                        if (collect.refDate === date + hour && collect.typeDechet.id === typeOfWaste) {
                            let splitCronExpression = collect.cronExpression.split(' ');
                            let takeSplitCronExpressionDays = splitCronExpression[splitCronExpression.length -1];
                            let allDaysInCronExpressionToArray = takeSplitCronExpressionDays.split(',');
                            if(allDaysInCronExpressionToArray.some(day => dayToPost.includes(parseInt(day)))) {
                                findSubscribe = true;
                            }
                        }
                    }
                })
                if (findSubscribe) {
                    setErrorSubscribe('Vous avez déjà un abonnement à cette date en cours !')
                } else {
                    setErrorSubscribe('')
                    if (!confirm) {
                        setTimePeriod()
                        setConfirm(!confirm)
                    } else {
                        setConfirm(!confirm)
                        postSubscribe(dayToPost)
                    }
                }
            }
        }

        function AnnulCollect() {
            setConfirm(false)
        }

        const postSubscribe = (dayToPost: number[]) => {
            const subscribeToPost = {
                clientId: clientId,
                refDate: date + hour,
                days: dayToPost,
                isSubscribe: true,
                typeDechetId: typeOfWaste,
            }
            axios
                .post(HOST_BACK + "/collect", subscribeToPost, {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    console.log(response.data)
                    setOpen(true)
                    setSendMessage('L\'abonnement a été mise en place')

                    let newSubscribe = {...client};
                    newSubscribe.collect.push(response.data)
                    setClient(newSubscribe)

                    updateTypeOfWasteOfUserFront(response.data)
                })
                .catch(error => {
                    console.log(error)
                });
        }

        const updateTypeOfWasteOfUserFront = (response: any) => {
            if (!client.typeDechet.length) {
                let newSubscribe = {...client};
                newSubscribe.typeDechet.push(response.typeDechet)
                setClient(newSubscribe)
            } else {
                let checkArray = false;
                client.typeDechet.map((waste) => {
                    if (waste.id === response.typeDechet.id) {
                        checkArray = true;
                    }
                })
                if (!checkArray) {
                    let newSubscribe = {...client};
                    newSubscribe.typeDechet.push(response.typeDechet)
                    setClient(newSubscribe)
                }
            }
        }

        return (
            <div className="subscribeContainer">
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success">{sendMessage}</Alert>
                </Snackbar>
                <h1>Souscrire a un abonnement</h1>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item>
                        <FormControl>
                            <h3>Sélectionner une date:</h3>
                            <TextField
                                disabled={confirm}
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
                                disabled={confirm}
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
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item>
                        <FormControl>
                            <h3>Sélectionner un type de déchets :</h3>
                            <TextField
                                disabled={confirm}
                                sx={{width: 300, mt: 0.5}}
                                id="select"
                                select
                                label="Type de déchet"
                                onChange={selectTypeOfWaste}
                            >
                                {allTypeOfWaste.map((typeOfWasteToSelect, index) => (
                                    <MenuItem key={index} value={typeOfWasteToSelect.id}>
                                        {typeOfWasteToSelect.typeDechets}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={5} justifyContent="center" alignItems="center" marginY={1}>
                    {selectedDay.map((day, index) => (
                        <Grid item key={index}
                              className="subscribeContainer__selectDay">
                            <p style={day.status ? {color: "#2e8b57"} : confirm ? {color: "#2e8b57"} : {color: "black"}}>{day.day}</p>
                            <Checkbox
                                disabled={confirm}
                                sx={{
                                    color: "black",
                                    '&.Mui-checked': {
                                        color: "#2e8b57",
                                    },
                                }}
                                onClick={() => {
                                    onClickOnCheckbox(day.id)
                                }}
                                checked={day.status}
                            />
                        </Grid>
                    ))}
                </Grid>
                {confirm &&
                    <Grid container justifyContent="center" alignItems="center" textAlign="center" marginTop={2}>
                        Vous allez souscrire à un abonnement qui va démarrer
                        le {moment(date).format('DD MMMM YYYY')}, la collecte se fera{" "}
                        {selectedDay.filter((checkDay) => checkDay.status).map(day =>
                            ' le ' + day.day.toLocaleLowerCase() + ' ' + period
                        ).join(',')}
                        . <br /> Êtes-vous sûr ?
                    </Grid>
                }
                <Grid container justifyContent="center" alignItems="center" marginTop={2}
                      className="subscribeContainer__error">
                    {errorSubscribe}
                </Grid>
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
    }
;

export default Subscribe;