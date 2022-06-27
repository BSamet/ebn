import { Grid } from "@mui/material";
import { useState } from "react";
import '../styles/component/_AgendaDash.scss';
import AgendaOrganisation from "./AgendaOrganisation";
import DashboardHistoryCollecteur from "./DashboardHistoryCollecteur";

interface AgendaDashInterface{
    setCollectorEtape: any,
    collectorEtape: any,
}

export function AgendaDash({setCollectorEtape, collectorEtape}: AgendaDashInterface){
    const[actionSelected, setActionSelected] = useState('');

    function setOrganisation(){
        setActionSelected('Organiser')
    }

    function setConsulter(){
        setActionSelected('Consulter')
    }
    
    switch(actionSelected){
        case 'Organiser':
            return(
                <AgendaOrganisation setCollectorEtape={setCollectorEtape} collectorEtape={collectorEtape} />   
            )
        case 'Consulter':
            return(
                <DashboardHistoryCollecteur />
            )
        default :
            return(
                <>
                <div className="conteneur">
                    <h1>Agenda</h1>
                    <Grid container spacing={0} justifyContent="space-around" alignItems="center" marginTop={20}>
                        <Grid item className="agendaBouton" onClick={setOrganisation}>
                            <Grid className="bouton">
                                <h3 className="sousTitre">Organiser</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                            </Grid>
                        </Grid>
                        <Grid item className="agendaBouton" onClick={setConsulter}>
                            <Grid className="bouton">
                                <h3 className="sousTitre">Consulter</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                </>
            )
    }
}