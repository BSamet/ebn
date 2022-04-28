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
    value:string;
    png:any;
    seriesName:string;
    seriesData:number[];
}


const Card = ({title, colorBackground, colorBoxShadow, barValue, value, png , seriesName, seriesData}:CardsProps) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <AnimateSharedLayout>
            {expanded ? (
                <ExpandedCard param={({title, colorBackground, colorBoxShadow, barValue, value, png , seriesName, seriesData})} setExpanded={() => setExpanded(false)} />
            ) : (
                <CompactCard param={({title, colorBackground, colorBoxShadow, barValue, value, png , seriesName, seriesData})} setExpanded={() => setExpanded(true)} />
            )}
        </AnimateSharedLayout>
    );
};

        //CompactCard
function CompactCard({ param, setExpanded }:any) {
    const Png = param.png;
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
                <Png />
                <span>€{param.value}</span>
                <span>Dernières 24 heures</span>
            </div>
        </motion.div>
    );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }:any) {
    const data = {
        options: {
            chart: {
                type: "area",
                height: "auto",
            },

            dropShadow: {
                enabled: false,
                enabledOnSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: "#000",
                opacity: 0.35,
            },

            fill: {
                colors: ["#fff"],
                type: "gradient",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                colors: ["white"],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",

                },
            },
            grid: {
                show: true,
            },
            option: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [

                        "2022-03-19",
                        "2022-03-19",
                        "2022-03-19",
                        "2022-03-19",
                        "2022-03-19",
                        "2022-03-19",
                        "2022-03-19",
                    ],
                },
            }
        },
    };

    return (
        <motion.div
            className="ExpandedCard"
            style={{
                background: param.colorBackground,
                boxShadow: param.colorBoxShadow,
            }}
            layoutId="expandableCard"
        >
            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.title}</span>
            <div className="chartContainer">
                <Chart
                    options={data.options.option}
                    series={
                        [
                            {
                                name: param.seriesName,
                                data: param.seriesData
                            }
                        ]
                    }
                    type="line"
                    width="500"

                />
            </div>
            <span>Dernières 24 heures</span>
        </motion.div>
    );
}
export default Card;