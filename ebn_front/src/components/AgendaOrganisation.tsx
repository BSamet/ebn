import axios from "axios"
import React from "react";

import {
    Alert,
    Button,
    Checkbox,
    Grid,
    List, ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Snackbar,
    TextField
} from '@mui/material';
import {useEffect, useState} from "react";
import {HOST_BACK} from "../environment/environment"
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import '../styles/component/_AgendaOrganisation.scss';
import moment from 'moment'
import 'moment/locale/fr' 
moment.locale('fr')


interface collecteursInterface {
    id: number;
    numeroVelo: number;
    utilisateur: {
        nom: string,
        prenom: string,
    }
}

interface ramassageInterface {
    id: number;
    refDate: Date;
    date: Date;
    client: {
        id: number;
        adresse: string;
        utilisateur:{
            nom: string;
            prenom: string;
        }
    };
    typeDechet: {
        id: number;
        typeDechet: string;
    }
    isSubscribe: boolean;
    isAssigned: boolean;
    outOfTime: string;
}

const hours = [
    {
      value: 'am',
      label: 'Matin',
    },
    {
      value: 'pm',
      label: 'Après-Midi',
    },
    
  ];

export function AgendaOrganisation({setCollectorEtape, collectorEtape, setActionSelected}: any){
    const [fetchOnce, setFetchOnce] = useState(true);
    const [collecteursList, setCollecteurslist] = useState<collecteursInterface[]>();
    const [sendMessage, setSendMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const [finalEtapeList, setFinalEtapeList] = useState<ramassageInterface[]>([]);
    const [Collector, setCollector] = useState<number>();
    const [date, setDate] = useState('');
    const [leftChecked, setLeftChecked] = React.useState<number[]>([]);
    const [rightChecked, setRightChecked] = React.useState<number[]>([]);
    const [interval, setInterval] = useState(''); 
    const [period, setPeriod] = React.useState('');
    const [hour, setHour] = React.useState<string[]>([]);

    // let collectorList
    useEffect(() => {
        if (fetchOnce) {
            axios.get(HOST_BACK + '/collecteur', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                setCollecteurslist(res.data)
                // appel de l'api
                setFetchOnce(false);
            });
        }
    }, [collecteursList, fetchOnce]);

    useEffect(() => {
        collectorEtape.map((etape: any) => {
            if(period == 'am'){
                etape.refDate = moment(date).format('YYYY-MM-DD') + "T06:00:00.000Z"
            } else{
                etape.refDate = moment(date).format('YYYY-MM-DD') + "T10:00:00.000Z"
            }
            etape.date = incrementDateTime(etape.refDate, (collectorEtape.indexOf(etape)), parseInt(interval))
            if(etape.date == 'Heure invalide'){
                etape.outOfTime = 'red';
            } else {
                etape.outOfTime = 'black';
            }
        })
    }, [interval, collectorEtape])

    useEffect(() => {
        let hourToStock: string;
        setHour([])
        collectorEtape.map((etape:any) => {
            etape.date = etape.date
        })
    }, [collectorEtape, interval])

    function getEtapeAlreadyAssigned() {
        axios.get(HOST_BACK + '/etape/collecteur/' + Collector + '/' + date, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(etapesAssigned => {
            setCollectorEtape([])
            etapesAssigned.data.map((etapeAss: ramassageInterface) => {
                etapeAss.isAssigned = true;
                etapeAss.outOfTime = 'black';
                setCollectorEtape((collectorEtape: any) => [...collectorEtape, etapeAss])
            })
        })
    }


    function setEtapesArray() {
        setFinalEtapeList([])
        axios.get(HOST_BACK + '/collect/date?date=' + date  + '&period=' + period, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            } 
        }).then(ramassage =>{
                console.log(ramassage.data)
                ramassage.data.map((etape: ramassageInterface) => {
                    etape.isAssigned = false;  
                    etape.outOfTime = 'black';                  
                    setFinalEtapeList(finalEtapeList => [...finalEtapeList, etape]);
                })
        }).catch((err) => {
            console.log(err)
        })
        getEtapeAlreadyAssigned()
    };

    function fillSelectOptions() {
        const options = collecteursList?.map((list) => {
            return (
                [
                    {value: list.id, label: list.utilisateur.nom},
                ]);
        })
        return options;
    }

    const handleLeftToggle = (value: number) => () => {
        const currentIndex = leftChecked.indexOf(value);
        const newChecked = [...leftChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setLeftChecked(newChecked);
    };

    const handleRightToggle = (value: number) => () => {
        const currentIndex = rightChecked.indexOf(value);
        const newChecked = [...rightChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setRightChecked(newChecked);
    };

    const handleChange = (event: any) => {
        setCollector(event.target.value);
        setSendMessage('')
    }

    const handleChangeHour = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPeriod(event.target.value); 
    }

    const handleAllRight = () => {
        if (finalEtapeList![0] == undefined) {
        } else {
            finalEtapeList.map(etape => {
                setCollectorEtape(collectorEtape => [...collectorEtape, etape]);
            })
            setFinalEtapeList([]);
        }
    };

    const handleCheckedRight = () => {
        leftChecked.sort((a, b) => a - b)
        let newFinalEtapeList = Array.from(finalEtapeList)
        for (let i = 0; i < leftChecked.length; i++) {
            finalEtapeList?.map((etape) => {
                if (etape.id == leftChecked[i]) {
                    let etapeIndex = newFinalEtapeList.indexOf(etape);
                    let checkedIndex = leftChecked.indexOf(leftChecked[i]);
                    newFinalEtapeList?.splice(etapeIndex, 1);
                    leftChecked.splice(checkedIndex, 1);
                    setCollectorEtape((collectorEtape: any) => [...collectorEtape, etape]);
                }
            })
        }
        setFinalEtapeList(newFinalEtapeList);
    };

    const handleCheckedLeft = () => {
        rightChecked.sort((a, b) => a - b)
        let newCollectorEtape = Array.from(collectorEtape)
        for (let i = 0; i < rightChecked.length; i++) {
            collectorEtape?.map((etape: ramassageInterface) => {
                if (etape.id == rightChecked[i]) {
                    let etapeIndex = newCollectorEtape.indexOf(etape);
                    let checkedIndex = rightChecked.indexOf(rightChecked[i]);
                    newCollectorEtape?.splice(etapeIndex, 1);
                    rightChecked.splice(checkedIndex, 1);
                    setFinalEtapeList((finalEtapeList: ramassageInterface[]) => [...finalEtapeList, etape]);
                }
            })
        }
        setCollectorEtape(newCollectorEtape);
    };

    const handleAllLeft = () => {
        if (collectorEtape![0] == undefined) {
        } else {
            collectorEtape.map(etape => {
                setFinalEtapeList(finalEtapeList => [...finalEtapeList, etape]);
            })
            setCollectorEtape([])
        }
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function deleteCollect(id: number) {
        axios.delete(HOST_BACK + "/collect/" + id, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    };

    function deleteEtape(id: number){
        axios.delete(HOST_BACK + "/etape/" + id, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(() => 
        console.log("etape Delete"))
    }

    function createCollectIfNotAssigned(clientId: number, etapeDate: Date, typeDechetId: number){
        const collectToAdd = {
            clientId: clientId,
            refDate: etapeDate,
            typeDechetId: typeDechetId
        }
        axios
            .post(HOST_BACK + "/collect", collectToAdd, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
    }

    function moveEtapeUp(etape: any) {
        const newCollectorEtape = Array.from(collectorEtape)
        const fromIndex = newCollectorEtape.indexOf(etape);
        const toindex = fromIndex - 1;
        const etapeSelect = newCollectorEtape.splice(fromIndex, 1)[0];
        newCollectorEtape.splice(toindex, 0, etapeSelect);
        setCollectorEtape(newCollectorEtape)
    }

    function moveEtapeDown(etape: any) {
        const newCollectorEtape = Array.from(collectorEtape)
        const fromIndex = newCollectorEtape.indexOf(etape);
        const toindex = fromIndex + 1;
        const etapeSelect = newCollectorEtape.splice(fromIndex, 1)[0];
        newCollectorEtape.splice(toindex, 0, etapeSelect);
        setCollectorEtape(newCollectorEtape)
    }

    function sendCollectorEtape() {
        let numberOfEtape = 0;
        let etapeNotSend = 0;
        collectorEtape?.map((etape) => {
            const etapeToAdd = {
                clientId: etape.client.id,
                collecteurId: Collector,
                isCollected: false,
                commentaire: "",
                date: etape.date,
                typeDechetId: etape.typeDechet.id
            }
            if(etapeToAdd.date != 'Heure invalide'){
                if(etape.isAssigned == false){
                    axios
                    .post(HOST_BACK + "/etape", etapeToAdd, {
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(response => { 
                        if(numberOfEtape == collectorEtape?.length){
                            setCollectorEtape([]);
                            setOpen(true)
                        }
                        if(etape.isSubscribe == false){
                            deleteCollect(etape.id);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
                } else {
                    axios
                    .patch(HOST_BACK + "/etape/date/" + etape.id, etapeToAdd, {
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(response => { 
                        if(numberOfEtape == collectorEtape?.length){
                            setCollectorEtape([]);
                            setOpen(true)
                        }
                        if(etape.isSubscribe == false){
                            deleteCollect(etape.id);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
                }
            } else {
                setFinalEtapeList(finalEtapeList => [...finalEtapeList, etape]);
                deleteEtape(etape.id);
                createCollectIfNotAssigned(etape.client.id, etape.refDate, etape.typeDechet.id);
                etapeNotSend ++;
            }   
                numberOfEtape ++;
            })
            if(etapeNotSend > 0){
                setSendMessage(etapeNotSend + " étapes sur " + numberOfEtape + " n'ont pas été assignées")
            } else {
                setSendMessage('Toutes les étapes ont été assignées au collecteur')
            }
        }   

    function incrementDateTime(date: Date, etapeNumber: number, interval: number) {
        let timeInterval = interval * etapeNumber;

        const travelTime = moment(date).zone("+02:00").add(timeInterval, 'minutes').format("YYYY-MM-DD" + "T" + "HH:mm:ss");
        console.log(date.toString())
        if (date.toString() == moment(date).format("YYYY-MM-DD") + "T06:00:00.000Z" && new Date(travelTime).getHours() >= 12) {
            return 'Heure invalide'

        }
        if (date.toString() == moment(date).format("YYYY-MM-DD") + "T10:00:00.000Z" && new Date(travelTime).getHours() >= 19) {
            return 'Heure invalide'
        }
        if (new Date(date).getDate() != new Date(travelTime).getDate()) {
            return 'Heure invalide'
        }

        return travelTime
    }

    return (
        <>
            <div className="conteneur">
                <Button
                    className="backButton"
                    variant="outlined"
                    size="medium"
                    onClick={() => {
                        setActionSelected('')
                    }}
                    aria-label="move all left"
                >
                    Retour
                </Button>
                <h1>Organiser l'agenda</h1>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success">{sendMessage}</Alert>
                </Snackbar>
                
                <Grid container justifyContent="center" alignItems="center">
                    <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={1}>
                        <Grid item>
                            <Grid marginBottom={1}>
                                <FormControl>
                                    <h3>Date:</h3>  
                                    <TextField
                                        id="datetime-local"
                                        label="Date"
                                        type="date"
                                        defaultValue="moment(nowDate.getDate()).format('DD.MM.YYYY')"
                                        sx={{ width: 200, mt: 0.5}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(newDate) => {
                                            setDate(newDate.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <h3>Intervale:</h3>
                                        <TextField
                                            sx={{ width: 90, mt: 0.5, ml: 0.5}}
                                            id="outlined-number"
                                            label="Minute"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(newInterval) => {
                                                setInterval(newInterval.target.value);
                                            }}
                                        />
                                 </FormControl> 
                                 <FormControl>
                                    <h3>Plage horaire:</h3>
                                    <TextField
                                        sx={{ width: 100, mt: 0.5, ml: 0.5 }}
                                        id="select"
                                        select
                                        value={period}
                                        label="Horaire"
                                        onChange={handleChangeHour}
                                    >
                                        {hours.map((hour) => (
                                            <MenuItem key={hour.value} value={hour.value}>{hour.label}</MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl> 
                            </Grid>
                            <Paper sx={{width: 400, height: 530, overflow: 'auto', fontSize: 10}}>
                                <List dense component="div" role="list">
                                    {finalEtapeList?.map((etape: any) => {
                                        const labelId = `transfer-list-item-${etape.id}-label`;
                                        const date = etape.refDate;
                                        return (

                                            <ListItem
                                                // key={etape.id}
                                                role="listitem"
                                                button
                                                onClick={handleLeftToggle(etape.id)}
                                            >
                                            <ListItemIcon>
                                                <Checkbox
                                                checked={leftChecked.indexOf(etape.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`${moment(date).format('DD.MM.YYYY')} | ${etape.client.utilisateur.nom} ${etape.client.utilisateur.prenom} | ${etape.client.adresse} | ${etape.typeDechet.typeDechet}`} />
                                        </ListItem>
                                    );
                                    })}
                                    <ListItem/>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{my: 0.5}}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllRight}
                                    disabled={finalEtapeList?.length === 0}
                                    aria-label="move all right"
                                >
                                    ≫
                                </Button>
                                <Button
                                    sx={{my: 0.5}}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedRight}
                                    disabled={finalEtapeList?.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{my: 0.5}}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedLeft}
                                    disabled={collectorEtape?.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                                <Button
                                    sx={{my: 0.5}}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllLeft}
                                    disabled={collectorEtape?.length === 0}
                                    aria-label="move all left"
                                >
                                    ≪
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid marginBottom={1}>
                                <FormControl>
                                    <h3>Sélectionner un collecteur:</h3>
                                    <TextField
                                        sx={{width: 300, mt: 0.5}}
                                        id="select"
                                        select
                                        value={fillSelectOptions()}
                                        label="Collecteur"
                                        onChange={handleChange}
                                    >
                                        {collecteursList?.map((list) => (
                                            <MenuItem key={list.id}
                                                      value={list.id}>{list.utilisateur.nom + " " + list.utilisateur.prenom}</MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                                <Button
                                    sx={{ my: 0.5, mt: 8.2, ml: 0.5}}
                                    variant="outlined"
                                    size="medium"
                                    onClick={setEtapesArray}
                                    aria-label="move all left"
                                >
                                    Valider
                                </Button>
                            </Grid>
                            <Paper sx={{width: 400, height: 530, overflow: 'auto'}}>
                                <List dense component="div" role="list">
                                    {collectorEtape?.map((etape: any) => {
                                    const labelId = `transfer-list-item-${etape.id}-label`;
                                    const date = etape.refDate;
                                    return (
                                        <><ListItem
                                            sx={{color: etape.outOfTime}}
                                            // key={etape.id}
                                            role="listitem"
                                            button
                                            onClick={handleRightToggle(etape.id)}
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    checked={rightChecked.indexOf(etape.id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }} />
                                            </ListItemIcon>
                                            {etape.date == 'Heure invalide' && 
                                                <ListItemText id={labelId} primary={`Horraire invalide | ${etape.client.utilisateur.nom} ${etape.client.utilisateur.prenom} | ${etape.client.adresse}`} />
                                            }
                                            {etape.date != 'Heure invalide' &&
                                            <ListItemText id={labelId} primary={`${moment(etape.date).format('HH [h] mm')} | ${etape.client.utilisateur.nom} ${etape.client.utilisateur.prenom} | ${etape.client.adresse} | ${etape.typeDechet.typeDechet}`} />
                                            }
                                        </ListItem>
                                        <Grid container direction="row" alignItems="center" justifyContent="center">
                                                <Button
                                                    sx={{ height: 20, mx: 0.2 }}
                                                    variant="outlined"
                                                    onClick={() => {moveEtapeUp(etape)}}
                                                    disabled={collectorEtape.indexOf(etape) === 0}

                                                    aria-label="move one up"
                                                >
                                                    ↑
                                                </Button><Button
                                                    sx={{ height: 20, mx: 0.2 }}
                                                    variant="outlined"
                                                    onClick={() => {
                                                        moveEtapeDown(etape)
                                                    }}
                                                    disabled={collectorEtape.indexOf(etape) === collectorEtape.length - 1}

                                                    aria-label="move one down"
                                                >
                                                    ↓
                                                </Button>
                                                </Grid></>
                                        );
                                    })}
                                    <ListItem/>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Button
                        sx={{width: 200, my: 0.5, mt: 1.5}}
                        variant="outlined"
                        size="medium"
                        onClick={sendCollectorEtape}
                        aria-label="save all "
                    >
                        Sauvegarder
                    </Button>
                </Grid>
            </div>

        </>
    )

}

export default AgendaOrganisation
