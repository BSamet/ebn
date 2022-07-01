import { TextField } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { render } from 'react-dom';
import { HOST_BACK } from '../environment/environment';

 interface HistoriqueClient { 
    date: number;
    typeDeDechet: string;
    poids: string;
  }


const RatioWasteCompost = () => {
    const [nbBioDechet, setNbBioDechet] = useState(Number);
    let countBio : number = 0;
    const [nbMarcCafé, setMarcCafé] = useState(Number);
    let countCafé : number = 0;
    let realHistoryPoids : number;
    let startDateNotFormated = new Date()
    let endDateNotFormated = new Date().setDate(startDateNotFormated.getDate()-31)
    let endDate = moment(startDateNotFormated).format("YYYY-MM-DD")
    const [startDate, setstartDate] = useState(moment(endDateNotFormated).format("YYYY-MM-DD"));
    const [endDateSend,setEndDateSent] = useState(moment(endDate).format("YYYY-MM-DD")+"T23:59:59")
    
    
        axios.get(HOST_BACK + '/historique/date/' + startDate +'/'+  endDateSend   , {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
                res.data.historique.map((history : HistoriqueClient)=>{                  
                     if(history.typeDeDechet == "Biodéchets"){
                        realHistoryPoids= parseInt(history.poids)
                        countBio+= realHistoryPoids
                      }
                      else{
                        realHistoryPoids= parseInt(history.poids)
                        countCafé+= realHistoryPoids
                      }   
                      
                      
                  })
                  setNbBioDechet(countBio) 
                setMarcCafé(countCafé)
        })
   
     
    function validateFilter(){
        axios.get(HOST_BACK + '/historique/date/' + startDate +'/'+  endDateSend   , {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
                console.log(res.data);
                
             
                
                res.data.map((history : HistoriqueClient)=>{                  
                     if(history.typeDeDechet == "Biodéchets"){
                        realHistoryPoids= parseInt(history.poids)
                        countBio+= realHistoryPoids
                        setNbBioDechet(countBio) 
                        
                      }
                      else{
                        realHistoryPoids= parseInt(history.poids)
                        countCafé+= realHistoryPoids
                        setMarcCafé(countCafé)
                      }   
                    
                      
                      
                  })
    
        })
    }

 
    const state = {

        series: [nbBioDechet,nbMarcCafé],

        options: {
            fill: { colors: ['#008000', '#ffa500'] },
            labels: ["Bio-déchets", "Marc de café"],
            colors:['green','orange'],
            chart: {
            },
       
        },


    };
    
    

   
    return (
        <div className="charts">
            <h4>Ratio Déchets/Composte</h4>
                <ReactApexChart options={state.options} series={state.series} type="donut" />
                <TextField
                className = "filtre"
                    id="datetime-local"
                    label="Date de début"
                    type="datetime-local"
                    defaultValue="2022-05-24T00:01"
                    sx={{ width: 300}}
                    InputLabelProps={{
                    shrink: true,
                    }}               
                    onChange={(e) =>  setstartDate(e.target.value)}
                />
                <TextField
                 className = "filtre"
                    id="datetime-local"
                    label="Date de fin"
                    type="datetime-local"
                    defaultValue="2022-05-24T23:59"
                    sx={{ width: 300}}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(e) =>  setEndDateSent(e.target.value)}
                    />

               <button onClick={validateFilter}> Valider</button>
        </div>
    );
};


export default RatioWasteCompost;