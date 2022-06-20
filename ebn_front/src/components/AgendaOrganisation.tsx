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

export function AgendaOrganisation(){
    const [fetchOnce, setFetchOnce] = useState(true);
    const [collecteursList, setCollecteurslist] = useState<collecteursInterface[]>();
    const [sendMessage, setSendMessage] = useState('');
    const [open, setOpen] = React.useState(false);
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

    function setEtapesArray() {
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
        console.log(finalEtapeList)

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

    function deleteCollect(id: number){
        axios.delete(HOST_BACK + "/collect/" + id, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    }


    function sendCollectorEtape() {
        let numberOfEtape = 0;
        //heure matin
        let h1am = 0;
        let h2am = 8;
        let m1am = 0;
        let m2am = 0;
        //heure aprem
        let h1pm = 1;
        let h2pm = 2;
        let m1pm = 0;
        let m2pm = 0;
        //set Date
        let date: string;

        collectorEtape?.map((etape) => {
            if(etape.refDate.toString() == moment(etape.refDate).format("YYYY-MM-DD") + "T08:00:00.000Z"){
                date = moment(etape.refDate).format("YYYY-MM-DD") + "T" + "" + h1am + h2am + ":" + m1am + m2am + "" + ":00.000Z";
            } else if (etape.refDate.toString() == moment(etape.refDate).format("YYYY-MM-DD") + "T12:00:00.000Z"){
                date = moment(etape.refDate).format("YYYY-MM-DD") + "T" + "" + h1pm + h2pm + ":" + m1pm + m2pm + "" + ":00.000Z";
            }  
            const etapeToAdd = {
                clientId: etape.Client.id,
                collecteurId: Collector,
                isCollected: false,
                commentaire: "",
                date: date,
            }
                axios
                .post(HOST_BACK + "/etape", etapeToAdd, {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(response => { 
                    console.log(etape.refDate)    
                    console.log("Format: " + moment(etape.refDate).format("YYYY-MM-DD") + "T" + "" + h1am + h2am + ":" + m1am + m2am + "" + ":00.000Z")                
                    numberOfEtape ++;
                    if(numberOfEtape == collectorEtape?.length){
                        setCollectorEtape([]);
                        setOpen(true)
                        setSendMessage('Les étapes ont été assignées au collecteur')
                    }
                    if(etape.isSubscribe == false){
                        deleteCollect(etape.id);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
                if(etape.refDate.toString() == moment(etape.refDate).format("YYYY-MM-DD") + "T08:00:00.000Z"){
                    m1am += 2;
                    if(m1am == 6){
                        m1am = 0;
                        h2am += 1;
                    }
                    if(h2am == 10){
                        h2am = 0;
                        h1am += 1;
                    }
                    if(h1am == 2 && h2am == 4){
                        h1am = 0;
                        h2am = 0;
                    }
                } else if (etape.refDate.toString() == moment(etape.refDate).format("YYYY-MM-DD") + "T12:00:00.000Z"){
                    m1pm += 2;
                    if(m1pm == 6){
                        m1pm = 0;
                        h2pm += 1;
                    }
                    if(h2pm == 10){
                        h2pm = 0;
                        h1pm += 1;
                    }
                    if(h1pm == 2 && h2pm == 4){
                        h1pm = 0;
                        h2pm = 0;
                    }
                }  
                
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
                            </Grid>
                            <Paper sx={{ width: 400, height: 530, overflow: 'auto' }}>
                                <List dense component="div" role="list">
                                    {collectorEtape?.map((etape: any) => {
                                    const labelId = `transfer-list-item-${etape.id}-label`;
                                    const date = etape.refDate;
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
                                            <ListItemText id={labelId} primary={`${etape.Client.Utilisateur.nom} ${etape.Client.Utilisateur.prenom} | ${moment(date).format('DD.MM.YYYY')} | ${etape.Client.adresse}`} />
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



