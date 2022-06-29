import axios from "axios"
import React from "react";
import { Alert, Button, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Snackbar, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { HOST_BACK } from "../environment/environment"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
    Client: {
        id: number;
        adresse: string;
        Utilisateur:{
            nom: string;
            prenom: string;
        }
    };
    isSubscribe: boolean;
}

interface etapesInterface {
    id: number;
    date: Date;
    isCollected: boolean;
    clientId: number;
    commentaire: string;
    collecteurId: number;
}

export function AgendaOrganisation({setCollectorEtape, collectorEtape}: any){
    const [fetchOnce, setFetchOnce] = useState(true);
    const [collecteursList, setCollecteurslist] = useState<collecteursInterface[]>();
    const [sendMessage, setSendMessage] = useState('');
    const [sendErrorMessage, setSendErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const[finalEtapeList, setFinalEtapeList] = useState<ramassageInterface[]>([]);
    const [Collector, setCollector] = useState(1);
    const [date, setDate] = useState('');
    const [leftChecked, setLeftChecked] = React.useState<number[]>([]);
    const [rightChecked, setRightChecked] = React.useState<number[]>([]);
    const [interval, setInterval] = useState(''); 


    
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
        setCollectorEtape(collectorEtape)
    })

    function setEtapesArray() {
        setFinalEtapeList([])
        axios.get(HOST_BACK + '/collect/date?date=' + date, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            } 
        }).then(ramassage =>{
                console.log(ramassage.data)
                ramassage.data.map((etape: ramassageInterface) => {                    
                    setFinalEtapeList(finalEtapeList => [...finalEtapeList, etape]);
                })
        }).catch((err) => {
            console.log(err)
        })
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
          console.log('yo', finalEtapeList);
          finalEtapeList.map(etape => {
            setCollectorEtape(collectorEtape => [...collectorEtape, etape]);
            })          
          setFinalEtapeList([]);
        }
      };      
    
    const handleCheckedRight = () => {
        for(let i = 0; i <= leftChecked.length; i++){
            finalEtapeList?.map((etape) => {   
                        if(etape.id == leftChecked[i]){
                            const newFinalEtapeList = Array.from(finalEtapeList)
                            let etapeIndex = newFinalEtapeList.indexOf(etape);
                            let checkedIndex = leftChecked.indexOf(leftChecked[i]);
                            setCollectorEtape((collectorEtape: any) => [...collectorEtape, etape]);
                            newFinalEtapeList?.splice(etapeIndex, 1);  
                            setFinalEtapeList(newFinalEtapeList)  
                            leftChecked.splice(checkedIndex, 1);
                        }
            })
        }
    };

    const handleCheckedLeft = () => {
        for(let i = 0; i <= rightChecked.length; i++){
            collectorEtape?.map((etape: ramassageInterface) => {   
                    if(etape.id == rightChecked[i]){
                        const newCollectorEtape = Array.from(collectorEtape)
                        let etapeIndex = newCollectorEtape.indexOf(etape);
                        let checkedIndex = rightChecked.indexOf(rightChecked[i]);
                        setFinalEtapeList(finalEtapeList => [...finalEtapeList, etape]);
                        newCollectorEtape?.splice(etapeIndex, 1); 
                        setCollectorEtape(newCollectorEtape);  
                        rightChecked.splice(checkedIndex, 1);   
                    }
            })
        }
      };
    
    const handleAllLeft = () => {
        if(collectorEtape![0] == undefined){

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

    function deleteCollect(id: number){
        axios.delete(HOST_BACK + "/collect/" + id, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    };

    function moveEtapeUp(etape: any){
        const newCollectorEtape = Array.from(collectorEtape)
        const fromIndex = newCollectorEtape.indexOf(etape);
        const toindex = fromIndex - 1;
        const etapeSelect = newCollectorEtape.splice(fromIndex, 1)[0];
        newCollectorEtape.splice(toindex, 0, etapeSelect);
        setCollectorEtape(newCollectorEtape)
    }

    function moveEtapeDown(etape: any){
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
                clientId: etape.Client.id,
                collecteurId: Collector,
                isCollected: false,
                commentaire: "",
                date: incrementDateTime(etape.refDate, numberOfEtape, parseInt(interval), etape),
            }
            if(etapeToAdd.date != null){
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
                setFinalEtapeList(finalEtapeList => [...finalEtapeList, etape])
                etapeNotSend ++
            }  
                
                numberOfEtape ++;

            })
            if(etapeNotSend > 0){
                setSendMessage(etapeNotSend + " étapes sur " + numberOfEtape + " n'ont pas été assignées")
            } else {
                setSendMessage('Toutes les étapes ont été assignées au collecteur')
            }

            
            console.log(etapeNotSend)
      }

      function incrementDateTime(date: Date, etapeNumber: number, interval: number, etape: ramassageInterface){
        let timeInterval = interval * etapeNumber;
        // console.log("etape" + etape)
            const travelTime = moment(date).add(timeInterval, 'minutes').format("YYYY-MM-DD" + "T" + "HH:mm:ss");   
            if(date.toString() == moment(date).format("YYYY-MM-DD") + "T08:00:00.000Z" && new Date(travelTime).getHours() >= 12 || new Date(date).getDate() != new Date(travelTime).getDate()){
                return
            }
            return travelTime
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
                                    const date = etape.refDate;
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
                                            <ListItemText id={labelId} primary={`${etape.Client.Utilisateur.nom} ${etape.Client.Utilisateur.prenom} | ${moment(date).format('DD.MM.YYYY')} | ${etape.Client.adresse}`} />
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
                            </Grid>
                            <Paper sx={{ width: 400, height: 530, overflow: 'auto' }}>
                                <List dense component="div" role="list">
                                    {collectorEtape?.map((etape: any) => {
                                    const labelId = `transfer-list-item-${etape.id}-label`;
                                    const date = etape.refDate;
                                    return (
                                        <><ListItem
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
                                                    }} />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`${etape.Client.Utilisateur.nom} ${etape.Client.Utilisateur.prenom} | ${moment(date).format('DD.MM.YYYY')} | ${etape.Client.adresse}`} />
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
                                                    onClick={() => {moveEtapeDown(etape)}}
                                                    disabled={collectorEtape.indexOf(etape) === collectorEtape.length - 1}

                                                    aria-label="move one down"
                                                >
                                                    ↓
                                                </Button>
                                            </Grid></>
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



