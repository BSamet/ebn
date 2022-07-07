import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

import Card from '../components/Card';
import { HOST_BACK } from "../environment/environment";



const Cards = () => {
    const [nbBioDechet, setNbBioDechet] = useState(Number);
    const [nbMarcCafé, setMarcCafé] = useState(Number);
    const [revenuTotal, setRevenuTotal] = useState(Number);
    const [priceBioKg, setPriceBioKg] = useState(Number);
    const [priceCaféKg, setPriceCaféKg] = useState(Number);
    let countBio : number = 0;
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
              console.log("prix",res.data);
              
                res.data.historique.map((history : any)=>{                  
                     if(history.typeDeDechet == "Biodéchets"){
                        realHistoryPoids= parseInt(history.poids)
                        countBio+= realHistoryPoids
                      }
                      else{
                        realHistoryPoids= parseInt(history.poids)
                        countCafé+= realHistoryPoids
                      }   
                      
                      
                  })
                 
               res.data.typeDechets.map((prix : any)=>{
                 if(prix.typeDechets == "Biodéchets"){
                   setPriceBioKg(prix.prixKg)
                 }
                 else{
                   setPriceCaféKg(prix.prixKg)
                 }
               })
               setNbBioDechet(countBio*priceBioKg) 
               setMarcCafé(countCafé*priceCaféKg)
               setRevenuTotal(nbBioDechet+nbMarcCafé)
               
        })

    const CardsData =[
        {
          title: 'Biodéchets',
          color:{
            background:'#8ac997',
            boxShadow:'0px 10px 20px 0px #c1dfc4',
          },
          barValue: Math.round((nbBioDechet*100)/revenuTotal),
          value: nbBioDechet,
        //   png: UilUserSquare,
          series:
            {
              name:"Ventes",
              data: [31,40,28,61,42,109,100],
            },
        },
      
        {
          title:'Marc de café',
          color:{
            background:'#8ac997',
            boxShadow:'0px 10px 20px 0px #c1dfc4',
          },
          barValue: Math.round((nbMarcCafé*100)/revenuTotal),
          value: nbMarcCafé,
        //   png: UilMoneyWithdrawal,
          series:
            {
              name:"Revenue",
              data: [10,100,50,70,80,30,40],
            },
      
        },
      
        {
          title:'Total',
          color:{
            background:'#8ac997',
            boxShadow:'0px 10px 20px 0px #c1dfc4',
          },
          barValue: 100,
          value: revenuTotal,
        //   png: UilClipboardAlt,
          series:
            {
              name:"Depenses",
              data: [10,25,15,30,12,15,20],
            },
      
        },
      ]
      
      
      

    return (
        <div className="Cards">
            {CardsData.map((card, id) => {

                return (
                    <div className="parentContainer" key={id}>
                        <Card
                            title={card.title}
                            colorBackground={card.color.background}
                            colorBoxShadow={card.color.boxShadow}
                            barValue={card.barValue}
                            value={card.value}
                           seriesName={card.series.name}
                            seriesData={card.series.data}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;