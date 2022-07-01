import React, {useState} from 'react';
import {motion, AnimateSharedLayout} from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";


interface CardsProps{
    title:string;
    colorBackground:string;
    colorBoxShadow:string;
    barValue:number;
    value:number;
    // png:any;
    seriesName:string;
    seriesData:number[];
}


const Card = ({title, colorBackground, colorBoxShadow, barValue, value , seriesName, seriesData}:CardsProps) => {

    

    return (
        <AnimateSharedLayout>
             
             <CompactCard param={({title, colorBackground, colorBoxShadow, barValue, value, seriesName, seriesData})}  />
            
        </AnimateSharedLayout>
    );
};

        //CompactCard
function CompactCard({ param, setExpanded }:any) {
 
    return (
        <motion.div
            className="CompactCard"
            style={{
                background: param.colorBackground,
                boxShadow: param.colorBoxShadow,
            }}
            layoutId="expandableCard"
            onClick={setExpanded}
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <span></span>
                <span>€{param.value}</span>
                <span>Derniers 30 jours</span>
            </div>
        </motion.div>
    );
}


export default Card;