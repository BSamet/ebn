import axios from "axios"
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { format } from "date-fns";


import { useEffect, useState } from "react";
import { HOST_BACK } from "../environment/environment"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import moment from "moment";
import { useIsomorphicLayoutEffect } from "framer-motion";

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
}

interface etapesInterface {
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
    const [etapesList, setEtapeslist] = useState<ramassageInterface[]>();
    const [etapesAbonnementList, setEtapesAbonnementlist] = useState<ramassageInterface[]>();
    const etapesArray: ramassageInterface[] = [];

    const[finalEtapeList, setFinalEtapeList] = useState<ramassageInterface[]>();
    const [collectorEtape, setCollectorEtape]= useState<ramassageInterface[]>();
    let [Collector, setCollector] = React.useState(1);

    const [checked, setChecked] = React.useState<number[]>([]);
    

    
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
            axios.get(HOST_BACK + '/ramassage-abonnement', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                } 
            }).then(ramassageAbonnement =>{
                setEtapesAbonnementlist(ramassageAbonnement.data)
                setFetchEtapeTwice(false);
            })
        }
    }, [etapesAbonnementList, fetchEtapeTwice])

    useEffect(() => {
        if (fetchEtapeOnce) {
            axios.get(HOST_BACK + '/ramassage-ponctuel', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then(ramassagePonctuel => {                
                setEtapeslist(ramassagePonctuel.data);
                // appel de l'api
                setFetchEtapeOnce(false);
            });
        }
    }, [etapesList, fetchEtapeOnce]);

    useEffect(() => {
            etapesList?.map((etape) => {
                etapesArray?.push(etape);
            });
            etapesAbonnementList?.map((etapeAbonnement) => {
                etapesArray?.push(etapeAbonnement);
            });
            setFinalEtapeList(etapesArray);   
    }, [etapesList]);
    
    function fillSelectOptions(){
        const options = collecteursList?.map((list) => {
            return (
                [
                    { value: list.id, label: list.utilisateur.nom },
                ]);
        })
        return options;
    }
    // const leftChecked = intersection(checked, finalEtapeList );
    // const rightChecked = intersection(checked, collectorEtape);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleChange = (event: any) => {
        setCollector(event.target.value);
    }

      const handleAllRight = () => {
        if(finalEtapeList![0] == undefined){

        }else{
            setCollectorEtape(finalEtapeList);
            setFinalEtapeList([]);
        }
      };
    
      const handleCheckedRight = () => {
        finalEtapeList?.map((etape) => {
            
            for(let i = 0; i <= checked.length; i++){
                
                if(etape.id == checked[i]){
                    console.log(etape)
                    collectorEtape?.push(etape)   
                    // finalEtapeList?.splice((checked[i] - 1), 1)
                    console.log(collectorEtape)
                }
            }
        })
        // setFinalEtapeList(not(finalEtapeList, checked));
        setChecked([]);
      };
    
      const handleCheckedLeft = () => {
        // setLeft(left.concat(rightChecked));
        // setRight(not(right, rightChecked));
        // setChecked(not(checked, rightChecked));
      };
    
      const handleAllLeft = () => {
        if(collectorEtape![0] == undefined){

        } else {
            setFinalEtapeList(collectorEtape);
            setCollectorEtape([])
        }
      };

      function sendCollectorEtape() {
          console.log(collectorEtape);
            collectorEtape?.map((etape) => {
                const etapeToAdd: etapesInterface = {
                    clientId: 1,
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
                })
                .catch(error => {
                    console.log(error.response)
                });
            })
      }
        
    return (
        <>
            <div>

                <h1>Organiser l'agenda</h1>
                <h3>Sélectionner un collecteur:</h3>
                <FormControl >
                    <InputLabel id="choix-collecteur" >Collecteur</InputLabel>
                    <Select style={{width:300}}
                        labelId="select-label"
                        id="select"
                        value={fillSelectOptions()}
                        label="Nom"
                        onChange={handleChange}                        
                    >
                        {collecteursList?.map((list) =>
                            <MenuItem value={list.id}>{list.utilisateur.nom + " " + list.utilisateur.prenom}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={8}>
                    <Grid item>
                        <Paper sx={{ width: 400, height: 530, overflow: 'auto' }}>
                            <List dense component="div" role="list">
                                {finalEtapeList?.map((etape: any) => {
                                const labelId = `transfer-list-item-${etape.id}-label`;
                                const date = etape.date;
                                return (
                                    <ListItem
                                        key={etape.id}
                                        role="listitem"
                                        button
                                        onClick={handleToggle(etape.id)}
                                        >
                                        <ListItemIcon>
                                            <Checkbox
                                            checked={checked.indexOf(etape.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`${moment(date).format('DD.MM.YYYY à HH [h] mm')} ID:${etape.id}`} />
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
                                        onClick={handleToggle(etape.id)}
                                        >
                                        <ListItemIcon>
                                            <Checkbox
                                            checked={checked.indexOf(etape.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`${moment(date).format('DD.MM.YYYY à HH [h] mm')}`} />
                                    </ListItem>
                                );
                                })}
                                <ListItem />
                            </List>
                        </Paper>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={sendCollectorEtape}
                            aria-label="move all left"
                        >
                            Envoyer
                        </Button>
                        </Grid>
                    </Grid>
                    </div>
            
        </>
        )
    
}

export default AgendaOrganisation



