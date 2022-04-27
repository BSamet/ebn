import React from 'react';
import '../styles/component/_RatioWasteCompost.scss'
import ReactApexChart from "react-apexcharts";


const RatioWasteCompost = () => {

    const state = {

        series: [70,30],

        options: {
            fill: { colors: ['#008000', '#ffa500'] },
            labels: ["Bio-déchets", "Composte"],
            colors:['green','orange'],
            chart: {
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };

    return (
        <div className="charts">
            <h4>Ratio Déchets/Composte</h4>
            <ReactApexChart options={state.options} series={state.series} type="donut" />

        </div>
    );
};

export default RatioWasteCompost;