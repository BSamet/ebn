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
    id: number;
    date: Date;
    isCollected: number;
    commentaire: string;
    clientId: number;
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
    let [Collector, setCollector] = React.useState('1');

    const [checked, setChecked] = React.useState<any>([]);
    let [left, setLeft] = React.useState<any>([]);
    const [right, setRight] = React.useState<any>([]);

    const leftChecked = intersection(checked, finalEtapeList);
    const rightChecked = intersection(checked, collectorEtape);
    
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

    function getEtapeId(){
        const etapes = finalEtapeList?.map((etape) => {
            return etape.id;
        })
        return etapes;
    }

    function stockEtapesInLeftList(){
        left =  getEtapeId();
        return left;
    }

    stockEtapesInLeftList()

    function not(a: any, b:any) {
        return a.filter((value: any) => b.indexOf(value) === -1);
      }
      
    function intersection(a: any, b: any) {
      return a.filter((value: any) => 
      b.indexOf(value) !== -1);
    }

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
        setCollectorEtape(leftChecked);
        setFinalEtapeList(not(finalEtapeList, leftChecked));
        setChecked(not(checked, leftChecked));
      };
    
      const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
      };
    
      const handleAllLeft = () => {
        setFinalEtapeList(collectorEtape);
        setCollectorEtape([])
      };

    const handleToggle = (value: any) => () => {
        const currentIndex = finalEtapeList?.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex!, 1);
        }
        setChecked(newChecked);
    };
   
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

                <Grid container spacing={2} justifyContent="center" alignItems="center">
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
                                        // onClick={handleToggle(etape.id)}
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
                            // disabled={stockEtapesInLeftList().length === 0}
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
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllLeft}
                            disabled={right.length === 0}
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
                        </Grid>
                    </Grid>
                    </div>
            
        </>
        )
    
}

export default AgendaOrganisation



