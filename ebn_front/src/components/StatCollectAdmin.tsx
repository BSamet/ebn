import React, { useEffect, useState } from 'react';
import '../Data/Data'
import ReactApexChart from "react-apexcharts";
import axios from 'axios';
import { HOST_BACK } from '../environment/environment';
import Moment from 'moment';
import moment from 'moment';
import { start } from 'repl';

interface HistoriqueClient {
    id: number;
    typeAction: string;
    date: Date;
    typeDeDechet: string;
    commentaire: string;
    poids: number;
  }

const StatCollectAdmin = () => {
    //Date non formaté
    let startDateNotFormated = new Date()
    let before1 = new Date().setDate(startDateNotFormated.getDate()-1)
    let before2  = new Date().setDate(startDateNotFormated.getDate()-2)
    let before3 = new Date().setDate(startDateNotFormated.getDate()-3)
    let before4  = new Date().setDate(startDateNotFormated.getDate()-4)
    let endDateNotFormated = new Date().setDate(startDateNotFormated.getDate()-5)
    //Date Formaté
    let endDate = moment(startDateNotFormated).format("YYYY-MM-DD")
    let endDateSend = moment(endDate).format("YYYY-MM-DD")+"T23:59:59"
    let  dayBefore1F= moment(before1).format("YYYY-MM-DD")
    let dayBefore2F = moment(before2).format("YYYY-MM-DD")
    let dayBefore3F = moment(before3).format("YYYY-MM-DD")
    let dayBefore4F = moment(before4).format("YYYY-MM-DD")
    let startDate = moment(endDateNotFormated).format("YYYY-MM-DD")
    //Tri
    const [nbBioDechet6, setNbBioDechet6] = useState(Number);
    const [nbMarcCafé6, setMarcCafé6] = useState(Number);
    const [nbBioDechet5, setNbBioDechet5] = useState(Number);
    const [nbMarcCafé5, setMarcCafé5] = useState(Number);
    const [nbBioDechet4, setNbBioDechet4] = useState(Number);
    const [nbMarcCafé4, setMarcCafé4] = useState(Number);
    const [nbBioDechet3, setNbBioDechet3] = useState(Number);
    const [nbMarcCafé3, setMarcCafé3] = useState(Number);
    const [nbBioDechet2, setNbBioDechet2] = useState(Number);
    const [nbMarcCafé2, setMarcCafé2] = useState(Number);
    const [nbBioDechet1, setNbBioDechet1] = useState(Number);
    const [nbMarcCafé1, setMarcCafé1] = useState(Number);
    
    
    useEffect(() => {
        axios.get(HOST_BACK + '/historique/date/' + startDate +'/'+  endDateSend   , {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
                console.log(res.data);
                
                res.data.map((history : HistoriqueClient)=>{   
                    switch(history.typeDeDechet){
                        case "Biodéchets":{
                            if(moment(history.date).format("YYYY-MM-DD") == endDate){
                                setNbBioDechet6(history.poids) 
                                
                            }
                            else if (moment(history.date).format("YYYY-MM-DD") == dayBefore1F){                                
                                setNbBioDechet5(history.poids)                        
                            }
                            else if (moment(history.date).format("YYYY-MM-DD") == dayBefore2F){                              
                                setNbBioDechet4(history.poids)                              
                            }
                            else if (moment(history.date).format("YYYY-MM-DD") == dayBefore3F){                             
                                setNbBioDechet3(history.poids)                           
                            }
                            else if (moment(history.date).format("YYYY-MM-DD") == dayBefore4F){                               
                                setNbBioDechet2(history.poids)      
                            }
                            else if (moment(history.date).format("YYYY-MM-DD") == startDate){
                                setNbBioDechet1(history.poids) 
                            }
                        break    
                        }
                        case "Marc de café":{
                            if(moment(history.date).format("YYYY-MM-DD") == endDate){                             
                                setMarcCafé6(history.poids)
                            }
                            else if(moment(history.date).format("YYYY-MM-DD") == dayBefore1F){             
                                setMarcCafé5(history.poids)
                            }
                            else if(moment(history.date).format("YYYY-MM-DD") == dayBefore2F){              
                                setMarcCafé4(history.poids)
                            }
                            else if(moment(history.date).format("YYYY-MM-DD") == dayBefore3F){               
                                setMarcCafé3(history.poids)
                            }
                            else if(moment(history.date).format("YYYY-MM-DD") == dayBefore4F){
                                setMarcCafé2(history.poids)
                            }
                            else if(moment(history.date).format("YYYY-MM-DD") == startDate){  
                                setMarcCafé1(history.poids)
                            }
                        break    
                        }
                    }
                     })
                    })
                }, [])
                

    const state = {

        series: [{
            name: 'Bio-déchet',
            data: [nbBioDechet1, nbBioDechet2, nbBioDechet3, nbBioDechet4, nbBioDechet5, nbBioDechet6]
        }, {
            name: 'Marc de café',
            data: [nbMarcCafé1, nbMarcCafé2, nbMarcCafé3, nbMarcCafé4, nbMarcCafé5, nbMarcCafé6]
        }
        ],
        options: {
            chart: {
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10
                },
            },
            xaxis: {
                categories: [startDate,dayBefore4F , dayBefore3F, dayBefore2F,
                    dayBefore1F, endDate
                ],
            },
            fill: {
                opacity: 1
            }
        },


    };

    return (

        <div className="chart">
            <h4>Statistique de collecte</h4>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
        
    );
};

export default StatCollectAdmin;