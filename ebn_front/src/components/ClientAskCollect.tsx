import {FormControl, Grid, TextField, Button, MenuItem, Alert, Snackbar} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React from "react";
import {useState} from "react";
import {HOST_BACK} from "../environment/environment";

interface collectProps {
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

const hours = [
    {
        value: 'T08:00:00',
        label: 'Matin',
    },
    {
        value: 'T12:00:00',
        label: 'Après-Midi',
    },

];


export function ClientAskCollect({client, setClient, allTypeOfWaste}: collectProps) {
    const [date, setDate] = useState('');
    const [hour, setHour] = React.useState('');
    const [period, setPeriod] = React.useState('');
    const [typeOfWaste, setTypeOfWaste] = React.useState<number>();
    const [confirm, setConfirm] = useState(false);
    const [sendMessage, setSendMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const clientId = sessionStorage.getItem("id");
    const [errorSubscribe, setErrorSubscribe] = useState<string>();

    function ValidateCollect() {
        if (date === '') {
            setErrorSubscribe('Veuillez sélectionner une date !')
        } else if (hour === '') {
            setErrorSubscribe('Veuillez sélectionner une tranche horaire !')
        } else if (typeOfWaste === undefined) {
            setErrorSubscribe('Veuillez sélectionner un type de déchet !')
        } else {
            let findCollect = false;
            client.collect.map((collect) => {
                if (collect.cronExpression === null) {
                    if (collect.refDate === date + hour && collect.typeDechet.id === typeOfWaste) {
                        console.log("hey")
                        findCollect = true;
                    }
                }
            })
            if (findCollect) {
                setErrorSubscribe('Vous avez déjà une demande collecte à cette date !')
            } else {
                setErrorSubscribe('')
                if (!confirm) {
                    setTimePeriod()
                    setConfirm(!confirm)
                } else {
                    setConfirm(!confirm)
                    sendClientCollect()
                }
            }
        }
    }

    function AnnulCollect() {
        setConfirm(!confirm)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setHour(event.target.value);
    };

    function setTimePeriod() {
        if (hour == "T08:00:00") {
            setPeriod("Matin");
        } else if (hour == "T12:00:00") {
            setPeriod("Après-Midi");
        } else {
            setPeriod("Aucune tranche horaire sélectionnée")
        }
    }

    const selectTypeOfWaste = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeOfWaste(parseInt(event.target.value))
    };

    function sendClientCollect() {
        const collectToAdd = {
            clientId: clientId,
            refDate: date + hour,
            isSubscribe: false,
            typeDechetId: typeOfWaste,
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

                let newOneTime = {...client};
                newOneTime.collect.push(response.data)
                setClient(newOneTime)

                updateTypeOfWasteOfUserFront(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const updateTypeOfWasteOfUserFront = (response: any) => {
        if (!client.typeDechet.length) {
            let newCollect = {...client};
            newCollect.typeDechet.push(response.typeDechet)
            setClient(newCollect)
        } else {
            let checkArray = false;
            client.typeDechet.map((waste) => {
                if (waste.id === response.typeDechet.id) {
                    checkArray = true;
                }
            })
            if (!checkArray) {
                let newCollect = {...client};
                newCollect.typeDechet.push(response.typeDechet)
                setClient(newCollect)
            }
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                {confirm &&
                    <Grid container justifyContent="center" alignItems="center" textAlign="center" marginTop={2}>
                        Vous allez demander une collecte pour
                        le {moment(date).format('DD MMMM.YYYY')} {period.toLowerCase()}. <br/> Êtes-vous
                        sûr ?
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