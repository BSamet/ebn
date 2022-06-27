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
    
    
    useEffect(() => {
        axios.get(HOST_BACK + '/historique/date/' +beforeDateSend +'/'+  todayDateSend   , {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }}).then(res => {
    
                console.log("res",res.data);
                
                res.data.map((history : HistoriqueClient)=>{   
                
                    if(history.typeDeDechet == "Biodéchets"){
                        arrayBio.push(history)
                    }
                    else {
                        arrayCafé.push(history)
                    } 
                })
                

                for(let xIndex =0, historyIndex = 0; xIndex<arrayDate.length; ){  
                     
                    if(arrayDate[xIndex]==moment(arrayBio[historyIndex].date).format("DD-MM")){
                         setFinalArrayBio(finalArrayBio => [...finalArrayBio, arrayBio[historyIndex].poids])
                       xIndex ++
                       historyIndex =0;
                    }
                    else if(arrayDate[xIndex]!=moment(arrayBio[historyIndex].date).format("DD-MM") && historyIndex != arrayBio.length -1){
                       historyIndex ++
                   }
                   else if (arrayDate[xIndex]!=moment(arrayBio[historyIndex].date).format("DD-MM") && historyIndex == arrayBio.length -1){
                        setFinalArrayBio(finalArrayBio => [...finalArrayBio, 0])
                       xIndex ++
                       historyIndex = 0;
                   }
                  
               
                   
               }
               for(let xIndex =0, historyIndex = 0; xIndex<arrayDate.length; ){ 
                 if(arrayDate[xIndex]==moment(arrayCafé[historyIndex].date).format("DD-MM")){
                    setFinalArrayCafé(finalArrayCafé => [...finalArrayCafé, arrayCafé[historyIndex].poids])
                    xIndex ++
                    historyIndex =0;
                 }
                 else if(arrayDate[xIndex]!=moment(arrayCafé[historyIndex].date).format("DD-MM") && historyIndex != arrayCafé.length -1){
                    historyIndex ++
                }
                else if (arrayDate[xIndex]!=moment(arrayCafé[historyIndex].date).format("DD-MM") && historyIndex == arrayCafé.length -1){
               
                    setFinalArrayCafé(finalArrayCafé => [...finalArrayCafé, 0])
                    xIndex ++
                    historyIndex = 0;
                }

               }

            })
        }, [])

              
                
                for(let i =5;i>=0;i--){
                    let previousDateNotFormated = new Date().setDate(todayDateNotFormated.getDate()-i)
                    let  previousDate= moment(previousDateNotFormated).format("DD-MM")
                    arrayDate.push(previousDate)
                }           

                // console.log(finalArrayBio);
                // console.log(finalArrayCafé);
                // console.log("b",arrayBio);
                // console.log("c",arrayCafé);
                
                
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
                categories: arrayDate
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