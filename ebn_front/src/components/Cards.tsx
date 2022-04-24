import React from "react";
import "../styles/component/_Cards.scss";
import { CardsData } from "../Data/Data";
import Card from '../components/Card';

interface CardsProps{
    title:string;
    color:string;
    barValue:number;
    value:number;
    png:any;
    series:any;
}

const Cards = ({title, color, barValue, value, png , series}:CardsProps) => {

    return (
        <div className="Cards">
            {CardsData.map((card, id) => {

                return (
                    <div className="parentContainer" key={id}>
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;