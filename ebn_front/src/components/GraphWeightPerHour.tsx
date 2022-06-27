import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { HOST_BACK } from '../environment/environment';

interface HistoriqueClient {
    id: number;
    typeAction: string;
    date: Date;
    typeDeDechet: string;
    commentaire: string;
    poids: number;
  }

const GraphWeightPerHour = () =>{
    let todayDateNotFormated = new Date()
    let todayDate = moment(todayDateNotFormated).format("YYYY-MM-DD")
    let todayDateSend =moment(todayDateNotFormated).format("YYYY-MM-DD")+"T23:59:59"
    let beforeDateNotFormated = new Date().setDate(todayDateNotFormated.getDate()-31)
    let beforeDateSend =moment(beforeDateNotFormated).format("YYYY-MM-DD")+"T23:59:59"
    let arrayDate :Array<any> = []
    let arrayBio : Array <HistoriqueClient> =[]
    // const [finalArrayBio, setFinalArrayBio] = useState<number[]>([])
    // const [finalArrayCafé, setFinalArrayCafé] = useState<number[]>([])
    let finalArrayBio : Array <any> =[]
    let finalArrayCafé : Array <any> =[]
    let arrayCafé : Array <any> = []
    let count : number = 0

    //Récupération des données + Stockage dans 2 tableau différents (1 pour Biodéchets et 1 pour Marc de café)
    axios.get(HOST_BACK + '/historique/date/' +beforeDateSend +'/'+  todayDateSend   , {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }}).then(res => {      
           console.log(res.data);
           
            
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
                        // setFinalArrayBio(finalArrayBio => [...finalArrayBio, arrayBio[historyIndex].poids])
                       finalArrayBio.push(arrayBio[historyIndex].poids)
                       xIndex ++
                       historyIndex =0;
                    }
                    else if(arrayDate[xIndex]!=moment(arrayBio[historyIndex].date).format("DD-MM") && historyIndex != arrayBio.length -1){
                       historyIndex ++
                   }
                   else if (arrayDate[xIndex]!=moment(arrayBio[historyIndex].date).format("DD-MM") && historyIndex == arrayBio.length -1){
                    finalArrayBio.push(0)
                    // setFinalArrayBio(finalArrayBio => [...finalArrayBio, 0])
                       xIndex ++
                       historyIndex = 0;
                   }
                  
               
                   
               }
               for(let xIndex =0, historyIndex = 0; xIndex<arrayDate.length; ){ 
                 if(arrayDate[xIndex]==moment(arrayCafé[historyIndex].date).format("DD-MM")){
                    finalArrayCafé.push(arrayCafé[historyIndex].poids)
                    xIndex ++
                    historyIndex =0;
                 }
                 else if(arrayDate[xIndex]!=moment(arrayCafé[historyIndex].date).format("DD-MM") && historyIndex != arrayCafé.length -1){
                    historyIndex ++
                }
                else if (arrayDate[xIndex]!=moment(arrayCafé[historyIndex].date).format("DD-MM") && historyIndex == arrayCafé.length -1){
               
                    finalArrayCafé.push(0)
                    xIndex ++
                    historyIndex = 0;
                }

               }

            //    console.log(finalArrayBio[2], typeof finalArrayBio[2]);
               
                 
       })
     
    


    
    //Définir les 30 dernières dates à partir d'aujourd'hui
    for(let i = 32;i>0;i--){
        let previousDateNotFormated = new Date().setDate(todayDateNotFormated.getDate()-i)
        let  previousDate= moment(previousDateNotFormated).format("DD-MM")
        arrayDate.push(previousDate)
    }

    
     
   
    
    
    

    const state = {

        series: [{
            name: 'poids biodéchets en kg',
            data: finalArrayBio
                
        },
        {
            name: 'poids Marc de café en kg',
            data: finalArrayCafé
        },
            ],
    

        options: {
            chart: {
                height: 350,
            },
            stroke: {
                curve: 'smooth',
              },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: arrayDate.map((date : any)=>{
                    return date})
                
            },
            tooltip: {
                x: {
                    format: 'dd/MM/YY'
                },
            },
        },
    }
    return (
        <div className="graph">
            <h4>Bio-déchets en kg collecté par jour</h4>
            <ReactApexChart options={state.options} series={state.series} type="line" height={240} />
        </div>
    );
};





export default GraphWeightPerHour;