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

const GraphWeightPerHour = () => {
    let todayDateNotFormated = new Date()
    let todayDateSend = moment(todayDateNotFormated).format("YYYY-MM-DD") + "T23:59:59"
    let beforeDateNotFormated = new Date().setDate(todayDateNotFormated.getDate() - 31)
    let beforeDateSend = moment(beforeDateNotFormated).format("YYYY-MM-DD") + "T23:59:59"
    const [finalArrayBio, setFinalArrayBio] = useState<number[]>([])
    const [finalArrayCafé, setFinalArrayCafé] = useState<number[]>([])
    let arrayDate: Array<any> = []
    let arrayBio: Array<any> = []
    let arrayCafé: Array<any> = []
    const [loaded, setLoaded] = useState(false)
    //Récupération des données + Stockage dans 2 tableau différents (1 pour Biodéchets et 1 pour Marc de café)
    useEffect(() => {
        if(loaded === false){

        
    axios.get(HOST_BACK + '/historique/date/' + beforeDateSend + '/' + todayDateSend, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(res => {        
        res.data.historique.map((history: HistoriqueClient) => {
            if (history.typeDeDechet == "Biodéchets") {
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

    //Définir les 30 dernières dates à partir d'aujourd'hui
    for (let i = 32; i > 0; i--) {
        let previousDateNotFormated = new Date().setDate(todayDateNotFormated.getDate() - i)
        let previousDate = moment(previousDateNotFormated).format("DD-MM")
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
                categories: arrayDate.map((date: any) => {
                    return date
                    })
                
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
            {loaded &&
            <ReactApexChart options={state.options} series={state.series} type="line" height={240} />
}
        </div>
    );
};



export default GraphWeightPerHour;

