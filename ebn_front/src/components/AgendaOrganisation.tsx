import axios from "axios"
import React from "react";
import { Alert, Button, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Snackbar, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { HOST_BACK } from "../environment/environment"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";
import '../styles/component/_AgendaOrganisation.scss';


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
    date: Date;
    clientId: number;
    client: {
        id: number;
        adresse: string;
        utilisateur:{
            nom: string;
            prenom: string;
        }
    }
}

interface etapesInterface {
    id: number;
    date: Date;
    isCollected: boolean;
    clientId: number;
    commentaire: string;
    collecteurId: number;
}

export function AgendaOrganisation(){
    const [fetchOnce, setFetchOnce] = useState(true);
    const [fetchEtapeOnce, setFetchEtapeOnce] = useState(true);
    const [fetchEtapeTwice, setFetchEtapeTwice] = useState(true);
    const [collecteursList, setCollecteurslist] = useState<collecteursInterface[]>();
    const [etapesList, setEtapeslist] = useState<ramassageInterface[]>([]);
    const [etapesAbonnementList, setEtapesAbonnementlist] = useState<ramassageInterface[]>();
    const [etapeSend, setEtapeSend] = useState(false);
    const [sendMessage, setSendMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const etapesArray: ramassageInterface[] = [];
    const[finalEtapeList, setFinalEtapeList] = useState<ramassageInterface[]>([]);
    const [collectorEtape, setCollectorEtape]= useState<ramassageInterface[]>([]);
    let [Collector, setCollector] = useState(1);
    const [date, setDate] = useState('');
    const [leftChecked, setLeftChecked] = React.useState<number[]>([]);
    const [rightChecked, setRightChecked] = React.useState<number[]>([]);


    
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
        if(fetchEtapeTwice){
            axios.get(HOST_BACK + '/ramassage-ponctuel/all', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                } 
            }).then(ramassage =>{
                    console.log(ramassage.data)
                    setEtapeslist(ramassage.data)
                    setFetchEtapeTwice(false);
                
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [etapesList, fetchEtapeTwice])

    function setEtapesArray() {
            etapesList?.map((etape) => {
                if(moment(etape.date).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')){
                    etapesArray?.push(etape);
                }
            });
            setFinalEtapeList(etapesArray);   
    };
    
    function fillSelectOptions(){
        const options = collecteursList?.map((list) => {
            return (
                [
                    { value: list.id, label: list.utilisateur.nom },
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

    const handleAllRight = () => {
      if(finalEtapeList![0] == undefined){
      }else{
          setCollectorEtape(finalEtapeList);
          setFinalEtapeList([]);
        }
      };
    
    const handleCheckedRight = () => {
        for(let i = 0; i <= leftChecked.length; i++){
            finalEtapeList?.map((etape) => {   
                        if(etape.id == leftChecked[i]){
                            let etapeIndex = finalEtapeList.indexOf(etape);
                            let checkedIndex = leftChecked.indexOf(leftChecked[i]);
                            setCollectorEtape(collectorEtape => [...collectorEtape, etape]);
                            finalEtapeList?.splice(etapeIndex, 1);   
                            leftChecked.splice(checkedIndex, 1);
                        }
            })
        }
    };

    const handleCheckedLeft = () => {
        for(let i = 0; i <= rightChecked.length; i++){
            collectorEtape?.map((etape) => {   
                    if(etape.id == rightChecked[i]){
                        let etapeIndex = collectorEtape.indexOf(etape);
                        let checkedIndex = rightChecked.indexOf(rightChecked[i]);
                        setFinalEtapeList(finalEtapeList => [...finalEtapeList, etape]);
                        collectorEtape?.splice(etapeIndex, 1);   
                        rightChecked.splice(checkedIndex, 1);   
                    }
            })
        }
      };
    
    const handleAllLeft = () => {
        if(collectorEtape![0] == undefined){

        } else {
            setFinalEtapeList(collectorEtape);
            setCollectorEtape([])
        }
      };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    function sendCollectorEtape() {
        let numberOfEtape = 0;
        collectorEtape?.map((etape) => {
            const etapeToAdd = {
                clientId: etape.client.id,
                collecteurId: Collector,
                isCollected: false,
                commentaire: "",
                date: etape.date,
            }
                axios
                .post(HOST_BACK + "/etape", etapeToAdd, {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(response => { 
                    console.log(response)
                    
                    numberOfEtape ++;
                    if(numberOfEtape == collectorEtape?.length){
                        setCollectorEtape([]);
                        setOpen(true)
                        setSendMessage('Les étapes ont été assignées au collecteur')

                    }
                })
                .catch(error => {
                    console.log(error)
                });
            })
        
      }
        
    return (
        <>
            <div className="conteneur">
                <h1>Organiser l'agenda</h1>
                    
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert severity="success">{sendMessage}</Alert>
                    </Snackbar>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={1}>
                        <Grid item >
                            <Grid marginBottom={1}>
                                <FormControl>
                                    <h3>Sélectionner une date:</h3>  
                                    <TextField
                                        id="datetime-local"
                                        label="Date"
                                        type="date"
                                        defaultValue="moment(nowDate.getDate()).format('DD.MM.YYYY')"
                                        sx={{ width: 300, mt: 0.5}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(newDate) => {
                                            setDate(newDate.target.value);
                                        }}
                                    />       
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
                            <Paper sx={{ width: 400, height: 530, overflow: 'auto', fontSize: 10 }}>
                                <List dense component="div" role="list">
                                    {finalEtapeList?.map((etape: any) => {
                                    const labelId = `transfer-list-item-${etape.id}-label`;
                                    const date = etape.date;
                                    return (
                                        
                                        <ListItem
                                            key={etape.id}
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
                                            <ListItemText id={labelId} primary={`${etape.client.utilisateur.nom} ${etape.client.utilisateur.prenom} | ${moment(date).format('DD.MM.YYYY')} | ${etape.client.adresse}`} />
                                        </ListItem>
                                    );
                                    })}
                                    <ListItem />
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleAllRight}
                                disabled={finalEtapeList?.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={finalEtapeList?.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={collectorEtape?.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
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
                                <FormControl >
                                    <h3>Sélectionner un collecteur:</h3>
                                    <TextField
                                        sx={{ width: 300, mt: 0.5}}
                                        id="select"
                                        select
                                        value={fillSelectOptions()}
                                        label="Collecteur"
                                        onChange={handleChange}                        
                                    >
                                        {collecteursList?.map((list) =>(
                                            <MenuItem key={list.id} value={list.id}>{list.utilisateur.nom + " " + list.utilisateur.prenom}</MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Paper sx={{ width: 400, height: 530, overflow: 'auto' }}>
                                <List dense component="div" role="list">
                                    {collectorEtape?.map((etape: any) => {
                                    const labelId = `transfer-list-item-${etape.id}-label`;
                                    const date = etape.date;
                                    return (
                                        <ListItem
                                            key={etape.id}
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
                                                }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`${etape.client.utilisateur.nom} ${etape.client.utilisateur.prenom} | ${moment(date).format('DD.MM.YYYY')} | ${etape.client.adresse}`} />
                                        </ListItem>
                                    );
                                    })}
                                    <ListItem />
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Button
                                sx={{ width: 200, my: 0.5, mt: 1.5 }}
                                variant="outlined"
                                size="medium"
                                onClick={sendCollectorEtape}
                                aria-label="move all left"
                            >
                                Sauvegarder
                    </Button>
                </Grid>
            </div>
            
        </>
        )
    
}

export default AgendaOrganisation



