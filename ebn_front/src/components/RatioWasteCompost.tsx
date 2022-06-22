import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { HOST_BACK } from '../environment/environment';

 interface HistoriqueClient {
    id: number;
    typeAction: string;
    date: number;
    typeDeDechet: string;
    commentaire: string;
    poids: number;
  }


const RatioWasteCompost = () => {
    const [nbBioDechet, setNbBioDechet] = useState(Number);
    let countBio : number = 0;
    const [nbMarcCafé, setMarcCafé] = useState(Number);
    let countCafé : number = 0;
    
    useEffect(() => {
        axios.get(HOST_BACK + '/historique/', {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
                res.data.map((history : HistoriqueClient)=>{                  
                     if(history.typeDeDechet == "Biodéchets"){
                        
                        countBio+= history.poids 
                        
                      }
                      else{
                          countCafé += history.poids

                      }   
                      setNbBioDechet(countBio) 
                      setMarcCafé(countCafé)
                      
                  })
    
        })
    }, [])

 
    const state = {

        series: [nbBioDechet,nbMarcCafé],

        options: {
            fill: { colors: ['#008000', '#ffa500'] },
            labels: ["Bio-déchets", "Marc de café"],
            colors:['green','orange'],
            chart: {
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };
    return (
        <div className="charts">
            <h4>Ratio Déchets/Composte</h4>
            <ReactApexChart options={state.options} series={state.series} type="donut" />
        </div>
    );
};

export default RatioWasteCompost;