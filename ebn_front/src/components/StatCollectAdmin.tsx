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
    let todayDateNotFormated = new Date()
    let todayDate = moment(todayDateNotFormated).format("YYYY-MM-DD")
    let todayDateSend =moment(todayDateNotFormated).format("YYYY-MM-DD")+"T23:59:59"
    let beforeDateNotFormated = new Date().setDate(todayDateNotFormated.getDate()-6)
    let beforeDateSend =moment(beforeDateNotFormated).format("YYYY-MM-DD")+"T23:59:59"
    let arrayDate :Array<any> = []
    let arrayBio : Array <HistoriqueClient> =[]
     const [finalArrayBio, setFinalArrayBio] = useState<number[]>([])
     const [finalArrayCafé, setFinalArrayCafé] = useState<number[]>([])
    let arrayCafé : Array <any> = [];
    const [loaded, setLoaded] = useState(false)
    
    
    useEffect(() => {
        if(loaded === false){
        axios.get(HOST_BACK + '/historique/date/'+beforeDateSend +'/'+  todayDateSend   , {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
    
                
                res.data.historique.map((history : HistoriqueClient)=>{   
                
                    if(history.typeDeDechet == "Biodéchets"){
                        arrayBio.push(history)
                    }
                    else {
                        arrayCafé.push(history)
                    } 
                })
                


                
        for (let dateIndex = 0, historyBioIndex = 0, historyCaféIndex = 0; dateIndex < arrayDate.length; dateIndex++) {
            if (arrayDate[dateIndex] == moment(arrayBio[historyBioIndex].date).format("DD-MM")) {
                finalArrayBio.push(arrayBio[historyBioIndex].poids)
                if(historyBioIndex<arrayBio.length-1){
                    historyBioIndex++
                }
                else{

                }
               
                
                
            }
            else {
                finalArrayBio.push(0)
            }
            if (arrayDate[dateIndex] == moment(arrayCafé[historyCaféIndex].date).format("DD-MM")) {
                finalArrayCafé.push(arrayCafé[historyCaféIndex].poids)
                if(historyCaféIndex < arrayCafé.length -1){
                    historyCaféIndex++
                }
                else{
                   
                }
                
            }
            else {
                finalArrayCafé.push(0)
            }            
            
        }

            })
            .finally(()=>{
                setLoaded(true)
            })
        }
        }, [loaded])

              
                
                for(let i =5;i>=0;i--){
                    let previousDateNotFormated = new Date().setDate(todayDateNotFormated.getDate()-i)
                    let  previousDate= moment(previousDateNotFormated).format("DD-MM")
                    arrayDate.push(previousDate)
                }           




                
    const state = {

        series: [{
            name: 'Bio-déchet',
            data: finalArrayBio
        }, {
            name: 'Marc de café',
            data: finalArrayCafé
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
                categories: arrayDate.map((date : any)=>{
                    return date})
            },
            fill: {
                opacity: 1
            }
        },


    };

    return (

        <div className="chart">
            <h4>Statistique de collecte</h4>
            {loaded &&
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
            }   
            </div>
        
    );
};

export default StatCollectAdmin;