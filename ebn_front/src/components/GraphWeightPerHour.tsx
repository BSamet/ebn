import React from 'react';
import '../styles/component/_GraphWeightPerHour.scss'
import ReactApexChart from "react-apexcharts";


const GraphWeightPerHour = () => {

    const state = {

        series: [{
            name: 'poids en kg',
            data: [31, 40, 28, 51, 42, 109, 100]
        },],
        options: {
            chart: {
                height: 350,
            },
            dataLabels: {
                enabled: false
            },

            xaxis: {
                categories: ["11/09/22", "12/09/22", "13/09/22", "14/09/22", "15/09/22", "16/09/22", "17/09/22"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy'
                },
            },
        },
    }
    return (
        <div className="graph">
            <h4>Bio-déchets en kg collecté par jour</h4>
            <ReactApexChart options={state.options} series={state.series} type="area" height={240} />
        </div>
    );
};





export default GraphWeightPerHour;