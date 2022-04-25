import React from "react";
import "../styles/component/_Cards.scss";
import { CardsData } from "../Data/Data";
import Card from '../components/Card';



const Cards = () => {

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
                            png={card.png}
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